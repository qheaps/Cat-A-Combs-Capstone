package com.qheaps.capstone.repositories;

import com.qheaps.capstone.entities.RunInfo;
import com.qheaps.capstone.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RunInfoRepo extends JpaRepository<RunInfo, Long> {
    Optional<RunInfo> findAllRunInfoByUser(User user);
}
