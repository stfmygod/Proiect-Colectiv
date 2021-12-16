package com.tcp.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@Builder
@Table(name = "groups")
public class Group extends BaseEntity {
    private String name;
    private String code;
    @JsonIgnoreProperties("groups")
    @ManyToMany(mappedBy = "groups")
    private List<User> users = new ArrayList<>();

    public void removeGroup(){
        if(this.users != null) {
            for (User user: users)
                user.getGroups().remove(this);
        }
    }
}
