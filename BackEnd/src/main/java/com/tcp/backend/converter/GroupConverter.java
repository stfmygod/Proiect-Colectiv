package com.tcp.backend.converter;

import com.tcp.backend.domain.Group;
import com.tcp.backend.dto.GroupDto;
import org.springframework.stereotype.Component;

@Component
public class GroupConverter implements BaseConvertor<GroupDto, Group> {

    @Override
    public GroupDto convertModelToDto(Group model) {
        return GroupDto.builder()
                .id(model.getId())
                .name(model.getName())
                .code(model.getCode())
                .build();
    }

    @Override
    public Group convertDtoToModel(GroupDto dto) {
        Group group = Group.builder()
                .name(dto.getName())
                .code(dto.getCode())
                .build();
        group.setId(dto.getId());
        return group;
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> feature/activity
