package com.qheaps.capstone.services;

import com.qheaps.capstone.dtos.CatDto;
import com.qheaps.capstone.dtos.RunInfoDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface CatService {
    // updateCurHp
    @Transactional
    void updateCurHp(CatDto catDto);

    // copyCat haha
    // copyCatById
    @Transactional
    void copyCat(Long catId, RunInfoDto runInfoDto);

    // getCatById
    Optional<CatDto> getCatById(Long id);

    //deleteCatById
    //getAllCats
    List<CatDto> getAllOriginalCats();
}
