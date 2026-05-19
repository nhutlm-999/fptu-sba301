package vn.edu.fpt.sba.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import vn.edu.fpt.sba.dto.request.GenreRequestDto;
import vn.edu.fpt.sba.dto.response.GenreResponseDto;
import vn.edu.fpt.sba.dto.response.PageResponseDto;
import vn.edu.fpt.sba.service.IGenreService;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/genres")
@RequiredArgsConstructor
@Tag(name = "Genre", description = "Genre Management")
public class GenreController {

    private final IGenreService genreService;

    // GET /api/v1/genres?page=0&size=10&sort=name,asc
    @GetMapping
    @Operation(description = "Find all genres with pagination")
    public ResponseEntity<PageResponseDto<GenreResponseDto>> getAll(
            @RequestParam(defaultValue = "1", required = false) int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page-1, size);
        return ResponseEntity.ok(PageResponseDto.of(genreService.findAll(pageable)));
    }

    // GET /api/v1/genres/{id}
    @GetMapping("/{id}")
    @Operation(description = "Find genre by ID")
    public ResponseEntity<GenreResponseDto> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(genreService.findOne(id));
    }

    // POST /api/v1/genres
    @PostMapping
    @Operation(description = "Create a new genre")
    public ResponseEntity<GenreResponseDto> create(@Valid @RequestBody GenreRequestDto request) {
        GenreResponseDto created = genreService.save(request);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.genreId())
                .toUri();

        return ResponseEntity.created(location).body(created);
    }

    // PUT /api/v1/genres/{id}
    @PutMapping("/{id}")
    @Operation(description = "Update an existing genre by ID")
    public ResponseEntity<GenreResponseDto> update(
            @PathVariable Long id,
            @Valid @RequestBody GenreRequestDto request) {
        return ResponseEntity.ok(genreService.update(id, request));
    }

    // DELETE /api/v1/genres/{id}
    @DeleteMapping("/{id}")
    @Operation(description = "Delete a genre by ID")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        genreService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}