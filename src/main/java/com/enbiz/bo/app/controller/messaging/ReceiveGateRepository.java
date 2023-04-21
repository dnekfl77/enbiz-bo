package com.enbiz.bo.app.controller.messaging;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

@Repository
public class ReceiveGateRepository {

    private Map<String, ReceiveGate> receiveGateMap;

    @PostConstruct
    private void init() {
        receiveGateMap = new LinkedHashMap<>();
    }

    public List<ReceiveGate> findAllGate() {
        // 채팅방 생성순서 최근 순으로 반환
        List receiveGates = new ArrayList<>(receiveGateMap.values());
        Collections.reverse(receiveGates);
        return receiveGates;
    }

    public ReceiveGate findGateById(String id) {
        return receiveGateMap.get(id);
    }

    public boolean validGateById(String id) {
        List<ReceiveGate> receiveGates = this.findAllGate();

        String gateId = "";

        for (ReceiveGate receiveGate : receiveGates) {
            if ( StringUtils.equals(receiveGate.getId(), id) ) {
                gateId = receiveGate.getId();
                break;
            }
        }

        return gateId == "";
    }

    public ReceiveGate createReceiveGate(ReceiveGate receiveGate) {

        receiveGateMap.put(receiveGate.getId(), receiveGate);

        return receiveGate;

    }
}
