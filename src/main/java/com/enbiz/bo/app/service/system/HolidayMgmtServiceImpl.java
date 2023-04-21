package com.enbiz.bo.app.service.system;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.system.HolidayMgmtRequest;
import com.enbiz.bo.app.dto.response.system.HolidayMgmtResponse;
import com.enbiz.bo.app.entity.StHoliInfo;
import com.enbiz.bo.app.repository.system.StHoliInfoMapper;
import com.enbiz.bo.app.repository.system.StHoliInfoTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.exception.ValidationException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 휴일 관리 service
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class HolidayMgmtServiceImpl implements HolidayMgmtService {

    private final StHoliInfoMapper stHoliInfoMapper;
    private final StHoliInfoTrxMapper stHoliInfoTrxMapper;

    @Override
    public List<HolidayMgmtResponse> getHolidayList(HolidayMgmtRequest HolidayMgmtRequest) {
        return stHoliInfoMapper.getHolidayList(HolidayMgmtRequest);
    }

    @Override
    public int getHolidayListCount(HolidayMgmtRequest HolidayMgmtRequest) throws Exception {
        return stHoliInfoMapper.getHolidayListCount(HolidayMgmtRequest);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveHolidayList(List<StHoliInfo> createList, List<StHoliInfo> updateList, List<StHoliInfo> deleteList) throws Exception {
        registHoliday(createList);
        modifyHoliday(updateList);
        deleteHoliday(deleteList);
    }

    @Override
    public void registHoliday(List<StHoliInfo> createList) throws Exception {
        try {
            for (StHoliInfo stHoliInfo : createList) {

                Validator.throwIfEmpty(stHoliInfo.getHoliDt(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("holidayMgmt.grid.field.date")}));
                Validator.throwIfEmpty(stHoliInfo.getHoliJobGbCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("holidayMgmt.search.label.job.section.cd")}));
                Validator.throwIfEmpty(stHoliInfo.getHoliGbCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("holidayMgmt.search.label.section.cd")}));
                Validator.throwIfEmpty(stHoliInfo.getUseYn(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("adminCommon.use.yn")}));
                Validator.throwIfEmpty(stHoliInfo.getSysRegId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("adminCommon.label.sys.reg.id")}));
                Validator.throwIfEmpty(stHoliInfo.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("adminCommon.label.sys.mod.id")}));

                stHoliInfo.setHoliDt(stHoliInfo.getHoliDt().replace("-", ""));
                stHoliInfoTrxMapper.insertHoliday(stHoliInfo);
            }
        } catch (ValidationException v) {
            throw new ValidationException(v.getMessage());
        } catch (Exception e) {
            throw new IllegalArgumentException(MessageResolver.getMessage("holidayMgmt.alert.msg.overLapHolidayMsg"), e);
        }
    }

    @Override
    public void modifyHoliday(List<StHoliInfo> updateList) throws Exception {
        try {
            for (StHoliInfo stHoliInfo : updateList) {

                Validator.throwIfEmpty(stHoliInfo.getHoliDt(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("holidayMgmt.grid.field.date")}));
                Validator.throwIfEmpty(stHoliInfo.getHoliJobGbCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("holidayMgmt.search.label.job.section.cd")}));
                Validator.throwIfEmpty(stHoliInfo.getHoliGbCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("holidayMgmt.search.label.section.cd")}));
                Validator.throwIfEmpty(stHoliInfo.getUseYn(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("adminCommon.use.yn")}));
                Validator.throwIfEmpty(stHoliInfo.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("adminCommon.label.sys.mod.id")}));

                stHoliInfo.setHoliDt(stHoliInfo.getHoliDt().replace("-", ""));
                stHoliInfoTrxMapper.updateHoliday(stHoliInfo);
            }
        } catch (ValidationException v) {
            throw new ValidationException(v.getMessage());
        } catch (Exception e) {
            throw new IllegalArgumentException(MessageResolver.getMessage("holidayMgmt.alert.msg.overLapHolidayMsg"), e);
        }
    }

    @Override
    public void deleteHoliday(List<StHoliInfo> deleteList) throws Exception {

        for (StHoliInfo stHoliInfo : deleteList) {

            Validator.throwIfEmpty(stHoliInfo.getHoliDt(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("holidayMgmt.grid.field.date")}));
            Validator.throwIfEmpty(stHoliInfo.getHoliJobGbCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("holidayMgmt.search.label.job.section.cd")}));

            stHoliInfo.setHoliDt(stHoliInfo.getHoliDt().replace("-", ""));
            stHoliInfoTrxMapper.deleteHoliday(stHoliInfo);
        }
    }

    @Override
    public List<StHoliInfo> registHolidayExcelList(List<StHoliInfo> createList) throws Exception {

        List<StHoliInfo> returnList = new ArrayList<>();
        createList.forEach( holiday -> {

        	Validator.throwIfEmpty(holiday.getHoliDt(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("holidayMgmt.grid.field.date")}));
            Validator.throwIfEmpty(holiday.getHoliJobGbCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("holidayMgmt.search.label.job.section.cd")}));

            String holiDt = holiday.getHoliDt();
            holiday.setHoliDt(holiDt.replace("-", ""));

            // 중복여부 체크
            if (stHoliInfoMapper.checkDuplicatedHoliday(holiday)) {
                holiday.setHoliDt(holiDt);
                returnList.add(holiday);
            } else {

                Validator.throwIfEmpty(holiday.getHoliGbCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("holidayMgmt.search.label.section.cd")}));
                Validator.throwIfEmpty(holiday.getUseYn()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("adminCommon.use.yn")}));
                Validator.throwIfEmpty(holiday.getSysRegId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("adminCommon.label.sys.reg.id")}));
                Validator.throwIfEmpty(holiday.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("adminCommon.label.sys.mod.id")}));

                stHoliInfoTrxMapper.insertHoliday(holiday);
            }
        });

        return returnList;
    }

}
