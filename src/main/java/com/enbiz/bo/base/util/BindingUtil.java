package com.enbiz.bo.base.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public final class BindingUtil {

    public static List<List<String>> selectTimeUtil(){

        List<String> hours = new ArrayList();
        List<String> minute = new ArrayList();

        for(int i=0;i<24;i++){
            if(i<10){
                hours.add("0"+i);
            }else{
                hours.add(Integer.toString(i));
            }
        }

        for(int i=0;i<60;i++){
            if(i<10){
                minute.add("0"+i);
            }else{
                minute.add(Integer.toString(i));
            }
        }

        return Arrays.asList(hours,minute);
    }

}

