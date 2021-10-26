package com.tcp.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@Table(name = "groups")
public class Group extends BaseEntity {
    private String name;
    private String code;
    @JsonIgnoreProperties("groups")
    @ManyToMany(mappedBy = "groups")
    private List<User> users;
}
