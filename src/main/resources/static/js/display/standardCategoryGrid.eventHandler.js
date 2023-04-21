$.namespace("standardCategoryGrid.eventhandler");
standardCategoryGrid.eventhandler = {
    // 초기화
    init : function ( data ) {
        this.stdCtgNo = data.stdCtgNo;
        this.level = data.level + 1;

        this.gridLoading();
        this.onSearch(0, true);
    }
    // 그리드 추가 옵션 설정
    ,gridLoading : function(){

        //그리드 셀 체크시 색상 변경 기능 추가
        this.grid.onItemChecked = function ( grid, itemIndex, checked ) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function ( grid, item, fixed ) {
            if (item.checked) return 'rg-trcol_active';
        });

        // 2depth 표준분류카테고리인 경우 -> 리프표준분류여부 수정 불가 (최대 depth = 3)
        this.grid.columnByName("leafCtgYn").readOnly = (this.level === 2)? true : false;

		//무결성 체크
        this.grid.editOptions.commitLevel = "error";
		this.grid.onValidateColumn = function(grid, column, inserting, value, itemIndex, dataRow) {
			var error = {};
			var data = grid.getValues(dataRow);
			if (column.fieldName === "stdCtgNm") {
				if (value === undefined || value === null || value === '') {
					error.level = "error";
					error.message = msg.stdCtgNm + msg.requiredCheckMessage;
				}
			} else if(column.fieldName === 'sortSeq'){
				if (value === undefined || value === null || value === '') {
					error.level = "error";
					error.message = msg.sortSeq + msg.requiredCheckMessage;
				}
			}
			return error;
		}
    }

    , onSearch : function (pageNo, isOpenToast) {
        this.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return this.onSearch(pageNo, false); };
        var extraQueryString = '&stdCtgNo=' + this.stdCtgNo;
        this.controller.doQuery(this, extraQueryString, pageNo, pageFunc, null, isOpenToast);
    }

    ,bindButtonEvent : function(){
        var self = this;

        // 행추가 버튼 클릭
        $('#btn_grid_add').click(function(){
            self.onAdd();
        });

        // 행삭제 버튼 클릭
        $('#btn_grid_remove').click(function(){
            self.onDelete();
        });

        // 변경취소 버튼 클릭
        $('#btn_grid_reset').click(function(){
            self.onReset();
        });

        // 저장 버튼 클릭
        $('#btn_grid_save').click(function(){
            self.onSave();
        });

    }
    // 행추가
    ,onAdd : function () {
        var grid = this.grid;

        //표준분류기본정보가 없는 경우
        if(this.stdCtgNo === undefined || this.stdCtgNo === '') return;

        var stdCtgNo = this.generateStdCtgNo(); //신규 표준분류번호 생성
        var uprStdCtgNo = this.stdCtgNo;

        grid.commit(); // 편집중인 행 편집 완료 처리

        var defaultValues = { stdCtgNo: stdCtgNo, useYn: 'Y', sortSeq: 0, leafCtgYn: 'Y', uprStdCtgNo : uprStdCtgNo};

        this.defaultHandler.onAdd(grid, defaultValues);

    }
    // 행삭제
    ,onDelete : function () {
        var grid = this.grid;

        var checkedRows = grid.getCheckedRows();
        if (checkedRows.length == 0) {
            alert(msg.noCheckedRowErrMsg);
            return;
        }

        //행삭제 불가 대상 제외
        this.checkDeletableRows(checkedRows);

        //행삭제 처리
        this.defaultHandler.onDelete(grid);

    }
    // 변경취소
    , onReset : function () {
        alert(msg.gridInit);
        this.defaultHandler.onCancel(this.grid);
    }
    //저장
    , onSave : function(){
		var grid = this.grid;
        grid.commit(true);

        // 데이터 확인
        var dataResource = grid.getDataSource();
        var rowState = dataResource.getAllStateRows();
        var rowList = rowState.created.concat(rowState.updated);
        var indexList = grid.getItemsOfRows(rowList);
        var log = grid.validateCells(indexList,false);
        if(log != null) {
            alert(log[0].message);
            return;
        }

        var result = false;

        var provider = grid.getDataSource();
        var gridCount = provider.getRowCount();
        for(var i = 0 ; i < gridCount ; i++){
            if(grid.isCheckedItem(i)){
                result = true;
                break;
            }
        }
        //선택된 값이 없을 경우
        if(!result){
            alert(msg.noCheckedRowErrMsg);
            return ;
        }

        this.controller.doSave(this, grid.localId);
    }
    // 행추가 표준분류번호 생성
    , generateStdCtgNo : function(){
        var that = this;
        var provider = that.grid.getDataSource();
        var stdCtgNoList = provider.getFieldValues('stdCtgNo',0, provider.getRowCount());
        var seq = [];

        if(stdCtgNoList === null || stdCtgNoList.length === 0){
            return that.stdCtgNo + '01';
        }

        stdCtgNoList.forEach(function(stdCtgNo){
            seq.push(stdCtgNo.substring(that.level * 2));
        });
        return that.stdCtgNo + ((Math.max.apply(null, seq) + 1).toString()).padStart(2,'0');

    }
    // 행 삭제 가능 여부 확인
    , checkDeletableRows : function(checkedRows){

        var that = this;
        var unDeletableRows = [];
        var unDeletableCtgNo = [];
        var provider = that.grid.getDataSource();

        checkedRows.forEach( function (rowNum) {
            var rowData = provider.getJsonRow(rowNum);
            common.Ajax.sendRequestSync(
                "get",
                _baseUrl + "display/standardCategoryMgmt.checkStandardCategoryDelete.do",
                {stdCtgNo : rowData.stdCtgNo},
                function(result){
                    if(!result){
                        unDeletableCtgNo.push(rowData.stdCtgNo);
                        unDeletableRows.push(rowNum);
                    }
                }
            );
        });

        if(unDeletableCtgNo.length > 0){
            that.grid.checkRows(unDeletableRows, false); //체크 해제
            provider.setRowStates(unDeletableRows,'none',true, false); //상태 변경
            alert('선택된 표준분류번호 [ ' + unDeletableCtgNo.join() + msg.checkUnDeletableCtgNoMsg);
        }
    }
    , gridEvent : {
        // 저장 완료후 콜백함수
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0, false);
                standardCategoryTree.eventhandler.treeLoading();
            }
        }
    }
}