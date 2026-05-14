package vn.edu.fpt.sba.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import vn.edu.fpt.sba.dto.ArtistDto;
import vn.edu.fpt.sba.dto.response.AlbumDetailResponseDto;
import vn.edu.fpt.sba.dto.response.AlbumResponseDto;
import vn.edu.fpt.sba.dto.response.ArtistDetailResponseDto;
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
    public ArtistDetailResponseDto findArtistsByArtistId(Long artistId) {
//        Artist artist = this.artistRepository.findArtistsByArtistId(artistId).orElse(null);
//        if(artist == null) return null;
//        return new ArtistDetailResponseDto(
//                artist.getArtistId(),
//                artist.getName(),
//                artist.getAlbum().stream().map(al -> new AlbumResponseDto(
//                        al.getAlbumId(),
//                        al.getTitle())).toList());
        return this.artistRepository.findArtistsByArtistId(artistId).map(this::toDto).orElse(null);
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
    public List<ArtistDetailResponseDto> findAll() {
        return this.artistRepository.findAll().stream().map(this::toDto).toList();
    }

    @Override
    public Artist update(Long id, ArtistDto a) {
        return artistRepository.findArtistsByArtistId(id).map(artist -> {
            artist.setName(a.getName());
            return artistRepository.save(artist);
        }).orElse(null);
    }

    @Override
    public void deleteById(Long id) {
        artistRepository.deleteById(id);
    }

    private ArtistDetailResponseDto toDto(Artist artist){
        return new ArtistDetailResponseDto(
                artist.getArtistId(),
                artist.getName(),
                CollectionUtils.isEmpty(artist.getAlbum()) ? List.of() : artist.getAlbum().stream().map(al -> new AlbumResponseDto(
                        al.getAlbumId(),
                        al.getTitle())).toList()
        );
    }
}
