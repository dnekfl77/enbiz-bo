$.namespace("inquiryTypeSGrid.eventhandler");
inquiryTypeSGrid.eventhandler = {

    alertMessage : x2coMessage.getMessage( {
        save           : "inquiryTypeMgmt.gridS.message.save",
        custInqTypNm   : "inquiryTypeMgmt.gridS.message.custInqTypNm",
        ordGoodsMdtyYn : "inquiryTypeMgmt.gridS.message.ordGoodsMdtyYn",
        ansSubCd       : "inquiryTypeMgmt.gridS.message.ansSubCd",
        cnslTypNo      : "inquiryTypeMgmt.gridS.message.cnslTypNo",
        sortSeq        : "inquiryTypeMgmt.gridS.message.sortSeq"
    }),

    // 초기화
    init : function () {
        this.bindButtonEvent();
    },

    bindButtonEvent : function(){
        var self = this;

        $('#btn_dtl_grid_add').click(function(){
            self.onAdd();
        })

        $('#btn_dtl_grid_reset').click(function(){
            self.onReset();
        })

        $('#btn_dtl_grid_save').click(function(){
            self.onSave();
        })


        this.grid.onCellButtonClicked = function (grid, itemIndex, column) {
            grid.commit();
            self.popupCnslTypeList(grid, itemIndex, column);
        };
    },
    onSearch : function(pageIdx){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};
        var extraQueryString = 'uprCustInqTypCd='+this.uprCustInqTypCd;
        this.controller.doQuery(this,extraQueryString,pageIdx, pagingFunc);
    }
    // 행추가
    ,onAdd : function () {
        if(this.uprCustInqTypCd === undefined){
            alert(this.alertMessage.save);
            return;
        }
        var grid = this.grid;
        grid.commit(); // 편집중인 행 편집 완료 처리
        var defaultValues = {
            useYn : 'N',
            ordGoodsMdtyYn : '',
            ansSubCd : '',
            uprCustInqTypCd : this.uprCustInqTypCd
        };
        this.defaultHandler.onAdd(grid, defaultValues);
    },
    onSave : function() {
        if(this.uprCustInqTypCd === undefined){
            alert(this.alertMessage.save);
            return;
        }

        if(!this.saveValidation()){
            return;
        }

        this.controller.doSave(this, this.grid.localId);
    },
    onReset : function() {
        this.defaultHandler.onCancel(this.grid);
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
        },
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                inquiryTypeSGrid.eventhandler.onSearch(0);
            }
        }
    },
    popupCnslTypeList : function(grid, itemIndex, column){
        var pin = {
            custCnslGbCd : '10' //IB
        };
        var POP_DATA = {
            url: _baseUrl + 'customerservice/counselingTypeMgmt.counselingTypeListPopup.do'
            , winName: 'popupCnslTypeListPopup'
            , title: '상담유형조회 팝업'
            , _title: '상담유형조회 팝업'
            , left: 20
            , top: 20
            , width: 800
            , height: 670
            , scrollbars: false
            , autoresize: false
        };
        var callback = function(e) {
            var cnslType = JSON.parse(e.data);
            grid.getDataSource().setValue(grid.getCurrent().dataRow, "cnslTypText", cnslType[0].cnslLrgTypNm +'>'+cnslType[0].cnslMidTypNm+'>'+cnslType[0].cnslSmlTypNm);
            grid.getDataSource().setValue(grid.getCurrent().dataRow, "cnslTypNo", cnslType[0].cnslTypNo);
        };
        popCommon(pin, POP_DATA, callback);
    },
    saveValidation : function(){
        var grid = this.grid;
        grid.commit();
        var result = false;

        var dataResource = grid.getDataSource();
        var gridCount = dataResource.getRowCount();
        for(var i = 0; i<gridCount; i++){
            var _custInqTypNm = grid.getValue(i,"custInqTypNm");
            var _ordGoodsMdtyYn = grid.getValue(i,"ordGoodsMdtyYn");
            var _ansSubCd = grid.getValue(i,"ansSubCd");
            var _cnslTypText = grid.getValue(i,"cnslTypText");
            var _sortSeq   = grid.getValue(i,"sortSeq");


            //유형명
            if(_custInqTypNm === undefined || _custInqTypNm === ''){
                alert(this.alertMessage.custInqTypNm);
                return false;
            }

            //주문상품필수여부
            if(_ordGoodsMdtyYn === undefined || _ordGoodsMdtyYn === ''){
                alert(this.alertMessage.ordGoodsMdtyYn);
                return false;
            }

            //답변주체
            if(_ansSubCd === undefined || _ansSubCd === ''){
                alert(this.alertMessage.ansSubCd);
                return false;
            }

            //매핑상담유형
            if(_cnslTypText === undefined || _cnslTypText === ''){
                alert(this.alertMessage.cnslTypNo);
                return false;
            }

            //정렬순서
            if(_sortSeq === undefined || _sortSeq === NaN){
                alert(this.alertMessage.sortSeq);
                return false;
            }

            if(grid.isCheckedItem(i)){
                result = true;
                break;
            }
        }
        if(!result){
            alert(_msg.noSelectedDataMsg);
            return false;
        }

        if (!confirm(_msg.confirmSaveMsg)) {
            return false;
        }

        return true;
    }
};
