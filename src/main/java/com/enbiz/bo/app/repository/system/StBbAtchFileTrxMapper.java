package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StBbAtchFile;

@Repository
@Lazy
public interface StBbAtchFileTrxMapper {
    int insertStBbAtchFile(StBbAtchFile stBbAtchFile);

    int deleteStBbAtchFile(StBbAtchFile stBbAtchFile);
}
