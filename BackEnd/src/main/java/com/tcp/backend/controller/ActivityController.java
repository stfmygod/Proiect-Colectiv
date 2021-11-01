package com.tcp.backend.controller;

import com.tcp.backend.converter.ActivityConverter;
import com.tcp.backend.domain.Activity;
import com.tcp.backend.dto.ActivityDto;
import com.tcp.backend.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/activities")
public class ActivityController {
    private final ActivityService activityService;
    private final ActivityConverter activityConverter;

    private static final Logger LOGGER = LoggerFactory.getLogger(ActivityController.class);

    @GetMapping(value = "/all")
    public ResponseEntity<List<ActivityDto>> getAllActivities(){
        LOGGER.info("Get all activities.");
        return new ResponseEntity<>(
                activityConverter.convertModelsToDtos(activityService.getAll()),
                HttpStatus.OK
        );
    }

    @GetMapping(value = "/{date}")
    public ResponseEntity<List<ActivityDto>> getAllActivitiesByDate(@PathVariable String date){
        LOGGER.info("Get all activities by date.");
        LocalDate localDate = LocalDate.parse(date);
        return new ResponseEntity<>(
                activityConverter.convertModelsToDtos(activityService.getAllByDate(localDate)),
                HttpStatus.OK
        );
    }

    @PostMapping(value = "")
    public ResponseEntity<ActivityDto> addUser(@RequestBody ActivityDto activityDto)
    {
        LOGGER.info("Adding activity.");
        LOGGER.info(activityDto.getUserId().toString());
        Activity activity = activityConverter.convertDtoToModel(activityDto);
        return new ResponseEntity<>(
                activityConverter.convertModelToDto(activityService.add(activity)),
                HttpStatus.OK
        );
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteActivity(@PathVariable Long id)
    {
        LOGGER.info("Deleting activity.");
        try{
            activityService.delete(id);
        } catch (Exception e) {
            LOGGER.info(e.getMessage());
            return new ResponseEntity<>(
                    e.getMessage(),
                    HttpStatus.BAD_REQUEST
            );
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
