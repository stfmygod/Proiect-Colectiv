package com.tcp.backend.service;

import com.tcp.backend.domain.Group;
import com.tcp.backend.exception.CustomException;
import com.tcp.backend.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupService {
    private final GroupRepository groupRepository;

    public List<Group> getAll(){
        return groupRepository.findAll();
    }

    public Group add(Group group){
        return groupRepository.save(group);
    }

    @Transactional
    public Group update(Group group){
        Group updatedGroup = groupRepository.findById(group.getId()).orElseThrow(() -> new CustomException(String.format("There is no group with id = %d", group.getId())));
        updatedGroup.setName(group.getName());
        updatedGroup.setCode(group.getCode());
        return updatedGroup;
    }

    public void delete(Long id){
        try{
            Group group = groupRepository.getById(id);
            group.removeGroup();
            groupRepository.deleteById(id);
        } catch(Exception e){
            throw new CustomException(String.format("Could not delete the group with id = %d", id));
        }
    }
}
