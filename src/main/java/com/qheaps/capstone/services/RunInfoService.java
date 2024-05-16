package com.qheaps.capstone.services;

import com.qheaps.capstone.dtos.RunInfoDto;
import com.qheaps.capstone.entities.RunInfo;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface RunInfoService {
    @Transactional
    void updateLevel(RunInfoDto runInfoDto, Integer level);

    //Run on user login
    @Transactional
    void createRunInfo(Long userId);

    //getRunInfoByUser
    Optional<RunInfoDto> getRunInfoByUser(Long userId);
}
