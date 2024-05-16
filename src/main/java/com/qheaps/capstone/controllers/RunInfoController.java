package com.qheaps.capstone.controllers;

import com.qheaps.capstone.dtos.RunInfoDto;
import com.qheaps.capstone.services.RunInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/cat-a-combs/run")
public class RunInfoController {
    @Autowired
    private RunInfoService runInfoService;

    @PostMapping("/create/{userId}")
    public void createRunInfo(@PathVariable Long userId) {
        runInfoService.createRunInfo(userId);
    }

    @PutMapping("/update/{level}")
    public void updateLevel(@RequestBody RunInfoDto runInfoDto, @PathVariable Integer level) {
        runInfoService.updateLevel(runInfoDto, level);
    }

    @GetMapping("/info/{userId}")
    public Optional<RunInfoDto> getRunInfoByUser(@PathVariable Long userId) {
        return runInfoService.getRunInfoByUser(userId);
    }

}
