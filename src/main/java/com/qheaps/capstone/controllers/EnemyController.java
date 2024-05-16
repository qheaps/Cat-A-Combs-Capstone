package com.qheaps.capstone.controllers;

import com.qheaps.capstone.dtos.EnemyDto;
import com.qheaps.capstone.services.EnemyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cat-a-combs/enemy")
public class EnemyController {
    @Autowired
    private EnemyService enemyService;

    @GetMapping("/getenemy/{id}")
    public Optional<EnemyDto> getEnemyById(@PathVariable Long id) {
        return enemyService.getEnemyById(id);
    }

    @GetMapping("/enemythreat/{threat}")
    public List<EnemyDto> getEnemyByThreat(@PathVariable Integer threat) {
        return enemyService.getAllEnemyByThreat(threat);
    }
}
