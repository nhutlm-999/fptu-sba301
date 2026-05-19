package vn.edu.fpt.sba.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import vn.edu.fpt.sba.entity.User;
import vn.edu.fpt.sba.repository.UserRepository;

@RestController
@RequestMapping("/api/user")
@Data
@Tag(name = "Users", description = "User management endpoints")
public class UserController {
    private final UserRepository userRepository;

    @GetMapping("/{id}")
    @Operation(summary = "Get a user by id")
    public User getUser(@PathVariable Long id) {
        return this.userRepository.findById(id).orElse(null);
    }

//    @PostMapping()
//    public ResponseEntity<User> createUser(@RequestBody User user) {

    /// /        User newUser = new User(user.getUsername(), user.getEmail());
//        return  new ResponseEntity<>(user, HttpStatus.CREATED);
//    }
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED) // Luôn trả về 201 nếu không có lỗi
    @Operation(summary = "Create a user payload")
    public User createUser(@RequestBody User user) {
        return user; // serialize -> JSON
    }
}
