package vn.edu.fpt.sba.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.fpt.sba.dto.response.AlbumDetailResponseDto;
import vn.edu.fpt.sba.dto.response.ArtistResponseDto;
import vn.edu.fpt.sba.entity.Album;
import vn.edu.fpt.sba.repository.AlbumRepository;
import vn.edu.fpt.sba.service.IAlbumService;

import java.util.List;

@Service
public class AlbumServiceImpl implements IAlbumService {
    private final AlbumRepository albumRepository;

    public AlbumServiceImpl(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    @Override
    public List<Album> findAll() {
        return this.albumRepository.findAll();
    }

    @Override
    public Page<AlbumDetailResponseDto> findAll(Pageable pageable) {
        Page<Album> albums= this.albumRepository.findAll(pageable);
//        return albums.map(a ->
//                new AlbumDetailResponseDto(
//                        a.getAlbumId(),
//                        a.getTitle(),
//                new ArtistResponseDto(a.getArtist().getArtistId(), a.getArtist().getName())));

        return albums.map(this::toDto);
    }

    private AlbumDetailResponseDto toDto(Album album){
        return new AlbumDetailResponseDto(
                album.getAlbumId(),
                album.getTitle(), new ArtistResponseDto(album.getArtist().getArtistId(), album.getArtist().getName())
        );
    }

    @Override
    public AlbumDetailResponseDto findAlbumByAlbumId(Long albumId) {
        Album album =  this.albumRepository.findById(albumId).orElse(null);
        if (album == null) {
            return null;
        }
        return new AlbumDetailResponseDto(
                album.getAlbumId(),
                album.getTitle(), new ArtistResponseDto(album.getArtist().getArtistId(), album.getArtist().getName())
        );
    }

    @Override
    public Album save(Album album) {
        return null;
    }

    @Override
    public Album update(Long id, Album album) {
        return null;
    }

    @Override
    public Album deleteById(Long id) {
        return null;
    }
}
