package com.qheaps.capstone.services;

import com.qheaps.capstone.repositories.ItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemServiceImpl {

    //other repos likely required
    @Autowired
    private ItemRepo itemRepo;

}
