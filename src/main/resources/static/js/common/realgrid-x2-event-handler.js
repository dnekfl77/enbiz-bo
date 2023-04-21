
/*globals $, org */
$.namespace("common.RealGridEventHandler");
common.RealGridEventHandler = {
    onAdd : function(grid, defaultValues) {
		var dataRow = grid.getDataRow(0); // 지정한 그리드 행(itemIndex)의 Row Id 값을 가져온다.
		dataRow = dataRow == -1 ? 0 : dataRow;

		grid.getDataSource().insertRow(dataRow, defaultValues);

		grid.setCurrent({ itemIndex : 0, fieldIndex : 0 }); // 특정 cell에 focus setting
		grid.checkRow(dataRow, true, false);
		// grid.showEditor(); // 현재 showEditor()에 버그가 있음.
	},

	onCancel : function(grid) {
		var provider = grid.getDataSource();
		var localSavePoint = grid.localSavePoint;

		grid.cancel();

		if(localSavePoint === undefined || localSavePoint === -1){
		    //한 번도 조회를 하지 않았다면 savePoint로 rollback하는 것이 불가능하다.
		    //신규 생성된 row들만 제거한다.
    		var createdRows = provider.getAllStateRows().created;

    		for (var index = createdRows.length - 1 ; index >= 0 ; index--){
                var row = createdRows[index];

                provider.setOptions({softDeleting: false});
                provider.removeRow(row);
            }
		}else{
    		grid.getDataSource().rollback(grid.localSavePoint);
    		grid.checkAll(false, true, true); // 그리드의 데이터행을 모두 체크/해제한다.
    		grid.getDataSource().clearRowStates(false, true);
		}
	},

	/**
	 * 특별한 작업 없이 그리드에서 삭제만 하는 경우 사용하는 handler 메소드
	 */
	onDelete : function(grid){
	    var dataProvider = grid.getDataSource();
	    var checkedItems = grid.getCheckedItems();

	    for (var idx = checkedItems.length - 1 ; idx >= 0 ; idx--) {
			var dataRow = grid.getDataRow(checkedItems[idx]);
			var softDelFlag = dataProvider.getRowState(dataRow) == "created" ? false : true;

			if (!softDelFlag){
                grid.cancel();
            }

            dataProvider.setOptions({ softDeleting: softDelFlag });
            dataProvider.removeRow(dataRow);

	    }
	},

	gotoPage : function(event){
	    var pageSelect = event.target;
	    var gridId = pageSelect.id.substring(0, pageSelect.id.indexOf("-"));
//	    var grid = $("#" + gridId).getGridView();
        var grid = com.x2commerce.common.Util.getGridView(gridId);
	    grid.onSearch(this.value - 1);
	},

	rowsPerPageUpdated : function(event){
	    var rowsPerPageSelect = event.target;
	    var gridId = rowsPerPageSelect.id.substring(0, rowsPerPageSelect.id.indexOf("-"));

	    $("#" + gridId + "-select-page").val("1").attr("selected", "selected");

//	    var grid = $("#" + gridId).getGridView();
        var grid = com.x2commerce.common.Util.getGridView(gridId);
        grid.onSearch(0);
	},

	// PageNum Button
	btnPageNum : function(obj, gridName) {
//	    var grid = $("#"+gridName).getGridView();
        var grid = com.x2commerce.common.Util.getGridView(gridName);
		grid.onSearch(parseInt($(obj).val()) - 1);
	},

	// First Button
	btnFirst : function(gridName) {
	    var grid = $("#"+gridName).getGridView();
		grid.onSearch(0);
	},

	// Last Button
	btnLast : function(gridName) {
	    var grid = $("#"+gridName).getGridView();
		grid.onSearch(grid.getPageCount() - 1);
	},

	// Preview Button
	btnPrev : function(gridName) {
	    var grid = $("#"+gridName).getGridView();
		grid.onSearch(grid.getPage() - 1 <= 0 ? 0 : grid.getPage() - 1 );
	},

	// Next Button
	btnNext : function(gridName) {
	    var grid = $("#"+gridName).getGridView();
		grid.onSearch(grid.getPage() + 1 >= grid.pageCount ? grid.pageCount -1 : grid.getPage() + 1);
	},

	// Excel export Button
	onExcelExport : function(grid, fileName, columns) {
		if (columns) {
			var entireColumns = grid.getColumns();

			// set property visible = false
			common.RealGridEventHandler._setInvisible(grid, entireColumns);

			for (var index = columns.length - 1 ; index >= 0 ; index--) {
				grid.setColumnProperty(columns[index], "visible", true);

				var dataIndex = grid.getColumnProperty(columns[index], "dataIndex");
				grid.setColumnProperty(columns[index], "displayIndex", dataIndex);
			}

			setTimeout(function(){
				// export grid
				common.RealGridEventHandler._exportGrid(grid, fileName);
				// set property visible = false
				common.RealGridEventHandler._setInvisible(grid, columns);

				for (var index = entireColumns.length - 1 ; index >= 0 ; index--) {
					grid.setColumnProperty(entireColumns[index], "visible", entireColumns[index].visible);
				}

		    }, 100);

		}else {
			common.RealGridEventHandler._exportGrid(grid, fileName);
		}
	},

	_exportGrid : function(grid, fileName) {
		grid.exportGrid({
			type : "excel",
			target : "local",
			fileName : fileName,
			lookupDisplay : true,
			indicator : "hidden",
			header : "visible",
			footer : "visible",
			compatibility: true
		});
	},

	_setInvisible : function(grid, columns) {
		for (var index = 0 ; index < columns.length ; index++) {
			grid.setColumnProperty(columns[index], "visible", false);
		}
	},

	// Excel export Button _ 해더 리스트
    onExcelHeader : function(grid) {
        var columns = grid.getColumns();
        var columnsHeader = [];
        for(var i=0; i<columns.length; i++) {
            if(columns[i].visible) {
                var data = {};
                data.columns = columns[i].name;
                data.headerText = columns[i].header.text;
                columnsHeader.push(data);
            }
        }
        return columnsHeader;
    },

	onSearchWord : function(grid){
	    var searchValue = $("#" + grid.localId + "-search-input-field").val();
	    var fieldNames = grid.getDataSource().getOrgFieldNames();
	    var values = [];
	    $.each(fieldNames, function(k, v){
	        values.push(searchValue);
	    });

	    var options = {
	        fields : fieldNames,
	        values : values,
	        startIndex : grid.getCurrent().itemIndex == grid.getItemCount() -1 ? 0 : grid.getCurrent().itemIndex + 1,
	        caseSensitive : false,
	        partialMatch : true,
	        wrap : true,
	        allFields : false,
	        select : false
	    };

	    var searchIndex = grid.searchItem(options);
	    if(searchIndex < 0){
	        alert("No Search Result[" + searchValue + "]");
	        return;
	    }

	    grid.setCurrent({itemIndex:searchIndex});
	    grid.setFocus();

	    $("#" + grid.localId + "-search-input-field").focus();
	},

	// 전화번호 정규화
	setCellNum : function(grid, fields){

		var dataResource = grid.getDataSource();
		var gridCount = dataResource.getRowCount();

		for(var i = 0; i<gridCount; i++){

			fields.forEach(function(data, idx){

            	var _phoneNo = grid.getValue(i, data.fieldName);//입력값

				var _regularPhoneNo;//
				//휴대폰
				if(data.fieldType == "cell"){
					if(_phoneNo!=null){
						_regularPhoneNo = _phoneNo.replace(/[^0-9]/g, "").replace(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/, "$1-$2-$3");//휴대폰번호 숫자만
					}else{
						_regularPhoneNo = '';
					}
				}

				//전화번호
				else if(data.fieldType == "tel"){
					if(_phoneNo!=null){
						_regularPhoneNo = _phoneNo.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,"$1-$2-$3").replace("--", "-");//휴대폰번호 숫자만}else{
					}else{
						_regularPhoneNo = '';
					}
				}

				var arryPhoneNo = _regularPhoneNo.split("-");

				grid.getDataSource().setValue(i, data.st1No,		arryPhoneNo[0]);	// 휴대폰구분번호
				grid.getDataSource().setValue(i, data.nd2No,		arryPhoneNo[1]);	// 휴대폰국번번호
				grid.getDataSource().setValue(i, data.rd3No,		arryPhoneNo[2]);	// 휴대폰끝번호
				grid.getDataSource().setValue(i, data.fieldName,	_regularPhoneNo);	// 휴대폰번호
			});
		}
	}
};
