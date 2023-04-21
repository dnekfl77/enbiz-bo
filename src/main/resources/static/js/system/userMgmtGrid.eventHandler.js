$.namespace("umGrid.eventhandler");
umGrid.eventhandler = {
	duplCheckedId: ""
	, rtGrpNo: ""
	, init : function() {
		this.bindButtonEvent();
		this.gridSetting();
	}
	, bindButtonEvent: function () {
		(function($) {
			$.fn.inputFilter = function(inputFilter) {
				return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
					if (inputFilter(this.value)) {
						this.oldValue = this.value;
						this.oldSelectionStart = this.selectionStart;
						this.oldSelectionEnd = this.selectionEnd;
					} else if (this.hasOwnProperty("oldValue")) {
						this.value = this.oldValue;
						this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
					} else {
						this.value = "";
					}
				});
			};
		}(jQuery));

		com.x2commerce.common.Util.setupEnterSearch("userSearchForm", "btn_user_list");

		//사용자ID 더블클릭
        var _self = this;
        this.grid.onCellDblClicked = function(grid, clickData){
            var currentData = _self.grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.column==='userId'|| clickData.column==='userNm'){
                _self.popupRegitster(currentData.userId);
            }
        }

		//검색 버튼 클릭
		$('#btn_user_list').on("click", t => {
			this.onSearch(0,true);
		});

		//초기화 버튼 클릭
		$('#btn_user_init').on("click", t => {
			$('#userSearchForm')[0].reset();
		});

		//사용자 추가버튼 이벤트
		$('#btn_user_dtl_info_add').on('click', t => {
		   this.onAdd();
		});

		//저장 버튼 이벤트
		$('#btn_user_dtl_info_save').on('click', t => {
			this.onSave();
		});

		//초기화 버튼 클릭
		$('#domainSelectBox').on('change', t => {
			this.emailDomainChangeAction($('#domainSelectBox').val());
		});
	}

	, gridSetting : function () {
        this.grid.onItemChecked = function ( grid, itemIndex, checked ) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function ( grid, item, fixed ) {
            if (item.checked) return 'rg-trcol_active';
        });
        this.grid.setEditOptions({ editable : false });
    }

	, gridEvent : {
		onCurrentRowChanged : function(grid, oldRow, newRow) {
		}
	}

	, onSearch : function(pageNo, isOpenToast) {
		var self = this;
		self.grid.cancel();

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return self.onSearch(pageNo); };

		self.controller.doQuery(self, '', pageNo, pageFunc, false, isOpenToast);
	}

	, onAdd : function() {
		var pin = {
			userId: ""
		};
		var POP_DATA = {
			url: _baseUrl + 'system/userMgmt.saveUserView.do'
			, winName: 'userMgmtCrudPopup'
			, title: '회원 상세정보 팝업'
			, _title: '회원 상세정보 팝업'
			, left: 20
			, top: 20
			, width: 1020
			, height: 700
			, scrollbars: false
			, autoresize: false
		 };
		 popCommon(pin, POP_DATA);
	}

    , popupRegitster : function(userId) {
		var pin = {
			userId: userId
		};
		var POP_DATA = {
			url: _baseUrl + 'system/userMgmt.saveUserView.do'
			, winName: 'userMgmtCrudPopup'
			, title: '회원 상세정보 팝업'
			, _title: '회원 상세정보 팝업'
			, left: 20
			, top: 20
			, width: 1020
			, height: 700
			, scrollbars: false
			, autoresize: false
		 };
		 popCommon(pin, POP_DATA);
    }
};