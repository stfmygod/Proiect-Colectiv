package com.tcp.backend.service;

import com.tcp.backend.domain.Activity;
import com.tcp.backend.domain.Group;
import com.tcp.backend.domain.User;
import com.tcp.backend.exception.CustomException;
import com.tcp.backend.repository.ActivityRepository;
import com.tcp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;

    public List<Activity> getAll() {
        return activityRepository.findAll();
    }

    public Activity add(Activity activity){
        return activityRepository.save(activity);
    }

    @Transactional
    public Activity update(Activity activity) {
        Activity updatedActivity = activityRepository.findById(activity.getId()).orElseThrow(() -> new CustomException(String.format("There is no activity with id = %d", activity.getId())));
        userRepository.findById(activity.getUser().getId()).orElseThrow(() -> new CustomException(String.format("There is no user with id = %d", activity.getUser().getId())));

        updatedActivity.setUser(activity.getUser());
        updatedActivity.setName(activity.getName());
        updatedActivity.setDescription(activity.getDescription());
        updatedActivity.setDate(activity.getDate());
        updatedActivity.setStartHour(activity.getStartHour());
        updatedActivity.setEndHour(activity.getEndHour());

        return updatedActivity;
    }

    public void delete(Long id) throws Exception {
        try {
            activityRepository.getById(id).getUser().removeActivity(activityRepository.getById(id));
            activityRepository.deleteById(id);
        }
        catch (Exception e) {
            throw new CustomException(String.format("Could not delete the activity with id = %d", id));
        }
    }

    public List<Activity> getAllByDate(LocalDate startDate, LocalDate endDate, Long id) {
        return activityRepository.findAllByUserAndDate(id, startDate, endDate);
    }

    public List<Activity> getGroupByDate(String code, LocalDate startDate, LocalDate endDate){
        return activityRepository.findAllByGroupAndDate(code, startDate, endDate);
    }

    public List<Activity> getGroupActivity(String code){
        return activityRepository.findAllByGroup(code);
    }

}
