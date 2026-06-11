package vn.edu.fpt.sba.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import vn.edu.fpt.sba.exception.ExampleArtistException;

import java.time.LocalDateTime;
import java.util.Objects;

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

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ApiError> handleInvalidApiRequestArg(
            MethodArgumentNotValidException ex){
        ApiError json = new ApiError(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                Objects.requireNonNull(ex.getFieldError()).getDefaultMessage(),
                "Bad request");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(json);
    }


}
