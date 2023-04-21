package com.enbiz.bo.app.service.vendor;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.constant.Constants;
import com.enbiz.bo.app.entity.EtDeliPolcBase;
import com.enbiz.bo.app.repository.vendor.EtDeliPolcBaseTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class EtDeliPolcBaseServiceImpl implements EtDeliPolcBaseService {

    private final EtDeliPolcBaseTrxMapper etDeliPolcBaseTrxMapper;

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void registCUD(List<EtDeliPolcBase> createEtDeliPolcBaseList,
                                   List<EtDeliPolcBase> updateEtDeliPolcBaseList,
                                   List<EtDeliPolcBase> deleteEtDeliPolcBaseList) throws Exception {

        for (EtDeliPolcBase etDeliPolcBase : createEtDeliPolcBaseList) {
            etDeliPolcBaseValidator(etDeliPolcBase);
            etDeliPolcBaseTrxMapper.insertEtDeliPolcBaseTrx(etDeliPolcBase);
        }

        for (EtDeliPolcBase etDeliPolcBase : updateEtDeliPolcBaseList) {
            etDeliPolcBaseValidator(etDeliPolcBase);
            etDeliPolcBaseTrxMapper.updateEtDeliPolcBaseTrx(etDeliPolcBase);
        }

        for (EtDeliPolcBase etDeliPolcBase : deleteEtDeliPolcBaseList) {
            Validator.throwIfEmpty(etDeliPolcBase.getEntrNo()
                    , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                            , new String[] {"entrNo"}));
            Validator.throwIfEmpty(etDeliPolcBase.getDeliPolcNo()
                    , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                            , new String[] {"deliPolcNo"}));

            etDeliPolcBaseTrxMapper.deleteEtDeliPolcBaseTrx(etDeliPolcBase);
        }

    }

    private void etDeliPolcBaseValidator(EtDeliPolcBase etDeliPolcBase) {
        Validator.throwIfEmpty(etDeliPolcBase.getEntrNo()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"entrNo"}));

        Validator.throwIfEmpty(etDeliPolcBase.getDlexAmt()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"dlexAmt"}));
        
        Validator.throwIfEmpty(etDeliPolcBase.getDlexTypCd()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"dlexTypCd"}));

        Validator.throwIfEmpty(etDeliPolcBase.getStdAmt()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"StdAmt"}));

        Validator.throwIfEmpty(etDeliPolcBase.getFerryRgnDlexAmt()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"ferryRgnDlexAmt"}));

        Validator.throwIfEmpty(etDeliPolcBase.getJejuDlex()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"jejuDlex"}));

        Validator.throwIfEmpty(etDeliPolcBase.getJejuFerryRgnDlexAmt()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"jejuFerryRgnDlexAmt"}));
        
        Validator.throwIfEmpty(etDeliPolcBase.getUseYn()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"useYn"}));
        
    }

}
