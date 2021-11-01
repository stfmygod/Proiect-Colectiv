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
        Group updatedGroupList = groupRepository.findById(group.getId()).orElseThrow();
        return updatedGroupList;
    }

    public void delete(long id){
        try{
            Group group = groupRepository.getById(id);
            group.removeGroup();
            groupRepository.deleteById(id);
        } catch(Exception e){
            throw new CustomException(String.format("Could not delete the group with id = %d", id));
        }
    }

}
