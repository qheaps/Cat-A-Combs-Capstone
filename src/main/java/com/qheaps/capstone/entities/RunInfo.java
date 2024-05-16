package com.qheaps.capstone.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.qheaps.capstone.dtos.RunInfoDto;
import lombok.*;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Run_info")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RunInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JsonBackReference
    @ToString.Exclude
    private User user;

    @Column
    private Integer level;

    @OneToMany(mappedBy = "run", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonManagedReference
    @EqualsAndHashCode.Exclude
    private Set<Cat> party = new HashSet<>();

    public RunInfo(RunInfoDto runInfoDto) {
        if (runInfoDto.getLevel() != null) {
            this.level = runInfoDto.getLevel();
        }
        if (runInfoDto.getUser() != null) {
            this.user = runInfoDto.getUser();
        }
        if (runInfoDto.getParty() != null) {
            this.party = runInfoDto.getParty();
        }
    }
}
