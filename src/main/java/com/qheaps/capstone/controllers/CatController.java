package com.qheaps.capstone.controllers;

import com.qheaps.capstone.dtos.CatDto;
import com.qheaps.capstone.dtos.RunInfoDto;
import com.qheaps.capstone.services.CatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cat-a-combs/cats")
public class CatController {
    @Autowired
    private CatService catService;

    @PutMapping("/update")
    public void updateCatHp(@RequestBody CatDto catDto) {
        catService.updateCurHp(catDto);
    }

    @PostMapping("/copycat/{catId}")
    public void copyCatById(@PathVariable Long catId, @RequestBody RunInfoDto runInfoDto) {
        catService.copyCat(catId, runInfoDto);
    }

    @GetMapping("/getcat/{catId}")
    public Optional<CatDto> getCatById(@PathVariable Long catId) {
        return catService.getCatById(catId);
    }

    @GetMapping("/getoriginalcats")
    public List<CatDto> getAllOriginalCats() {
        return catService.getAllOriginalCats();
    }
}
