package com.tcp.backend.converter;

import com.tcp.backend.domain.Activity;
import com.tcp.backend.dto.ActivityDto;
import com.tcp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ActivityConverter implements BaseConvertor<ActivityDto, Activity> {

    private final UserRepository userRepository;

    @Override
    public ActivityDto convertModelToDto(Activity model) {
        return ActivityDto.builder()
                .id(model.getId())
                .userId(model.getUser().getId())
                .name(model.getName())
                .description((model.getDescription()))
                .date(model.getDate())
                .startHour(model.getStartHour())
                .endHour(model.getEndHour())
                .build();
    }

    @Override
    public Activity convertDtoToModel(ActivityDto dto) {
        Activity activity = Activity.builder()
                .user(userRepository.getById(dto.getUserId()))
                .name(dto.getName())
                .description(dto.getDescription())
                .date(dto.getDate())
                .startHour(dto.getStartHour())
                .endHour(dto.getEndHour())
                .build();
        activity.setId(dto.getId());
        return activity;
    }
}