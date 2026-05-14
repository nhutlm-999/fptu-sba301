package vn.edu.fpt.sba.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fpt.sba.dto.response.AlbumDetailResponseDto;
import vn.edu.fpt.sba.entity.Album;
import vn.edu.fpt.sba.service.IAlbumService;

import java.util.List;

@RestController
@Data
@RequestMapping("/api/albums")
@Tag(name = "Albums", description = "Albums management endpoints")
public class AlbumController {
    private final IAlbumService albumService;

//    @GetMapping
//    @Operation(summary = "Get album list")
//    public ResponseEntity<List<Album>> getAllAlbums() {
//        List<Album> albums = albumService.findAll();
//        return new ResponseEntity<>(albums, HttpStatus.OK);
//    }

    @GetMapping("/{id}")
    @Operation(summary = "Get album by id")
    public ResponseEntity<AlbumDetailResponseDto> getAlbumById(@PathVariable("id") Long albumId) {
        return new ResponseEntity<>(albumService.findAlbumByAlbumId(albumId), HttpStatus.OK);
    }

    @GetMapping
    @Operation(summary = "Get paginated album list")
    public ResponseEntity<Page<AlbumDetailResponseDto>> findAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        // Handle validation for page and size parameters...

        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(albumService.findAll(pageable), HttpStatus.OK);

    }
}
