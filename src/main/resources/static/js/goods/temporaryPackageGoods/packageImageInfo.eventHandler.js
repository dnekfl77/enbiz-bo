var packageImageInfoMsg = x2coMessage.getMessage({
    invalidImageTypeMsg  : 'generalGoods.imageInfo.alert.msg.invalidImageTypeMsg'
    , maxBaseImageSizeMsg  : 'generalGoods.imageInfo.alert.msg.maxBaseImageSizeMsg'
    , maxTotalImageSizeMsg : 'generalGoods.imageInfo.alert.msg.maxTotalImageSizeMsg'
    , maxSubImageCntMsg    : 'generalGoods.imageInfo.alert.msg.maxSubImageCntMsg'
    , maxSubImageSizeMsg   : 'generalGoods.imageInfo.alert.msg.maxSubImageSizeMsg'
    , noImageForRemoveMsg  : 'generalGoods.imageInfo.alert.msg.noImageForRemoveMsg'
    , noBaseImageMsg       : 'generalGoods.imageInfo.alert.msg.noBaseImageMsg'
});

$.namespace('packageImageInfo.eventhandler')
packageImageInfo.eventhandler = {
    // 초기화
    init : function () {
        this.bindButtonEvent();

        this.maxTotalImgSize = 6 * 1024 * 1024;     // 최대 이미지 사이즈 총합 제한 ( 6MB )
        this.maxImgSize = 800 * 1024                // 최대 이미지 사이즈 제한 ( 800KB )
        this.maxImgHeight = 880                     // 최대 이미지 세로 길이 제한 (px)
        this.maxImgWidth = 880                      // 최대 이미지 세로 길이 제한 (px)
    }
    // 이벤트
    ,bindButtonEvent : function () {

        var that = this;

        // 기본 이미지 추가 버튼 클릭
        $('#btn_base_image_upload').click(function () {
            $('#baseImageFile').click();
        });

        // 기본 이미지 추가 후
        $('#baseImageFile').change(function (event) {

            var fileName = event.target.files[0].name;
            var fileSize = event.target.files[0].size;

            var imageSize = isFinite(fileSize) ? parseFloat(fileSize) / 1024 : 0.0;
            var imageWidth = 0;
            var imageHeight = 0;

            // jpg 이미지 파일만 등록 가능
            var extension = fileName.split('.').pop().toLowerCase();
            if($.inArray(extension,['jpg']) === -1){
                alert(packageImageInfoMsg.invalidImageTypeMsg);
                return;
            }

            // 개별 이미지 사이즈 확인
            if ( imageSize > that.maxImgSize ) {
                alert(packageImageInfoMsg.maxBaseImageSizeMsg);
                return;
            }

            // if( that.maxImgHeight < imageHeight || that.maxImgWidth < imageWidth ) {
            //     alert('가로[880px], 세로[880px] 사이즈의 이미지만 업로드 가능합니다.');
            //     return;
            // }

            // 총 업로드된 이미지 사이즈 학인
            var totalImageSize = that.getTotalImageSize() + imageSize;
            if( that.maxTotalImgSize < totalImageSize ){
                alert(packageImageInfoMsg.maxTotalImageSizeMsg);
                return;
            }

            // 이미지 사이즈 세팅
            $('#baseImageSize').val(imageSize);

            // 이미지 파일명 세팅
            $('#baseImageFileName').val(fileName);

            var reader = new FileReader();
            reader.onload = function (event) {
                $('#baseImageView').attr('src', event.target.result);
                that.getImageSize(reader.result, function (imageWidth, imageHeight) {
                    $('#baseImageSize').text('가로 : ' + imageWidth + 'px, 세로 : ' + imageHeight + 'px, 크기 : ' + imageSize.toFixed(1) + 'KB')
                });
            };
            reader.readAsDataURL(event.target.files[0]);
        });

        // 이미지 추가
        $('#btn_add_sub_image').click(function () {

            // 최대 이미지 개수 제한
            var imageCnt = $('tr[type=newSubImage]').length;
            if( imageCnt === 10 ) {
                alert(packageImageInfoMsg.maxSubImageCntMsg);
                return;
            }

            var newSubImage = $('tr[type=sub_image_tmpl]').clone();
            newSubImage.attr('type','newSubImage');
            newSubImage.find('.imageNo').text( imageCnt + 1 );
            newSubImage.appendTo( $('#subImageList') );
            newSubImage.show();

            newSubImage.find('.btn_image_upload').bind('click', function () {
                $(this).parent().find('.imageFile').click();
            });

            newSubImage.find('.imageFile').bind('change', function (event) {

                var imageView = $(this).parent().parent().find('.imageView');
                var fileName = event.target.files[0].name;
                var fileSize = event.target.files[0].size;     // 추가한 이미지 사이즈

                var imageSize = isFinite(fileSize) ? parseFloat(fileSize) / 1024 : 0.0;
                var imageWidth = 0;
                var imageHeight = 0;

                // jpg 이미지 파일만 등록 가능
                var extension = fileName.split('.').pop().toLowerCase();
                if($.inArray(extension,['jpg']) === -1){
                    alert(packageImageInfoMsg.invalidImageTypeMsg);
                    return;
                }

                // 개별 이미지 사이즈 확인
                if ( imageSize > that.maxImgSize ) {
                    alert(packageImageInfoMsg.maxSubImageSizeMsg);
                    return;
                }

                // 총 업로드된 이미지 사이즈 학인
                var totalImageSize = that.getTotalImageSize() + imageSize;
                if( that.maxTotalImgSize < totalImageSize ){
                    alert(packageImageInfoMsg.maxTotalImageSizeMsg);
                    return;
                }

                // 이미지 사이즈 세팅
                $(this).siblings('.imageFileSize').val(imageSize);

                // 이미지 파일명 세팅
                $(this).siblings('.imageFileName').val(fileName);

                $(this).siblings('.imageFileName').val(fileName);
                var reader = new FileReader();

                reader.onload = function(event) {
                    imageView.attr('src', event.target.result);
                    imageView.removeClass('noimg');

                    that.getImageSize(reader.result, function( imageWidth, imageHeight ){
                        var imageSize = isFinite(fileSize) ? parseFloat(fileSize) / 1024 : 0.0;
                        imageView.parent().find('.imageSize').text('가로 : ' + imageWidth + 'px, 세로 : ' + imageHeight + 'px, 크기 : ' + imageSize.toFixed(1) + 'KB');
                    });
                };
                reader.readAsDataURL(event.target.files[0]);
            });
        });

        // 이미지 삭제
        $('#btn_remove_sub_image').click( function () {

            var imageCnt = $('tr[type=newSubImage]').length;
            if( imageCnt === 0 ) {
                alert(packageImageInfoMsg.noImageForRemoveMsg);
                return;
            }
            $('tr[type=newSubImage]').last().remove();

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
    // 상품이미지 초기화
    ,resetImageInfo : function ( ) {

        // 기본 이미지 초기화
        //$('#baseImageView').attr("src",_baseUrl+'static/img/noimage.svg').addClass("noimg br");
        $('#baseImageView').removeAttr('src');
        $('#baseImageFileName').val('');
        $('#baseImageFile').val('');
        $('#baseImageFileSize').val('');
        $('#baseImageSize').text('');

        // 추가 이미지 초기화
        $('tr[type=newSubImage]').remove();

    }
    // 상품이미지 유효성 체크
    ,validationCheck : function () {

        // 상품 기본이미지를 등록하지 않은 경우
        if ( $('#baseImageFileName').val() === '' ) {
            alert(packageImageInfoMsg.noBaseImageMsg);
            $('#baseImageFileName').focus();
            return false;
        }
        return true;
    }
    // 등록 > 상품이미지 조회
    ,getImageInfo : function () {

        var imageInfoObj = {};

        // 기본 이미지 저장
        var baseImageFiles = new FormData();
        baseImageFiles.append('file', $('#baseImageFile')[0].files[0]);
        baseImageFiles.append('type', 'goodsRegistBaseImage');
        baseImageFiles.append('cmtTypCd', '03');
        baseImageFiles.append('imgGbCd', '10');

        // 추가 이미지 저장
        var subImageFiles = new FormData();
        var subImages = $('tr[type=newSubImage] input[type=file]');
        for ( var i = 0; i < subImages.length; i++ ) {
            if ( $(subImages[i]).siblings().find('.imageFileName').val() === '' ) continue;
            subImageFiles.append('file',subImages[i].files[0]);
        }
        subImageFiles.append('type', 'goodsRegistSubImage');
        subImageFiles.append('cmtTypCd', '03');
        subImageFiles.append('imgGbCd', '20');

        imageInfoObj.baseImageFiles = baseImageFiles;
        imageInfoObj.subImageFiles = subImageFiles;

        return imageInfoObj;

    }
    // 상세 > 상품이미지 세팅
    ,setImageInfo : function ( imageInfoData ) {


    }
}