package vn.edu.fpt.authserver.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String name;

    @ManyToMany(mappedBy = "roles")
    private Set<User> users;
}
