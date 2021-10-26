package com.tcp.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

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
    @JsonIgnoreProperties("groups")
    @ManyToMany(mappedBy = "groups")
    private List<User> users;
}
