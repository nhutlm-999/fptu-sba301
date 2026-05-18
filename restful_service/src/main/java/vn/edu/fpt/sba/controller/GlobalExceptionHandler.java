package vn.edu.fpt.sba.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import vn.edu.fpt.sba.dto.ApiError;
import vn.edu.fpt.sba.exception.ExampleArtistException;

import java.time.LocalDateTime;

@RestControllerAdvice
//@ResponseBody

public class GlobalExceptionHandler {
    @ExceptionHandler(ExampleArtistException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ApiError> handleNotFound(
            RuntimeException ex) {

        ApiError json = new ApiError(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage(),
                "Not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(json);
    }
}
