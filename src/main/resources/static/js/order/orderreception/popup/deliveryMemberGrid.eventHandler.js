var alertMsg = x2coMessage.getMessage( {
	gridInit				: "orderReception.message.gridInit"				// 그리드 작업을 초기화 합니다.
	, gridNoSelected		: "orderReception.message.gridNoSelected"		// 선택된 Row가 없습니다.
	, gridSave				: "orderReception.message.gridSave"				// 저장하시겠습니까?
	, cancelMessage			: "orderReception.message.cancelMessage"			// 취소하시겠습니까?
	, save					: "orderReception.message.save"					// 저장하시겠습니까?
	, dlvpNm                : "orderReception.deliveryPopup.msg.error.dlvpNm"
	, rcvmnNm               : "orderReception.deliveryPopup.msg.error.rcvmnNm"
	, zipNo                 : "orderReception.deliveryPopup.msg.error.zipNo"
	, zipAddr               : "orderReception.deliveryPopup.msg.error.zipAddr"
	, dtlAddr               : "orderReception.deliveryPopup.msg.error.dtlAddr"
	, cellNo                : "orderReception.deliveryPopup.msg.error.cellNo"
	, cellSctNo             : "orderReception.deliveryPopup.msg.error.cellSctNo"
	, cellTxnoNo            : "orderReception.deliveryPopup.msg.error.cellTxnoNo"
	, cellEndNo             : "orderReception.deliveryPopup.msg.error.cellEndNo"
	, telRgnNo              : "orderReception.deliveryPopup.msg.error.telRgnNo"
	, telTxnoNo             : "orderReception.deliveryPopup.msg.error.telTxnoNo"
	, telEndNo              : "orderReception.deliveryPopup.msg.error.telEndNo"
	, userSortSeq           : "orderReception.deliveryPopup.msg.error.userSortSeq"
	, baseDlvpYn            : "orderReception.deliveryPopup.msg.error.baseDlvpYn"
	, apply                 : "orderReception.deliveryPopup.msg.error.apply"
	, applySuccess          : "orderReception.message.applySuccess"
});

$.namespace("deliveryMemberGrid.eventhandler");
deliveryMemberGrid.eventhandler = {
	// 초기화
	init : function () {
		//this.grid.setColumnProperty("zipNo", "buttonVisibility", "always");
		this.grid.setEditOptions({ commitLevel : 'error' });
		this.bindButtonEvent();
		this.onSearch();
	}

	//그리드 데이터 조회
	, onSearch : function(){
		this.grid.cancel();
		this.controller.doQuery(this);
	}

	//버튼 이벤트
	, bindButtonEvent : function(){
		var self = this;

		// 행추가
		$("#btnGridAdd").click(function() {
			self.onAdd();
		});

		// 변경취소
		$("#btnGridReset").click(function() {
			self.onReset();
		});

		// 저장
		$("#btnGridSave").click(function() {
			if(!self.validation()){
				return;
			}
			self.onSave();
		});

		// 닫기
		$("#btn_popup_close").click(function() {
			window.close();
		});


		// 적용
		$("#btn_popup_apply").click(function(){

			var grid = self.grid;
			var dataResource = grid.getDataSource();
			var checkedRows = grid.getCheckedRows();
			var checkedDataSourceRows = grid.getItemsOfRows(checkedRows);

			if(checkedRows.length <=0 ){
				alert(alertMsg.gridNoSelected);
				return;
			}

			if(!self.validationApply()){
				alert(alertMsg.apply);
				return false;
			}

			var isApply = true;
			var returnList = [];
			checkedDataSourceRows.forEach(function(row){
				var s_dataRow= self.grid.getDataRow(row);
				if(dataResource.getRowState(s_dataRow) === "created"){
					isApply = false;
				}

				if(dataResource.getValue(s_dataRow, "useYn") === 'N'){
					isApply = false;
				}

				var returnData = {};
				returnData.mbrDlvpSeq		= dataResource.getValue(s_dataRow, "mbrDlvpSeq");	//회원 배송지 순번
				returnData.dlvpNm			= dataResource.getValue(s_dataRow, "dlvpNm");   //배송지명
				returnData.rcvmnNm			= dataResource.getValue(s_dataRow, "rcvmnNm");   //수취인명
				returnData.cellSctNo		= dataResource.getValue(s_dataRow, "cellSctNo");   //휴대폰구분번호
				returnData.cellTxnoNo		= dataResource.getValue(s_dataRow, "cellTxnoNo");   //휴대폰국번번호
				returnData.cellEndNo		= dataResource.getValue(s_dataRow, "cellEndNo");   //휴대폰끝번호
				returnData.zipNoSeq			= dataResource.getValue(s_dataRow, "zipNoSeq");   //우편번호순번
				returnData.zipNo			= dataResource.getValue(s_dataRow, "zipNo");   //우편번호
				returnData.zipAddr			= dataResource.getValue(s_dataRow, "zipAddr");   //우편주소
				returnData.dtlAddr			= dataResource.getValue(s_dataRow, "dtlAddr");   //상세주소
				returnData.dlvpAddr			= dataResource.getValue(s_dataRow, "dlvpAddr");	//배송지 주소
				returnData.deliMsg			= dataResource.getValue(s_dataRow, "deliMsg");	//배송메시지
				returnList.push(returnData);
			})
			window.postMessage(JSON.stringify(returnList), _baseUrl);
			alert(alertMsg.applySuccess);
		});


		//우편번호 팝업
		self.grid.onCellButtonClicked = function (grid, itemIndex, column) {
			self.popupZipNoList(grid, itemIndex, column);
		};
	}

	// 행추가
	, onAdd : function() {
		var self = this;
		var grid = self.grid;

		grid.commit();

		//기본항목: 회원ID, 기본배송지(N), 사용여부(사용), 정렬순서(그리드 Row 갯수)
		var defaultValues = { mbrNo: $("#mbrNo").val(), baseDlvpYn: "N", useYn: "Y", userSortSeq: grid.getItemCount()+1};

		self.defaultHandler.onAdd(grid, defaultValues);
	}

	// 변경취소
	, onReset : function() {
		alert(alertMsg.gridInit);
		var self = this;
		var grid = self.grid;

		self.defaultHandler.onCancel(grid);
	}

	//저장
	, onSave : function() {
		var grid = this.grid;
		// var fields = [
		// 	{ fieldName : "cellNo" , fieldType : "cell", st1No:"cellSctNo", nd2No:"cellTxnoNo", rd3No:"cellEndNo" }
		// 	, { fieldName : "telNo" , fieldType : "tel", st1No:"telRgnNo",	nd2No:"telTxnoNo", 	rd3No:"telEndNo"  }
		// ];
		// this.defaultHandler.setCellNum(grid, fields);

		this.controller.doSave(this, grid.localId);
	}

	//우편번호 팝업
	, popupZipNoList : function(grid, index, col){

		var pin = {
			argSelectType: 1
		};
		var POP_DATA = {
			url: '/popup/zipCodeMgmtPopup.zipNoListPopup.do'
			, winName: 'zipNoListPopup'
			, title: '우편번호 조회'
			, _title: '우편번호 조회'
			, left: 20
			, top: 20
			, width: 660
			, height: 800
			, scrollbars: false
			, autoresize: false
		};
		var callback = function(e) {
			var zipObj = [];
			zipObj = JSON.parse(e.data)[0];
			var row = grid.getDataRow(index.itemIndex);
			grid.commit();
			grid.getDataSource().setValue(row, "zipNo", zipObj.zipNo);//우편번호
			grid.getDataSource().setValue(row, "zipAddr", zipObj.address);//기본주소
			grid.getDataSource().setValue(row, "zipNoSeq", zipObj.zipNoSeq );//우편번호순번
		};
		popCommon(pin, POP_DATA, callback);
	}

	, validation : function(){
		grid.commit();
		var dataProvider = this.grid.getDataSource();


		var count = this.grid.getItemCount();
		var baseDlvpYn = 0;

		for(var index=0; index < count; index++) {

			var row = self.grid.getDataRow(index);

			if(dataProvider.getValue(row, "baseDlvpYn") === 'Y'){
				baseDlvpYn++;
			}

			if(!this.grid.isCheckedItem(index)){
				continue;
			}

			if(isEmptyValue(dataProvider.getValue(row, "cellSctNo"))){
				alert(alertMsg.cellSctNo);
				return false;
			}

			if(isEmptyValue(dataProvider.getValue(row, "cellTxnoNo"))){
				alert(alertMsg.cellTxnoNo);
				return false;
			}

			if(isEmptyValue(dataProvider.getValue(row, "cellEndNo"))){
				alert(alertMsg.cellEndNo);
				return false;
			}

			/*전화번호 입력했을경우*/
			if(!isEmptyValue(dataProvider.getValue(row, "telNo"))){

				if(isEmptyValue(dataProvider.getValue(row, "telRgnNo"))){
					alert(alertMsg.telRgnNo);
					return false;
				}

				if(isEmptyValue(dataProvider.getValue(row, "telTxnoNo"))){
					alert(alertMsg.telTxnoNo);
					return false;
				}

				if(isEmptyValue(dataProvider.getValue(row, "telEndNo"))){
					alert(alertMsg.telEndNo);
					return false;
				}

			}
		}

		if(baseDlvpYn !== 1 ){
			alert(alertMsg.baseDlvpYn);
			return false;
		}


		return true;
	}
	, validationApply : function(){
		var grid = this.grid;
		grid.commit();

		var dataResource = grid.getDataSource();
		var checkedRows = grid.getCheckedRows();
		var checkedDataSourceRows = grid.getItemsOfRows(checkedRows);

		var isApply = true;

		checkedDataSourceRows.forEach(function(row){
			var s_dataRow= self.grid.getDataRow(row);
			if(dataResource.getRowState(s_dataRow) === "created"){
				isApply = false;
			}

			if(dataResource.getValue(s_dataRow, "useYn") === 'N'){
				isApply = false;
			}
		})

		return isApply;
	}

	// Grid 이벤트 처리
	, gridEvent : {

		onValidateColumn : function(grid, column, inserting, value, itemIndex, dataRow) {
			var error = {};

			if (column.fieldName === "dlvpNm") {
				if (value === undefined || value === null || value.trim() === '') {
					error.level = "error";
					error.message = alertMsg.dlvpNm;
				}
			} else if(column.fieldName === 'rcvmnNm') {
				if (value === undefined || value === null || value.trim() === '') {
					error.level = "error";
					error.message = alertMsg.rcvmnNm;
				}
			}else if(column.fieldName === 'zipAddr') {
				if (value === undefined || value === null || value.trim() === '') {
					error.level = "error";
					error.message = alertMsg.zipAddr;
				}
			}else if(column.fieldName === 'dtlAddr') {
				if (value === undefined || value === null || value.trim() === '') {
					error.level = "error";
					error.message = alertMsg.dtlAddr;
				}
			}else if(column.fieldName === 'cellNo') {
				if (value === undefined || value === null || value.trim() === '') {
					error.level = "error";
					error.message = alertMsg.cellNo;
				}
			}else if(column.fieldName === 'userSortSeq') {
				if (value === undefined || value === null || isNaN(value)) {
					error.level = "error";
					error.message = alertMsg.userSortSeq;
				}
			}

			return error;
		},

		onCellEdited : function (grid, itemIndex, dataRow, field) {
			var dataProvider = grid.getDataSource();
			var fieldName = dataProvider.getFieldName(field).toUpperCase();

			var row = dataRow;

			if(fieldName === "BASEDLVPYN"){
				grid.commit();
				var count = grid.getItemCount();

				for (var i = count - 1 ; i >= 0 ; i--) {
					var tempRow = grid.getDataRow(i);

					if(row === tempRow){
						continue;
					}

					if(dataProvider.getValue(row, "baseDlvpYn") === 'Y' ){
						dataProvider.setValue(tempRow, "baseDlvpYn", "N");	// 휴대폰끝번호
					}

				}
			}


			//휴대폰
			if(fieldName === "CELLNO"){

				grid.commit();
				if(dataProvider.getValue(row, "cellNo") === null || dataProvider.getValue(row, "cellNo") === undefined ||  dataProvider.getValue(row, "cellNo") === ""){
					return;
				}

				var valueNum = dataProvider.getValue(row, "cellNo").replace(/[^0-9]/g, "").replace(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/, "$1-$2-$3");//휴대폰번호 숫자만
				var arrayValueNum = valueNum.split("-");

				if(arrayValueNum.length === 3){
					dataProvider.setValue(row, "cellSctNo", arrayValueNum[0]);	// 휴대폰구분번호
					dataProvider.setValue(row, "cellTxnoNo", arrayValueNum[1]);	// 휴대폰국번번호
					dataProvider.setValue(row, "cellEndNo", arrayValueNum[2]);	// 휴대폰끝번호
					dataProvider.setValue(row, "cellNo", valueNum);				// 휴대폰끝번호
				}else{
					dataProvider.setValue(row, "cellSctNo", null);	// 휴대폰구분번호
					dataProvider.setValue(row, "cellTxnoNo", null);	// 휴대폰국번번호
					dataProvider.setValue(row, "cellEndNo",null);	// 휴대폰끝번호
				}

			}

			//전화번호
			if(fieldName === "TELNO"){

				grid.commit();
				if(dataProvider.getValue(row, "telNo") === null || dataProvider.getValue(row, "telNo") === undefined ||  dataProvider.getValue(row, "telNo") === ""){
					return;
				}

				var valueNum = dataProvider.getValue(row, "telNo").replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,"$1-$2-$3").replace("--", "-");//휴대폰번호 숫자만
				var arrayValueNum = valueNum.split("-");

				if(arrayValueNum.length === 3) {
					dataProvider.setValue(row, "telRgnNo", arrayValueNum[0]);	// 전화지역번호
					dataProvider.setValue(row, "telTxnoNo", arrayValueNum[1]);	// 전화국번번호
					dataProvider.setValue(row, "telEndNo", arrayValueNum[2]);	// 전화끝번호
					dataProvider.setValue(row, "telNo", valueNum);				// 전화번호
				}else{
					dataProvider.setValue(row, "telRgnNo", null);	// 전화지역번호
					dataProvider.setValue(row, "telTxnoNo", null);	// 전화국번번호
					dataProvider.setValue(row, "telEndNo", null);	// 전화끝번호
				}

			}
		}

		// 조회 콜백함수
		,afterQuerySuccess : function (grid, data) {
			if(data.payloads.length <= 0){
				return false;
			}
			opener.goodsGrid.eventhandler.setDlvpObject(data.payloads);//배송지 목록 변경
		}

		// 저장 콜백함수
		, afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
			alert(data.message);
			if(data.succeeded){
				eventHandler.onSearch();
			}
		}
	}
};