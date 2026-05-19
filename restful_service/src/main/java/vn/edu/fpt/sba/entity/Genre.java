package vn.edu.fpt.sba.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.fpt.sba.dto.request.GenreRequestDto;

@Entity
@Data
@NoArgsConstructor
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="genreid")
    private Long genreId;

    private String name;

    public Genre(String name) {
        this.name = name;
    }
}
