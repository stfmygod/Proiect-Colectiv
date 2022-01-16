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

    @Query("select a from Activity a where exists(select g from a.user.groups g where g.code = ?1) and a.date >= ?2 and a.date <= ?3")
    List<Activity> findAllByGroupAndDate(String code, LocalDate startDate, LocalDate endDate);

    @Query("select a from Activity a where exists(select g from a.user.groups g where g.code = ?1)")
    List<Activity> findAllByGroup(String code);

    @Query("select a from Activity  a where a.user.id = ?1")
    List<Activity> findAllByUserId(Long id);
}
