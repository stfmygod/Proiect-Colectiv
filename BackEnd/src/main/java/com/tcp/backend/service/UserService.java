package com.tcp.backend.service;

import com.tcp.backend.domain.User;
import com.tcp.backend.exception.CustomException;
import com.tcp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> getAll(){
        return userRepository.findAll();
    }

    public User add(User user) {
        return userRepository.save(user);
    }

    @Transactional
    public User update(User user) {
        //WIP
        User updatedUser = userRepository.findById(user.getId()).orElseThrow();
        return updatedUser;
    }

    public void delete(long id) {
        try {
            User user = userRepository.getById(id);
            user.removeUser();
            userRepository.deleteById(id);
        } catch (Exception e) {
            throw new CustomException(String.format("Could not delete the user with id = %d", id));
        }

    }

    public User findById(long id) throws CustomException{
        Optional<User> optional = userRepository.findById(id);

        if (optional.isPresent()) {
            return optional.get();
        } else {
            throw new CustomException(String.format("Could not find the user with id = %d", id));
        }
    }

    public User login(String email, String password) throws CustomException{
        Optional<User> optional = userRepository.findByEmailAndPassword(email, password);

        if (optional.isPresent()) {
            return optional.get();
        }
        throw new CustomException("Email and password combination do not match!");
    }
}
