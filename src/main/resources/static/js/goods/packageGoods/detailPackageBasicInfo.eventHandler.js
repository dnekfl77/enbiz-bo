$.namespace("detailPackageBasicInfo.eventhandler")
detailPackageBasicInfo.eventhandler = {
    init : function () {}
    ,getPkgBasicInfo : function () {
        return $('#pkgBasicInfo').serializeObject();
    }
    ,setPkgBasicInfo : function ( data ){

        // 상품번호 세팅
        $('#goodsNo').val(data.goodsNo);

        // 협력사번호 세팅
        $('#entrNo').val(data.entrNo);
        $('#entrNm').val(data.entrNm);

        // 표준분류 세팅
        $('#stdCtgHierarchy').val(data.stdCtgHierarchy);

        // 담당MD 세팅
        $('#mdId').val(convertNullToEmptyString(data.mdId));
    }
}