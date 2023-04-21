$.namespace("standardDisplayCategoryConnectGrid.eventhandler");
standardDisplayCategoryConnectGrid.eventhandler = {

	// 초기화
	init : function () {
        this.gridLoading();
		this.bindButtonEvent();
	}

	, gridLoading : function() {
        //그리드 셀 체크시 색상 변경 기능 추가
        this.grid.onItemChecked = function ( grid, itemIndex, checked ) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function ( grid, item, fixed ) {
            if (item.checked) return 'rg-trcol_active';
        });
	}

	, setting : function (leafCtgYn, stdCtgNo) {
		this.leafCtgYn = leafCtgYn;
		if("N" == leafCtgYn) return;
		this.stdCtgNo = stdCtgNo;
		this.leafCtgYn = leafCtgYn;
		this.onSearch(0, true);
	}

    , onSearch : function(pageIdx,isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
		var param = '&stdCtgNo=' + this.stdCtgNo;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx, false);};
        this.controller.doQuery(this, param, pageIdx, pagingFunc, false, isOpenToast);
    }

	, bindButtonEvent : function(){
		var that = this;

		// 전시카테고리추가 버튼 클릭
		$('#btn_grid_add').click(function(){
			that.onAdd();
		});

		// 저장 버튼 클릭
		$('#btn_grid_save').click(function(){
			if("Y"!=that.leafCtgYn){
				alert(msg.notLeafRowErrMsg);
				return;
			}
			that.onSave();
		});

	}
	// 행추가
	, onAdd : function () {
        if("Y" != this.leafCtgYn){
            alert(msg.notLeafRowErrMsg);
            return;
        }

		var pin = {
			argSelectType: "N"
			, argDispYn: ""
			, argSiteNo: "1"
			, argShopType: "10"
		};
		var POP_DATA = {
			url: _baseUrl + 'popup/displayCategoryMgmtPopup.displayCategoryListPopup.do'
			, winName: 'displayCategoryPopup'
			, title: '전시 카테고리 조회'
			, _title: '전시 카테고리 조회'
			, left: 20
			, top: 20
			, width: 1000
			, height: 700
			, scrollbars: true
			, autoresize: false
		};
		popCommon(pin, POP_DATA, this.popupDisplayCategoryCallback);
	}

	, popupDisplayCategoryCallback : function(e) {
		var self = standardDisplayCategoryConnectGrid.eventhandler;
		self.grid.commit();

		var resultData = JSON.parse(e.data);
		var chlContents = resultData; // 중복을 제거한 값
		var gridCount = grid.getDataSource().getRowCount();

		// 수정인 경우만 체크
		for(var j = 0; j<resultData.length; j++) {
			chlContents[j].dispCtgNm = chlContents[j].lrgCtgNm;
			if(chlContents[j].midCtgNm != null){
			    chlContents[j].dispCtgNm += ' > ' + chlContents[j].midCtgNm;
			}
			if(chlContents[j].smlCtgNm != null){
			    chlContents[j].dispCtgNm += ' > ' + chlContents[j].smlCtgNm;
			}
			chlContents[j].useYn= "Y";
			chlContents[j].repCtgYn= "N";
			chlContents[j].stdCtgNo = self.stdCtgNo;

			var cnt = 0;
			for(var i = 0; i<gridCount; i++){
				if(chlContents[j].dispCtgNo == self.grid.getValue(i , "dispCtgNo") ) { //추가된 템플릿과 원래 그리드에 있던 템플릿 비교
					cnt++;
					chlContents.splice(j,1); // 중복 요소 삭제
				}
			}
			if(cnt > 0){
				alert(msg.dupDispCtgNo);
			}
		}
		self.grid.getDataSource().addRows(chlContents);
	}

	//저장
	, onSave : function(){
		this.grid.commit();

        var dataResource = this.grid.getDataSource();
        var rowCount = this.grid.getItemCount()
        for(var i = 0; i<rowCount; i++){
            if(this.grid.getDataSource().getRowState(i) == "created") {
                this.grid.checkRow(i);
            }
        }

		var result = false;
		for(var i = 0 ; i < dataResource.getRowCount(); i++){
			if(this.grid.isCheckedItem(i)){
				result = true;
				break;
			}
		}

		if(!result){
			alert(msg.noCheckedRowErrMsg);
			return ;
		}

		//전체 대표카테고리 count
		var cnt = 0;
		for(var i = 0; i<rowCount; i++){
			if('Y' == this.grid.getValue(i , "repCtgYn"))
			    cnt++;
		}
		if(cnt == 0){
			alert(msg.noRepCtgYn);
			return;
		}

		this.controller.doSave(this, this.grid.localId);
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
			seq.push(stdCtgNo.substring(that.level * 2))
		});
		return that.stdCtgNo + ((Math.max.apply(null, seq) + 1).toString()).padStart(2,'0');

	}

	, gridEvent : {
		afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
			if(data.succeeded){
				eventHandler.onSearch(0, false);
			}
		}
		, onCellEdited : function (grid, itemIndex, dataRow, field) {
			grid.commit();
			var fieldName = grid.getDataSource().getOrgFieldName(field);
			var editValue = grid.getValue(dataRow , "repCtgYn");//변경값

			//대표 카테고리 Y로 변경시 다른Row는 N으로 변경
			if("repCtgYn" == fieldName && "Y" == editValue){
				if (!confirm(msg.changeRepCtgYn)) return;
				var rowCount = grid.getItemCount(); // 원래 그리드에 있던 행의 수

				//전체 대표카테고리 N으로 변경
				for(var i = 0; i<rowCount; i++){
					grid.setValue(i , "repCtgYn", "N");
				}

				//변경 Row "Y" 로 변경
				grid.setValue(dataRow , "repCtgYn", "Y");
			}
		}
	}
}