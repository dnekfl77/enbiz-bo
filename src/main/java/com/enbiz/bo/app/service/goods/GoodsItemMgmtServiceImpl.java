package com.enbiz.bo.app.service.goods;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.goods.GoodsItemMgmtRequest;
import com.enbiz.bo.app.dto.request.goods.GoodsItemMgmtSaveRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsItemMgmtResponse;
import com.enbiz.bo.app.dto.response.goods.GoodsItemSaleStatusResponse;
import com.enbiz.bo.app.entity.PrGoodsBase;
import com.enbiz.bo.app.entity.PrGoodsBaseModLog;
import com.enbiz.bo.app.entity.PrItmBase;
import com.enbiz.bo.app.entity.PrItmSaleStatHist;
import com.enbiz.bo.app.enums.PR005;
import com.enbiz.bo.app.enums.PR020;
import com.enbiz.bo.app.enums.PR032;
import com.enbiz.bo.app.repository.goods.*;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.exception.ValidationException;

import lombok.RequiredArgsConstructor;

/**
 * 단품관리 ServiceImpl
 */
@Service
@Lazy
@Slf4j
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class GoodsItemMgmtServiceImpl implements GoodsItemMgmtService {

    private final PrGoodsBaseTrxMapper prGoodsBaseTrxMapper;
    private final PrItmBaseMapper prItmBaseMapper;
    private final PrItmBaseTrxMapper prItmBaseTrxMapper;
    private final PrItmSaleStatHistTrxMapper prItmSaleStatHistTrxMapper;
    private final PrGoodsBaseModLogTrxMapper prGoodsBaseModLogTrxMapper;

    @Override
    public List<GoodsItemMgmtResponse> getGoodsItemList(GoodsItemMgmtRequest request) throws Exception {
        request.setHistoryDtm("29991231235959");
        return prItmBaseMapper.getGoodsItemList(request);
    }

    @Override
    public int getGoodsItemListCount(GoodsItemMgmtRequest request) throws Exception {
        request.setHistoryDtm("29991231235959");
        return prItmBaseMapper.getGoodsItemListCount(request);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveGoodsItemList(List<GoodsItemMgmtSaveRequest> updateList) throws Exception {
        List<String> goodsNoList = new ArrayList<>();
        for(GoodsItemMgmtSaveRequest goodsItem : updateList){

            // 단품판매상태가 품절일 경우, 품절 사유 코드 추가
            if(PR005.SOLD_OUT.isEquals(goodsItem.getItmSaleStatCd())){
                goodsItem.setSoutCausCd(PR032.MANAGER.getCd());
            }else{
                goodsItem.setSoutCausCd(null);
            }

            PrItmBase prItmBase = new PrItmBase();
            BeanUtils.copyProperties(prItmBase, goodsItem);

            // 단품 판매상태( 10 : 판매중 , 20 : 품절 , 30 : 일시중단 , 40 : 판매종료)
            // 1. 판매중일 경우 품절 상태로 변경 불가
            if(PR005.SALES.isEquals(goodsItem.getHiddenItmSaleStatCd())){
                if(PR005.SOLD_OUT.isEquals(goodsItem.getItmSaleStatCd())){
                    throw new ValidationException(MessageResolver.getMessage("goodsItemMgmt.alert.msg.canNotChangeSaleStatToSoldOutMsg"));
                }
            // 2. 판매종료일 경우 상태변경 불가
            }else if(PR005.SALE_END.isEquals(goodsItem.getHiddenItmSaleStatCd())){
                if(!PR005.SALE_END.isEquals(goodsItem.getItmSaleStatCd())){
                    throw new ValidationException(MessageResolver.getMessage("goodsItemMgmt.alert.msg.canNotChangeSaleStatMsg"));
                }
            }

            prItmBaseTrxMapper.updatePrItemBase(prItmBase);

            PrItmSaleStatHist updatePrItmSaleStatHist = new PrItmSaleStatHist();
            BeanUtils.copyProperties(updatePrItmSaleStatHist, goodsItem);
            updatePrItmSaleStatHist.setGoodsItmGbCd(PR020.ITEM.getCd());
            prItmSaleStatHistTrxMapper.updatePrItmSaleStatHist(updatePrItmSaleStatHist);

            PrItmSaleStatHist createPrItmSaleStatHist = new PrItmSaleStatHist();
            BeanUtils.copyProperties(createPrItmSaleStatHist, goodsItem);
            createPrItmSaleStatHist.setGoodsItmGbCd(PR020.ITEM.getCd());
            prItmSaleStatHistTrxMapper.insertPrItmSaleStatHist(createPrItmSaleStatHist);

            goodsNoList.add(goodsItem.getGoodsNo());
        }

        List<String> distinctGoodsList = goodsNoList.stream().distinct().collect(Collectors.toList());
        //상품 update
        //상품 history
        for(String goodsNo : distinctGoodsList){
            List<GoodsItemSaleStatusResponse> goodsItemSaleStatus = prItmBaseMapper.getGoodsItemSaleStatus(goodsNo);

            int totalCount = 0;
            int soldOutCount = 0;
            int saleEndCount = 0;

            for(GoodsItemSaleStatusResponse response : goodsItemSaleStatus){
                if(response.getCd().equals("TOTAL")){
                    totalCount = response.getCount();
                }else if(PR005.SOLD_OUT.isEquals(response.getCd())){
                    soldOutCount = response.getCount();
                }else if(PR005.SALE_END.isEquals(response.getCd())){
                    saleEndCount = response.getCount();
                }
            }

            if(totalCount <= 0){
                continue;
            }
            
            CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            PrGoodsBase prGoodsBase = new PrGoodsBase();
            prGoodsBase.setGoodsNo(goodsNo);
            prGoodsBase.setSysModId(currentUser.getLoginId());

            boolean check = false;
            if(totalCount == soldOutCount){
                prGoodsBase.setSaleStatCd(PR005.SOLD_OUT.getCd());
                check = true;
            }else if(totalCount == saleEndCount){
                prGoodsBase.setSaleStatCd(PR005.SALE_END.getCd());
                check = true;
            }

            if(!check){
                continue;
            }

            PrGoodsBaseModLog prGoodsBaseModLog = new PrGoodsBaseModLog();
            prGoodsBaseModLog.setGoodsNo(goodsNo);
            prGoodsBaseModLog.setSysRegId(currentUser.getLoginId());
            prGoodsBaseModLog.setGoodsModItemCd("04");
            prGoodsBaseModLog.setGoodsModCont(prGoodsBase.getSaleStatCd());
            prGoodsBaseTrxMapper.updateGoodsItmChangesDueToGoodsSaleStatus(prGoodsBase);
            prGoodsBaseModLogTrxMapper.insertPrGoodsBaseModLog(prGoodsBaseModLog);
        }
    }
}
