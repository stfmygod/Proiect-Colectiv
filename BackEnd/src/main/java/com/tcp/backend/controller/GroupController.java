package com.tcp.backend.controller;

import com.tcp.backend.converter.GroupConverter;
import com.tcp.backend.domain.Group;
import com.tcp.backend.dto.GroupDto;
import com.tcp.backend.exception.CustomException;
import com.tcp.backend.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RequestMapping("/api/groups")
public class GroupController {
    private final GroupService groupService;
    private final GroupConverter groupConverter;

    private static final Logger LOGGER = LoggerFactory.getLogger(GroupController.class);

    @GetMapping(value = "/all")
    public ResponseEntity<List<GroupDto>> getAllGroups(){
        LOGGER.info("Get all groups");
        return new ResponseEntity<>(
                groupConverter.convertModelsToDtos(groupService.getAll()),
                HttpStatus.OK
        );
    }

    @PostMapping(value = "")
    public ResponseEntity<GroupDto> addGroup(@RequestBody GroupDto groupDto){
        LOGGER.info("Group entrance method");

        Group group = groupConverter.convertDtoToModel(groupDto);
        group = groupService.add(group);
        groupDto = groupConverter.convertModelToDto(group);

        return new ResponseEntity<>(
                groupDto,
                HttpStatus.OK
        );
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteGroup(@PathVariable Long id){
        LOGGER.info("Delete group");

        try{
            groupService.delete(id);
        }  catch(CustomException e){
            LOGGER.error(e.getMessage());
            return new ResponseEntity<>(
                    e.getMessage(),
                    HttpStatus.BAD_REQUEST
            );
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
