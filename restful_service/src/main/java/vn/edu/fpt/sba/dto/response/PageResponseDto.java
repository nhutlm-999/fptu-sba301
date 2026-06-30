package vn.edu.fpt.sba.dto.response;

import org.springframework.data.domain.Page;
import java.util.List;

//Generic Type
public record PageResponseDto<T> (
        List<T> content,
        int pageNumber,
        int pageSize,
        long totalElements,
        int totalPages,
        boolean last
){
    public static <T> PageResponseDto<T> of(Page<T> page) {
        return new PageResponseDto<>(
                page.getContent(),
                page.getNumber()+1,
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }
}
