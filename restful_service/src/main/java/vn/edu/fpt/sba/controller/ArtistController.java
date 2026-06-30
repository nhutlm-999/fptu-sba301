package vn.edu.fpt.sba.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fpt.sba.dto.response.AlbumDetailResponseDto;
import vn.edu.fpt.sba.dto.response.PageResponseDto;
import vn.edu.fpt.sba.exception.ApiError;

import vn.edu.fpt.sba.dto.ArtistDto;
import vn.edu.fpt.sba.dto.request.ArtistRequestDto;
import vn.edu.fpt.sba.dto.response.ArtistDetailResponseDto;
import vn.edu.fpt.sba.entity.Artist;
import vn.edu.fpt.sba.exception.ExampleArtistException;
import vn.edu.fpt.sba.service.ArtistService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/artists")
@Data
@Tag(name = "Artists", description = " management endpoints")

public class ArtistController {
    private final ArtistService artistService;

    @GetMapping
//    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Get artist list")
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Thành công",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ArtistDetailResponseDto.class))),
            @ApiResponse(responseCode = "401",
                    description = "Chưa đăng nhập",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ApiError.class)))
    })
//    public List<ArtistDetailResponseDto> getAllArtists() {
//        return artistService.findAll();
//    }
    public ResponseEntity<PageResponseDto<ArtistDetailResponseDto>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        // Handle validation for page and size parameters...
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(PageResponseDto.of(artistService.findAll(pageable)), HttpStatus.OK);

    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Get artist by id")
    public ResponseEntity<ArtistDetailResponseDto> getArtistById(@PathVariable("id") Long artistId) {
        ArtistDetailResponseDto artists = artistService.findArtistsByArtistId(artistId);
        if (artists == null) {
//            return ResponseEntity.notFound().build(); // Trả về 404 nếu không tìm thấy artist
            throw new ExampleArtistException(("Artist with id " + artistId + " not found"));
        }
        return ResponseEntity.ok(artists);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED) // Luôn trả về 201 nếu không có lỗi
    @Operation(summary = "Create a artist payload")
    public Artist createArtist(@Valid @RequestBody ArtistRequestDto artist) {
        Artist newArtist = new Artist();
        newArtist.setName(artist.name());
        return this.artistService.save(newArtist); // serialize -> JSOn
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Artist> updateArtist(@PathVariable Long id, @RequestBody ArtistDto artist) {
        Artist updatedArtist = artistService.update(id, artist);

        if (updatedArtist == null) {
            return ResponseEntity.notFound().build(); // Trả về 404 nếu không tìm thấy artist
        }
        return ResponseEntity.ok(updatedArtist); // Trả về 200 và artist đã cập nhật
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArtist(@PathVariable Long id) {
        ArtistDetailResponseDto artist = artistService.findArtistsByArtistId(id);

        if (artist == null) {
            return ResponseEntity.notFound().build(); // Trả về 404 nếu không tìm thấy artist
        }

        artistService.deleteById(id); // Giả sử bạn đã có phương thức delete trong service
        return ResponseEntity.noContent().build(); // Trả về 204 No Content sau khi xóa thành công
    }

//    @ExceptionHandler(RuntimeException.class)
//    @ResponseStatus(HttpStatus.NOT_FOUND)
//    public Map<String, String> handleNotFound (RuntimeException ex) {
//        return Map.of("error", ex.getMessage());
//    }
}
