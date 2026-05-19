package vn.edu.fpt.sba.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fpt.sba.dto.response.AlbumDetailResponseDto;
import vn.edu.fpt.sba.service.IAlbumService;

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
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Thành công"),
            @ApiResponse(responseCode = "401", description = "Chưa đăng nhập"),
            @ApiResponse(responseCode = "500", description = "Lỗi server")
    })
    public ResponseEntity<AlbumDetailResponseDto> getAlbumById(@PathVariable("id") Long albumId) {
        return new ResponseEntity<>(albumService.findAlbumByAlbumId(albumId), HttpStatus.OK);
    }

    @GetMapping
    @Operation(summary = "Get paginated album list")
//    @ApiResponses({
//            @ApiResponse(responseCode = "201", description = "Thành công"),
//            @ApiResponse(responseCode = "401", description = "Chưa đăng nhập"),
//            @ApiResponse(responseCode = "500", description = "Lỗi server")
//    })
    public ResponseEntity<Page<AlbumDetailResponseDto>> findAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        // Handle validation for page and size parameters...
        Pageable pageable = PageRequest.of(page-1, size);
        return new ResponseEntity<>(albumService.findAll(pageable), HttpStatus.OK);

    }
}
