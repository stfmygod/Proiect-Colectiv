package com.tcp.backend.domain;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@Table(name = "users")
public class User extends BaseEntity {
    private String email;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    @OneToMany(mappedBy = "user")
    private List<Activity> activities;
    @ManyToMany
    @JoinTable(
            name = "users_groups",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id")
    )
    private List<Group> groups;
}
