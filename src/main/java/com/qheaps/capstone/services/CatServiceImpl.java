package com.qheaps.capstone.services;

import com.qheaps.capstone.dtos.CatDto;
import com.qheaps.capstone.dtos.RunInfoDto;
import com.qheaps.capstone.entities.Cat;
import com.qheaps.capstone.entities.RunInfo;
import com.qheaps.capstone.repositories.CatRepo;
import com.qheaps.capstone.repositories.RunInfoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CatServiceImpl implements CatService {
    @Autowired
    private CatRepo catRepo;

    @Autowired
    private RunInfoRepo runInfoRepo;

    // updateCurHp
    @Override
    @Transactional
    public void updateCurHp(CatDto catDto) {
        Optional<Cat> catOptional = catRepo.findById(catDto.getId());
        catOptional.ifPresent(cat -> {
            cat.setCurHp(catDto.getCurHp());
            catRepo.saveAndFlush(cat);
        });
        System.out.println(catDto);
        System.out.println("cat hp updated");
    }

    // copyCat haha
    // copyCatById
    @Override
    @Transactional
    public void copyCat(Long catId, RunInfoDto runInfoDto) {
        Optional<Cat> catOptional = catRepo.findById(catId);
        if (catOptional.isPresent()) {
           CatDto catDto = new CatDto(catOptional.get());
           catDto.setOriginal(false);
           Cat cat = new Cat(catDto);
           //adding cat to run
           Optional<RunInfo> runInfoOptional = runInfoRepo.findById(runInfoDto.getId());
           runInfoOptional.ifPresent(cat::setRun);
           catRepo.saveAndFlush(cat);
           System.out.println("cat copied");
//            System.out.println(cat);
        } else {
            System.out.println("copy cat failed");
        }
    }

    // getCatById
    @Override
    public Optional<CatDto> getCatById(Long id) {
        Optional<Cat> catOptional = catRepo.findById(id);
        return catOptional.map(CatDto::new);
    }

    //deleteCatById
    //getAllCats
    @Override
    public List<CatDto> getAllOriginalCats() {
        List<Cat> catList = catRepo.findAll();
        List<Cat> originalCats = new ArrayList<>();
        for (Cat cat : catList) {
            if (cat.isOriginal()) {
                originalCats.add(cat);
            }
        }
        return originalCats.stream().map(CatDto::new).collect(Collectors.toList());
    }
}
