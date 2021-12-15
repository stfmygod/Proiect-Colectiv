package com.tcp.backend.controller;

import com.tcp.backend.converter.GroupConverter;
import com.tcp.backend.converter.UserConverter;
import com.tcp.backend.domain.User;
import com.tcp.backend.dto.GroupDto;
import com.tcp.backend.dto.UserDto;
import com.tcp.backend.exception.CustomException;
import com.tcp.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final UserConverter userConverter;
    private final GroupConverter groupConverter;

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @GetMapping(value = "/all")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        LOGGER.info("Get all users");
        return new ResponseEntity<>(
                userConverter.convertModelsToDtos(userService.getAll()),
                HttpStatus.OK
                );
    }

    @PostMapping(value = "")
    public ResponseEntity<UserDto> addUser(@RequestBody UserDto userDto) {
        LOGGER.info("Register method");

        User user = userService.add(userConverter.convertDtoToModel(userDto));

        return new ResponseEntity<>(
                userConverter.convertModelToDto(user),
                HttpStatus.OK
        );
    }

    @PatchMapping()
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto) {
        LOGGER.info("Update method");

        User user = userService.update(userConverter.convertDtoToModel(userDto));

        return new ResponseEntity<>(
                userConverter.convertModelToDto(user),
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

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        LOGGER.info("FindById method");
        try {
            User user = userService.findById(id);
            UserDto userDto = userConverter.convertModelToDto(user);

            return new ResponseEntity<>(
                    userDto,
                    HttpStatus.OK
            );
        } catch (CustomException e) {
            return new ResponseEntity<>(
                    e.getMessage(),
                    HttpStatus.BAD_REQUEST);
        }
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

    @PutMapping(value = "/add-group/{id}")
    public ResponseEntity<?> addUserInGroup(@RequestBody Long userId, @PathVariable Long id) {
        LOGGER.info("Add user in group");

        try {
            User user = userService.addGroup(userId, id);
            return new ResponseEntity<>(
                    userConverter.convertModelToDto(user),
                    HttpStatus.OK
            );
        } catch (CustomException e) {
            LOGGER.error(e.getMessage());
            return new ResponseEntity<>(
                    e.getMessage(),
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    @GetMapping(value = "/groups/{id}")
    public ResponseEntity<List<GroupDto>> getGroupsOfUser(@PathVariable Long id) {
        LOGGER.info("Get groups of user");

        return new ResponseEntity<>(
                groupConverter.convertModelsToDtos(userService.getGroups(id)),
                HttpStatus.OK
        );
    }
}
