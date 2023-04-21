var reviewDetailMsg = x2coMessage.getMessage({
    noSelectedRevDispStatMsg : 'reviewMgmt.reviewDetail.alert.msg.noSelectedRevDispStatMsg'
    ,noSelectedPhotoDispStatMsg : 'reviewMgmt.reviewDetail.alert.msg.noSelectedPhotoDispStatMsg'
    ,revDispStatNotChangedMsg : 'reviewMgmt.reviewDetail.alert.msg.revDispStatNotChangedMsg'
    ,phothDispStatNotChangedMsg : 'reviewMgmt.reviewDetail.alert.msg.phothDispStatNotChangedMsg'
    ,noSelectedReplyMsg : 'reviewMgmt.reviewDetail.alert.msg.noSelectedReplyMsg'
    ,canNotAddReplyMsg : 'reviewMgmt.reviewDetail.alert.msg.canNotAddReplyMsg'
});

$.namespace('reviewReplyListGrid.eventhandler');
reviewReplyListGrid.eventhandler = {
    init : function () {
        this.gridSetting();
        this.bindButtonEvent();
        this.getReviewReplyList();
    }
    ,gridSetting : function () {

        this.grid.onItemChecked = function ( grid, itemIndex, checked ) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function ( grid, item, fixed ) {
            if (item.checked) return 'rg-trcol_active';
        });
        this.grid.editOptions.editable = false;

        // 리뷰의 전시상태가 '전시불가'인 경우 체크박스 비활성화
        this.grid.setCheckableExpression("values['replySeqDispStatCd'] <> '30'", true);
    }
    ,bindButtonEvent : function () {

        var that = this;

        // 리뷰 미리보기 사진 변경
        $('.thumbnail').on( 'click', function () {
            var src = $(this).attr('src');
           $('.thumbnail-l').attr('src',src);
        });

        // 리뷰 사진 상세 팝업 호출
        $('.thumbnail, .thumbnail-l').on( 'dblclick', function () {
            if ( !_revFiles.length ) return;
            that.callReviewAttachedFileDetailPopup();
        });

        // 리뷰전시상태 저장
        $('#btn_revDispStat_save').on('click', function () {
            that.modifyReviewDisplayState();
        });

        // 사진전시상태 저장
        $('#btn_photoDispStat_save').on('click', function () {
            that.modifyPhotoDisplyState();
        });

        // 평가항목 레이어 팝업 호출
        $('#btn_call_evltItem_layer_popup').on('click', function () {
            that.callEvltItemLayerPopup();
        });

        // 평가항목 레이어팝업 닫기
        $('#btn_evltItem_layerPop_close').click(function () {
            $('.layer-popup .box .btn-close').click();
        });

        // 답글 등록 팝업 호출
        $('#btn_call_revReplyRegist_popup').on('click', function () {
            that.callReviewReplyRegistPopup();
        });

        // 전시처리
        $('#btn_display').on('click', function () {
            that.changeRepliesDisplayState('20');
        });

        // 전시안함 처리
        $('#btn_hide').on('click', function () {
            that.changeRepliesDisplayState('10');
        });
    }
    // 답글 목록 조회
    ,getReviewReplyList : function ( pageNo ) {

        var that = this;
        var extraQueryString = 'revNo='+_revInfo.revNo;

        that.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function ( pageNo ) { return that.getReviewReplyList(pageNo); };
        this.controller.doQuery( that, extraQueryString, pageNo, pageFunc );
    }
    // 리뷰전시상태 변경
    ,modifyReviewDisplayState : function () {
        var preStatCd = _revInfo.revDispStatCd;
        var postStatCd = $('#revDispStatCd').val();

        if ( postStatCd === '' ) {
            alert(reviewDetailMsg.noSelectedRevDispStatMsg);
            return;
        }

        if ( preStatCd === postStatCd) {
            alert(reviewDetailMsg.revDispStatNotChangedMsg);
            return;
        }

        if ( !confirm("리뷰전시상태를 [" + _dispStatCdList[postStatCd] + "] 상태로 변경하시겠습니까?") ) return;

        var param = {};
        param.revNo = _revInfo.revNo;
        param.revDispStatCd = postStatCd;

        common.Ajax.sendJSONRequest(
            "POST"
            , _baseUrl + "goods/ReviewMgmt.modifyReviewDisplayState.do"
            , param
            , function ( data ) {
                if ( data.succeeded ) {
                    _revInfo.revDispStatCd = postStatCd;
                }
            }, null, null, false
        );

    }
    // 사진 전시상태 변경
    ,modifyPhotoDisplyState : function () {
        var preStatCd = _revInfo.photoDispStatCd;
        var postStatCd = $('#photoDispStatCd').val();

        if ( postStatCd === '' ) {
            alert(reviewDetailMsg.noSelectedPhotoDispStatMsg);
            return;
        }

        if ( preStatCd === postStatCd) {
            alert(reviewDetailMsg.phothDispStatNotChangedMsg);
            return;
        }

        if ( !confirm("사진전시상태를 [" + _dispStatCdList[postStatCd] + "] 상태로 변경하시겠습니까?") ) return;

        var param = {};
        param.revNo = _revInfo.revNo;
        param.photoDispStatCd = postStatCd;

        common.Ajax.sendJSONRequest(
            "POST"
            , _baseUrl + "goods/ReviewMgmt.modifyReviewPhotoDisplayState.do"
            , param
            , function ( data ) {
                if ( data.succeeded ) {
                    _revInfo.photoDispStatCd = postStatCd;
                }
            },null, null, false
        );
    }
    // 평가항목 레이어 팝업 호출
    ,callEvltItemLayerPopup : function () {
        layerPopOpen('layerPop-evltItem');
    }
    // 답글 전시상태 변경
    ,changeRepliesDisplayState : function ( replySeqDispStatCd ) {

        var that = this;
        var grid = this.grid;
        var provider = grid.getDataSource();

        var checkedItems = grid.getCheckedRows();
        if ( !checkedItems.length ) {
            alert(reviewDetailMsg.noSelectedReplyMsg);
            return;
        }

        var revNo = _revInfo.revNo;
        var replySeqList = [], replySeqDispStatCdList = [];
        checkedItems.forEach( function ( item ) {
            var data = provider.getJsonRow( item );
            replySeqList.push(data.replySeq);
            replySeqDispStatCdList.push(data.replySeqDispStatCd);
        });

        if ( replySeqDispStatCdList.includes(replySeqDispStatCd) ){
            alert('선택된 답글 중 전시상태가 이미 [' + _dispStatCdList[replySeqDispStatCd] + '] 상태인 답글이 있습니다.\n다시 선택해주세요.');
            return;
        }

        if ( replySeqDispStatCdList.includes('30') ) return; // 전시불가 선택 방지
        if ( !confirm("선택된 답글의 전시상태를 [" + _dispStatCdList[replySeqDispStatCd] + '] 상태로 변경하시겠습니까?') ) return;

        var param = {};
        param.revNo = revNo;
        param.replySeqList = replySeqList;
        param.replySeqDispStatCd = replySeqDispStatCd;

        common.Ajax.sendJSONRequest(
            "POST"
            , _baseUrl + "goods/ReviewMgmt.modifyRepliesDisplayState.do"
            , param
            , function ( data ) {
                if( data.succeeded ){
                    that.getReviewReplyList();
                }
            },null ,null, false
        );
    }
    // 답글 등록 팝업 호출
    ,callReviewReplyRegistPopup : function () {

        // 리뷰의 전시상태가 '전시처리'가 아닌경우, 답글 등록 불가
        if ( _revInfo.revDispStatCd !== '20' ) {
            alert(reviewDetailMsg.canNotAddReplyMsg);
            return;
        }

        var that = this;
        var pin = { revNo : _revInfo.revNo , replyCont : '' }
        var POP_DATA = {
            url: _baseUrl + 'goods/ReviewMgmt.reviewReplyRegistView.do'
            , winName: 'reviewReplyRegistView'
            , title: '리뷰답글등록팝업'
            , _title: '리뷰답글등록팝업'
            , left: 20
            , top: 20
            , width: 625
            , height: 450
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, function (e) {
            var data = JSON.parse(e.data);
            if ( data.succeeded ) {
                that.getReviewReplyList();
            }
        });
    }
    // 리뷰 사진 상세 팝업 호출
    ,callReviewAttachedFileDetailPopup : function () {

        var pin = { revNo : _revInfo.revNo }
        var POP_DATA = {
            url: _baseUrl + 'goods/ReviewMgmt.reviewAttachedFileDetailView.do'
            , winName: 'reviewAttachedFileDetailView'
            , title: '리뷰사진상세팝업'
            , _title: '리뷰사진상세팝업'
            , left: 20
            , top: 20
            , width: 685
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, function (e) {});

    }
    ,gridEvent : {
        onCellDblClicked: function (grid, clickedCell) {
            if ( clickedCell.cellType === 'header') return;
            var rowData = grid.getDataSource().getJsonRow(clickedCell.dataRow);
            if (clickedCell.column === 'replyCont') {
                var pin = { revNo : rowData.revNo , replyCont : rowData.replyCont }
                var POP_DATA = {
                    url: _baseUrl + 'goods/ReviewMgmt.reviewReplyRegistView.do'
                    , winName: 'reviewReplyRegistView'
                    , title: '리뷰답글상세팝업'
                    , _title: '리뷰답글상세팝업'
                    , left: 20
                    , top: 20
                    , width: 625
                    , height: 450
                    , scrollbars: false
                    , autoresize: false
                };
                popCommon(pin, POP_DATA, function (e) {});
            }
        }
    }
}