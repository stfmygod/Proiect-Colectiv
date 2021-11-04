package com.tcp.backend.repository;

import com.tcp.backend.domain.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    @Query("select a from Activity a where a.user.id = ?1 and a.date >= ?2 and a.date <= ?3")
    List<Activity> findAllByUserAndDate(Long id, LocalDate startDate, LocalDate endDate);
}
