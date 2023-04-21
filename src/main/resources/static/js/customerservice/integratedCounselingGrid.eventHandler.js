var alertMessage = x2coMessage.getMessage( {
    tempRegist  : "integratedCounselMgmt.integratedCounseling.message.tempRegist",
    responseProc : "integratedCounselMgmt.integratedCounseling.message.responseProc",
    preTreatment : "integratedCounselMgmt.integratedCounseling.message.preTreatment",
    save : "adminCommon.message.saved.successfully",
    preTreatmentNot : "integratedCounselMgmt.integratedCounseling.message.preTreatmentNot"
});

$.namespace("integratedCounselingGrid.eventhandler");
integratedCounselingGrid.eventhandler = {
    // 초기화
    init : function () {
        this.calendarInit();
        this.gridLoading();
        this.cnslTypNoSetting(1,csCnslTypRoot);
        this.tmplSetting('0');
        this.bindButtonEvent();
    },
    bindButtonEvent : function(){
        var self = this;

        //상담등록
        $('#btn-counselingRegistration').click(function(){
            self.callCsRegistPopup();
        })

        $('#btn-ordCsltProcessing').click(function() {
			alert("준비중입니다.");
        });
        
        $(document).on("click",".ordData",function(){
            alert('주문 팝업 대기중');
        });

        $(document).on("click",".goodsData",function(){
            var _goodsNo = $(this).parents('.ordGoods').find(".goodsNo").text();
           var pin = { type: 'R', goodsNo: _goodsNo};
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
        });



        //======================= 문의내역 =======================

        //고객보상
        $(document).on("click","#btn_csCpRegist",function(){
            self.callCustomerCompensPopup();
        });

        //관련상담
        $(document).on("click","#btn_related_cs",function(){
            self.callRelatedCsPopup();
        });
        
        //업무연락
        $(document).on("click","#btn_work_contract",function(){
            alert("준비중입니다.");
        });
        
        $(document).on("click","#productQnA",function(){
			alert("준비중입니다.");
        });
        
        //======================= 1:1 문의 답변처리 =======================
        $(document).on("propertychange change keyup paste input",'#detail-ansCont',function(){
            var limitByte = $(this).attr("data-limitByte");
            var markId = $(this).attr("data-markId");
            byteLimitCheck($(this), limitByte, markId);
        });

        //1:1문의 임시저장 , 답변처리 , 기처리
        $(document).on("click","#tempRegist",function(){
            if(selectedCsData.preProcYn === 'Y'){
                alert(alertMessage.preTreatmentNot);
                return;
            }
            if (!confirm(alertMessage.tempRegist) ) return;
            self.updateOneToOneInquiry('20','N');
        });

        $(document).on("click","#responseProc",function(){
            if(selectedCsData.preProcYn === 'Y'){
                alert(alertMessage.preTreatmentNot);
                return;
            }
            if (!confirm(alertMessage.responseProc) ) return;
            self.updateOneToOneInquiry('40','N');
        });

        $(document).on("click","#preTreatment",function(){
            if(selectedCsData.preProcYn === 'Y'){
                alert(alertMessage.preTreatmentNot);
                return;
            }
            if (!confirm(alertMessage.preTreatment) ) return;
            self.updateOneToOneInquiry('40','Y');
        });

        // 1:1문의 답변처리 템플릿 구분
        $(document).on("change",":input:radio[name=oneToOneCheck]",function(){
            self.tmplSetting($(':input:radio[name=oneToOneCheck]:checked').val() === "1" ? loginRequest.userId : "0" );
        });

        //상담템플릿
        $(document).on("change",".tmpl-nm",function(){
            $('#detail-ansCont').val($(this).val()).change();
        });

        //======================= 처리내역 =======================

        //처리내역등록
        $(document).on("click","#registProcDetail",function(){
            if(selectedCsData.ccnPrgsStatCd === '40'){
                alert('처리상태가 완료일 경우 등록하실수 없습니다.');
                return;
            }

            if(selectedCsData.ccnPrgsStatCd==='30'){
                if(selectedCsData.integrateProcInfo.length > 0) {
                    if(selectedCsData.integrateProcInfo[0].csTransReqResponses.length > 0
                        && selectedCsData.integrateProcInfo[0].csTransReqResponses[0].mvotProcStatCd !== '40') {
                        alert('이관처리상태가 완료가 아닐 경우 등록하실수 없습니다.');
                        return;
                    }
                }
            }
            self.callCsProcRegistPopup();
        });


        $("#integratedCounselingGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_list').click();
                window.event.returnValue=false;
            }
        });

        //상담구분 select
        $('#custCnslGbCd').change(function(){
            common.Ajax.sendRequest(
                "get",
                _baseUrl + "common/getForwardCdCdNmFromStStdCdByGrpCdRef1Val.do",
                'code=CS003&referCode='+$(this).val(),
                function ( result ) {
                    if(result.succeeded){
                        $('#accpTypCd option').not("[value='']").remove();
                        if(Object.keys(result.data).length === 0){
                            return;
                        }

                        result.data.CS003.forEach(function(item){
                            $('#accpTypCd').append($("<option value='"+item.cd+"'>"+item.cdNm+"</option>"));
                        });
                    }
                });

        })

        //상담유형 대
        $('#cnslLrgTypNo').change(function(){
            self.cnslTypNoSetting(2,$(this).val());
        })

        //상담유형 중중
       $('#cnslMidTypNo').change(function(){
            self.cnslTypNoSetting(3,$(this).val());
        })

        //상품번호/명
        $('#btn-regist-goodsNo').click(function(){
            self.callGoodsPopup();
        })

        //상품번호 초기화
        $('#btn-reset-goodsNo').click(function(){
            $('#goodsNo').val('');
            $('#goodsNm').val('');
        })

        // 담당자 조회
        $('#btn-regist-user').click(function() {
            self.callUserPopup();
        });

        // 담당자 초기화
        $('#btn-reset-user').click(function(){
            $('#userId').val('');
            $('#userNm').val('');
        })

        // 초기화
        $('#btn_init').click(function() {
            $('#integratedCounselingGridForm')[0].reset();
            $('#userId').val('');
            self.calendarInit();
            $('#accpTypCd option').not("[value='']").remove();
            $('.cnslTyp option').not("[value='']").remove();
        });

        // 조회
        $('#btn_list').click(function() {
            self.onSearch(0,true);
            selectedCsData = {};
            $('#csDetail').empty();
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
            });
        });


        //이관상태 popup
        $(document).on("click",".transState",function(){
            self.callCsTransDtlPopup(selectedCsData.ccnNo,$(this).next('.cnslProcSeq').val());
        });

    },
    calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(3);
        $('#startDate').val(initFromAndToCalDate[0]);
        $('#endDate').val(initFromAndToCalDate[1]);
    },
    //상담유형 조회
    cnslTypNoSetting : function(depth,cnslTypNo){
        common.Ajax.sendRequest(
            "get",
            _baseUrl + "customerservice/counselingTypeMgmt.getCounselingTypeNoList.do",
            'cnslTypNo=' + cnslTypNo,
            function ( list ) {

                var targetEl = '#cnslLrgTypNo';

                if(depth === 1){
                    $('#cnslLrgTypNo option').not("[value='']").remove();
                    targetEl = $('#cnslLrgTypNo');
                }

                if(depth === 2){
                    $('#cnslMidTypNo option').not("[value='']").remove();
                    targetEl = $('#cnslMidTypNo');
                }

                if(depth === 3){
                    $('#cnslTypNo option').not("[value='']").remove();
                    targetEl = $('#cnslTypNo');
                }

                list.forEach(function(data){
                    $(targetEl).append($("<option value='"+data.cnslTypNo+"'>"+data.cnslTypNm+"</option>"));
                })
            });

    },
    //상담템플릿 조회
    tmplSetting : function(cnslAempId){
        common.Ajax.sendRequest(
            "get",
            _baseUrl + "customerservice/integratedCounselMgmt.getCsCounselTemplateInfo.do",
            'cnslAempId=' + cnslAempId,
            function ( obj ) {
				var list = obj.data;
                $('#memo').val('');
                $('.tmpl-nm option').not("[value='']").remove();
                list.forEach(function(data,index){
                    $('.tmpl-nm').append($("<option value='"+data.tmplCont+"'>"+data.tmplNm+"</option>"));
                })
            });
    },
    updateOneToOneInquiry : function(ccnPrgsStatCd,preProcYn){
        var param = {};
        param.ccnNo         = selectedCsData.ccnNo;
        param.ccnPrgsStatCd = ccnPrgsStatCd;
        param.preProcYn     = preProcYn;
        param.ansCont       = $('#detail-ansCont').val();
        common.Ajax.sendJSONRequest(
            "post",
            _baseUrl + "customerservice/integratedCounselMgmt.postOneToOneInquiry.do",
            param,
            function (result) {
              if(result.succeeded){
                selectedCsData.preProcYn = preProcYn;
                alert(alertMessage.save);
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
    callGoodsPopup : function(){
        var pin = {
            argSelectType: '1'
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/goodsMgmtPopup.goodsListPopup.do'
            , winName: 'goodsListPopup'
            , title: '상품 조회'
            , _title: '상품 조회'
            , left: 20
            , top: 20
            , width: 1000
            , height: 700
            , scrollbars: false
            , autoresize: false
        };

        popCommon(pin, POP_DATA, this.popupGoodsListCallback);
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
    callCsRegistPopup : function(){
        var pin = {};
        var POP_DATA = {
            url:  _baseUrl + 'customerservice/integratedCounselMgmt.counselRegistView.do'
            , winName: 'csRegistrationPopup'
            , title: '상담등록 '
            , _title: '상담등록'
            , left: 20
            , top: 50
            , width: 780
            , height: 740
            , scrollbars: true
            , autoresize: true
        }
        popCommon(pin, POP_DATA, function(e){ integratedCounselingGrid.eventhandler.onSearch(0); }  );
    },
    callCsProcRegistPopup : function(){

        var pin = {
            ccnNo : selectedCsData.ccnNo
        };

        var POP_DATA = {
            url:  _baseUrl + 'customerservice/integratedCounselMgmt.counselProcessSaveView.do'
            , winName: 'csProcRegistrationPopup'
            , title: '처리내역등록 '
            , _title: '처리내역등록'
            , left: 20
            , top: 50
            , width: 780
            , height: 400
            , scrollbars: true
            , autoresize: true
        }
        popCommon(pin, POP_DATA, function(e){
            if(e.data === 'succeeded'){
                integratedCounselingGrid.eventhandler.getCsDetail(selectedCsData.ccnNo);
            }
        });
    },
    callCustomerCompensPopup : function(){
        var pin = {
            ccnNo : selectedCsData.ccnNo
        };

        var POP_DATA = {
            url:  _baseUrl + 'customerservice/integratedCounselMgmt.customerCompensSaveView.do'
            , winName: 'customerCompensRegist'
            , title: '고객보상 '
            , _title: '고객보상'
            , left: 20
            , top: 50
            , width: 780
            , height: 600
            , scrollbars: true
            , autoresize: true
        }
        popCommon(pin, POP_DATA)
    },
    callRelatedCsPopup : function(){
        var pin = {
            ccnNo : selectedCsData.ccnNo
        };

        var POP_DATA = {
            url:  _baseUrl + 'customerservice/integratedCounselMgmt.relatedConsultationPopup.do'
            , winName: 'relatedConsultationPopup'
            , title: '관련상담 '
            , _title: '관련상담'
            , left: 20
            , top: 50
            , width: 780
            , height: 600
            , scrollbars: true
            , autoresize: true
        }
        popCommon(pin, POP_DATA)
    },
    callCsTransDtlPopup : function(ccnNo,cnslProcSeq){
        var pin = {
            ccnNo : ccnNo,
            cnslProcSeq : cnslProcSeq,
        };

        var POP_DATA = {
            url:  _baseUrl + 'customerservice/integratedCounselMgmt.csTransferDetailHistoryPop.do'
            , winName: 'csTransferDetailHistoryPop'
            , title: '업무이관상세 '
            , _title: '업무이관상세'
            , left: 20
            , top: 50
            , width: 780
            , height: 600
            , scrollbars: true
            , autoresize: true
        }
        popCommon(pin, POP_DATA)
    },
    onSearch : function(pageIdx,isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};

        var startDate = replaceCalendarString($('#startDate').val());
        var endDate = replaceCalendarString($('#endDate').val());

        var extraQueryString;
        extraQueryString = 'startDate=' + startDate + '&endDate=' + endDate + "&goodsNo=" + $('#goodsNo').val();

        this.controller.doQuery(this,extraQueryString,pageIdx, pagingFunc,false,isOpenToast);
    },
    gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
        },
        onCellClicked : function (grid, clickData) {
            var cellType = clickData.cellType;
            if(cellType === 'header'
                || cellType === 'head'
                ){
                return;
            }
            integratedCounselingGrid.eventhandler.grid.commit();
            var currentData = grid.getDataSource().getJsonRow(clickData.dataRow);
            integratedCounselingGrid.eventhandler.getCsDetail(currentData.ccnNo);
        },
    },
    getCsDetail : function(ccnNo){
        common.Ajax.sendRequest(
            "get",
            _baseUrl + "customerservice/integratedCounselMgmt.integrateCounselingDetail.do",
            'ccnNo=' + ccnNo,
            integratedCounselingGrid.eventhandler.integrateCsDetailCallBack
        );
    },
    integrateCsDetailCallBack : function(obj){
		var result = obj.data;

        $('#csDetail').empty();
        $('#csDetail').append(inquiryDetailsForm);
        if(result.accpTypCd === '20') {
            $('#csDetail').append(oneToOneForm);
            integratedCounselingGrid.eventhandler.tmplSetting('0');
            $('#detail-ansCont').val(result.ansCont).change();
        }
        $('#csDetail').append(processDetailForm);

        console.log(result);
        selectedCsData = result;
        Object.keys(result).forEach(function(key){

           if(key === 'integrateOrdAndGoodsInfo'){
               if(result['integrateOrdAndGoodsInfo'].length > 0){
                   result['integrateOrdAndGoodsInfo'].forEach(function(data){
                       var ordNo = (data.ordNo) ? data.ordNo : '';
                       var goodsNo = (data.goodsNo) ? data.goodsNo : '';
                       var goodsNm = '';
                       var entrNm = '';
                       if(data.csCcnGoodsResponse){
                           goodsNm = (data.csCcnGoodsResponse.goodsNm) ? data.csCcnGoodsResponse.goodsNm : '';
                           entrNm = (data.csCcnGoodsResponse.entrNm) ? data.csCcnGoodsResponse.entrNm : '';
                       }

                       if((ordNo !== '' && goodsNo !== '') || (ordNo === '' && goodsNo !== '')){
                           var innerHtml = "";
                           innerHtml += '<tr class="ordGoods">';
                           innerHtml += '    <td class="center"><a class="ordData">'+ ordNo + '</a></td>';
                           innerHtml += '    <td class="center"><a class="goodsData goodsNo">'+ goodsNo + '</a></td>';
                           innerHtml += '    <td><a class="goodsData">'+ goodsNm + '</a></td>';
                           innerHtml += '    <td></td>';
                           innerHtml += '    <td></td>';
                           innerHtml += '    <td></td>';
                           innerHtml += '    <td class="center">'+ entrNm + '</td>';
                           innerHtml += '</tr>';
                           $('.goodsAndOrdTable > tbody:last').append(innerHtml);
                       }else {
                           if (ordNo !== '' && goodsNo === '' && data.csCcnOrdResponses !== undefined) {
                               data.csCcnOrdResponses.forEach(function (ordData, index) {
                                   var innerHtml = "";
                                   innerHtml += '<tr class="ordGoods">';
                                   if (index === 0) {
                                       innerHtml += '    <td class="center" rowspan=' + data.csCcnOrdResponses.length + '><a class="ordData">' + ordData.ordNo + '</a></td>';
                                   }
                                   innerHtml += '    <td class="center"><a class="goodsData goodsNo">' + ordData.goodsNo + '</a></td>';
                                   innerHtml += '    <td><a class="goodsData">' + ordData.goodsNm + '</a></td>';
                                   innerHtml += '    <td>' + (ordData.itmNm === undefined ? '' : ordData.itmNm) + '</td>';
                                   innerHtml += '    <td class="right">' + ordData.ordQty + '</td>';
                                   innerHtml += '    <td class="right">' + ordData.salePrc + '</td>';
                                   innerHtml += '    <td class="center">'+ ordData.entrNm + '</td>';
                                   innerHtml += '</tr>';
                                   $('.goodsAndOrdTable > tbody:last').append(innerHtml);
                               })
                           }
                       }
                   })
               }
           }

            if(key === 'integrateProcInfo'){
                if(result['integrateProcInfo'].length > 0){
                    result['integrateProcInfo'].forEach(function(data,index){

                        if(index !== 0){
                            $('#procDetailTable').append(processDetailFormBody);
                        }

                        $('.detailBody').last().find('#cnslProcDtm').text(data.cnslProcDtm);
                        $('.detailBody').last().find('#sysRegId').text(data.sysRegId);


                        if(data.csTelPrmsResponses !== undefined){
                            data.csTelPrmsResponses.forEach(function(callData){
                                var innerHtml = "";
                                innerHtml +='<tr>';
                                innerHtml +='    <td class="label">전화약속상태</td>';
                                innerHtml +='    <td>';
                                innerHtml +='        <a><span class="callState">' + callData.procStat + '</span></a>';
                                innerHtml +='    </td>';
                                innerHtml +='    <td class="label">전화약속</td>';
                                innerHtml +='    <td>' + callData.prmsDtm + ' ( ' + callData.prmsMethCd + ' )</td>';
                                innerHtml +='    <td class="label">전화약속메모</td>';
                                innerHtml +='    <td>' + callData.cnslMemo + '</td>'
                                innerHtml +='</tr>';
                                $('.detailBody').last().append(innerHtml);
                            })
                        }

                        if(data.csTransReqResponses !== undefined){
                            data.csTransReqResponses.forEach(function(transData){
                                var innerHtml = "";
                                innerHtml +='<tr>';
                                innerHtml +='    <td class="label">이관상태</td>';
                                innerHtml +='    <td>';
                                innerHtml +='        <a>';
                                innerHtml +='           <span class="transState">'+ transData.mvotProcStatNm +'</span>';
                                innerHtml +='           <input type="hidden" class="cnslProcSeq" value="' + transData.cnslProcSeq  +'"/>';
                                innerHtml +='        </a>';
                                innerHtml +='    </td>';
                                innerHtml +='    <td class="label">이관유형</td>';
                                innerHtml +='    <td>' + transData.csMvotTypNm  +'</td>';
                                innerHtml +='    <td class="label">이관담당자</td>';
                                innerHtml +='    <td>';
                                innerHtml +='        <a><span class="transId">' + ( transData.mvotAfAempId === undefined? '' : transData.mvotAfAempId )  + '</span></a>';
                                innerHtml +='    </td>';
                                innerHtml +='</tr>';
                                $('.detailBody').last().append(innerHtml);
                            })
                        }

                        var html = "";
                        html +='<tr>';
                        html +='    <td class="label">처리메모</td>';
                        html +='    <td colspan="5">';
                        html +='        <span class="cnslProcCont">'+ data.cnslProcCont +'</span>';
                        html +='    </td>';
                        html +='</tr>';
                        $('.detailBody').last().append(html);
                    })
                }
            }

            if(key === 'cellNoYn'){
                if(result[key] === 'N'){
                    $('#sms').remove();
                }
            }

           var elId = '#detail-'+key;
           $(elId).text(result[key]);
        });

        if(result.telNo === undefined){
            $('#tel').remove();
        }

    },
    popupUserListCallback : function(e){
        var userData = JSON.parse(e.data);
        $('#userId').val(userData[0].userId);
        $('#userNm').val(userData[0].userNm);
    },
    popupGoodsListCallback : function(e){
        var goodsData = JSON.parse(e.data);
        $('#goodsNo').val(goodsData[0].goodsNo);
        $('#goodsNm').val(goodsData[0].goodsNm);
    }


};
