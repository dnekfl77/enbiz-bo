$.namespace("etEntrDlvpInfoGrid.eventhandler");
etEntrDlvpInfoGrid.eventhandler = {
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
//            "entrDlvpNo"
//            ,"entrNo"
//            ,"dlvpTypCd"
//            ,"dlvpAddr"
//            ,"utakmnNm"
//            , {
//                name : "telNoGroup"
//                ,direction: "horizontal"
//                ,hideChildHeaders: true
//                , items: [
//                    "aempTelRgnNo"
//                    ,"aempTelTxnoNo"
//                    ,"aempTelEndNo"
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
//                    "aempCellSctNo"
//                    ,"aempCellTxnoNo"
//                    ,"aempCellEndNo"
//                ]
//                ,header: {
//                    text: "휴대폰번호"
//                }
//            }
//            ,"zipNoSeq"
//            ,"zipNo"
//            ,"zipAddr"
//            ,"dtlAddr"
//            ,"sysModId"
//            ,"sysModDtm"
//        ];
//
//        _self.grid.header.height = 50;
//        _self.grid.setColumnLayout(layout1);

        _self.grid.setColumnProperty("zipNo", "buttonVisibility", "always");

    }
    ,loadingData : function() {
        if (_parameterMode === 'U') {
            //그리드 데이터 세팅
            this.controller.callbackForCommonSuccess(this.grid, _etEntrDlvpInfoList);
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
    ,popupZipNoList : function(grid, itemIndex, column){
        var pin = {
            // argSelectType: $("#zipNoListForm [name='argSelectType']:checked").val()
            argSelectType: 1
        };
        var POP_DATA = {
            url: '/popup/zipCodeMgmtPopup.zipNoListPopup.do'
            , winName: 'zipNoListPopup'
            , title: '우편번호 조회'
            , _title: '우편번호 조회'
            , left: 20
            , top: 20
            , width: 660
            , height: 800
            , scrollbars: false
            , autoresize: false
        };
        var callback = function(e) {
            var zipObj = [];
            zipObj = JSON.parse(e.data);

            grid.getDataSource().setValue(grid.getCurrent().itemIndex, "zipNoSeq", zipObj[0].zipNoSeq);
            grid.getDataSource().setValue(grid.getCurrent().itemIndex, "zipNo", zipObj[0].zipNo);
            grid.getDataSource().setValue(grid.getCurrent().itemIndex, "zipAddr", zipObj[0].address);
        };
        popCommon(pin, POP_DATA, callback);
    }
    // 버튼 이벤트 바인딩
    ,bindButtonEvent : function(){
        var _self = this;

//        //주소찾기
//        this.grid.onCellClicked = function(grid,clickData){
//            var currentData = _self.grid.getDataSource().getJsonRow(clickData.dataRow);
//            if(clickData.column==='zipNo'){
//                _self.popupZipNoList();
//            }
//        }
        _self.grid.onCellButtonClicked = function (grid, itemIndex, column) {
            grid.commit();
            _self.popupZipNoList(grid, itemIndex, column);
        };

        $('#btn_etentrdlvpinfo_grid_add').click(function() {
            _self.onAdd();
        });

        $('#btn_etentrdlvpinfo_grid_remove').click(function() {
            _self.grid.cancel();
            _self.onDelete();
        });

        $("#btn_etentrdlvpinfo_grid_reset").click(function() {
            _self.onReset();
        });
    }
    // Grid 이벤트 처리
    ,gridEvent : {
        onEditRowChanged: function (grid, itemIndex, dataRow, field, oldValue, newValue) {
            //telNo
            if (field === 8) {
                if (!newValue.isPhone()) {
                    alert('전화번호 형식이 맞지 않습니다.');
                    grid.setValue(dataRow, field, oldValue);
                } else {
                    var regExp = /(02|0[3-9]{1}[0-9]{1})([1-9]{1}[0-9]{2,3})([0-9]{4})$/;
                    var telNoArr = regExp.exec(newValue);

                    grid.setValue(dataRow, 'aempTelRgnNo', telNoArr[1]);
                    grid.setValue(dataRow, 'aempTelTxnoNo', telNoArr[2]);
                    grid.setValue(dataRow, 'aempTelEndNo', telNoArr[3]);
                }
            }
            //cellNo
            if (field === 12) {
                if (!newValue.isMobile()) {
                    alert('휴대전화번호 형식이 맞지 않습니다.');
                    grid.setValue(dataRow, field, oldValue);
                } else {
                    var regExp = /(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/;
                    var cellNoArr = regExp.exec(newValue);

                    grid.setValue(dataRow, 'aempCellSctNo', cellNoArr[1]);
                    grid.setValue(dataRow, 'aempCellTxnoNo', cellNoArr[2]);
                    grid.setValue(dataRow, 'aempCellEndNo', cellNoArr[3]);
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