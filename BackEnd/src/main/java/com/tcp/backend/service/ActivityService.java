package com.tcp.backend.service;

import com.tcp.backend.domain.Activity;
import com.tcp.backend.domain.User;
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

    public List<Activity> getAll(){
        return activityRepository.findAll();
    }


    public Activity add(Activity activity){
        return activityRepository.save(activity);
    }

    public void delete(Long id) throws Exception {
        try {
            activityRepository.getById(id).getUser().removeActivity(activityRepository.getById(id));
            activityRepository.deleteById(id);
        }
        catch (Exception e)
        {
            throw new Exception("Could not delete the activity with id:" + id);
        }
    }

    public List<Activity> getAllByDate(LocalDate date)
    {
        return activityRepository.findAllByDate(date);
    }

}
