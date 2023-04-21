var packageBasicInfoMsg = x2coMessage.getMessage({
    noEntrNoMsg : 'packageGoods.basicInfo.alert.msg.noEntrNoMsg'
    ,noStdCtgNoMsg : 'packageGoods.basicInfo.alert.msg.noStdCtgNoMsg'
});

$.namespace("packageBasicInfo.eventhandler")
packageBasicInfo.eventhandler = {
    init : function () {
        this.bindButtonEvent();
    }
    ,bindButtonEvent : function () {

        // 협력사 검색
        $('#btn_entr_popup_call').on( 'click', function () {
            var pin = {
                argSelectType: '1'      // 선택구분   ( 단건선택 : 1, 다건선택 : N )
                , argEntrGbCd: ''       // 협력사구분  ( 상품공급업자 : 10, 제휴사업자 : 20 )
                , argTrdStatCd: '20'    // 거래상태   ( 거래대기 : 10, 거래중 : 20, 거래종료 : 30 )
            };
            var POP_DATA = {
                url: _baseUrl + 'popup/enteranceMgmt.etEntrBaseListPopup.do'
                , winName: 'etEntrListPopup'
                , title: '협력사조회'
                , _title: '협력사조회'
                , left: 10
                , top: 10
                , width: 741
                , height: 700
                , scrollbars: false
                , autoresize: false
            };
            popCommon(pin, POP_DATA, function ( e ) {
                var returnValue = JSON.parse(e.data);
                $('#entrNo').val(returnValue[0].entrNo);
                $('#entrNm').val(returnValue[0].entrNm);
                packageRelatedGoodsListGrid.eventhandler.setEntrNo(returnValue[0].entrNo);
            });
        });

        // 협력사 초기화
        $('#btn_entr_popup_reset').on( 'click', function () {
            $('#entrNo, #entrNm').val('');
            packageRelatedGoodsListGrid.eventhandler.setEntrNo('');
        });

        // 표준분류 검색
        $('#btn_stdctg_popup_call').on( 'click', function () {
            var POP_DATA = {
                url: _baseUrl + 'popup/standardCategory.prStdCtgListPopup.do'
                , winName: 'prStdCtgListPopup'
                , title: '상품표준분류팝업'
                , _title: '상품표준분류팝업'
                , left: 20
                , top: 20
                , width: 400
                , height: 500
                , scrollbars: false
                , autoresize: false
            };
            popCommon({}, POP_DATA, function ( e ) {
                var returnValue = JSON.parse(e.data);
                $('#stdCtgNo').val(returnValue.stdCtgNo);
                $('#stdCtgHierarchy').val(returnValue.hierarchyText);
                $('#mdId').val(returnValue.mdId);
            });
        });

        // 표준분류 초기화
        $('#btn_stdctg_popup_reset').on( 'click', function () {
            $('#stdCtgHierarchy, #stdCtgNo, #mdId').val('');
        });
    }
    ,resetPkgBasicInfo : function ( ) {
        $('#pkgBasicInfo')[0].reset();
        $('#stdCtgNo').val('');
    }
    ,validatePkgBasicInfo : function () {

        // 협력사 번호가 없는경우
        if ( $('#entrNo').val() === '' ) {
            alert(packageBasicInfoMsg.noEntrNoMsg);
            $('#entrNo').focus();
            return false;
        }

        // 표준분류 카테고리 번호가 없는 경우
        if ( $('#stdCtgNo').val() === '' ) {
            alert(packageBasicInfoMsg.noStdCtgNoMsg);
            $('#stdCtgHierarchy').focus();
            return false;
        }
        return true;
    }
    ,getPkgBasicInfo : function () {
        return $('#pkgBasicInfo').serializeObject();
    }
    ,setPkgBasicInfo : function ( data ){

        // 임시상품번호 세팅
        $('#pregGoodsNo').val(data.pregGoodsNo);

        // 협력사번호 세팅
        $('#entrNo').val(data.entrNo);
        $('#entrNm').val(data.entrNm);
        $('#btn_entr_popup_call, #btn_entr_popup_reset').addClass('disabled');
        $('#btn_entr_popup_call, #btn_entr_popup_reset').unbind('click');

        // 표준분류 세팅
        $('#stdCtgNo').val(data.stdCtgNo);
        $('#stdCtgHierarchy').val(data.stdCtgHierarchy);

        // 담당MD 세팅
        $('#mdId').val(convertNullToEmptyString(data.mdId));

    }
}