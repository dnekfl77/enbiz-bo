var alertMessage = x2coMessage.getMessage( {
    save : "csTransferProcessing.msg.save",
    saveComplete : "csTransferProcessing.msg.saveComplete",
    mvotAnsProcCont : "csTransferProcessing.msg.mvotAnsProcCont"
});

$.namespace("csTransferManageGrid.eventhandler");
csTransferManageGrid.eventhandler = {
    // 초기화
    init : function () {
        this.calendarInit();
        this.gridLoading();
        this.bindButtonEvent();
    },
    bindButtonEvent : function(){
        var self = this;


        $("#csTransferManageGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_list').click();
                window.event.returnValue=false;
            }
        });

        // 초기화
        $('#btn_init').click(function() {
            $('#csTransferManageGridForm')[0].reset();
            self.calendarInit();
        });

        // 조회
        $('#btn_list').click(function() {
            $('.detailInfo').text('');
            $('#transInfoDetail').hide();
            detailInfo = {};
            self.onSearch(0,true);
        });


        //달력
        $('#_sch_date_st-button').click(function() {
            showCalendar({
                type:'A', // A:시작,종료일선택, B:해당 날짜 1개 선택
                format:'yyyy-MM-dd',
                yyyymmdd1:$('#startDate').val(),
                yyyymmdd2:$('#endDate').val(),
                max_term:30,
                fn:function(pin) {
                    $('#startDate').val(pin.yyyymmdd1);
                    $('#endDate').val(pin.yyyymmdd2);
                }
            });
        });

        $('#btn_temp_save').click(function(){

           if(loginRequest.loginId !== detailInfo.mvotAfAempId){
			   alert("담당자가 다릅니다.");
               return;
           }

           if(!confirm(alertMessage.save)) {
               return;
           }

           if($('#detail-mvotAnsProcCont').val().trim() === ''){
               alert(alertMessage.mvotAnsProcCont);
               return;
           }

           self.updateTransInfo('30');
        })
        
        $('#btn_complete_save').click(function(){

            if(loginRequest.loginId !== detailInfo.mvotAfAempId){
				alert("담당자가 다릅니다.");
                return;
            }

            if(!confirm(alertMessage.save)) {
                return;
            }

            if($('#detail-mvotAnsProcCont').val().trim() === ''){
                alert(alertMessage.mvotAnsProcCont);
                return;
            }

            self.updateTransInfo('40');
        })

    },
    calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(7);
        $('#startDate').val(initFromAndToCalDate[0]);
        $('#endDate').val(initFromAndToCalDate[1]);
    },
    updateTransInfo : function(mvotProcStatCd){
        var param = {};
        param.ccnNo         = detailInfo.ccnNo;
        param.cnslProcSeq   = detailInfo.cnslProcSeq;
        param.mvotProcStatCd = mvotProcStatCd;
        param.mvotAnsProcCont       = $('#detail-mvotAnsProcCont').val();
        common.Ajax.sendJSONRequest(
            "post",
            _baseUrl + "customerservice/csTransferProcessing.saveCsTransferAnswerInfo.do",
            param,
            function (result) {
                if(result.succeeded){
                    alert(alertMessage.saveComplete);
                    csTransferManageGrid.eventhandler.getCsTransInfoDetail(detailInfo.ccnNo,detailInfo.cnslProcSeq);
                }
            });
    },
    gridLoading : function(){

        grid.setCheckBar({
            exclusive: true,
            showAll: false
        })
        // 그리드 셀 수정 불가 설정
        grid.setEditOptions({ editable: false })

        //그리드 셀 체크시 색상 변경 기능 설정
        grid.onItemChecked = function(grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex })
        }
        grid.setRowStyleCallback(function(grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active'
            }
        })
    },
    onSearch : function(pageIdx,isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};

        var startDate = replaceCalendarString($('#startDate').val());
        var endDate = replaceCalendarString($('#endDate').val());

        var extraQueryString;
        extraQueryString = 'startDate=' + startDate + '&endDate=' + endDate;

        this.controller.doQuery(this,extraQueryString,pageIdx, pagingFunc,false,isOpenToast);
    },
    gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
        },
        onCellClicked : function (grid, clickData) {
            var cellType = clickData.cellType;
            var column = clickData.column;

            if(cellType === 'header' || cellType === 'head'){
                return;
            }

            if(column === 'goodsNo'){
                return;
            }

            var currentData = grid.getDataSource().getJsonRow(clickData.dataRow);
            csTransferManageGrid.eventhandler.getCsTransInfoDetail(currentData.ccnNo,currentData.cnslProcSeq);
        },
        onCellDblClicked : function ( grid, clickedCell ) {
            var rowData = grid.getDataSource().getJsonRow(clickedCell.dataRow);
            if(clickedCell.column === 'goodsNo' ) {
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
    },
    getCsTransInfoDetail : function(ccnNo,cnslProcSeq){
        common.Ajax.sendRequest(
            "get",
            _baseUrl + "customerservice/csTransferProcessing.getCsTransferDetail.do",
            'ccnNo=' + ccnNo +'&cnslProcSeq=' + cnslProcSeq,
            csTransferManageGrid.eventhandler.csTransInfoDetailInfoCallback
        );
    },
    csTransInfoDetailInfoCallback : function(result){
        detailInfo = result;
        $('#transInfoDetail').show();
        $('.detailInfo').text('');
        Object.keys(result).forEach(function(key) {
            var elId = '#detail-' + key;
            $(elId).text(result[key]);
        })
    }



};
