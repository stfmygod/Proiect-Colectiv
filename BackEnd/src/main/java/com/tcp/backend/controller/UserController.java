package com.tcp.backend.controller;

import com.tcp.backend.domain.User;
import com.tcp.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService service;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping(value = "/users")
    public List<User> getAllUsers(){
        logger.info("Get all users");
        return service.getAll();
    }
}
