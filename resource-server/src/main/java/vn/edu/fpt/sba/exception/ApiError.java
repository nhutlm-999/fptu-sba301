package vn.edu.fpt.sba.exception;

import java.time.LocalDateTime;

public record ApiError(
        LocalDateTime timestamp,
        int code,
        String error,
        String message) {
}
