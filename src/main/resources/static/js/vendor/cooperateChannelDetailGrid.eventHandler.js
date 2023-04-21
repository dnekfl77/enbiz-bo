$.namespace("cooperateChannelDetailGrid.eventhandler");
cooperateChannelDetailGrid.eventhandler = {
    //그리드 데이터 조회
    onSearch : function(chlNo){
        const extraQueryString = "chlNo=" + chlNo;
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

        var rowIndex = cooperateChannelMasterGrid.eventhandler.grid.getCurrent().dataRow;
        const chlNo = cooperateChannelMasterGrid.eventhandler.grid.getValue(rowIndex, "chlNo");

        var _defaultValues = { chlNo : chlNo, useYn:'Y' };

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
    ,validateInCooperateChannelDetailGrid : function(grid) {
        //수정중인 그리드 상태 commit(즉, 강제완료)으로 한다.
        grid.commit();

        var checkedIndexArr = grid.getCheckedRows();

        if (checkedIndexArr.length == 0) {
            alert(_msg.noSelectedDataMsg);
            return false;
        } else {
            for(var chkRow = 0; chkRow < checkedIndexArr.length; chkRow++) {
                var data = grid.getDataSource().getJsonRow(checkedIndexArr[chkRow]);

                if (data.chlDtlNm == '' || data.chlDtlNm == null) {
                    alert('필수 입력항목 확인 후 다시 시도해주세요.');
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
            alert(_messageNotCheckedData);
            return;
        }
        if (this.validateInCooperateChannelDetailGrid(_grid)) {
            this.controller.doSave(this, _grid.localId);
        }
    }

    ,bindButtonEvent: function () {
        var _self = this;

        $('#btn_cooperateChannelDetail_grid_add').click(function() {
            _self.onAdd();
        });
        $('#btn_cooperateChannelDetail_grid_remove').click(function() {
            _self.grid.cancel();
            _self.onDelete();
        });
        $("#btn_cooperateChannelDetail_grid_reset").click(function() {
            _self.onReset();
        });
        $("#btn_cooperateChannelDetail_grid_save").click(function() {
            _self.onSave();
        });
    }

    ,gridEvent : {
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            alert(data.message);

            if(data.succeeded){
                var rowIndex = cooperateChannelMasterGrid.eventhandler.grid.getCurrent().dataRow;
                cooperateChannelDetailGrid.eventhandler.clearGrid();
                const chlNo = cooperateChannelMasterGrid.eventhandler.grid.getValue(rowIndex, "chlNo");
                if (chlNo) {
                    eventHandler.onSearch(chlNo);
                }
            }
        }
    }
};