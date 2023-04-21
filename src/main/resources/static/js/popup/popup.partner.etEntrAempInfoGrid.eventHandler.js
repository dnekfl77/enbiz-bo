$.namespace("etEntrAempInfoGrid.eventhandler");
etEntrAempInfoGrid.eventhandler = {
    // argMode : 선택구분 ( C : 등록, RU : 상세조회 및 수정 )
    parametersCheck : function() {
        if (typeof _parameterMode == "undefined" || _parameterMode == null || _parameterMode == "") {
            alert(_modeCheckMessage);
            return false;
        }
    }
    // [namespace]provider.js 외 사용자 정의
    ,settingCustomGrid : function() {
        var _self = this;

//        var layout1;
//
//        layout1 = [
//            "entrNo"
//            ,"aempSeq"
//            ,"dutyCd"
//            ,"aempNm"
//            , {
//                name : "telNoGroup"
//                ,direction: "horizontal"
//                ,hideChildHeaders: true
//                , items: [
//                    "telRgnNo"
//                    ,"telTxnoNo"
//                    ,"telEndNo"
//                ]
//                ,header: {
//                    text: "전화번호"
//                }
//            }
//            , {
//                name : "cellNoGroup"
//                ,direction: "horizontal"
//                ,hideChildHeaders: true
//                , items: [
//                    "cellSctNo"
//                    ,"cellTxnoNo"
//                    ,"cellEndNo"
//                ]
//                ,header: {
//                    text: "휴대폰번호"
//                }
//            }
//            ,"emailAddr"
//            ,"sysModId"
//            ,"sysModDtm"
//        ];
//
//        this.grid.header.height = 50;
//        this.grid.setColumnLayout(layout1);
    }
    ,loadingData : function() {
        if (_parameterMode === 'U') {
            //그리드 데이터 세팅
            this.controller.callbackForCommonSuccess(this.grid, _etEntrAempInfoList);
        }
    }
    //그리드 행추가
    ,onAdd : function() {
        var _self = this;
        var _grid = _self.grid;

        _grid.commit();

        var _defaultValues = { useYn : "Y" };

        _self.defaultHandler.onAdd(_grid, _defaultValues);
    }
    //그리드 행삭제
    ,onDelete : function() {
        var _self = this;
        var _grid = _self.grid;

        var _checkedItems = _grid.getCheckedItems();
        if (_checkedItems.length == 0) {
            alert(_removeRowValidMessage);
            return;
        }

        _self.defaultHandler.onDelete(_grid);
    }
    //그리드 적용취소
    ,onReset : function() {
        var _self = this;
        var _grid = _self.grid;

        _self.defaultHandler.onCancel(_grid);
    }
    //그리드 데이터 조회
    ,onSearch : function(pageIdx){
        this.grid.cancel();
        var _self = this;

        pageIdx = !pageIdx ? 0 : pageIdx;

        var pagingFunc = function(pageIdx){return _self.onSearch(pageIdx);};

        this.controller.doQuery(this, "", pageIdx, pagingFunc);
    }
    // 버튼 이벤트 바인딩
    ,bindButtonEvent : function(){
        var _self = this;

        $('#btn_etentraempinfo_grid_add').click(function() {
            _self.onAdd();
        });
        
        $('#btn_etentraempinfo_grid_remove').click(function() {
            _self.grid.cancel();
            _self.onDelete();
        });

        $("#btn_etentraempinfo_grid_reset").click(function() {
            _self.onReset();
        });
    }
    // Grid 이벤트 처리
    ,gridEvent : {
        onEditRowChanged: function (grid, itemIndex, dataRow, field, oldValue, newValue) {
            console.log(field);

            //telNo
            if (field === 7) {
                if (!newValue.isPhone()) {
                    alert('전화번호 형식이 맞지 않습니다.');
                    grid.setValue(dataRow, field, oldValue);
                } else {
                    var regExp = /(02|0[3-9]{1}[0-9]{1})([1-9]{1}[0-9]{2,3})([0-9]{4})$/;
                    var telNoArr = regExp.exec(newValue);

                    grid.setValue(dataRow, 'telRgnNo', telNoArr[1]);
                    grid.setValue(dataRow, 'telTxnoNo', telNoArr[2]);
                    grid.setValue(dataRow, 'telEndNo', telNoArr[3]);
                }
            }
            //cellNo
            if (field === 11) {
                if (!newValue.isMobile()) {
                    alert('휴대전화번호 형식이 맞지 않습니다.');
                    grid.setValue(dataRow, field, oldValue);
                } else {
                    var regExp = /(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/;
                    var cellNoArr = regExp.exec(newValue);

                    console.log(cellNoArr);

                    grid.setValue(dataRow, 'cellSctNo', cellNoArr[1]);
                    grid.setValue(dataRow, 'cellTxnoNo', cellNoArr[2]);
                    grid.setValue(dataRow, 'cellEndNo', cellNoArr[3]);
                }
            }
            //emailAddr
            if (field === 12) {
                if (!newValue.isEmail()) {
                    alert('메일 형식이 맞지 않습니다.');
                    grid.setValue(dataRow, field, oldValue);
                }
            }
        }
    }
    // 초기화
    ,initialize : function() {
        this.parametersCheck();
        this.settingCustomGrid();
        this.loadingData();
        this.bindButtonEvent();
    }
};