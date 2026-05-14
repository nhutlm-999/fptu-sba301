package vn.edu.fpt.sba.dto;

import java.time.LocalDateTime;

public record ApiError(
        LocalDateTime timestamp,
        int code,
        String error,
        String message) {
}
