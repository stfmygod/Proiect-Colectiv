package com.tcp.backend.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@Table(name = "groups")
public class Group extends BaseEntity {
    private String name;
    private String code;
    @ManyToMany(mappedBy = "groups")
    private List<User> users;
}
