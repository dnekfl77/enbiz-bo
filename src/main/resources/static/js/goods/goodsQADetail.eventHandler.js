var goodsQADetailMsg = x2coMessage.getMessage({
     noQuestDispStatCdMsg : 'goodsQAMgmt.goodsQADetail.alert.msg.noQuestDispStatCdMsg'
    ,noChangeQuestDispStatCdMsg : 'goodsQAMgmt.goodsQADetail.alert.msg.noChangeQuestDispStatCdMsg'
    ,noAnsContMsg : 'goodsQAMgmt.goodsQADetail.alert.msg.noAnsContMsg'
    ,minAnsContMsg : 'goodsQAMgmt.goodsQADetail.alert.msg.minAnsContMsg'
    ,maxAnsContMsg : 'goodsQAMgmt.goodsQADetail.alert.msg.maxAnsContMsg'
    ,noAnsDispStatCdMsg : 'goodsQAMgmt.goodsQADetail.alert.msg.noAnsDispStatCdMsg'
    ,alreadyAddedAnsExistMsg : 'goodsQAMgmt.goodsQADetail.alert.msg.alreadyAddedAnsExistMsg'
});

$.namespace('goodsQADetail.eventhandler');
goodsQADetail.eventhandler = {
    init : function () {
        this.bindButtonEvent();

        // 답변이 없는경우
        if( Object.keys(_questAnsList).length < 1 ) this.addAnswer();
    }
    ,bindButtonEvent : function () {

        var that = this;

        //=========== 질문내역 ===========

        // 고객센터이관 , 이관 사유 확인
        $('#btn_quest_transfer').on( 'click' , function () {
            that.transferQuest();
        });

        // 회원주문내역
        $('#btn_call_order_popup').on( 'click' , function () {
            alert('서비스 준비중입니다.');
        });

        // 질문 전시상태 저장
        $('#btn_quest_save').on( 'click' , function () {
            that.saveQuest();
        });

        //=========== 답변내역 ===========

        // 이전 답변
        $('#btn_ans_prev').on( 'click', function () {
            var idx = $('#ansIdx').text();
            if ( idx === '1' ) return; // 시작
            that.slideAnswer(--idx);
        });

        // 다음 답변
        $('#btn_ans_next').on( 'click', function () {
            var idx = $('#ansIdx').text();
            var total = $('#ansTotalCnt').text();
            if ( idx === total ) return; // 끝
            that.slideAnswer(++idx);
        });

        // 초기화
        $('#btn_ans_reset').on( 'click' , function () {
            that.resetAnswer();
        });

        // 저장
        $('#btn_ans_save').on( 'click', function () {
            that.saveAnswer();
        });

        // 답변추가
        $('#btn_ans_add').on( 'click', function () {
            that.addAnswer();
        });

        // 답변템플릿 변경
        $('.ansTmplNo').on( 'change', function () {
            var ansTmpl = _questAnsTmplList[this.value];
            $(this).parent().parent().parent().find('textarea[name=ansCont]').val(ansTmpl);
        });
    }
    ,transferQuest : function () {

        var pin = { questNo : _questBasicInfo.questNo };
        var POP_DATA = {
            url: _baseUrl + 'goods/GoodsQAMgmt.goodsQATransferView.do'
            , winName: 'goodsQATransferPopup'
            , title: '고객센터이관팝업'
            , _title: '고객센터이관팝업'
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
                window.location.reload();
            }
        });

    }
    ,saveQuest : function () {
        var preQuestDispStatCd = _questBasicInfo.questDispStatCd;
        var questDispStatCd = $('#questDispStatCd').val();

        if ( !questDispStatCd ){
            alert(goodsQADetailMsg.noQuestDispStatCdMsg);
            return;
        }

        if ( preQuestDispStatCd === questDispStatCd) {
            alert(goodsQADetailMsg.noChangeQuestDispStatCdMsg);
            return;
        }

        if ( !confirm(_msg.confirmSaveMsg) ) return;

        var param = {};
        param.questNo = _questBasicInfo.questNo;
        param.questDispStatCd = questDispStatCd;

        common.Ajax.sendJSONRequest(
            "POST"
            , _baseUrl + "goods/GoodsQAMgmt.modifyQADisplayState.do"
            , param
            , function ( data ) {
                if ( data.succeeded ) {
                    window.location.reload();
                }
            }
            ,null
            ,null
            ,false
        );
    }
    ,slideAnswer : function ( idx ) {
        $('.answers').children().hide();
        $('#answer_'+idx).show();
        $('#ansIdx').text(idx);
    }
    ,resetAnswer : function () {
        var idx = $('#ansIdx').text();
        $('#answerForm_'+idx)[0].reset();
        var answer = _questAnsList[idx];
        $('#answerForm_'+idx).find('textarea[name=ansCont]').val((answer)? answer.ansCont : '');
    }
    ,saveAnswer : function () {
        var idx = $('#ansIdx').text();
        var answerForm = $('#answerForm_'+idx);
        var disabled = answerForm.find(':disabled').prop('disabled',false);
        var param = answerForm.serializeObject();
        disabled.prop('disabled',true);

        var ansCont = param.ansCont;
        ansCont = ansCont.replace(/\s+/g,'');

        if ( !ansCont ) {
            alert(goodsQADetailMsg.noAnsContMsg);
            return;
        }

        if ( ansCont.length < 10 ) {
            alert(goodsQADetailMsg.minAnsContMsg);
            return;
        }

        if ( ansCont.length > 4000 ) {
            alert(goodsQADetailMsg.maxAnsContMsg);
            return;
        }

        if ( !param.ansDispStatCd ) {
            alert(goodsQADetailMsg.noAnsDispStatCdMsg);
            return;
        }

        // 전시상태를 변경하지 않은경우
        var answer = _questAnsList[idx];
        var preAnsDispStatCd = (answer)? answer.ansDispStatCd : ''
        if ( preAnsDispStatCd === param.ansDispStatCd ) {
            param.ansDispStatCd = '';
        }

        if( !confirm(_msg.confirmSaveMsg) ) return;

        common.Ajax.sendJSONRequest(
            "POST"
            , _baseUrl + "goods/GoodsQAMgmt.saveGoodsAnswer.do"
            , param
            , function ( data ) {
                if ( data.succeeded ) {
                    window.location.reload();
                }
            }
            ,null
            ,null
            ,false
        );
    }
    ,addAnswer : function () {

        var newAnswerCnt = $('.answer_new').length;
        if ( newAnswerCnt > 0 ) {
            alert(goodsQADetailMsg.alreadyAddedAnsExistMsg);
            return;
        }

        var idx = $('#ansTotalCnt').text();
        var newIdx = ++idx;
        var newAnswer = $('.answer_tmpl').find('table').clone();

        $('<div/>').addClass('data-body toggle-cont answer_new').attr('id','answer_' + newIdx).append(
            $('<form/>').attr('id','answerForm_' + newIdx).append(
                $('<input/>').attr({type:'hidden',name:'questNo'}).val(_questBasicInfo.questNo)
                ,$('<input/>').attr({type:'hidden',name:'ansSeq'}).val('')
                ,$('<input/>').attr({type:'hidden',name:'procStatCd'}).val(_questBasicInfo.procStatCd)
                ,newAnswer
            )
        ).appendTo( $('.answers'));

        newAnswer.find('.ansTmplNo').on( 'change', function(){
            var ansTmpl = _questAnsTmplList[this.value];
            newAnswer.find('textarea[name=ansCont]').val(ansTmpl);
        });

        $('.answers').children('.answer_old').hide();
        $('#ansIdx, #ansTotalCnt').text(newIdx);
    }
}