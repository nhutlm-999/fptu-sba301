package vn.edu.fpt.sba.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.fpt.sba.entity.Artist;

import java.util.List;

public interface ArtistService {
    List<Artist> findArtistsByArtistId(Long artistId);
    Artist save(Artist artist);
    Page<Artist> findAll(Pageable pageable);
    List<Artist> findAll();
}
