$.namespace("displayGoodsReviewGrid.eventhandler");
displayGoodsReviewGrid.eventhandler = {

    // 초기화
    init : function () {
        this.calendarInit();
        this.gridLoading();
        this.bindButtonEvent();
    },

    calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(7);
        $('#startDate').val(initFromAndToCalDate[0]);
        $('#endDate').val(initFromAndToCalDate[1]);
    },

    gridLoading : function(){

        grid.setEditOptions({ editable: false }); // 그리드 셀 수정 불가 설정
        this.grid.setHeader({ showTooltip: false }); // 해더영역 툴팁 해제

        //그리드 셀 체크시 색상 변경 기능 설정
        grid.onItemChecked = function(grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex })
        }
        grid.setRowStyleCallback(function(grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active'
            }
        });

        // 상품명 클릭 시 상품상세 팝업창 호출
    },

    bindButtonEvent : function(){
        var self = this;

		// 조회 조건 : 달력버튼
     	$('#calendarButton').click(function() {
			showCalendar({
				type:'A', // A:시작,종료일선택, B:해당 날짜 1개 선택
				format:'yyyy-MM-dd',
				yyyymmdd1:$('#startDate').val(),
				yyyymmdd2:$('#endDate').val(),
				max_term:31,
				fn:function(pin) {
					$('#startDate').val(pin.yyyymmdd1);
					$('#endDate').val(pin.yyyymmdd2);
				}
			});
		});

		// 조회 조건 : 담당MD 검색버튼 클릭시
		$('#btn_call_md_popup').click(function () {
		    self.onMdPopup();
		});

		// 조회 조건 : 담당MD 지우개버튼 클릭시
		$('#btn_reset_md_popup').click(function () {
			$('#mdId').val('');
			$('#mdNm').val('');
		});

        $('#btn_popup_list').click(function() {
            self.onSearch(0,true);
        });

        $('#btn_popup_init').click(function() {
            $('#displayGoodsReviewGridForm')[0].reset();
            $('#btn_reset_md_popup').click();
            self.calendarInit();
        });

        $("#displayGoodsReviewGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_popup_list').click();
                window.event.returnValue=false;
            }
        });

        $('#btn_popup_apply').click(function(){
            self.onApply(self.grid, self.grid.getCheckedRows());
        });

        $("#btn_popup_close").click(function() {
            window.close();
        });

    },

    onMdPopup : function(){
        var pin = {
            argSelectType   : '1'	//  결과값 갯수
            , argWorkStatCd : '01'  //  근무상태 ( 01 : 재직중, 02 : 퇴사 )
            , argUseYn	  : 'Y'	    //  사용여부
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
    },

    onSearch : function(pageNo,isOpenToast){
        this.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var self = this;
        var pageFunc = function (pageNo) { return self.onSearch(pageNo); };

        var param;
        if($('#goodsSearch').val() == '00'){
            param = '&goodsNm=' + $('#goodsSearchText').val() + '&loginId=&mbrNm=';
        } else if($('#goodsSearch').val() == '01'){
            param = '&goodsNm=&loginId=' + $('#goodsSearchText').val() + '&mbrNm=';
        } else {
            param = '&goodsNm=&loginId=&mbrNm=' + $('#goodsSearchText').val();
        }

        var startDate = replaceCalendarString($('#startDate').val());
        var endDate = replaceCalendarString($('#endDate').val());
        param += '&startDate=' + startDate + '&endDate=' + endDate;
        this.controller.doQuery(this,param,pageNo,pageFunc,false,isOpenToast);
    },

    gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
        },
        onCellDblClicked : function(grid, clickData) {
            if ( clickData.cellType === 'gridEmpty' ) return;
            displayGoodsReviewGrid.eventhandler.onApply(grid, [clickData.dataRow]);
        },
        onCellClicked : function(grid,clickData){
            if(clickData.cellType != "header") {
                if(clickData.column === 'goodsNm'){
                    var rowData = grid.getDataSource().getJsonRow(clickData.dataRow);
                    var pin = { type: 'R', goodsNo: rowData.goodsNo };
                    var POP_DATA = {
                        url: _baseUrl + 'goods/GoodsCommon.goodsView.do'
                        , winName: 'goodsDetailPopup'
                        , title: '상품상세팝업'
                        , _title: '상품상세팝업'
                        , left: 20
                        , top: 20
                        , width: 1500
                        , height: 700
                        , scrollbars: false
                        , autoresize: false
                    };
                    popCommon(pin, POP_DATA,function(e){});
                }
            }
        }
    },
    // 적용
    onApply : function (objGrid, targetRows) {
        if (targetRows.length === 0) {
            alert(_msg.noSelectedDataMsg);
            return;
		} else {
            const selectDataList = [];
            targetRows.forEach((item) => {
                var data = grid.getDataSource().getJsonRow(item)
                var dataList = {};
	            dataList.goodsNo = data.goodsNo;
	            dataList.goodsNm = data.goodsNm;
	            dataList.revCont = data.revCont;
	            dataList.revNo = data.revNo;
	            dataList.revScrVal = data.revScrVal;
	            dataList.mdId = data.mdId;
	            dataList.mdNm = data.mdNm;
	            dataList.salePrc = data.salePrc;

                selectDataList.push(dataList);
            });
            window.postMessage(JSON.stringify(selectDataList), _baseUrl);
            window.close()
		}
	}

};