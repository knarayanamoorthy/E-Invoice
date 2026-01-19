package com.example.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.LoginRequest;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ========= LOGIN =========
    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        return userRepository.findByEmail(request.getEmail())
                .filter(user -> user.getPassword().equals(request.getPassword()))
                .orElseThrow(() -> new RuntimeException("Invalid Credentials"));
    }

    // ========= REGISTER =========
    @PostMapping("/register")
    public User register(@RequestBody User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        user.setRole("USER"); // default role
        return userRepository.save(user);
    }
}
