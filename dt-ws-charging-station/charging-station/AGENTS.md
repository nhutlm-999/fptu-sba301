# AGENTS.md

Context file for AI agents working in this repository.

---

## Project Identity

- **Name:** `charging-station`
- **Course:** SBA301 — Classwork, FPT University
- **Purpose:** RESTful API for managing EV charging stations and slots
- **Artifact:** `vn.edu.fpt.sba:charging-station:0.0.1-SNAPSHOT`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | Java 21 |
| Framework | Spring Boot 3.5.16 |
| Web | Spring Web MVC (embedded Tomcat) |
| Persistence | Spring Data JPA + Hibernate |
| Database | Microsoft SQL Server (`sba301_cw_charging_station` on `localhost:1433`) |
| Validation | Jakarta Bean Validation |
| Boilerplate | Lombok (`@Data`, `@NoArgsConstructor`, `@RequiredArgsConstructor`) |
| API Docs | SpringDoc OpenAPI (`springdoc-openapi-starter-webmvc-ui` v2.8.16) |
| Build | Apache Maven (Maven Wrapper `./mvnw`) |
| Dev tooling | Spring Boot DevTools (hot reload) |

---

## Project Structure

```
src/main/java/vn/edu/fpt/sba/chargingstation/
├── ChargingStationApplication.java        # Spring Boot entry (@SpringBootApplication)
├── config/
│   ├── DataInitializer.java               # Seed data runner (@Profile("dev"))
│   └── OpenApiConfig.java                 # OpenAPI metadata (@OpenAPIDefinition)
├── controller/v1/
│   ├── StationController.java             # /api/v1/stations — read-only
│   └── SlotController.java                # /api/v1/slots — full CRUD, paginated
├── dto/request/
│   ├── StationRequest.java                # Java Record
│   └── SlotRequest.java                   # Java Record
├── dto/response/
│   ├── PagedResponse.java                 # Generic paginated response record
│   ├── SlotResponse.java                  # Java Record
│   └── StationResponse.java              # Java Record
├── entity/
│   ├── Station.java                       # @Entity → stations table
│   └── Slot.java                          # @Entity → slots table
├── exception/
│   ├── GlobalExceptionHandler.java        # @RestControllerAdvice
│   └── ResourceNotFoundException.java     # Custom 404 exception
├── repository/
│   ├── StationRepository.java             # JpaRepository<Station, Integer>
│   └── SlotRepository.java                # JpaRepository<Slot, Integer> + findByStationId
└── service/
    ├── StationService.java                # Service interface
    ├── SlotService.java                   # Service interface
    └── impl/
        ├── StationServiceImpl.java        # @Service implementation
        └── SlotServiceImpl.java           # @Service implementation

src/main/resources/
├── application.properties                 # DB, profile, JPA config
└── application-dev.properties             # Dev profile overrides (empty)
```

---

## API Endpoints

| Method | Path | Description | Notes |
|---|---|---|---|
| `GET` | `/api/v1/stations` | List all stations | No pagination |
| `GET` | `/api/v1/stations/{id}` | Get station by ID | 404 if not found |
| `GET` | `/api/v1/slots` | List slots (paginated) | `?stationId=` filter optional |
| `GET` | `/api/v1/slots/{id}` | Get slot by ID | 404 if not found |
| `POST` | `/api/v1/slots` | Create slot | 201 Created, `@Valid` |
| `PUT` | `/api/v1/slots/{id}` | Update slot | 404 if not found |
| `DELETE` | `/api/v1/slots/{id}` | Delete slot | 204 No Content |

---

## Entity Details

### `Station` (`entity/Station.java`)
- `@Entity`, maps to `stations` table
- `id` — `@Id`, `@GeneratedValue(IDENTITY)`
- `location` — `@NotBlank`, `@Column(nullable = false)`
- `responsible` — `@NotBlank`, `@Column(nullable = false)`
- `slots` — `@OneToMany(mappedBy="station", cascade=ALL, orphanRemoval=true)`, annotated `@JsonIgnore` to prevent circular JSON; `@ToString.Exclude`

### `Slot` (`entity/Slot.java`)
- `@Entity`, maps to `slots` table
- `id` — `@Id`, `@GeneratedValue(IDENTITY)`
- `slotName` — `@NotBlank`, `@Column(name="slot_name", nullable=false)`
- `station` — `@ManyToOne(fetch=LAZY)`, `@JoinColumn(name="station_id")`, `@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "slots"})`, `@ToString.Exclude`
- `maxPowerKw` — `@NotNull`, `@Column(name="max_power_kw", nullable=false)`
- `connectorStandard` — `@NotBlank`, `@Column(name="connector_standard", nullable=false)`
- `isDisabled` — `@Column(name="is_disabled", nullable=false)`, defaults to `false`

---

## DTO Conventions

- **All DTOs are Java Records** (`public record ...`)
- Request records use Jakarta Validation annotations (`@NotBlank`, `@NotNull`, `@Positive`)
- `PagedResponse<T>` is a generic record wrapping Spring `Page<T>` data
- `SlotResponse` includes a nested `StationRef` record with `id` and `location`

---

## Architecture Conventions

- **4-layer architecture:** `Controller → Service Interface → Service Impl → Repository`
- **Constructor injection** via `@RequiredArgsConstructor` (Lombok) — never field `@Autowired`
- **Service interfaces** decouple controllers from implementations
- **API version prefix:** `/api/v1/` on all endpoints
- **`ResponseEntity<T>`** used in controllers for explicit HTTP status control
- **Update pattern:** find-then-modify-then-save (not merge/patch)
- **Exception pattern:** services throw `ResourceNotFoundException`; `GlobalExceptionHandler` translates to HTTP responses
- **`@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "slots"})`** on `@ManyToOne` fields — mandatory to prevent serialization of Hibernate proxy objects
- **Related entity in responses** — embed a nested record (e.g. `StationRef`) instead of flat fields

---

## Exception Handling

- `GlobalExceptionHandler` is a `@RestControllerAdvice` handling:
  - `ResourceNotFoundException` → HTTP 404 (`{"error": "..."}`)
  - `MethodArgumentNotValidException` → HTTP 400 (`{"error": "Validation failed", "fieldErrors": {...}}`)
  - `HttpMessageNotReadableException` → HTTP 400 (`{"error": "Malformed JSON request"}`)
  - `Exception` (catch-all) → HTTP 500 (`{"error": "Internal server error"}`)
- `ResourceNotFoundException` message format: `"%s with id %d not found".formatted(resource, id)`

---

## Database Configuration

```properties
# application.properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=sba301_cw_charging_station;encrypt=false
spring.datasource.username=sa
spring.datasource.password=123456-aA
spring.profiles.active=dev
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

Schema is auto-generated by Hibernate (`ddl-auto=update`). Column names use `snake_case` declared via `@Column(name="...")`.

---

## Seed Data

- `DataInitializer` (`config/DataInitializer.java`) runs only with `@Profile("dev")`
- Seeds 4 stations with their slots: FPT University Cantho, Lotte Mart Mau Than, Vincom Xuan Khanh, Cho Noi Cai Rang
- Uses various connector standards: `CCS2`, `CHAdeMO`, `Type 2`; power from 50–200 kW
- Some slots are marked `isDisabled = true`

---

## Build & Run

```bash
# Compile and run (requires SQL Server running locally)
./mvnw spring-boot:run

# Run tests
./mvnw test

# Package fat JAR
./mvnw package

# Run the JAR directly
java -jar target/charging-station-0.0.1-SNAPSHOT.jar
```

The app runs on port `8080`. API docs available at `http://localhost:8080/swagger-ui.html`.

---

## Key Constraints for AI Agents

1. **Constructor injection only** — do not use `@Autowired` field injection. Use `@RequiredArgsConstructor`.
2. **Service interfaces must be maintained** — new service methods must be added to the interface first, then implemented.
3. **Java Records for DTOs** — request/response DTOs are records. Do not revert to class-based DTOs.
4. **`@JsonIgnoreProperties` on `@ManyToOne`** — must include `{"hibernateLazyInitializer", "handler", "slots"}` to avoid serialization errors.
5. **`Station.slots` is `@JsonIgnore`** — intentional to prevent infinite recursion. Do not remove.
6. **Update pattern** — always find entity first, modify fields, then save. Never use merge/patch patterns.
7. **Exception consistency** — always throw `ResourceNotFoundException` with the pattern `"%s with id %d not found"`.
8. **`SlotResponse` includes nested station data** — `StationRef(Integer id, String location)` inside `SlotResponse`. Keeps related entity in its own boundary.
9. **This is a teaching codebase** — keep code readable, explicit, and layered. Avoid over-engineering.

---

## Git History

| Commit | Description |
|---|---|
| `3cc9195` | Add charging-station (SBA301 classwork) |
