package com.tcp.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="activities")
public class Activity extends BaseEntity {
    @ManyToOne
    @JoinColumn(name="user_id")
//    @JsonIgnoreProperties("activities")
    @JsonBackReference
    private User user;
    private String name;
    private String description;
    private LocalDate date;
    private LocalTime startHour;
    private LocalTime endHour;
}
