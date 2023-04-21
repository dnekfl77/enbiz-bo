$.namespace("mkdpGrid.eventhandler");
mkdpGrid.eventhandler = {
	// 초기화
	init : function () {
        this.argCheck();
		this.gridLoading();
		this.bindButtonEvent();
	}

    , argCheck : function(){
        if (_gridType != '1' && _gridType != 'N') {
            alert(_msg.invalidAccessMsg);
            window.close();
        }
    }

	, gridLoading : function(){
		grid.setEditOptions({ editable: false }) // 그리드 수정불가
		grid.onItemChecked = function(grid, itemIndex, checked) {
		  grid.setCurrent({ itemIndex: itemIndex })
		}
		grid.setRowStyleCallback(function(grid, item, fixed) {
		  if (item.checked) {
			return 'rg-trcol_active'
		  }
		})
	}

	, bindButtonEvent : function(){
		var self = this;

		//조회 버튼
		$('#btn_popup_list').click(function() {
			self.onSearch(0,true);
		});

		//초기화버튼
		$('#btn_popup_init').click(function() {
			$('#searchForm')[0].reset();
		});


		//엔터키 이벤트
		$("#searchForm").keypress(function (e){
			if (e.which == 13){
				$('#btn_popup_list').click();
				window.event.returnValue=false;
			}
		 });

		//적용버튼
		$("#btn_popup_apply").click(function() {
			self.onApply();
		});

		//닫기버튼
		$("#btn_popup_close").click(function() {
			window.close();
		});

		// 담당MD 검색버튼 클릭시
		$('#btn_call_md_popup').click(function () {
			var pin = {
				argSelectType   : '1'	//  결과값 갯수
				, argWorkStatCd : '01'   //  근무상태 ( 01 : 재직중, 02 : 퇴사 )
				, argUseYn	  : 'Y'	//  사용여부
			};
			var POP_DATA = {
				url: _baseUrl + 'popup/userMgmtPopup.mdListPopup.do'
				, winName: 'mdListPopup'
				, title: 'MD조회'
				, _title: 'MD조회'
				, left: 20
				, top: 20
				, width: 690
				, height: 600
				, scrollbars: false
				, autoresize: false
			};
			popCommon(pin, POP_DATA, function (e) {
				var returnValue = JSON.parse(e.data);
				$('#mdId').val(returnValue[0].userId);
				$('#mdNm').val(returnValue[0].userNm);
			});

		});

		// 담당MD 지우개버튼 클릭시
		$('#btn_reset_md_popup').click(function () {
			$('#mdId').val('');
			$('#mdNm').val('');
		});

		// 입력값 체크 - 숫자만 입력 가능
		$("input:text[numberOnly]").on("keyup", function() {
			var currentVal = $(this).val();
			$(this).val(onlyInputNumber(currentVal));
		});
	}

	, gridEvent : {
		// 조회 완료 후 CallBack 함수
		afterQuerySuccess : function (grid, data) {
		}
        , onCellDblClicked : function(grid, clickData) {
			if ( clickData.cellType === 'gridEmpty' ) return;
			mkdpGrid.eventhandler.returnData(clickData.dataRow);
        }		
	}
	
    // 적용
    , onApply : function () {

		if ( _gridType === '1' ) {
			var rowIndex = this.grid.getCurrent().dataRow;
			if ( rowIndex === -1 ) {
				alert(_msg.noSelectedDataMsg);
				return;
			}
			this.returnData( rowIndex );

		} else {
			var rowIndexList = this.grid.getCheckedRows();
			if ( !rowIndexList.length ) {
				alert(_msg.noSelectedDataMsg);
				return;
			}
			this.returnData(rowIndexList);
		}
	}
	,returnData : function ( data ) {

		var grid = this.grid;
		var provider = grid.getDataSource();

		var returnData = [];
		var putReturnData = function ( dataRow ) {
			var row = provider.getJsonRow( dataRow );
			returnData.push({
				  dispGrpTypCd : row.mkdpTypCd		// 기획전유형 코드
				, dispGrpTypNm : row.mkdpTypNm		// 기획전유형 코드명
				, shopCtgNo : row.mkdpNo			// 기획전번호(매장카테고리번호)
				, mkdpNo : row.mkdpNo		    	// 기획전번호
				, mkdpNm : row.mkdpNm				// 기획전명
				, dispStat : row.dispStat			// 기획전상태
				, dispStatName : row.dispStatName	// 기획전상태명
				, dispStrDtm : row.dispStrDtm		// 전시시작일
				, dispEndDtm : row.dispEndDtm		// 전시종료일
				, mdId : row.mdId					// 담당MD아이디
				, mdNm : row.mdNm					// 담당MD명
			});
		}

		if ( $.isArray(data) ) {
			data.forEach(i => putReturnData(i));
		} else {
			putReturnData(data);
		}

		window.postMessage(JSON.stringify(returnData), _baseUrl);
		window.close();
	}
	, onSearch : function(pageNo,isOpenToast){
		this.grid.cancel();
		var that = this;
        var param = '';
        var dispStat = "";

        // 판매상태 조회 조건 셋팅
        if($('#dispStat').val() == '') { // 전체 조회인 경우
            $('#dispStat > option').each(function(){
                var inx = $(this).index();
                if(inx == 0) {
                    dispStat = "";
                } else if(inx == 1) {
                    dispStat += $(this).val();
                } else {
                    dispStat += "," + $(this).val();
                }
            });
        } else {
            dispStat += $('#dispStat').val();
        }

        param = '&dispStatList=' + dispStat;

		pageNo = !pageNo ? 0 : pageNo;
		var pageFunc = function (pageNo) { return that.onSearch(pageNo); };
		this.controller.doQuery(that, param, pageNo, pageFunc,false,isOpenToast);
	}
};