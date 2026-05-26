package vn.edu.fpt.sba.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "albumId")
    private Long albumId;
    private String title;

    @ManyToOne
    @JoinColumn(name = "artistId")
//    @JsonBackReference // --> resolve circular reference
    private Artist artist;
}
