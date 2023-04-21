package com.enbiz.bo.app.service.vendor;

import java.util.List;

import com.enbiz.bo.app.entity.EtDeliPolcBase;

public interface EtDeliPolcBaseService {

    void registCUD(List<EtDeliPolcBase> createEtDeliPolcBaseList,
                            List<EtDeliPolcBase> updateEtDeliPolcBaseList,
                            List<EtDeliPolcBase> deleteEtDeliPolcBaseList) throws Exception;

}
