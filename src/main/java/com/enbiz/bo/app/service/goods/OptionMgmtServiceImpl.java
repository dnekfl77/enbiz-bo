package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.OptionMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.OptionMgmtResponse;
import com.enbiz.bo.app.entity.PrOptnCd;
import com.enbiz.bo.app.entity.PrOptnClssCd;
import com.enbiz.bo.app.enums.PR018;
import com.enbiz.bo.app.repository.goods.PrOptnCdMapper;
import com.enbiz.bo.app.repository.goods.PrOptnCdTrxMapper;
import com.enbiz.bo.app.repository.goods.PrOptnClssCdMapper;
import com.enbiz.bo.app.repository.goods.PrOptnClssCdTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.common.base.exception.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 옵션관리 ServiceImpl
 */
@Service
@Lazy
@Slf4j
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class OptionMgmtServiceImpl implements OptionMgmtService {

    private final PrOptnClssCdMapper prOptnClssCdMapper;
    private final PrOptnClssCdTrxMapper prOptnClssCdTrxMapper;

    private final PrOptnCdMapper prOptnCdMapper;
    private final PrOptnCdTrxMapper prOptnCdTrxMapper;

    @Override
    public int getOptionCategoryListCount(OptionMgmtRequest request) throws Exception {
        return prOptnClssCdMapper.getPrOptnClssCdListCount(request);
    }

    @Override
    public List<OptionMgmtResponse> getOptionCategoryList(OptionMgmtRequest request) throws Exception {
        return prOptnClssCdMapper.getPrOptnClssCdList(request);
    }

    @Override
    public int getOptionListCount(OptionMgmtRequest request) throws Exception {
        return prOptnCdMapper.getPrOptnCdListCount(request);
    }

    @Override
    public List<OptionMgmtResponse> getOptionList(OptionMgmtRequest request) throws Exception {
        return prOptnCdMapper.getPrOptnCdList(request);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveOptionCategoryList(List<PrOptnClssCd> createList, List<PrOptnClssCd> updateList) throws Exception {
        insertPrOptnClssCd(createList);
        updatePrOptnClssCd(updateList);
    }

    private void insertPrOptnClssCd(List<PrOptnClssCd> createList) throws Exception {
        for (PrOptnClssCd prOptnClssCd : createList) {
            validateInsertPrOptnClssCd(prOptnClssCd);
            if (this.getCountOfExistsPrOptnClssCd(prOptnClssCd) > 0 ) {
                throw new ValidationException(MessageResolver.getMessage("optionMgmt.optionCategoryListGrid.alert.msg.duplicatedOptnCatNmMsg"));
            }
            prOptnClssCdTrxMapper.insertPrOptnClssCd(prOptnClssCd);
        }
    }

    private void validateInsertPrOptnClssCd(PrOptnClssCd prOptnClssCd) throws Exception{
        Validator.throwIfEmpty(prOptnClssCd.getOptnCatRegGbCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"등록구분"}));
        Validator.throwIfEmpty(prOptnClssCd.getOptnCatTypCd()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"옵션분류유형"}));
        Validator.throwIfEmpty(prOptnClssCd.getOptnCatNm()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"옵션분류명"}));
        Validator.throwIfEmpty(prOptnClssCd.getSortSeq()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"정렬순서"}));
        Validator.throwIfEmpty(prOptnClssCd.getUseYn()         , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"사용유무"}));
        Validator.throwIfEmpty(prOptnClssCd.getSysRegId()      , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"등록자ID"}));

        if(prOptnClssCd.getOptnCatRegGbCd().equals(PR018.GB_CD_ENTR.getCd())){
            Validator.throwIfEmpty(prOptnClssCd.getEntrNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"협력사명"}));
        }
    }

    public void updatePrOptnClssCd(List<PrOptnClssCd> updateList) throws Exception {
        for (PrOptnClssCd prOptnClssCd : updateList) {
            validateUpdatePrOptnClssCd(prOptnClssCd);
            if (this.getCountOfExistsPrOptnClssCd(prOptnClssCd) > 1 ) {
                throw new ValidationException(MessageResolver.getMessage("optionMgmt.optionCategoryListGrid.alert.msg.duplicatedOptnCatNmMsg"));
            }
            prOptnClssCdTrxMapper.updatePrOptnClssCd(prOptnClssCd);
        }
    }

    private void validateUpdatePrOptnClssCd(PrOptnClssCd prOptnClssCd) throws Exception{
        Validator.throwIfEmpty(prOptnClssCd.getOptnCatRegGbCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"등록구분"}));
        Validator.throwIfEmpty(prOptnClssCd.getOptnCatTypCd()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"옵션분류유형"}));
        Validator.throwIfEmpty(prOptnClssCd.getOptnCatNm()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"옵션분류명"}));
        Validator.throwIfEmpty(prOptnClssCd.getSortSeq()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"정렬순서"}));
        Validator.throwIfEmpty(prOptnClssCd.getUseYn()         , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"사용유무"}));
        Validator.throwIfEmpty(prOptnClssCd.getOptnCatNo()     , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"옵션분류번호"}));
        Validator.throwIfEmpty(prOptnClssCd.getSysModId()      , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"수정자ID"}));

        if(prOptnClssCd.getOptnCatRegGbCd().equals(PR018.GB_CD_ENTR.getCd())){
            Validator.throwIfEmpty(prOptnClssCd.getEntrNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"협력사명"}));
        }
    }

    private int getCountOfExistsPrOptnClssCd(PrOptnClssCd prOptnClssCd) {
        return prOptnClssCdMapper.getCountOfExistsPrOptnClssCd(prOptnClssCd);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveOptionList(List<PrOptnCd> createList, List<PrOptnCd> updateList) throws Exception {
        insertPrOptnCd(createList);
        updatePrOptnCd(updateList);
    }

    private void insertPrOptnCd(List<PrOptnCd> createList) throws Exception {
        for (PrOptnCd prOptnCd : createList) {
            validateInsertPrOptnCd(prOptnCd);
            if (this.getCountOfExistsPrOptnCd(prOptnCd) > 0 ) {
                throw new ValidationException(MessageResolver.getMessage("optionMgmt.optionCategoryListGrid.alert.msg.duplicatedOptnNmMsg"));
            }
            prOptnCdTrxMapper.insertPrOptnCd(prOptnCd);
        }
    }

    private void validateInsertPrOptnCd(PrOptnCd prOptnCd) throws Exception {

        Validator.throwIfEmpty(prOptnCd.getOptnNm()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"옵션명"}));
        Validator.throwIfEmpty(prOptnCd.getSortSeq()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"정렬순서"}));
        Validator.throwIfEmpty(prOptnCd.getUseYn()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"사용여부"}));

        Validator.throwIfEmpty(prOptnCd.getOptnCatNo() , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"옵션분류번호"}));
        Validator.throwIfEmpty(prOptnCd.getSysRegId()  , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"등록자ID"}));
    }

    private void updatePrOptnCd(List<PrOptnCd> updateList) throws Exception {
        for (PrOptnCd prOptnCd : updateList) {
            validateUpdatePrOptnCd(prOptnCd);
            if (this.getCountOfExistsPrOptnCd(prOptnCd) > 1 ) {
                throw new ValidationException(MessageResolver.getMessage("optionMgmt.optionCategoryListGrid.alert.msg.duplicatedOptnNmMsg"));
            }
            prOptnCdTrxMapper.updatePrOptnCd(prOptnCd);
        }
    }

    private void validateUpdatePrOptnCd(PrOptnCd prOptnCd) throws Exception {
        Validator.throwIfEmpty(prOptnCd.getOptnNm()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"옵션명"}));
        Validator.throwIfEmpty(prOptnCd.getSortSeq()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"정렬순서"}));
        Validator.throwIfEmpty(prOptnCd.getUseYn()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"사용여부"}));

        Validator.throwIfEmpty(prOptnCd.getOptnNo() , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"옵션코드"}));
        Validator.throwIfEmpty(prOptnCd.getOptnCatNo() , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"옵션분류번호"}));
        Validator.throwIfEmpty(prOptnCd.getSysRegId()  , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"수정자ID"}));
    }

    private int getCountOfExistsPrOptnCd(PrOptnCd prOptnCd) {
        return prOptnCdMapper.getCountOfExistsPrOptnCd(prOptnCd);
    }
}
