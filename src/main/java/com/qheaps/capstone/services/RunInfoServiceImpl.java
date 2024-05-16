package com.qheaps.capstone.services;

import com.qheaps.capstone.dtos.RunInfoDto;
import com.qheaps.capstone.entities.RunInfo;
import com.qheaps.capstone.entities.User;
import com.qheaps.capstone.repositories.RunInfoRepo;
import com.qheaps.capstone.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class RunInfoServiceImpl implements RunInfoService {
    @Autowired
    private RunInfoRepo runInfoRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    @Transactional
    public void updateLevel(RunInfoDto runInfoDto, Integer level) {
        Optional<RunInfo> runInfoOptional = runInfoRepo.findById(runInfoDto.getId());
        if (runInfoOptional.isPresent()) {
            //flagged
            runInfoOptional.get().setLevel(level);
            runInfoRepo.saveAndFlush(runInfoOptional.get());
            System.out.println("Level updated");
        }
    }

    //Run on user login
    @Override
    @Transactional
    public void createRunInfo(Long userId) {
        Optional<User> userOptional = userRepo.findById(userId);
        if (userOptional.isPresent()) {
            RunInfoDto runInfoDto = new RunInfoDto();
            runInfoDto.setLevel(1);
            RunInfo runInfo = new RunInfo(runInfoDto);
            userOptional.ifPresent(runInfo::setUser);

            runInfoRepo.saveAndFlush(runInfo);
            System.out.println("run info created");
        } else {
            System.out.println("run info creation failed");
        }
    }

    //getRunInfoByUser
    //potential issue with null printing, it just works
    //recursive toString stack overflow
    @Override
    public Optional<RunInfoDto> getRunInfoByUser(Long userId) {
        Optional<User> userOptional= userRepo.findById(userId);
        if (userOptional.isPresent()) {
            System.out.println("run info found");
            Optional<RunInfo> runInfo = runInfoRepo.findAllRunInfoByUser(userOptional.get());
            if (runInfo.isPresent()) {
                System.out.println("run info exists");
//                System.out.println(runInfoRepo.findAllRunInfoByUser(userOptional.get()));
            } else {
                System.out.println("shit fucked bruh");
            }
//            System.out.println(Optional.of(new RunInfoDto(runInfo.get())));
            return Optional.of(new RunInfoDto(runInfo.get()));
        } else {
            System.out.println("run info not found");
            return Optional.empty();
        }
    }

    //deletePartyById
}
