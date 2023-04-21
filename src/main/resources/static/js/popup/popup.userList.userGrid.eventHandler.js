$.namespace("userGrid.eventhandler");
userGrid.eventhandler = {

    // 초기화
    init : function () {
        this.argCheck();
        this.gridLoading();
        this.bindButtonEvent();
    },

    bindButtonEvent : function(){

        var self = this;

        $('#btn_popup_list').click(function() {
            self.onSearch(0, true);
        });

        $('#btn_popup_init').click(function() {
            $('#userGridForm')[0].reset();
        });

        $("#userGridForm").keypress(function (e){
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
        if ( (_gridType != '1' && _gridType != 'N')
            || (_argWorkStatCd != '01' && _argWorkStatCd != '02')
            || (_argUseYn != 'Y' && _argUseYn != 'N')
           ) {
            alert(_msg.invalidAccessMsg);
            window.close();
        }
    },
    onSearch : function(pageIdx, isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx, false);};

        var part = $('#part').val();
        var input = $('#userText').val();

        var extraQueryString;
        if(part==='00'){
            extraQueryString = 'userNm=' + input + '&userId=' + '';
        }else{
            extraQueryString = 'userNm=' + '' + '&userId=' + input;
        }
        extraQueryString += '&useYn='+ _argUseYn + '&' + 'workStatCd='+ _argWorkStatCd + '&userGbCd=';
        this.controller.doQuery(this,extraQueryString,pageIdx, pagingFunc, null, isOpenToast);
    },
    gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
        },
        onCellDblClicked : function(grid, clickData) {
            if ( clickData.cellType === 'gridEmpty' ) return;
            userGrid.eventhandler.returnData(clickData.dataRow);
        }
    },
    // 적용
    onApply : function () {

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
                  userId : row.userId
                , userNm : row.userNm
                , workStatCd : row.workStatCd
                , useYn : (row.useYn === '사용') ? 'Y' : 'N'
                , deptNm : row.deptNm
                , orgTypNm : row.orgTypNm
                , workStatNm : row.workStatNm
            });
        }

        if ( $.isArray(data) ) {
            data.forEach(i => putReturnData(i));
        } else {
            putReturnData(data);
        }

        window.postMessage(JSON.stringify(returnData), _baseUrl);
        window.close();
    },
};