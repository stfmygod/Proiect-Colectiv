package com.tcp.backend.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name="activities")
public class Activity extends BaseEntity {
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    private String name;
    private String description;
    private LocalDate date;
    private LocalTime startHour;
    private LocalTime endHour;
}
