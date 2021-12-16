package com.tcp.backend.repository;

import com.tcp.backend.domain.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    @Query("select g from Group g where g.code=?1")
    Optional<Group> findByCode(String code);
}
