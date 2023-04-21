$.namespace("cooperateChannelMasterGrid.eventhandler");
cooperateChannelMasterGrid.eventhandler = {
    //그리드 데이터 조회
    onSearch : function(entrNo){
        const extraQueryString = "entrNo=" + entrNo;
        this.grid.cancel();
        this.controller.doQuery(this, extraQueryString);
    }
    //그리드 데이터 초기화
    ,clearGrid : function () {
        this.grid.cancel();
        this.grid.getDataSource().clearRows();
    }
    //그리드 행추가
    ,onAdd : function() {
        var _self = this;
        var _grid = _self.grid;

        _grid.commit();

        var rowIndex = cooperateChannelGrid.eventhandler.grid.getCurrent().dataRow;
        const entrNo = cooperateChannelGrid.eventhandler.grid.getValue(rowIndex, "entrNo");

        var _defaultValues = { entrNo: entrNo };

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
    // 그리드 저장시 데이터 검증!!
    ,validateInCooperateChannelMasterGrid : function(grid) {
        //수정중인 그리드 상태 commit(즉, 강제완료)으로 한다.
        grid.commit();

        var checkedIndexArr = grid.getCheckedRows();

        if (checkedIndexArr.length == 0) {
            alert(_msg.noSelectedDataMsg);
            return false;
        } else {
            for(var chkRow = 0; chkRow < checkedIndexArr.length; chkRow++) {
                var data = grid.getDataSource().getJsonRow(checkedIndexArr[chkRow]);

                if (data.chlNm == '' || data.chlNm == null) {
                    alert('필수 입력항목 확인 후 다시 시도해주세요.');
                    return false;
                }
                if (data.siteNo == '' || data.siteNo == null) {
                    alert('필수 입력항목 확인 후 다시 시도해주세요.');
                    return false;
                }
                if (data.chlClssCd == '' || data.chlClssCd == null) {
                    alert('필수 입력항목 확인 후 다시 시도해주세요.');
                    return false;
                }
                if (data.chlTypCd == '' || data.chlTypCd == null) {
                    alert('필수 입력항목 확인 후 다시 시도해주세요.');
                    return false;
                }
                //시작날짜와 종료날짜를 비교 common/validate.js
                if(isNotCompareDate(data.aplyStrDt, data.aplyEndDt, true)) {
                    alert('시작일은 종료일 보다 클수 없습니다.');
                    return false;
                }
            }
        }

        return true;
    }
    //그리드 저장
    ,onSave : function() {
        var _grid = this.grid;
        var result = false;
        var _dataResource = _grid.getDataSource();
        var _gridRowCount = _dataResource.getRowCount();

        _grid.commit();

        for(var i = 0; i < _gridRowCount; i++){
            if(_grid.isCheckedItem(i)){
                result = true;
                break;
            }
        }

        if(!result){
            alert(_msg.noSelectedDataMsg);
            return;
        }
        if (this.validateInCooperateChannelMasterGrid(_grid)) {
            this.controller.doSave(this, _grid.localId);
        }
    }

    ,bindButtonEvent: function () {
        var _self = this;

        $('#btn_cooperateChannelMaster_grid_add').click(function() {
            _self.onAdd();
        });
        $('#btn_cooperateChannelMaster_grid_remove').click(function() {
            _self.grid.cancel();
            _self.onDelete();
        });
        $("#btn_cooperateChannelMaster_grid_reset").click(function() {
            _self.onReset();
        });
        $("#btn_cooperateChannelMaster_grid_save").click(function() {
            _self.onSave();
        });
    }

    ,searchCooperateChannelDetail : function(grid, rowIndex){
        cooperateChannelDetailGrid.eventhandler.clearGrid();

        const chlNo = grid.getValue(rowIndex, "chlNo");
        if (chlNo) {
            cooperateChannelDetailGrid.eventhandler.onSearch(chlNo);
        }
    }
    ,gridEvent : {
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            alert(data.message);

            if(data.succeeded){
                var rowIndex = cooperateChannelGrid.eventhandler.grid.getCurrent().dataRow;
                cooperateChannelMasterGrid.eventhandler.clearGrid();
                const entrNo = cooperateChannelGrid.eventhandler.grid.getValue(rowIndex, "entrNo");
                if (entrNo) {
                    eventHandler.onSearch(entrNo);
                }
            }
        }
        ,onCurrentRowChanged : function(grid, oldRow, newRow) {
            var rowIndex = grid.getCurrent().dataRow;
            cooperateChannelMasterGrid.eventhandler.searchCooperateChannelDetail(grid, rowIndex);
        }
        ,onCellEdited : function (grid, itemIndex, row, field) {
            if (field === 3) {
                common.Ajax.sendRequest("GET"
                    , _baseUrl + "vendor/getStStdCdByMixedCodeRef1Val.do"
                    , { code : 'CH002', referCode : grid.getValue(row, "chlClssCd")}
                    , function ( response ) {
                        var cell = grid.columnByName('chlTypCd');
                        var defaultValue = "";

                        var values = [];
                        var labels = [];
                        for(var  i = 0; i < response.data.CH002.length; i++ ) {
                            if (i === 0 ) defaultValue = response.data.CH002[i].code;

                            values.push(response.data.CH002[i].cd);
                            labels.push(response.data.CH002[i].cdNm);
                        }

                        cell.values = values;
                        cell.labels = labels;
                        grid.setColumn(cell);
                        grid.setValue(row, 'chlTypCd', defaultValue);
                    }
                );
            }
		}
    }
};