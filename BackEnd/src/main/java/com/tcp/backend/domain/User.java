package com.tcp.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@Builder
@Table(name = "users")
public class User extends BaseEntity {
    @Column(unique=true)
    private String email;
    private String username;
    private String password;
    private String firstName;
    private String lastName;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", targetEntity = Activity.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval=true)
    private List<Activity> activities;

    @ManyToMany(cascade = CascadeType.ALL)
    @JsonIgnoreProperties("users")
    @JoinTable(
            name = "users_groups",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id")
    )
    private List<Group> groups;

    public void removeActivity(Activity activity){
        if(this.activities != null){
            activities.remove(activity);
            activity.setUser(null);
        }
    }

    public void removeUser(){
        if(this.groups != null){
            for(Group group : groups) {
                group.getUsers().remove(this);
            }
        }
    }
}
