var advertisingWordListMsg = x2coMessage.getMessage({
    invalidCharacterInAdveWrdMsg : 'advertisingWordMgmt.alert.msg.invalidCharacterInAdveWrdMsg'
});

$.namespace("advertisingWordListGrid.eventhandler");
advertisingWordListGrid.eventhandler = {
    init : function () {
        this.calendarSetting();
        this.gridSetting();
        this.bindButtonEvent();
    },
    calendarSetting : function(){
        var initFromAndToCalDate = recentlyCalenderData(7);
        $('#startDate').val(initFromAndToCalDate[0]);
        $('#endDate').val(initFromAndToCalDate[1]);
    },
    gridSetting : function () {
        this.grid.onItemChecked = function ( grid, itemIndex, checked ) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function ( grid, item, fixed ) {
            if (item.checked) return 'rg-trcol_active';
        });
        this.grid.editOptions.commitLevel = "error";

        this.grid.setCellStyleCallback( function(grid, dataCell) {
            var ret = {};
            var value = grid.getDataSource().getValue(dataCell.index.dataRow, "sysModId");
            if(!(value === undefined || value.trim() === '')) {
                if (dataCell.dataColumn.name === 'aplyStrDt' || dataCell.dataColumn.name === 'aplyEndDt') {
                    ret.editable = false;
                    ret.styleName = 'disable-column';
                }
            }
            return ret;
        });
    },
    bindButtonEvent : function(){

        var self = this;

        // 초기화
        $('#btn_init').click(function() {
            $('#advertisingWordListForm')[0].reset();
            self.calendarSetting();
        });

        // 조회
        $('#btn_list').click(function() {
            self.onSearch(0, true);
        });

        // 상품추가
        $('#btn_grid_regist').click(function() {
            self.callGoodsPopup();
        });

        //변경취소
        $('#btn_grid_cancel').click(function() {
            self.defaultHandler.onCancel(self.grid);
        });

        //저장
        $('#btn_grid_save').click(function(){
            self.onSave();
        })

        com.x2commerce.common.Util.setupEnterSearch('advertisingWordListForm','btn_list');

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
    onSearch : function(pageIdx, isOpenToast){
        var self = this;
        pageIdx = !pageIdx ? 0 : pageIdx;
        self.grid.cancel();

        var pagingFunc = function(pageIdx){ return self.onSearch(pageIdx,false); };

        var startDate = replaceCalendarString($('#startDate').val());
        var endDate = replaceCalendarString($('#endDate').val());

        var extraQueryString = 'aplyStrDt=' + startDate + '&aplyEndDt=' + endDate;

        this.controller.doQuery(this, extraQueryString, pageIdx, pagingFunc, null, isOpenToast);
    },
    callGoodsPopup : function(){
        var pin = {
            argSelectType: 'N',
            argSaleState: '',
            argGoodsType: ''
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
        popCommon(pin, POP_DATA, this.goodsPopupCallBackFnc.bind(this));
    },
    goodsPopupCallBackFnc : function(e){
        var self = this;
        var grid = self.grid;
        grid.commit();

        var goodsDataList = JSON.parse(e.data);
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
    },
    onSave : function() {
        let self = this;
        let grid = this.grid;
        grid.commit(true);

        var provider = grid.getDataSource();
        var rows = provider.getAllStateRows();

        var check = true , message = '';

        rows.created.forEach(function(row){
            let goodsNo = provider.getValue(row, "goodsNo");
            let goodsNm = provider.getValue(row, "goodsNm");

            let aplyStrDt = provider.getValue(row, "aplyStrDt");
            let aplyEndDt = provider.getValue(row, "aplyEndDt");

            let startDtTime = new Date(aplyStrDt).getTime();
            let endDtTime =  new Date(aplyEndDt).getTime();
            let dateDiff = Math.ceil((endDtTime-startDtTime)/(1000*3600*24));
            let today = new Date();
            today = today.getFullYear() + "-" + addzero(today.getMonth() + 1) + "-" + addzero(today.getDate());

            if(aplyStrDt < today){
                message = `적용시작일은 오늘 이후 날짜부터 지정가능합니다.\n상품 ${goodsNm}(${goodsNo})의 적용시작일을 다시 설정해주세요.`;
                check = false;
                return false;
            }else if(aplyStrDt > aplyEndDt){
                message = `적용종료일이 적용시작일보다 빠릅니다.\n상품 ${goodsNm}(${goodsNo})의 적용종료일을 다시 설정해주세요.`;
                check = false;
                return false;
            }else if(dateDiff > 30){
                message = `적용기간은 최대 30일입니다.\n상품 ${goodsNm}(${goodsNo})의 적용일자를 다시 설정해주세요.`;
                check = false;
                return false;
            }
        });

        if(!check){
            alert(message);
            return;
        }
        self.controller.doSave(self, grid.localId);
    },
    gridEvent : {
        onValidateColumn : function(grid, column, inserting, value, itemIndex, dataRow) {
            let error = {};
            let stat = grid.getDataSource().getRowState(dataRow);
            if ( column.fieldName === "adveWrd" ) {
                let reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
                if (value === undefined || value.trim() === '') {
                    error.level = "error";
                    error.message = "홍보문구" + _msg.requiredCheckMessage;
                } else if (reg.test(value)) {
                    error.level = "error";
                    error.message = advertisingWordListMsg.invalidCharacterInAdveWrdMsg;
                }
            } else if ( column.fieldName === "aplyStrDt" && stat === 'created' ) {
                if (value === undefined || value.trim() === '') {
                    error.level = "error";
                    error.message = "적용시작일자" + _msg.requiredCheckMessage;
                }
            } else if ( column.fieldName === "aplyEndDt" && stat === 'created' ) {
                if (value === undefined || value.trim() === '') {
                    error.level = "error";
                    error.message = "적용종료일자" + _msg.requiredCheckMessage;
                }
            }
            return error;
        },
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            if ( data.succeeded ) {
                openToast(data.message);
                eventHandler.onSearch(0, false);
            } else {
                alert(data.message);
            }
        }
    }
};
