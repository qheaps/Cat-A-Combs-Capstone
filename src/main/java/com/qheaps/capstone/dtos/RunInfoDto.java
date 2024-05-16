package com.qheaps.capstone.dtos;

import com.qheaps.capstone.entities.Cat;
import com.qheaps.capstone.entities.RunInfo;
import com.qheaps.capstone.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RunInfoDto implements Serializable {
    private Long id;
    private Integer level;

    private User user;
    private Set<Cat> party = new HashSet<>();

    public RunInfoDto(RunInfo runInfo) {
        if (runInfo.getId() != null) {
            this.id = runInfo.getId();
        }
        if (runInfo.getLevel() != null) {
            this.level = runInfo.getLevel();
        }
        if (runInfo.getUser() != null) {
            this.user = runInfo.getUser();
        }
        if (runInfo.getParty() != null) {
            this.party = runInfo.getParty();
        }
    }
}
