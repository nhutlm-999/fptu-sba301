package vn.edu.fpt.sba.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data // getter, setter, constructor
@NoArgsConstructor
public class User {
    @Id
    private Long id;
    private String username;
    private String password;

    private String email;
    private Boolean isDisabled;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public User(String username, String email) {
//        this.id = id;
        this.username = username;
        this.email = email;
        this.isDisabled = false;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}
