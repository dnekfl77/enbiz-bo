$.namespace("zipNoListGrid.eventhandler");
zipNoListGrid.eventhandler = {

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
            returnData.push(provider.getJsonRow( dataRow ));
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

        $('#btn_popup_list').click(function() {
            var roadNmParams = $('#zipNoRoadNm').val().trim();
            if(!roadNmParams){
                alert(_checkMsg.roadNm)
                return
            }
            self.onSearch(0,true);
        });

        $('#btn_popup_init').click(function() {
            $('#zipNoGridListForm')[0].reset();
        });

        $("#zipNoGridListForm").keypress(function (e){
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

    },
    gridLoading : function(){

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
    },
    argCheck : function(){
        if ( _gridType != '1' && _gridType != 'N'){
            alert(_msg.invalidAccessMsg);
            window.close();
        }
    },
    onSearch : function(pageIdx,isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};

        var roadNmParams = $('#zipNoRoadNm').val().split(' ');
        var param1 = '';
        var param2 = '';
        var extraQueryString;

        if(roadNmParams.length > 1){
            param2 = roadNmParams[1];
        }

        param1 = roadNmParams[0];
        extraQueryString = 'param1='+ param1 + '&param2='+ param2;
        this.controller.doQuery(this,extraQueryString,pageIdx, pagingFunc,false,isOpenToast);
    },
    gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
        }
        ,onCellDblClicked : function(grid, clickData) {
            if ( clickData.cellType === 'gridEmpty' ) return;
            zipNoListGrid.eventhandler.returnData(clickData.dataRow);
        }
    }
};