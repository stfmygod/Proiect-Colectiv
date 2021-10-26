package com.tcp.backend.converter;

import com.tcp.backend.domain.User;
import com.tcp.backend.dto.UserDto;
import org.springframework.stereotype.Component;

@Component
public class UserConverter implements BaseConvertor<UserDto, User> {

    @Override
    public UserDto convertModelToDto(User model) {
        return UserDto.builder()
                .id(model.getId())
                .email(model.getEmail())
                .username(model.getUsername())
                .password(model.getPassword())
                .firstName(model.getFirstName())
                .lastName(model.getLastName())
                .build();
    }

    @Override
    public User convertDtoToModel(UserDto dto) {
        User user = User.builder()
                .email(dto.getEmail())
                .username(dto.getUsername())
                .password(dto.getPassword())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .build();
        user.setId(dto.getId());
        return user;
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> feature/activity
