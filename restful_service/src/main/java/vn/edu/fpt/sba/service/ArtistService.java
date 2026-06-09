package vn.edu.fpt.sba.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.edu.fpt.sba.dto.ArtistDto;
import vn.edu.fpt.sba.dto.response.ArtistDetailResponseDto;
import vn.edu.fpt.sba.entity.Artist;

import java.util.List;

public interface ArtistService {
    ArtistDetailResponseDto findArtistsByArtistId(Long artistId);

    Artist save(Artist artist);

    Page<ArtistDetailResponseDto> findAll(Pageable pageable);

    List<ArtistDetailResponseDto> findAll();

    Artist update(Long id, ArtistDto a);

    void deleteById(Long id);
}
