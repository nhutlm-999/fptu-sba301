package vn.edu.fpt.sba.recipebook.exception;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String resource, Integer id) {
        super("%s with id %d not found".formatted(resource, id));
    }
}
