package com.backend.backend.controller;

import com.backend.backend.model.User;
import com.backend.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }
    @PostMapping("/login")
    User loginUser(@RequestBody User loginUser) {
        // Assuming you have a method in your repository to find a user by email and password
        User existingUser = userRepository.findByEmailAndPassword(loginUser.getEmail(), loginUser.getPassword());

        if (existingUser != null) {
            // User found, you might want to return some user details or a success message
            return existingUser;
        } else {
            // User not found, you might want to return an error message or handle it accordingly
            return null;
        }
    }
    @GetMapping("/user/check-email/{email}")
    public ResponseEntity<Map<String, Boolean>> checkEmailExists(@PathVariable String email) {
        boolean exists = userRepository.existsByEmail(email);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }


}
