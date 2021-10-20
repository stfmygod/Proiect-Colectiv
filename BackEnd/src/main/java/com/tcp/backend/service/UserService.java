package com.tcp.backend.service;

import com.tcp.backend.domain.User;
import com.tcp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repo;

    public List<User> getAll(){
        return repo.findAll();
    }
}
