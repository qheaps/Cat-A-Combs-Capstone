package com.qheaps.capstone.services;

import com.qheaps.capstone.dtos.EnemyDto;
import com.qheaps.capstone.entities.Enemy;
import com.qheaps.capstone.repositories.EnemyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EnemyServiceImpl implements EnemyService {

    @Autowired
    EnemyRepo enemyRepo;
    // getEnemyById
    @Override
    public Optional<EnemyDto> getEnemyById(Long id) {
        Optional<Enemy> enemyOptional = enemyRepo.findById(id);
        if (enemyOptional.isPresent()) {
            System.out.println("enemy found");
            return Optional.of(new EnemyDto(enemyOptional.get()));
        } else {
            System.out.println("no enemy with id found");
            return Optional.empty();
        }
    }

    @Override
    public List<EnemyDto> getAllEnemyByThreat(Integer threat) {
        List<Enemy> enemyList = enemyRepo.findAll();
        List<Enemy> enemyThreatList = new ArrayList<>();
        for (Enemy enemy : enemyList) {
            if (Objects.equals(enemy.getThreat(), threat)) {
                enemyThreatList.add(enemy);
            }
        }
        return enemyThreatList.stream().map(EnemyDto::new).collect(Collectors.toList());
    }

}
