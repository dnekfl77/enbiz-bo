$.namespace("etGrid.eventhandler");
etGrid.eventhandler = {
    // 초기화
    init : function () {
        this.argCheck();
        this.gridLoading();
        this.bindButtonEvent();
    }
    // 적용
    ,onApply : function () {

        if ( _gridType === '1' ) {
            var rowIndex = this.grid.getCurrent().dataRow;
            if ( rowIndex === -1 ) {
                alert(_msg.noSelectedDataMsg);
                return;
            }
            this.returnData( rowIndex );

        } else {
            var rowIndexList = this.grid.getCheckedRows();
            if ( !rowIndexList.length ) {
                alert(_msg.noSelectedDataMsg);
                return;
            }
            this.returnData(rowIndexList);
        }
    }
    ,returnData : function ( data ) {

        var grid = this.grid;
        var provider = grid.getDataSource();

        var returnData = [];
        var putReturnData = function ( dataRow ) {
            var row = provider.getJsonRow( dataRow );
            returnData.push({
                 entrNo : row.entrNo
                ,entrNm : row.entrNm
                ,entrGbCd : row.entrGbCd
                ,trdStatCd : row.trdStatCd
            });
        }

        if ( $.isArray(data) ) {
            data.forEach(i => putReturnData(i));
        } else {
            putReturnData(data);
        }

        window.postMessage(JSON.stringify(returnData), _baseUrl);
        window.close();
    }
    ,bindButtonEvent : function(){
        var self = this;

        $(".entrNoInput").on("propertychange change keyup paste input", function() {
            var currentVal = $(this).val();
            $(this).val(onlyInputNumber(currentVal))
        });

        $('#btn_popup_list').click(function() {
            self.onSearch(0, true);
        });

        $('#btn_popup_init').click(function() {
            $('#etEntrBaseListGridForm')[0].reset();
        });

        $("#etEntrBaseListGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_popup_list').click();
                window.event.returnValue=false;
            }
        });

        $('#btn_popup_apply').click(function(){
            self.onApply();
        });

        $("#btn_popup_close").click(function() {
            window.close();
        });
    }
    ,gridLoading : function(){
        // 그리드 셀 수정 불가 설정
        grid.setEditOptions({ editable: false })

        //그리드 셀 체크시 색상 변경 기능 설정
        grid.onItemChecked = function(grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex })
        }
        grid.setRowStyleCallback(function(grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active'
            }
        })
    }
    ,argCheck : function(){
        if (_gridType != '1' && _gridType != 'N') {
            alert(_msg.invalidAccessMsg);
            window.close();
        }
    }
    ,onSearch : function(pageIdx, isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx, false);};
        this.controller.doQuery(this,"",pageIdx, pagingFunc, null, isOpenToast);
    }
    ,gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
        }
        ,onCellDblClicked : function(grid, clickData) {
            if ( clickData.cellType === 'gridEmpty' ) return;
            etGrid.eventhandler.returnData(clickData.dataRow);
        }
    }
};