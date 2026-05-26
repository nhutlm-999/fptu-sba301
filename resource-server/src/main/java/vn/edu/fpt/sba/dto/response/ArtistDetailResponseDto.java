package vn.edu.fpt.sba.dto.response;

import java.util.List;

public record ArtistDetailResponseDto(Long artistId, String name, List<AlbumResponseDto> albums) {
}
