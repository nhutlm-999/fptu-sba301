package vn.edu.fpt.sba.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.edu.fpt.sba.dto.response.AlbumDetailResponseDto;
import vn.edu.fpt.sba.entity.Album;

import java.util.List;

public interface IAlbumService {
    List<Album> findAll();
    Page<AlbumDetailResponseDto> findAll(Pageable pageable);
    AlbumDetailResponseDto findAlbumByAlbumId(Long albumId);
    Album  save(Album album);
    Album  update (Long id, Album album);
    Album deleteById(Long id);
}
