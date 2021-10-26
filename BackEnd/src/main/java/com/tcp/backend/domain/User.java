package com.tcp.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@Table(name = "users")
public class User extends BaseEntity {
    private String email;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
//    @JsonIgnoreProperties("user")
    @JsonManagedReference
    @OneToMany(mappedBy = "user", targetEntity = Activity.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval=true)
    private List<Activity> activities;
    @ManyToMany
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
}
