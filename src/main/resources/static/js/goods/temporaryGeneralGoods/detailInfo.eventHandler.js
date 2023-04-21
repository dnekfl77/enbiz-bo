var detailInfoMsg = x2coMessage.getMessage({
     minImageCntMsg        : 'generalGoods.detailInfo.alert.msg.minImageCntMsg'
    ,maxImageCntMsg        : 'generalGoods.detailInfo.alert.msg.maxImageCntMsg'
    ,invalidImageTypeMsg   : 'generalGoods.detailInfo.alert.msg.invalidImageTypeMsg'
    ,maxImageSizeMsg       : 'generalGoods.detailInfo.alert.msg.maxImageSizeMsg'
    ,maxTotalImageSizeMsg  : 'generalGoods.detailInfo.alert.msg.maxTotalImageSizeMsg'
    ,noDetailContentsMsg   : 'generalGoods.detailInfo.alert.msg.noDetailContentsMsg'
    ,noImageReplaceTextMsg : 'generalGoods.detailInfo.alert.msg.noImageReplaceTextMsg'
});

$.namespace('detailInfo.eventhandler');
detailInfo.eventhandler = {
    // 초기화
    init : function () {
        this.setting();
        this.bindButtonEvent();

        this.maxImgSize = 2 * 1024 * 1024           // 최대 이미지 사이즈 제한 ( 2MB )
        this.maxTotalImgSize = 6 * 1024 * 1024;     // 최대 이미지 사이즈 총합 제한 ( 6MB )
        this.maxImgHeight = 1000                    // 최대 이미지 세로 길이 제한 (px)
        this.maxImgWidth = 900                      // 최대 이미지 세로 길이 제한 (px)

    }
    // 화면세팅
    ,setting : function () {

        // 에디터 세팅
        var oEditors = [];
        nhn.husky.EZCreator.createInIFrame({
            oAppRef: oEditors,
            elPlaceHolder: "detailHtmlEditor",  // Text Area ID값
            sSkinURI: "/static/js/libs/smartEditor/SmartEditor2Skin.html",
            fCreator: "createSEditor2"
        });
        detailInfo.eventhandler.oEditors = oEditors;
    }
    // 이벤트
    ,bindButtonEvent : function () {

        var that = this;

        // 상품상세등록타입 변경
        $('#detailInfo :radio[name=detailType]').change( function () {

            var type = $(this).val();

            // HTML
            if ( type === '01') {

                $('#section_detail_html').show();

                $('#section_detail_image').hide();
                $('#section_detail_image_btn').hide();

                // 이미지 초기화
                $('tr[type=newDetailImage]').remove();

            // 이미지
            } else if ( type === '02' ) {

                $('#section_detail_html').hide();

                $('#section_detail_image').show();
                $('#section_detail_image_btn').show();

                // 이미지 세팅
                $('#btn_add_detail_image').trigger('click');

            }
        });

        // 이미지 행 추가
        $('#btn_add_detail_image').click( function () {

            // 최대 이미지 개수 제한
            var imageCnt = $('tr[type=newDetailImage]').length;
            if( imageCnt === 10 ) {
                alert(detailInfoMsg.maxImageCntMsg);
                return;
            }

            // 새 이미지 생성
            var newDetailImage = $('tr[type=detail_image_tmpl]').clone();
            newDetailImage.attr('type','newDetailImage');
            newDetailImage.find('.imageNo').text( imageCnt + 1 );
            newDetailImage.appendTo( $('#detailImageList') );
            newDetailImage.show();

            // 파일선택 버튼 클릭시
            newDetailImage.find('.btn_image_upload').bind('click', function () {
                $(this).parent().find('.imageFile').click();
            });

            // 업로드할 이미지 선택 시
            newDetailImage.find('.imageFile').bind('change', function (event) {

                var imageView = $(this).parent().parent().find('.imageView');
                var fileName = event.target.files[0].name;
                var fileSize = event.target.files[0].size;     // 추가한 이미지 사이즈

                var imageSize = isFinite(fileSize) ? parseFloat(fileSize) / 1024 : 0.0;
                var imageWidth = 0;
                var imageHeight = 0;

                // jpg 이미지 파일만 등록 가능
                var extension = fileName.split('.').pop().toLowerCase();
                if($.inArray(extension,['jpg']) === -1){
                    alert(detailInfoMsg.invalidImageTypeMsg);
                    return;
                }

                // 개별 이미지 사이즈 확인
                if ( imageSize > that.maxImgSize ) {
                    alert(detailInfoMsg.maxImageSizeMsg);
                    return;
                }

                // 이미지 가로,세로 크기 확인
                // if( that.maxImgHeight < imageHeight || that.maxImgWidth < imageWidth ) {
                //     alert('가로[900px], 세로[1000px] 사이즈의 이미지만 업로드 가능합니다.');
                //     return;
                // }

                // 총 업로드된 이미지 사이즈 학인
                var totalImageSize = that.getTotalImageSize() + imageSize;
                if( that.maxTotalImgSize < totalImageSize ){
                    alert(detailInfoMsg.maxTotalImageSizeMsg);
                    return;
                }

                // 이미지 사이즈 세팅
                $(this).siblings('.imageFileSize').val(imageSize);

                // 이미지 파일명 세팅
                $(this).siblings('.imageFileName').val(fileName);

                var reader = new FileReader();
                reader.onload = function(event) {
                    imageView.attr('src', event.target.result);
                    imageView.removeClass('noimg');

                    that.getImageSize(reader.result, function( imageWidth, imageHeight ){
                        imageView.parent().find('.imageSize').text('가로 : ' + imageWidth + 'px, 세로 : ' + imageHeight + 'px, 크기 : ' + imageSize.toFixed(1) + 'KB');
                    });
                };
                reader.readAsDataURL(event.target.files[0]);
            });
        });

        // 이미지 행 삭제
        $('#btn_remove_detail_image').click( function () {

            // 최소 이미지 개수 제한
            var imageCnt = $('tr[type=newDetailImage]').length;
            if( imageCnt === 1 ) {
                alert(detailInfoMsg.minImageCntMsg);
                return;
            }

            $('tr[type=newDetailImage]').last().remove();
        });
    }
    // 이미지 크기 계산
    ,getImageSize : function ( imageURL, callback ) {

        var image = new Image();

        image.onload = function() {
            if (!callback) {
                // error
            } else {
                callback( this.naturalWidth, this.naturalHeight );
            }
        }
        image.src = imageURL;
    }
    // 업로드된 이미지 총합 계산
    ,getTotalImageSize : function () {

        return 0;
    }
    // 상품상세설명 초기화
    ,resetDetailInfo : function () {

        $('#detailInfo :radio[name=detailType][value="01"]').prop('checked', true);
        $('#section_detail_html').show();

        $('#section_detail_image').hide();
        $('#section_detail_image_btn').hide();

        // 이미지 초기화
        $('tr[type=newDetailImage]').remove();
        this.totalImageSize = 0;

        // 웹에디터 초기화
        var oEditors = detailInfo.eventhandler.oEditors;
        oEditors.getById['detailHtmlEditor'].exec('SET_IR',['']);
        $('iframe').contents().find(".se2_to_editor").click();

    }
    // 상품상세설명 유효성 체크
    ,validationCheck : function () {

        // 상품상세등록타입 : HTML
        if ( $('#detailInfo :radio[name=detailType]:checked').val() === '01' ) {

            var oEditors = detailInfo.eventhandler.oEditors;
            oEditors.getById["detailHtmlEditor"].exec("UPDATE_CONTENTS_FIELD", []);
            var editorContents = $('#detailHtmlEditor').val();
            if( editorContents == ""  || editorContents == null || editorContents == '&nbsp;' || editorContents == '<p>&nbsp;</p>')  {
                alert(detailInfoMsg.noDetailContentsMsg);
                oEditors.getById["detailHtmlEditor"].exec("FOCUS");
                return false;
            }

        // 상품상세등록타입 : 이미지
        } else {

            // 이미지를 최소 1개 이상 등록하지 않은 경우
            var imageList = $('tr[type=newDetailImage]');

            // 이미지 업로드 템플릿 개수
            var imageCnt = imageList.length;
            if( imageCnt < 1 ) {
                alert(detailInfoMsg.minImageCntMsg);
                return false;
            }

            // 업로드 이미지 개수
            var isInvalidImage = false;
            $.each( imageList, function ( index, image ) {
                var fileName = $(this).find('.imageFileName').val();
                var replaceText = $(this).find('.imageReplaceText').val();

                // 이미지를 업로드하지 않은 경우 ( 최소 1개 )
                if ( index === 0 && fileName === '' ) {
                    alert(detailInfoMsg.minImageCntMsg);
                    $(this).find('.imageFileName').focus();
                    isInvalidImage = true;
                    return false;
                }

                // 이미지를 업로드 했는데, 대체텍스트를 입력하지 않은경우
                if ( fileName !== '' &&replaceText === '' ) {
                    alert(detailInfoMsg.noImageReplaceTextMsg);
                    $(this).find('.imageReplaceText').focus();
                    isInvalidImage = true;
                    return false;
                }
            });
            if ( isInvalidImage ) return false;
        }

        return true;

    }
    // 등록 > 상품상세설명 조회
    ,getDetailInfo : function () {

        var detailInfoObj = {};

        // 상품상세등록타입 : HTML
        if ( $('#detailInfo :radio[name=detailType]:checked').val() === '01' ) {

            var oEditors = detailInfo.eventhandler.oEditors;
            var sHTML = oEditors.getById['detailHtmlEditor'].getIR();

            detailInfoObj.detailType = 'html'
            detailInfoObj.detailInfo = sHTML;

        // 상품상세등록타입 : 이미지
        } else {
            var detailImageFiles = new FormData();
            var detailImages = $('tr[type=newDetailImage] input[type=file]');
            for ( var i = 0; i < detailImages.length; i++ ) {
                if ( $(detailImages[i]).siblings().find('.imageFileName').val() === '' ) continue;
                detailImageFiles.append('file', detailImages[i].files[0]);
            };
            detailImageFiles.append('type', 'goodsRegistDetailImage');
            detailImageFiles.append('cmtTypCd', '01');
            detailImageFiles.append('imgGbCd', '30');

            // 대체텍스트 입력

            detailInfoObj.detailType = 'image'
            detailInfoObj.detailInfo = detailImageFiles;
        }

        return detailInfoObj;

    }
    // 상세 > 상품상세설명 세팅
    ,setDetailInfo : function ( detailInfoData ) {

    }
}