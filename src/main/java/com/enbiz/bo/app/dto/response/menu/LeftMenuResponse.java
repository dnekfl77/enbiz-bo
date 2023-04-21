package com.enbiz.bo.app.dto.response.menu;

import lombok.*;

import java.io.Serializable;
import java.util.List;

import org.apache.ibatis.type.Alias;

@Alias("LeftMenuResponse")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeftMenuResponse implements Serializable {
    private String rtTgtSeq;
    private String rtTgtNm;
    private String uprRtTgtSeq;
    private String useYn;
    private int sortSeq;
    private int level;
    private String leafMenuYn;
    private String callUrl;
    private String hierarchy;
    private List<LeftMenuResponse> childMenuList;
}
