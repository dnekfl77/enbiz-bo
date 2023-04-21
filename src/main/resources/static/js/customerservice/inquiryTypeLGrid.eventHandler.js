$.namespace("inquiryTypeLGrid.eventhandler");
inquiryTypeLGrid.eventhandler = {

    alertMessage : x2coMessage.getMessage( {
        custInqTypNm : 'inquiryTypeMgmt.gridL.message.custInqTypNm',
        sortSeq      : 'inquiryTypeMgmt.gridL.message.sortSeq'
    }),

    // 초기화
    init : function () {
        this.bindButtonEvent();
    },

    bindButtonEvent : function(){
        var self = this;

        $('#btn_grid_add').click(function(){
            self.onAdd();
        })

        $('#btn_grid_reset').click(function(){
            self.onReset();
        })

        $('#btn_grid_save').click(function(){
            self.onSave();
        })

        $('#btn_search').click(function(){
            self.onSearch(0,true);
        })

        $('#btn_init').click(function(){
            $('#inquiryTypeGridForm')[0].reset();
        })
    },
    onSearch : function(pageIdx,isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};
        var extraQueryString;
        // = 'uprCnslTypNo='+this.uprCnslTypNo;
        this.controller.doQuery(this,extraQueryString,pageIdx, pagingFunc,false,isOpenToast);
    }
    // 행추가
    ,onAdd : function () {
        var grid = this.grid;
        grid.commit(); // 편집중인 행 편집 완료 처리
        var defaultValues = {
            useYn : 'N'
        };
        this.defaultHandler.onAdd(grid, defaultValues);
    },
    onSave : function() {
        var grid = this.grid;
        grid.commit();
        var result = false;

        var dataResource = grid.getDataSource();
        var gridCount = dataResource.getRowCount();
        for(var i = 0; i<gridCount; i++){
            var _custInqTypNm = grid.getValue(i,"custInqTypNm");
            var _sortSeq   = grid.getValue(i,"sortSeq");
            if(_custInqTypNm === undefined || _custInqTypNm === ''){
                alert(this.alertMessage.custInqTypNm);
                return;
            }else if(_sortSeq === undefined || _sortSeq === NaN){
                alert(this.alertMessage.sortSeq);
                return;
            }

            if(grid.isCheckedItem(i)){
                result = true;
                break;
            }
        }
        if(!result){
            alert(_msg.noSelectedDataMsg);
            return ;
        }

        this.controller.doSave(this, grid.localId);
    },
    onReset : function() {
        this.defaultHandler.onCancel(this.grid);
    },
    gridEvent : {
        onCurrentRowChanged(grid, oldRow, newRow) {
            var itemIndex = grid.getCurrent().dataRow;
            var rowState = itemIndex > -1 ?grid.getDataSource().getRowState(itemIndex) : '';
            if(rowState === "created" || rowState === '' ){
                inquiryTypeSGrid.eventhandler.uprCustInqTypCd = undefined;
            }else{
                var data = grid.getDataSource().getJsonRow(itemIndex);
                inquiryTypeSGrid.eventhandler.uprCustInqTypCd = data.custInqTypCd;
            }
            inquiryTypeSGrid.eventhandler.onSearch(0);
        },
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
                inquiryTypeLGrid.eventhandler.onSearch(0);
            }
        },
    }
};
