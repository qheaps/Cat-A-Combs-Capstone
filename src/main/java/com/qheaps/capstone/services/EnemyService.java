package com.qheaps.capstone.services;

import com.qheaps.capstone.dtos.EnemyDto;

import java.util.List;
import java.util.Optional;

public interface EnemyService {
    // getEnemyById
    Optional<EnemyDto> getEnemyById(Long id);

    List<EnemyDto> getAllEnemyByThreat(Integer threat);
}
