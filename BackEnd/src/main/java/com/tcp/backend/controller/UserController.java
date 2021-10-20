package com.tcp.backend.controller;

import com.tcp.backend.converter.UserConverter;
import com.tcp.backend.domain.User;
import com.tcp.backend.dto.UserDto;
import com.tcp.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final UserConverter userConverter;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping(value = "")
    public List<UserDto> getAllUsers(){
        logger.info("Get all users");
        return userConverter.convertModelsToDtos(userService.getAll());
    }
}
