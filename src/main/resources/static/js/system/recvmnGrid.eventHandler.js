$.namespace("recvmnGrid.eventhandler");
recvmnGrid.eventhandler = {
	init : function() {
		this.bindButtonEvent();
		this.gridSetting();
	}
    , bindButtonEvent : function(){
        var self = this;

        $('#btn_grid_mn_add').click(function() {
            self.onAdd();
        });

        $('#btn_grid_mn_remove').click(function(){
			self.grid.cancel();
            self.onDelete();
        });

        $('#btn_grid_mn_save').click(function() {
            self.onSave();
        });

        $('#btn_grid_mn_reset').click(function(){
            self.onReset();
        });
    }
    , gridSetting : function () {
        this.grid.onItemChecked = function ( grid, itemIndex, checked ) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function ( grid, item, fixed ) {
            if (item.checked) return 'rg-trcol_active';
        });
    }
    ,gridEvent : {
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0);
           }
        },
        onEditCommit : function (grid, index, oldValue, newValue) {
            if(index.column == "grpCd"){
                if(!isAlphanumeric(newValue)) {
                    if(oldValue===undefined) {
                        gcGrid.eventhandler.grid.setValue(index.dataRow, "grpCd", "");
                    }else{
                        gcGrid.eventhandler.grid.setValue(index.dataRow, "grpCd", oldValue);
                    }
                    grid.commit();
                    return true;
                }
            }
        },
        onRowCountChanged : function (provider, count) {
            $('#recvmnGrid-totalcount').text(count);
        }
    }
	,onSearch : function(pageIdx){
        var self = this;
	    var grid = this.grid;
	    var provider = grid.getDataSource();

        grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;

        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};

		$('#recvmnGrid_recvGrpNo').val(this.recvGrpNo);

		if(this.recvGrpNo){
            this.controller.doQuery(this,"",pageIdx, pagingFunc);
        }else{
            provider.clearRows();
            grid.localSavePoint = provider.savePoint(true);
        }
    }
    ,onAdd : function() {		//수신자추가
        if(this.recvGrpNo == null){		//수신그룹이 선택되지 않았을 경우
        	alert(recvmnValidMsg._recvGrpUnSelectedMessage);
        	return false;
        }

        var pin = {
            argSelectType: '1'
            , argWorkStatCd: '01'
            , argUseYn: 'Y'
        };
        var POP_DATA = {	//사용자 조회 팝업 호출
            url: _baseUrl + 'popup/userMgmtPopup.userListPopup.do'
            , winName: 'userListPopup'
            , title: '사용자 조회'
            , _title: '사용자 조회'
            , left: 20
            , top: 20
            , width: 900
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.popupUserListCallback.bind(this));
	}
    ,popupUserListCallback : function(e){	//팝업에서 선택한 user 정보를 수신자목록 grid 에 setting
    	var self = this;
    	var grid = self.grid;
    	grid.commit();
        var resultData = JSON.parse(e.data);
		resultData[0].recvGrpNo = $("#recvmnGrid_recvGrpNo").val();		//사용자가 선택했던 상위값(수신그룹번호)을 invisible 필드에 세팅
		resultData[0].jobGrpNm = resultData[0].orgTypNm;	//업무그룹명 변수명 변경
		self.defaultHandler.onAdd(grid, resultData[0]);
   }
	,onDelete : function() {
        var self = this;
        var grid = self.grid;
        var checkedItems = grid.getCheckedItems();
        if (checkedItems.length == 0) {
            alert(recvmnValidMsg._rowChkMsg);
            return;
        }
        self.defaultHandler.onDelete(grid);
    }
    ,onReset : function() {
        this.defaultHandler.onCancel(this.grid);
    }
    ,onSave : function() {
        var grid = this.grid;
        var dataResource = grid.getDataSource();
        var gridCount = dataResource.getRowCount();

        for(i = 0; i < gridCount; i++) {
            var userId = grid.getValue(i, "userId");
            for(var j = 0; j<gridCount; j++){
                var userId2 = grid.getValue(j, "userId");
                if(i===j){
                    continue;
                }
                if(userId === userId2){
                    alert('['+userId+'] ' + recvmnValidMsg._recvmnUserDuplicateMsg);
                    return;
                }
            }
        }

        this.controller.doSave(this, grid.localId);
    }
};