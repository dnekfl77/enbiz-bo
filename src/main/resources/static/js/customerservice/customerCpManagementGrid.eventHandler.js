$.namespace("customerCpManagementGrid.eventhandler");
customerCpManagementGrid.eventhandler = {
    // 초기화
    init : function () {
        this.calendarInit();
        this.gridLoading();
        this.bindButtonEvent();
    },
    bindButtonEvent : function(){

        var self = this;

        $(document).on("propertychange change keyup paste input",'.dataCont',function(){
            var limitByte = $(this).attr("data-limitByte");
            var markId = $(this).attr("data-markId");
            byteLimitCheck($(this), limitByte, markId);
        });

        // 보상유형
        $('#btn-regist-cpnsTyp').click(function(){
            self.callRewardTypeListPopup();
        })

        // 보상유형 초기화
        $('#btn-reset-cpnsTyp').click(function(){
            $('#cpnsTypNm').val('');
            $('#cpnsTypNo').val('');
        })

        //회원정보
        $('#btn-regist-mbr').click(function(){
            self.callMbrPopup();
        })

        //회원정보 초기화
        $('#btn-reset-mbr').click(function(){
            $('#mbrNm').val('');
            $('#mbrNo').val('');
        })

        // 처리자 조회
        $('#btn-regist-user').click(function() {
            self.callUserPopup();
        });

        // 처리자 초기화
        $('#btn-reset-user').click(function(){
            $('#userId').val('');
            $('#userNm').val('');
        })

        // 초기화
        $('#btn_init').click(function() {
            $('#customerCpManagementForm')[0].reset();
            $('#cpnsTypNo').val('');
            $('#mbrNo').val('');
            $('#userId').val('');
            self.calendarInit();
        });

        // 조회
        $('#btn_list').click(function() {
            self.onSearch(0,true);
        });


        //달력
        $('#_sch_date_st-button').click(function() {
            showCalendar({
                type:'A', // A:시작,종료일선택, B:해당 날짜 1개 선택
                format:'yyyy-MM-dd',
                yyyymmdd1:$('#startDate').val(),
                yyyymmdd2:$('#endDate').val(),
                //max_term:30,
                fn:function(pin) {
                    $('#startDate').val(pin.yyyymmdd1);
                    $('#endDate').val(pin.yyyymmdd2);
                }
            })
        })

        // 보상승인
        $('#btn_cpnsAprv').click(function(){

            var checkedRows = grid.getCheckedRows();
            if(checkedRows.length === 0){
                alert("항목을 선택하세요!");
                return;
            }

            if(!(csCpUserGrade === 'A' || csCpUserGrade === 'ALL')){
                alert('승인권환이 없습니다!');
                return;
            }

             var dataProvider = grid.getDataSource();
             var checkedRows = grid.getCheckedRows();
             var checkedDataSourceRows = grid.getItemsOfRows(checkedRows);

             var check = false;
             var custCpnsAplyNoList = [];
             var param = {};

             checkedDataSourceRows.forEach(function(row) {
                 var s_dataRow = self.grid.getDataRow(row);
                 var data = dataProvider.getJsonRow(s_dataRow);
                 console.log(data);
                 if(!(data.cpnsAprvStatCd === receiptCd && data.cpnsPayStatCd === unpaidCd)){
                    check = true;
                 }
                 custCpnsAplyNoList.push(data.custCpnsAplyNo);
             })

            if(check){
                alert('승인상태를 확인하세요!');
                return;
            }

            param.custCpnsAplyNoList = JSON.stringify(custCpnsAplyNoList);
            param.type="A";

            self.saveApproval(param);
        })

        // 지급승인
        $('#btn_cpnsPay').click(function() {

            var checkedRows = grid.getCheckedRows();
            if(checkedRows.length === 0){
                alert("항목을 선택하세요!");
                return;
            }


            if(!(csCpUserGrade === 'P' || csCpUserGrade === 'ALL')){
                alert('승인권환이 없습니다!');
                return;
            }

            var dataProvider = grid.getDataSource();
            var checkedRows = grid.getCheckedRows();
            var checkedDataSourceRows = grid.getItemsOfRows(checkedRows);

            var check = false;
            var custCpnsAplyNoList = [];
            var param = {};

            checkedDataSourceRows.forEach(function(row) {
                var s_dataRow = self.grid.getDataRow(row);
                var data = dataProvider.getJsonRow(s_dataRow);
                if(!(data.cpnsAprvStatCd === rewardApprovalCd && data.cpnsPayStatCd === paymentRequestCd)){
                    check = true;
                }
                custCpnsAplyNoList.push(data.custCpnsAplyNo);
            })

            if(check){
                alert('승인상태를 확인하세요!');
                return;
            }

            param.custCpnsAplyNoList = JSON.stringify(custCpnsAplyNoList);
            param.type="P";

            self.saveApproval(param);

        })

        $('#btn_retn').click(function() {
            layerPopOpen('layerPop-memo');
        })

        $('#returnCancel').click(function(){
            layerPopClose('layerPop-memo');
        })

        // 반려
        $('#returnApply').click(function() {

            var dataProvider = grid.getDataSource();
            var checkedRows = grid.getCheckedRows();
            var checkedDataSourceRow = grid.getItemsOfRows(checkedRows);

            if(checkedRows.length === 0){
                alert("항목을 선택하세요!");
                return;
            }

            if($('#returnMemo').val().trim() === ''){
                alert("반려사유를 입력하세요!");
                return;
            }


            var tempArray = [];
            var selectedRow;
            for(var i=0;i<checkedDataSourceRow.length;i++){
                var s_dataRow = self.grid.getDataRow(checkedDataSourceRow[i]);
                var tempData = dataProvider.getJsonRow(s_dataRow);

                if(tempArray.includes(tempData.custCpnsAplyNo)){
                    continue;
                }else{
                    tempArray.push(tempData.custCpnsAplyNo);
                    selectedRow = s_dataRow;
                }
            }

            if(tempArray.length !== 1){
                alert('하나만 선택하세요!')
                return;
            }

            var data = dataProvider.getJsonRow(selectedRow);

            //보상반려
            if(data.cpnsAprvStatCd === receiptCd && data.cpnsPayStatCd === unpaidCd){
                self.rewardReturn(data.custCpnsAplyNo,'A', $('#returnMemo').val());
                return;
            }else if(data.cpnsAprvStatCd === rewardApprovalCd && data.cpnsPayStatCd === paymentRequestCd){
                //지급반려
                self.rewardReturn(data.custCpnsAplyNo,'P', $('#returnMemo').val());
                return;
            }

            alert('반려상태를 확인하세요!');
        })

    },
    calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(7);
        $('#startDate').val(initFromAndToCalDate[0]);
        $('#endDate').val(initFromAndToCalDate[1]);
    },
    gridLoading : function(){
        this.grid.groupBy(["custCpnsAplyNo"], false);				//행그룹핑([fieldNames], sorting)
        this.grid.setRowGroup({
            mergeMode:true
            , expandedAdornments: 'none'		//Group정보 표시위치(footer, header, both, summary, none)
            , mergeExpanderVisibility: 'none'	//확장정보 포함 여부(default, none)
        });
        this.grid.checkBar.mergeRule = "value['custCpnsAplyNo']";
    },
    callMbrPopup : function(){
        var pin = {
            argSelectType: '1',
            argMbrStatCd: ''
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/memberSearch.memberSearchPopup.do'
            , winName: 'mbrListPopup'
            , title: '회원 조회 팝업'
            , _title: '회원 조회 팝업'
            , left: 20
            , top: 20
            , width: 1000
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.popupMbrListCallback);
    },
    callUserPopup : function(){
        var pin = {
            argSelectType: '1'
            , argWorkStatCd: '01'
            , argUseYn: 'Y'
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/userMgmtPopup.userListPopup.do'
            , winName: 'userListPopup'
            , title: '사용자 조회'
            , _title: '사용자 조회'
            , left: 20
            , top: 20
            , width: 900
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.popupUserListCallback);
    },
    callRewardTypeListPopup : function(){
            var pin = {};
            var POP_DATA = {
                url: _baseUrl + 'customerservice/rewardTypeMgmt.rewardTypeListPopup.do'
                , winName: 'popupCsCpnsTypCdListPopup'
                , title: '보상유형조회 팝업'
                , _title: '보상유형조회 팝업'
                , left: 20
                , top: 20
                , width: 520
                , height: 600
                , scrollbars: false
                , autoresize: false
            };
            popCommon(pin, POP_DATA, this.popupCsCpnsTypCdListCallback);
    },
    callCustomerCompensPopup : function(custCpnsAplyNo){
        var pin = {
            custCpnsAplyNo : custCpnsAplyNo
        };

        var POP_DATA = {
            url:  _baseUrl + 'customerservice/customerCompensMgmt.customerCompensDetailSaveView.do'
            , winName: 'customerCompensRegist'
            , title: '고객보상상세'
            , _title: '고객보상상세'
            , left: 20
            , top: 50
            , width: 780
            , height: 600
            , scrollbars: true
            , autoresize: true
        }
        popCommon(pin, POP_DATA,this.callCustomerCompensPopupCallBack)
    },
    saveApproval : function(param){
        common.Ajax.sendJSONRequest(
            "post"
            ,_baseUrl + "customerservice/customerCompensMgmt.approveCustomerCompensMgmt.do"
            , param
            ,function (result) {
                if(result.succeeded){
                    openToast('승인 되었습니다!');
                    customerCpManagementGrid.eventhandler.onSearch();
                }
            },null,null,true);
    },
    rewardReturn : function(custCpnsAplyNo,type,memo) {
        var param = {};
        param.custCpnsAplyNo = custCpnsAplyNo;
        param.type           = type;
        param.memo           = memo;

        common.Ajax.sendJSONRequest(
            "post"
            ,_baseUrl + "customerservice/customerCompensMgmt.returnCustomerCompensDetail.do"
            ,param
            ,function (result) {
                if(result.succeeded){
                    openToast('반려 되었습니다!');
                    layerPopClose('layerPop-memo');
                    customerCpManagementGrid.eventhandler.onSearch();
                }
            },null,null,true)
    },
    onSearch : function(pageIdx,isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};

        var startDate = replaceCalendarString($('#startDate').val());
        var endDate = replaceCalendarString($('#endDate').val());

        var extraQueryString;
        extraQueryString = 'startDate=' + startDate + '&endDate='
                          + endDate + "&mbrNm=" + $('#mbrNm').val();
        this.controller.doQuery(this,extraQueryString,pageIdx, pagingFunc,false,isOpenToast);
    },
    gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {

            grid.groupBy(["custCpnsAplyNo"], false);				//행그룹핑([fieldNames], sorting)
            grid.setRowGroup({
                mergeMode:true
                , expandedAdornments: 'none'		//Group정보 표시위치(footer, header, both, summary, none)
                , mergeExpanderVisibility: 'none'	//확장정보 포함 여부(default, none)
            })
            grid.checkBar.mergeRule = "value['custCpnsAplyNo']";
        },
        onCellDblClicked : function (grid, clickData) {
            var cellType = clickData.cellType;
            if(cellType === 'header'
                || cellType === 'head'
            ){
                return;
            }

            var currentData = self.grid.getDataSource().getJsonRow(clickData.dataRow);

            if(clickData.column ==='custCpnsAplyNo'){
                customerCpManagementGrid.eventhandler.callCustomerCompensPopup(currentData.custCpnsAplyNo);
            }

        },
    },
    popupUserListCallback : function(e){
        var userData = JSON.parse(e.data);
        $('#userId').val(userData[0].userId);
        $('#userNm').val(userData[0].userNm);
    },
    popupCsCpnsTypCdListCallback : function(e){
        var csCpnsTypeData = JSON.parse(e.data);
        $('#cpnsTypNo').val(csCpnsTypeData[0].cpnsTypNo);
        $('#cpnsTypNm').val(csCpnsTypeData[0].cpnsTypSmlNm);
    },
    popupMbrListCallback : function(e){
        var mbrData = JSON.parse(e.data);
        $('#loginId').val(mbrData[0].loginId);
        $('#mbrNm').val(mbrData[0].mbrNm);
    },
    callCustomerCompensPopupCallBack : function(e){
        if(e.data === 'succeeded'){
            customerCpManagementGrid.eventhandler.onSearch(0);
        }
    }
};
