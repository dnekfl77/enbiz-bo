package com.enbiz.bo.app.service.goods;

import com.enbiz.bo.app.dto.request.goods.WebStockMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.WebStockMgmtResponse;
import com.enbiz.bo.app.entity.PrItmBase;
import com.enbiz.bo.app.enums.PR008;
import com.enbiz.bo.app.repository.goods.PrGoodsBaseMapper;
import com.enbiz.bo.app.repository.goods.PrItmBaseTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

/**
 * 웹재고관리(위수탁) ServiceImpl
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true )
public class WebStockMgmtServiceImpl implements WebStockMgmtService {

    private final PrGoodsBaseMapper prGoodsBaseMapper;
    private final PrItmBaseTrxMapper prItmBaseTrxMapper;

    @Override
    public int getWebStockListCount(WebStockMgmtRequest request) throws Exception {
        request.setDeliProcTypCd(PR008.CORP_DLV.getCd()); // 배송처리유형 : 업체배송
        return prGoodsBaseMapper.getWebStockListCount(request);
    }

    @Override
    public List<WebStockMgmtResponse> getWebStockList(WebStockMgmtRequest request) throws Exception {
        return prGoodsBaseMapper.getWebStockList(request);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void modifyWebStockList(List<PrItmBase> updateList) throws Exception {
        for(PrItmBase item : updateList){
            prItmBaseTrxMapper.updatePrItemStkQty(validateItmBase(item));
        }
    }

    private PrItmBase validateItmBase(PrItmBase prItmBase){

        Validator.throwIfEmpty(prItmBase.getStkQty()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"재고수량"}));
        Validator.throwIfLongerThan(String.valueOf(prItmBase.getStkQty()),10, MessageResolver.getMessage("webStockMgmt.alert.msg.maxStkQtyMsg"));

        Validator.throwIfEmpty(prItmBase.getGoodsNo()   , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"상품번호 확인불가"}));
        Validator.throwIfEmpty(prItmBase.getItmNo()     , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"단품번호 확인불가"}));
        Validator.throwIfEmpty(prItmBase.getSysModId()  , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"수정자ID 확인불가"}));

        return prItmBase;
    }

}
