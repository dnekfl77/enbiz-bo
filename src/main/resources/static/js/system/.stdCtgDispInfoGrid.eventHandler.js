$.namespace("standardDisplayCategoryConnectGrid.eventhandler");
standardDisplayCategoryConnectGrid.eventhandler = {

	// 초기화
	init : function () {
		this.bindButtonEvent();

	}

	, setting : function (leafCtgYn, stdCtgNo) {
		if("N"==leafCtgYn){
			return;
		}
		this.stdCtgNo = stdCtgNo;
		this.leafCtgYn = leafCtgYn;
		this.gridLoading(0);
    }

	, gridLoading : function(pageNo){

		this.grid.cancel();
		var that = this;
		var extraQueryString = '&stdCtgNo=' + this.stdCtgNo;
		var pageNo = 0;
		var pageFunc = function (pageNo) { return that.gridLoading(pageNo); };

		this.controller.doQuery(that, extraQueryString, pageNo, pageFunc);
    }
	, bindButtonEvent : function(){
		var that = this;

		// 전시카테고리추가 버튼 클릭
		$('#btn_grid_add').click(function(){
			if("Y"!=that.leafCtgYn){
				alert(alertMsg.notLeafRowErrMsg);
				return;
			}
			that.onAdd();
		});

		// 저장 버튼 클릭
		$('#btn_grid_save').click(function(){
			that.onSave();
		});

	}
	// 행추가
	, onAdd : function () {
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
        var dataResource = grid.getDataSource();
        var gridCount = dataResource.getRowCount();

		console.log("resultData::::::::::::::::::", resultData);
        // 수정인 경우만 체크
		for(var j = 0; j<resultData.length; j++) {
			chlContents[j].dispCtgNm= chlContents[j].lrgCtgNm + ' > ' + chlContents[j].midCtgNm + ' > ' + chlContents[j].smlCtgNm//대카>중카>소카
			chlContents[j].useYn= "Y";//사용여부
			chlContents[j].repCtgYn= "N";//대표카테고리
			chlContents[j].stdCtgNo = self.stdCtgNo;//전시카테고리번호

			for(var i = 0; i<gridCount; i++){
				if(chlContents[j].dispCtgNo == self.grid.getValue(i , "dispCtgNo") ) { //추가된 템플릿과 원래 그리드에 있던 템플릿 비교
					chlContents.splice(j,1); // 중복 요소 삭제
				}
			}
		}
        self.grid.getDataSource().addRows(chlContents);
	}

	//저장
	, onSave : function(){
		var grid = this.grid;
		grid.commit();
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
			alert(alertMsg.noCheckedRowErrMsg);
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
			seq.push(stdCtgNo.substring(that.level * 2))
		});
		return that.stdCtgNo + ((Math.max.apply(null, seq) + 1).toString()).padStart(2,'0');;

	}
	, gridEvent : {
		afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
			if(data.succeeded){
				eventHandler.gridLoading(0);
			}
		}

		, onCellEdited : function (grid, itemIndex, dataRow, field) {
			grid.commit();
            var fieldName = grid.getDataSource().getOrgFieldName(field);
			var editValue = grid.getValue(dataRow , "repCtgYn");//변경값

			//대표 카테고리 Y로 변경시 다른Row는 N으로 변경
			if("repCtgYn"==fieldName && "Y"==editValue){
        		var rowCount = grid.getItemCount(); // 원래 그리드에 있던 행의 수
		        //전체 대료카테고리 N으로 변경
		        for(var i = 0; i<rowCount; i++){
					grid.setValue(i , "repCtgYn", "N");
		        }

				//변경 Row "Y" 로 변경
				grid.setValue(dataRow , "repCtgYn", "Y");
			}
		}
	}
}