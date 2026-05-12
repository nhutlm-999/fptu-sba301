package vn.edu.fpt.sba.service.Impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.fpt.sba.entity.Artist;
import vn.edu.fpt.sba.repository.ArtistRepository;
import vn.edu.fpt.sba.service.ArtistService;

import java.util.List;

@Service
public class ArtistServiceImpl implements ArtistService {

    private final ArtistRepository artistRepository;
    public ArtistServiceImpl(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    @Override
    public List<Artist> findArtistsByArtistId(Long artistId) {
        return this.artistRepository.findArtistsByArtistId(artistId);
    }

    @Override
    public Artist save(Artist artist) {
        return this.artistRepository.save(artist);
    }

    @Override
    public Page<Artist> findAll(Pageable pageable) {
        return this.artistRepository.findAll(pageable);
    }

    @Override
    public List<Artist> findAll() {
        return this.artistRepository.findAll();
    }
}
