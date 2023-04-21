$.namespace("menuUserStatusGrid.eventhandler");
menuUserStatusGrid.eventhandler = {
	init : function () {
		this.setGrid();
		this.setCalendar();
		this.bindButtonEvent();
	},

	setGrid : function () {
		this.grid.setEditOptions({ editable : false });
	},

	setCalendar : function( term ){
		term = !term ? 7 : term;
		$('#_sch_date_term-button').val(term).prop('selected', true);

		var initFromAndToCalDate = recentlyCalenderData(term);
		$('#useStrtDtm').val(initFromAndToCalDate[0]);
		$('#userEndDtm').val(initFromAndToCalDate[1]);
	},

	bindButtonEvent : function() {
		let self = this;

		$('#_sch_date_st-button').click( function () {
			showCalendar({
				type:'A',
				format:'yyyy-MM-dd',
				yyyymmdd1:$('#useStrtDtm').val(),
				yyyymmdd2:$('#userEndDtm').val(),
				fn:function(pin) {
					$('#useStrtDtm').val(pin.yyyymmdd1);
					$('#userEndDtm').val(pin.yyyymmdd2);
				}
			});
		});

		$('#_sch_date_term-button').change( function () {
			self.setCalendar($(this).val());
		});

		$("#btn_search").click(function() {
			let isMenuUseStatusChecked = self.getStatusType() === "10";
			isMenuUseStatusChecked ? $("#userId").val("") : $("#userId").val($("#userIdOld").val());

			self.onSearch(0,true);
		});

		$("#btn_init").click(function() {
			$("#menuUserStatusGridForm")[0].reset();
			$("input[type='hidden']").val("");

			self.bindUserButtonClass();
			self.setCalendar();
		});

		$("#menuUserStatusGridForm").keypress(function (e) {
			if (e.which == 13){
				$('#btn_search').click();
				window.event.returnValue = false;
			}
		});

		$("#btn_user_search").click(function() {
			let isMenuUseStatusChecked = self.getStatusType() === "10";

			if(isMenuUseStatusChecked) {
				return false;
			}

			self.callUserSearchPopup();
		});

		$("#btn_user_clear").click(function() {
			$("#userId").val("");
			$("#userIdOld").val("");
			$("#userNm").val("");
		});

		$("input[name='status-type']").change(function() {
			self.bindUserButtonClass();
		});


	},
		gridEvent : {
			afterQuerySuccess : function (grid) {
				menuUserStatusGrid.eventhandler.setVisibleColumn(grid);
        	}
		},
		onSearch : function(pageIdx, isOpenToast) {
			this.grid.cancel(); 
	        pageIdx = !pageIdx ? 0 : pageIdx;

	        let self = this;
	        let pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};
			
			this.setDoqueryUrl();
	        this.controller.doQuery(this, "", pageIdx, pagingFunc, false, isOpenToast);
		},
		callUserSearchPopup : function() {
	        let pin = {
	              argSelectType: '1'
	            , argWorkStatCd: '01'
	            , argUseYn: 'Y'
	        };

	        let POP_DATA = {
	            url: _baseUrl + 'popup/userMgmtPopup.userListPopup.do'
	            , winName: 'userListPopup'
	            , title: '사용자 조회'
	            , _title: '사용자 조회'
	            , left: 20
	            , top: 20
	            , width: 800
	            , height: 700
	            , scrollbars: false
	            , autoresize: false
	        };

        	popCommon(pin, POP_DATA, this.userSearchPopupCallBack);
    	},
		userSearchPopupCallBack(e) {
			let data = JSON.parse(e.data);
	        $('#userId').val(data[0].userId);
			$('#userIdOld').val(data[0].userId);
			$('#userNm').val(data[0].userNm);
		},
		getStatusType : function() {
			return $("input[name='status-type']:checked").val();
		},
		setVisibleColumn : function(menuUserStatusGrid) {
			let isMenuUseStatusChecked = this.getStatusType() === "10";
			
			menuUserStatusGrid.setColumnProperty("menuRegDtm", "visible", isMenuUseStatusChecked);
			menuUserStatusGrid.setColumnProperty("userCnt", "visible", isMenuUseStatusChecked);
			menuUserStatusGrid.setColumnProperty("menuUseCnt", "visible", isMenuUseStatusChecked);
			
			menuUserStatusGrid.setColumnProperty("userId", "visible", !isMenuUseStatusChecked);
			menuUserStatusGrid.setColumnProperty("userNm", "visible", !isMenuUseStatusChecked);
			menuUserStatusGrid.setColumnProperty("userMenuUseCnt", "visible", !isMenuUseStatusChecked);
		},
		setDoqueryUrl : function() {
			let statusType = this.getStatusType();

			switch(statusType) {
				case "10" :
					menuUserStatusGrid.settings.props.action = _baseUrl + "system/menuUsageStatusInquiry.getMenuUseStatusList.do";
				break;
				case "20" :
					menuUserStatusGrid.settings.props.action = _baseUrl + "system/menuUsageStatusInquiry.getUserMenuUseStatusList.do";
				break;
			}
		},
		bindUserButtonClass : function() {
			let statusType = this.getStatusType();

			switch(statusType) {
				case "10" :
					$("#btn_user_search").prop("class", "button small disabled");
					$("#btn_user_clear").prop("class", "button small disabled");
				break;
				case "20" :
					$("#btn_user_search").prop("class", "button small");
					$("#btn_user_clear").prop("class", "button small");
				break;
			}
		}
}