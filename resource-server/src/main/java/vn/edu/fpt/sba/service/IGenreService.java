package vn.edu.fpt.sba.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.edu.fpt.sba.dto.request.GenreRequestDto;
import vn.edu.fpt.sba.dto.response.GenreResponseDto;
import vn.edu.fpt.sba.entity.Genre;

public interface IGenreService {
    Page<GenreResponseDto> findAll(Pageable pageable);
    GenreResponseDto findOne(Long genreId);
    GenreResponseDto save(GenreRequestDto genre);
    GenreResponseDto update(Long genreId, GenreRequestDto genre);
    void deleteById(Long genreId);
}
