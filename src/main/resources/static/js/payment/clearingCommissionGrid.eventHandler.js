$.namespace("clearingCommissionGrid.eventhandler");
clearingCommissionGrid.eventhandler = {

    init : function () {
        this.gridLoading();
        this.bindButtonEvent();
    },

    gridLoading : function(){
        var self = this;

        // 해더 병합
        var layout = [
              "pgGbCd"
            , "cmsnTgtLgrpCd"
            , "cmsnTgtSgrpCd"
            , "cmsnGbCd"
            , "cmsnTypCd"
            , "mersNo"
            , {
                name: "cmsn",
                direction: "horizontal",
                items: [
                    {column:"instMonCnt"},
                    {column:"cmsnRate"},
                    {column:"cmsnAmt"}
                ],
                header: {
                    text: col.cmsn,
                    styleName: "multi-line-css"
                }
            }
            , "adjGbCd"
            , "vatInclYn"
            , "rmkCont"
            , "aplyStrDt"
            , "aplyEndDt"
            , "sysModId"
            , "sysModDtm"
        ]
        this.grid.header.height = 60;
        this.grid.setColumnLayout(layout);

        // 그리드 셀 수정 불가 설정
        this.grid.setEditOptions({ editable: false });

        // 선택된 그리드 배경색 넣기
		this.grid.onItemChecked = function(grid, itemIndex, checked) {
          grid.setCurrent({ itemIndex: itemIndex })
        };
        this.grid.setRowStyleCallback(function(grid, item, fixed) {
          if (item.checked) {
            return 'rg-trcol_active'
          }
        });

        // 일련번호 클릭 시 수정 팝업창 호출
        this.grid.onCellClicked = function(grid,clickData){
            var currentData = self.grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.cellType != "header") {
                if(clickData.column==='pgGbCd'){
                    self.updatePopup("U", currentData.pgGb, currentData.cmsnTgtLgrp, currentData.cmsnTgtSgrp, currentData.cmsnGb, currentData.cmsnTyp, currentData.aplyStrDtm, currentData.aplyEndDtm);
                }
                if(clickData.column==='cmsnTgtLgrpCd'){
                    self.updatePopup("U", currentData.pgGb, currentData.cmsnTgtLgrp, currentData.cmsnTgtSgrp, currentData.cmsnGb, currentData.cmsnTyp, currentData.aplyStrDtm, currentData.aplyEndDtm);
                }
                if(clickData.column==='cmsnTgtSgrpCd'){
                    self.updatePopup("U", currentData.pgGb, currentData.cmsnTgtLgrp, currentData.cmsnTgtSgrp, currentData.cmsnGb, currentData.cmsnTyp, currentData.aplyStrDtm, currentData.aplyEndDtm);
                }
                if(clickData.column==='cmsnGbCd'){
                    self.updatePopup("U", currentData.pgGb, currentData.cmsnTgtLgrp, currentData.cmsnTgtSgrp, currentData.cmsnGb, currentData.cmsnTyp, currentData.aplyStrDtm, currentData.aplyEndDtm);
                }
                if(clickData.column==='cmsnTypCd'){
                    self.updatePopup("U", currentData.pgGb, currentData.cmsnTgtLgrp, currentData.cmsnTgtSgrp, currentData.cmsnGb, currentData.cmsnTyp, currentData.aplyStrDtm, currentData.aplyEndDtm);
                }
                if(clickData.column==='mersNo'){
                    self.updatePopup("U", currentData.pgGb, currentData.cmsnTgtLgrp, currentData.cmsnTgtSgrp, currentData.cmsnGb, currentData.cmsnTyp, currentData.aplyStrDtm, currentData.aplyEndDtm);
                }
            }
        }
    },

    bindButtonEvent : function(){
        var self = this;

        $('#cmsnTgtLgrpCd').change(function() {
            self.onCmsnTgtLgrpCdChange($('#cmsnTgtLgrpCd').val());
        });

        $('#btn_list').click(function() {
            self.onSearch(0, true);
        });

        $('#btn_init').click(function() {
            $('#clearingCommissionGridForm')[0].reset();
            self.calendarInit();
        });

        $("#clearingCommissionGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_list').click();
                window.event.returnValue=false;
            }
         });

        $("#btn_grid_insert").click(function() {
            self.updatePopup("I",null,null,null,null,null,null);
        });
    },

    onCmsnTgtLgrpCdChange : function(cmsnTgtLgrpCd){
        $('#cmsnTgtSgrpCd option').not("[value='']").remove();
        if(cmsnTgtLgrpCd == "11") { // 신용카드
            if(code28List != null){
                for(const item of code28List){ // 매입사코드
                    $("#cmsnTgtSgrpCd").append($("<option value='"+item.cd+"'>"+item.cdNm+"</option>"));
                }
            }
        } else if(cmsnTgtLgrpCd == "21" || cmsnTgtLgrpCd == "22") { // 실시간계좌이체, 가상계좌
            if(code26List != null){
                for(const item of code26List){ // 은행코드
                    $("#cmsnTgtSgrpCd").append($("<option value='"+item.cd+"'>"+item.cdNm+"</option>"));
                }
            }
        }
    },

    gridEvent : {
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

    onSearch : function(pageNo, isOpenToast){
        var that = this;
        this.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo); };
        this.controller.doQuery(this, null, pageNo, pageFunc, null, isOpenToast);
    },

    updatePopup : function(state, pgGbCd, cmsnTgtLgrpCd, cmsnTgtSgrpCd, cmsnGbCd, cmsnTypCd, aplyStrDtm, aplyEndDtm){
        var self = this;
        if(state == "I"){
            var pin = { argInsertUpdate : state };
            var POP_DATA = {
                url: _baseUrl + "payment/PaymentCommissionMgmt.paymentCommissionSaveView.do"
                , winName: 'getClearingCommissionInsert'
                , title: '결제수수료 등록'
                , _title: '결제수수료 등록'
                , left: 20
                , top: 20
                , width: 1090
                , height: 600
                , scrollbars: true
                , autoresize: true
            };
        } else if (state == "U"){
            if(cmsnGbCd == null) cmsnGbCd = "0";
            if(cmsnTypCd == null) cmsnTypCd = "0";
            var pin = {
                  argInsertUpdate : state
                , pgGbCd : pgGbCd
                , cmsnTgtLgrpCd : cmsnTgtLgrpCd
                , cmsnTgtSgrpCd : cmsnTgtSgrpCd
                , cmsnGbCd : cmsnGbCd
                , cmsnTypCd : cmsnTypCd
                , aplyStrDtm : aplyStrDtm
                , aplyEndDtm : aplyEndDtm
            };
            var POP_DATA = {
                url: _baseUrl + "payment/PaymentCommissionMgmt.paymentCommissionSaveView.do"
                , winName: 'getClearingCommissionUpdate'
                , title: '결제수수료 수정'
                , _title: '결제수수료 수정'
                , left: 20
                , top: 20
                , width: 1090
                , height: 600
                , scrollbars: false
                , autoresize: false
            };
        }
        popCommon(pin, POP_DATA, null);
    }
};