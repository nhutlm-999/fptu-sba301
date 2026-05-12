package vn.edu.fpt.sba.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import vn.edu.fpt.sba.entity.Artist;
import vn.edu.fpt.sba.service.ArtistService;

import java.util.List;

@RestController
@RequestMapping("/api/artists")
@Data
@Tag(name = "Artists", description = " management endpoints")

public class ArtistController {
    private final ArtistService artistService;

    @GetMapping
    @Operation(summary = "Get artist list")
    public List<Artist> getAllArtists() {
        List<Artist> artists = artistService.findAll();
        return artists;
    }

    @GetMapping("/id")
    @Operation(summary = "Get artist by id")
    public List<Artist> getArtistById(Long artistId) {
        List<Artist> artists = artistService.findArtistsByArtistId(artistId);
        return artists; }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED) // Luôn trả về 201 nếu không có lỗi
    @Operation(summary = "Create a artist payload")
    public Artist createArtist(@RequestBody Artist artist) {
        return this.artistService.save(artist); // serialize -> JSOn
    }
}
