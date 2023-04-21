var alertMsg = x2coMessage.getMessage( {
    goodsno : "presentationMgmt.info.label.goodsno",// 상품번호
	goodsname : "presentationMgmt.info.label.goodsname",// 상품명
	prestMessageRequire : "presentationMgmt.alert.msg.prest.message.require",// 증정메시지는 필수값입니다!
	applystartdateImpossible : "presentationMgmt.alert.msg.applystartdate.impossible",// 적용시작일자 > 적용종료일자 불가능입니다!
	applystartdateMax30day : "presentationMgmt.alert.msg.applystartdate.max.30day",// 적용시작일자와 적용시작일자의 MAX는 30일 입니다!
	applydateImpossible : "presentationMgmt.alert.msg.applydate.impossible",//적용일자 < 금일 불가능입니다!
	applydateDuplicate : "presentationMgmt.alert.msg.applydate.duplicate",// 은 기존 등록된 상품번호와 적용일자가 겹칩니다!
	deletePrestSelect : "presentationMgmt.alert.msg.delete.prest.select",// 삭제할 증정품을 선택해주세요!
	noSelectedRow : "adminCommon.grid.alert.no.selected.row"
});

$.namespace("presentationGrid.eventhandler");
presentationGrid.eventhandler = {
    // 초기화
    init : function () {
        this.calendarInit();
        this.gridLoading();
        this.bindButtonEvent();
    },
    bindButtonEvent : function(){

        var self = this;

        //상세화면
        this.grid.onCellDblClicked = function(grid,clickData){
            var currentData = self.grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.column==='promoNo'|| clickData.column==='promoNm'){
                self.callPromotionRegistPopup(currentData.promoNo);
            }
        }
        // 초기화
        $('#btn_init').click(function() {
            $('#presentationGridForm')[0].reset();
            self.calendarInit();
        });

        // 조회 registerBtn
        $('#btn_list').click(function() {
            self.onSearch(0,true);
        });

        // 상품 추가
        $('#btn_grid_insert').click(function() {
            self.callGoodsPopup();
        });

        //행삭제
        $('#btn_grid_remove').click(function(){
            self.onDelete();
        });

        //변경취소
        $('#btn_grid_cancel').click(function() {
            self.defaultHandler.onCancel(self.grid);
        });

        //저장
        $('#btn_grid_save').click(function(){
            self.onSave();
        })


        $("#presentationGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_list').click();
                window.event.returnValue=false;
            }
        });

        //달력
        $('#_sch_date_st-button').click(function() {
            showCalendar({
                type:'A', // A:시작,종료일선택, B:해당 날짜 1개 선택
                format:'yyyy-MM-dd',
                yyyymmdd1:$('#startDate').val(),
                yyyymmdd2:$('#endDate').val(),
                //max_term:30,
                fn:function(pin) {
                    $('#startDate').val(pin.yyyymmdd1);
                    $('#endDate').val(pin.yyyymmdd2);
                }
            });
        });
    },
    calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(30);
        $('#startDate').val(initFromAndToCalDate[0]);
        $('#endDate').val(initFromAndToCalDate[1]);
    },
    gridLoading : function(){
        var self = this;
        grid.setCellStyleCallback(function(grid, dataCell) {
            var ret = {};
            var value = dataProvider.getValue(dataCell.index.dataRow, "sysModId");
            if(!(value === undefined || value.trim() === '')) {
                if (dataCell.dataColumn.name === 'aplyStrDt' || dataCell.dataColumn.name === 'aplyEndDt') {
                    ret.editable = false;
                    ret.styleName = 'disable-column';
                }
            }
            return ret;
        });

        grid.onValidateColumn = function(grid, column, inserting, value) {
            var error = {};
            if (column.fieldName === "prestNm") {
                if (value === undefined || value.trim() === '') {
                    error.level = "error";
                    error.message = col.prestMessageRequire;
                }
            }
            return error;
        }
    },
    callGoodsPopup : function(){
        var pin = {
            argSelectType: 'N',
            argSaleState: '',
            argGoodsType: '',
            goodsCompCd: '10'
        };
        var POP_DATA = {
                url: _baseUrl + 'popup/goodsMgmtPopup.goodsListPopup.do'
                , winName: 'goodsListPopup'
                , title: '상품 조회'
                , _title: '상품 조회'
                , left: 20
                , top: 20
                , width: 1000
                , height: 700
                , scrollbars: false
                , autoresize: false
        };
        popCommon(pin, POP_DATA, this.popupGoodsListCallback.bind(this));
    },
    onSave : function() {
        var grid = this.grid;
        var provider = grid.getDataSource();
        var gridCount = provider.getRowCount();
        grid.commit(true);

        // var rows = provider.getAllStateRows();
        // console.log(rows.created);
        // console.log(rows.updated);

        var errorDatas = grid.validateCells(null,false);
        if(errorDatas !== null ){
            alert(errorDatas[0].message);
            return;
        }

        var result = false;
        for(var i = 0 ; i < gridCount ; i++){
            if(grid.isCheckedItem(i)){
                result = true;
                break;
            }
        }
        //선택된 값이 없을 경우
        if(!result){
            alert(col.noSelectedRow);
            return ;
        }

        var rows = provider.getAllStateRows();
        var check = true;
        var message = [];

        rows.created.forEach(function(row){
            let goodsNo = provider.getValue(row, "goodsNo");
            let goodsNm = provider.getValue(row, "goodsNm");
            let aplyStrDt = provider.getValue(row, "aplyStrDt");
            let aplyEndDt = provider.getValue(row, "aplyEndDt");

            let startDtTime = new Date(aplyStrDt).getTime();
            let endDtTime =  new Date(aplyEndDt).getTime();
            let dateDiff = Math.ceil((endDtTime-startDtTime)/(1000*3600*24));
            let today = new Date(); // 현재날짜
            today = today.getFullYear() + "-" + addzero(today.getMonth() + 1) + "-" + addzero(today.getDate());
            
            let labelGoodsno = alertMsg.goodsno;
            let labelGoodsname = alertMsg.goodsname;
            let applystartdateImpossible = alertMsg.applystartdateImpossible;
            let applystartdateMax30day = alertMsg.applystartdateMax30day;
            let applydateImpossible = alertMsg.applydateImpossible;

            if(aplyStrDt > aplyEndDt){
                message.push(`[${labelGoodsno}]:[${goodsNo}] , [${labelGoodsname}]:[${goodsNm}] , message : [${applystartdateImpossible}]`);
                check = false;
            }else if(dateDiff > 30){
                message.push(`[${labelGoodsno}]:[${goodsNo}] , [${labelGoodsname}]:[${goodsNm}] , message : [${applystartdateMax30day}]`);
                check = false;
            }else if(aplyStrDt < today || aplyEndDt < today){
                message.push(`[${labelGoodsno}]:[${goodsNo}] , [${labelGoodsname}]:[${goodsNm}] , message : [${applydateImpossible}]`);
                check = false;
            }
        })

        if(!check){
            alert(message);
            return;
        }

        var createdRows = provider.getAllStateRows().created;

        var requestData = [];
        createdRows.forEach(function(row){
            var rowData = provider.getJsonRow(row);
            requestData.push({goodsNo:rowData.goodsNo,aplyStrDt:rowData.aplyStrDt,aplyEndDt:rowData.aplyEndDt});
        })

        var self = this;
        var duplicateCheckCallBack = function(res){
            if(res.duplicateGoodsCount > 0){
                alert('[${col.goodsno}] : ' + res.duplicateGoods + ' [${col.applydateDuplicate}]');
                return;
            }
            self.controller.doSave(self, grid.localId);
        };

        common.Ajax.sendJSONRequest(
            "POST"
            , _baseUrl + "marketing/presentationMgmt.checkDuplicate.do"
            ,  JSON.stringify(requestData)
            , duplicateCheckCallBack
            , false
            ,"application/json;charset=UTF-8"
        );
    },
    onDelete : function(){
        var grid = this.grid;
        var checkedRows = grid.getCheckedRows();
        if (checkedRows.length == 0) {
            alert(col.deletePrestSelect);
            return;
        }
        //행삭제 처리
        this.defaultHandler.onDelete(grid);
    },
    onSearch : function(pageIdx,isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};

        var startDate = replaceCalendarString($('#startDate').val());
        var endDate = replaceCalendarString($('#endDate').val());

        var extraQueryString;
        extraQueryString = 'aplyStrDt=' + startDate + '&aplyEndDt=' + endDate;

        this.controller.doQuery(this,extraQueryString,pageIdx, pagingFunc,false,isOpenToast);
    },
    gridEvent : {
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            if(data.succeeded){
				openToast(data.message);
                eventHandler.onSearch(0);
            }
        },
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
            //검색 결과 없을 경우
            if (data.payloads.length == 0) {
                if (localStorage.alertifyExists === 'true') {
                    localStorage.alertifyExists = 'false';
                }
            }
        }
    },
    popupGoodsListCallback : function(e){
        var goodsDataList = JSON.parse(e.data);
        var self = this;
        var grid = self.grid;
        grid.commit();
        goodsDataList.forEach(function(goodsData){
            var defaultValues = {
                  goodsNo : goodsData.goodsNo
                , goodsNm : goodsData.goodsNm
                , aplyStrDt : recentlyCalenderData(-30)[1]
                , aplyEndDt : recentlyCalenderData(-30)[0]
                , useYn: 'Y'
            };
            self.defaultHandler.onAdd(grid,defaultValues);
        });
    }
};
