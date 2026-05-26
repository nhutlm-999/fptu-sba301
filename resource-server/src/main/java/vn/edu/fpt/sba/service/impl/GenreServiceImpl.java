package vn.edu.fpt.sba.service.impl;

import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.fpt.sba.dto.request.GenreRequestDto;
import vn.edu.fpt.sba.dto.response.GenreResponseDto;
import vn.edu.fpt.sba.entity.Genre;
import vn.edu.fpt.sba.exception.EntityNotFoundException;
import vn.edu.fpt.sba.repository.GenreRepository;
import vn.edu.fpt.sba.service.IGenreService;

@Service
@RequiredArgsConstructor
public class GenreServiceImpl implements IGenreService {
    private final GenreRepository genreRepository;

    @Override
    public Page<GenreResponseDto> findAll(Pageable pageable) {
        return this.genreRepository.findAll(pageable)
                .map(genre -> new GenreResponseDto(
                        genre.getGenreId(),
                        genre.getName()));
    }

    @Override
    public GenreResponseDto findOne(Long genreId) {
        return this.genreRepository.findById(genreId)
                .map(genre ->
                        new GenreResponseDto(
                                genreId,
                                genre.getName())).orElseThrow(() -> new EntityNotFoundException("Genre not found with ID" + genreId));
    }

    // Controller layer không nên nhận raw entity — vi phạm nguyên tắc tách biệt các layer.
    @Override
    @Transactional
    public GenreResponseDto save(GenreRequestDto genre) {
        Genre saved = genreRepository.save(new Genre(genre.name()));
        return new GenreResponseDto(saved.getGenreId(), saved.getName());
    }

    @Override
    @Transactional
    public GenreResponseDto update(Long genreId, GenreRequestDto genre) {
        Genre saved = this.genreRepository.findById(genreId)
                .map(g -> {
                    g.setName(genre.name());
                    return this.genreRepository.save(g);
                }).orElseThrow(() -> new EntityNotFoundException("Genre not found with ID" + genreId));
        return new GenreResponseDto(genreId, saved.getName());
    }

    @Override
    @Transactional
    public void deleteById(Long genreId) {
        this.genreRepository.deleteById(genreId);
    }
}
