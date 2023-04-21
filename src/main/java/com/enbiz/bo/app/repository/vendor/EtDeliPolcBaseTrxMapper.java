package com.enbiz.bo.app.repository.vendor;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.EtDeliPolcBase;

@Repository
@Lazy
public interface EtDeliPolcBaseTrxMapper {

    void insertEtDeliPolcBaseTrx(EtDeliPolcBase etDeliPolcBase);

    void updateEtDeliPolcBaseTrx(EtDeliPolcBase etDeliPolcBase);

    void deleteEtDeliPolcBaseTrx(EtDeliPolcBase etDeliPolcBase);
}
