package com.tcp.backend.service;

import com.tcp.backend.domain.Group;
import com.tcp.backend.domain.User;
import com.tcp.backend.exception.CustomException;
import com.tcp.backend.repository.GroupRepository;
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
    private final GroupRepository groupRepository;
    private final GroupService groupService;

    public List<User> getAll(){
        return userRepository.findAll();
    }

    public User add(User user) {
        return userRepository.save(user);
    }

    @Transactional
    public User update(User user) {
        User updatedUser = userRepository.findById(user.getId()).orElseThrow(() -> new CustomException(String.format("There is no user with id = %d", user.getId())));
        updatedUser.setEmail(user.getEmail());
        updatedUser.setUsername(user.getUsername());
        updatedUser.setPassword(user.getPassword());
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());

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

    public User addGroup(Long userId, Long groupId, String code) {
        Group group;
        if (code.equals("null")) {
            group = groupRepository.findById(groupId).orElseThrow(() -> new CustomException(String.format("There is no group with id = %d", groupId)));
        } else {
            group = groupRepository.findByCode(code).orElseThrow(() -> new CustomException(String.format("There is no group with code = %s", code)));
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(String.format("There is no user with id = %d", userId)));

        if(user.getGroups().contains(group)) {
            throw new CustomException(String.format("There is already a group with id = %d", groupId));
        }
        user.getGroups().add(group);
        group.getUsers().add(user);
        update(user);
        groupService.update(group);
        return user;
    }

    public void removeUserFromGroup(Long userId, Long groupId) {
        Group group = groupRepository.findById(groupId).orElseThrow(() -> new CustomException(String.format("There is no group with id = %d", groupId)));
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(String.format("There is no user with id = %d", userId)));
        if (!user.getGroups().contains(group)) {
            throw new CustomException(String.format("There is no group with id = %d, for this user.", groupId));
        }
        user.getGroups().remove(group);
        group.getUsers().remove(user);
        update(user);
        groupService.update(group);
    }

    public List<Group> getGroups(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(String.format("There is no user with id = %d", userId)));
        return user.getGroups();
    }
}
