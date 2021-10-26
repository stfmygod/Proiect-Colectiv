package com.tcp.backend.controller;

import com.tcp.backend.converter.UserConverter;
import com.tcp.backend.domain.User;
import com.tcp.backend.dto.UserDto;
import com.tcp.backend.exception.CustomException;
import com.tcp.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final UserConverter userConverter;

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @GetMapping(value = "/all")
    public ResponseEntity<List<User>> getAllUsers() {
        LOGGER.info("Get all users");
        return new ResponseEntity<>(
//                userConverter.convertModelsToDtos(userService.getAll()),
                userService.getAll(),
                HttpStatus.OK
                );
    }

    @PostMapping(value = "")
    public ResponseEntity<UserDto> addUser(@RequestBody UserDto userDto) {
        LOGGER.info("Register method");

        User user = userConverter.convertDtoToModel(userDto);
        user = userService.add(user);
        userDto = userConverter.convertModelToDto(user);

        return new ResponseEntity<>(
                userDto,
                HttpStatus.OK
        );
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        LOGGER.info("Delete method");

        try {
            userService.delete(id);
        } catch (CustomException e) {
            LOGGER.error(e.getMessage());
            return new ResponseEntity<>(
                    e.getMessage(),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "")
    public ResponseEntity<?> login(@RequestParam String email,
                                      @RequestParam String password) {
        try {
            User user = userService.login(email, password);
            UserDto userDto = userConverter.convertModelToDto(user);

            return new ResponseEntity<>(
                    userDto,
                    HttpStatus.OK
            );
        } catch (CustomException e) {
            LOGGER.error(e.getMessage());
            return new ResponseEntity<>(
                    e.getMessage(),
                    HttpStatus.NOT_FOUND
            );
        }
    }
}
