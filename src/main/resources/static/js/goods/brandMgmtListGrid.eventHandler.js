const alertMessage = x2coMessage.getMessage( {
    imageExtension   : 'brandMgmt.alert.msg.imageExtension',
    imageMaxSize     : 'brandMgmt.alert.msg.imageMaxSize',
    imageNecessary   : 'brandMgmt.alert.msg.imageNecessary',
    brandNm          : 'brandMgmt.alert.msg.brandNm',
    korBrandNm       : 'brandMgmt.alert.msg.korBrandNm',
    engBrandNm       : 'brandMgmt.alert.msg.engBrandNm',
    useYn            : 'brandMgmt.alert.msg.useYn',
    dispOptnCd       : 'brandMgmt.alert.msg.dispOptnCd',
    korSchNm         : 'brandMgmt.alert.msg.korSchNm',
    engSchNm         : 'brandMgmt.alert.msg.engSchNm',
    onlyKoMsg          : 'brandMgmt.alert.msg.onlyKoMsg',
    onlyEnMsg          : 'brandMgmt.alert.msg.onlyEnMsg',
    noSelectedSaveItem : 'adminCommon.alert.no.selected.item.for.save',
    confirmSaveMsg     : 'adminCommon.alert.save',
    confirmDeleteMsg   : 'adminCommon.alert.delete',
    noDeleteItemMsg    : 'adminCommon.alert.invalid.item.for.delete'
});

$.namespace("brandMgmtListGrid.eventhandler");
brandMgmtListGrid.eventhandler = {
    init(){
        this.gridSetting();
        this.bindButtonEvent();
    },
    gridSetting(){
        this.grid.setEditOptions({ editable: false });
    },
    bindButtonEvent() {
        var self = this;
        $('input[name=kor-sch],input[name=eng-sch]').change(function(){
            $(this).closest('label').siblings('.sch').val( $(this).val());
            $(this).closest('label').siblings('.sch').attr('disabled',true);
            $(this).closest('label').siblings('.etc').prop('checked',false);
        });

        $('.etc').on('click', e => {
            let el = $(e.currentTarget);
            if(el.prop('checked') === true){
                el.parent().find('.sch').attr('disabled',false).val('');
            }else{
                el.parent().find('.sch').attr('disabled',true).val('');
            }
        });

        $('.not-special-char').on('propertychange change keyup paste input',function(){
           let thisVal = $(this).val();
           let reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
           if(reg.test(thisVal)){
              $(this).val(thisVal.replace(reg,""));
           }
        });

        $('.only-no').on('propertychange change keyup paste input',function(){
            let thisVal = $(this).val();
            let reg = /[a-zA-Z가-힣\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
            if(reg.test(thisVal)){
                $(this).val(thisVal.replace(reg,""));
            }
        });

        $('.only-ko').on('propertychange change keyup paste input',function(){
            let thisVal = $(this).val();
            let reg = /[ㅏ-ㅣa-zA-Z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
            if(reg.test(thisVal)){
                alert(alertMessage.onlyKoMsg);
                $(this).val(thisVal.replace(reg,""));
            }
        });

        $('.only-en').on('propertychange change keyup paste input',function(){
            let thisVal = $(this).val();
            let reg = /[가-힣ㄱ-ㅎㅏ-ㅣ0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
            if(reg.test(thisVal)){
                alert(alertMessage.onlyEnMsg);
                $(this).val(thisVal.replace(reg,""));
            }
        });

        $('.chk-len').on('propertychange change keyup paste input',function(){
            let thisVal = $(this).val();
            let ml = $(this).prop('maxLength');
            if(thisVal.length > ml){
                $(this).val(thisVal.slice(0,ml));
            }
        });

        $('.btn_image_clear').on('click',e => {
           let el = $(e.currentTarget);
           el.siblings('.imageFileName').val('');
           if($.browser.msie) {
               el.parent().find('.imageFile').replaceWith( el.parent().find('.imageFile').clone(true));
           }
           else{
               el.parent().find('.imageFile').val("");
           }
           el.parent().parent().find('.imageView').attr("src",_baseUrl+'static/img/noimage.svg').addClass("noimg br");
           el.parent().find('.imageSize').text("");
        });

        $('.btn_image_upload').on('click',e => {
           let el = $(e.currentTarget);
           el.siblings('.imageFile').click();
        });

        $('.imageFile').on('change', e => {
            let el = $(e.currentTarget);
            const imageMaxImage = 10 * 1024 * 1024;
            let fileName = e.target.files[0].name;
            const fileSize = e.target.files[0].size;
            const extension = fileName.split('.').pop().toLowerCase();

            if($.inArray(extension,['gif','jpg','png']) === -1){
                alert(alertMessage.imageExtension);
                return false;
            }

            if(imageMaxImage < fileSize){
                alert(alertMessage.imageMaxSize);
                return false;
            }

            el.siblings('.imageFileName').val(fileName);

            let reader = new FileReader();
            reader.onload = (e) => {
              let imageView = el.parent().parent().find('.imageView');
              imageView.attr('src',e.target.result);
              imageView.removeClass('noimg');

              brandMgmtListGrid.eventhandler.getImageSize(reader.result, function( imageWidth, imageHeight ){
                 let imageSize = isFinite(fileSize) ? parseFloat(fileSize) / 1024 : 0.0;
                 imageView.parent().find('.imageSize').text('가로 : ' + imageWidth + 'px, 세로 : ' + imageHeight + 'px, 크기 : ' + imageSize.toFixed(1) + 'KB');
              });
            };
            reader.readAsDataURL(e.target.files[0]);
        });

        com.x2commerce.common.Util.setupEnterSearch("brandMgmtListGridForm", "btn_brand_list");

        $('#btn_brand_list').on('click',() => {
            this.onSearch(true);
        });

        $('#btn_brand_init').on('click',() => {
            $('#brandMgmtListGridForm')[0].reset();
        })

        $('#btn_brand_regist').click(() => {
            this.clearBrandDetailInfo();
            this.onAdd();
        });

        $('#btn_brand_delete').click(()=> {
            this.onDelete();
        });

        $("#btn_brand_save").click(()=> {
            const itemIndex = this.grid.getCurrent().dataRow
            if(itemIndex < 0){
                alert(alertMessage.noSelectedSaveItem);
                return;
            }

            if(!this.validation()){
                return;
            }

            if(!confirm(alertMessage.confirmSaveMsg)){
                return;
            }

            let imageFiles = $('input[type=file]');
            const uploadFile = new FormData();
            for(let i=0;i<imageFiles.length;i++){
                uploadFile.append('file',imageFiles[i].files[0]);
                uploadFile.append('type',"brandMgmt");
            }

            var thisForm = $('#brandDetailForm');
            var disabled = thisForm.find(':input:disabled',':select:disabled').removeAttr('disabled');
            var thisFormObject = thisForm.serializeObject();

            thisFormObject.dispOptnCd = $('input[name=disp-opt]:checked').val();
            thisFormObject.useYn = $('input[name=brand-useYn]:checked').val();
            thisFormObject.engSchNm = thisFormObject.engSchNm.toUpperCase();
            thisFormObject.brandMgmtImageRequestList = [];

            let image1Size = 0;
            let image2Size = 0;
            let image3Size = 0;

            let image1File = $('input[name=image1]').siblings('.imageFile')[0].files[0];
            if($('input[name=image1]').val() !== '' && image1File !== undefined){
                image1Size = image1File.size;
            }
            thisFormObject.image1Size = image1Size;

            let image2File = $('input[name=image2]').siblings('.imageFile')[0].files[0];
            if($('input[name=image2]').val() !== '' && image2File !== undefined){
                image2Size = image2File.size;
            }
            thisFormObject.image2Size = image2Size;

            let image3File = $('input[name=image3]').siblings('.imageFile')[0].files[0];
            if($('input[name=image3]').val() !== '' && image3File !== undefined){
                image3Size = image3File.size;
            }
            thisFormObject.image3Size = image3Size;

            delete thisFormObject['brand-useYn'];
            delete thisFormObject['disp-opt'];
            delete thisFormObject['eng-sch'];
            delete thisFormObject['kor-sch'];

            uploadFile.append('BrandMgmtRequest',JSON.stringify(thisFormObject));
            disabled.attr('disabled','disabled');

            $.ajax({
                url: "/goods/brandMgmt.saveBrand.do",
                data:uploadFile,
                type:'POST',
                enctype:'multipart/form-data',
                processData:false,
                contentType:false,
                dataType:'json',
                cache:false,
                success:function(data){
                    openToast(data.message);
                    if(data.succeeded){
                        self.onSearch(false);
                    }
                },
                error: function(error){
                }
            });
        });
    },
    gridEvent : {
        onCurrentRowChanged(grid, oldRow, newRow) {
            let itemIndex = grid.getCurrent().dataRow;
            let rowState = itemIndex > -1 ?grid.getDataSource().getRowState(itemIndex) : "";
            brandMgmtListGrid.eventhandler.clearBrandDetailInfo();
            if(rowState === "created"){
                return;
            }
            brandMgmtListGrid.eventhandler.settingBrandInfo(grid.getDataSource().getJsonRow(itemIndex));
        }
    },
    clearBrandDetailInfo(){
        $('#brandDetailForm')[0].reset();
        $('#sysModId').text('');
        $('#sysModDtm').text('');
        $('#korSchNm').val('ㄱ');
        $('#korSchNm').attr('disabled',true);
        $('#engSchNm').val('A');
        $('#engSchNm').attr('disabled',true);
        $('.btn_image_clear').click();
    },
    onSearch( isOpenToast ) {
        this.clearBrandDetailInfo();
        this.grid.cancel();
        this.controller.doQuery(this, "", 0, null,null, isOpenToast );
    },

    onAdd() {
        let grid = this.grid;
        grid.commit();
        this.defaultHandler.onAdd(grid, {});
    },
    onDelete() {

        let provider = this.grid.getDataSource();
        let itemIndex = this.grid.getCurrent().dataRow;
        let rowState = provider.getRowState(itemIndex);
        if (rowState === "created") {
            if (!confirm(alertMessage.confirmDeleteMsg)) return;
            provider.setOptions({softDeleting: false});
            provider.removeRow(itemIndex);
        } else {
            alert(alertMessage.noDeleteItemMsg);
            return;
        }
    },
    settingBrandInfo(info){
        $('#brandNo').val(info.brandNo);
        $('#brandNm').val(info.brandNm);
        $('#korBrandNm').val(info.korBrandNm);
        $('#engBrandNm').val(info.engBrandNm);

        $('input[name=brand-useYn]').each(function(){
            if($(this).val() === info.useYn){
                $(this).prop('checked',true);
            }
        });

        $('input[name=disp-opt]').each(function(){
            if($(this).val() === info.dispOptnCd){
                $(this).prop('checked',true);
            }
        });

        //브랜드 초성(국문)
        var korCheck = false;
        $('input[name=kor-sch]').each(function(){
            if($(this).val() === info.korSchNm){
                $(this).prop('checked',true);
                $('#korSchNm').attr('disabled',true);
                $('#kor-etc').prop('checked',false);
                korCheck = true;
            }
        });
        if(!korCheck){
            $('#kor-etc').prop('checked',true);
            $('#korSchNm').attr('disabled',false);
            $('input[name=kor-sch]').prop('checked',false);
        }
        $('#korSchNm').val(info.korSchNm);

        //브랜드 초성(영문)
        var engCheck = false;
        $('input[name=eng-sch]').each(function(){
            if($(this).val() === info.engSchNm){
                $(this).prop('checked',true);
                $('#engSchNm').attr('disabled',true);
                $('#eng-etc').prop('checked',false);
                engCheck = true;
            }
        });
        if(!engCheck){
            $('#eng-etc').prop('checked',true);
            $('#engSchNm').attr('disabled',false);
            $('input[name=eng-sch]').prop('checked',false);
        }
        $('#engSchNm').val(info.engSchNm);

        $('#scw1Nm').val(info.scw1Nm);
        $('#scw2Nm').val(info.scw2Nm);
        $('#scw3Nm').val(info.scw3Nm);

        $('#brandDescCmt').val(info.brandDescCmt);
        $('#sysModId').text(info.sysModId);
        $('#sysModDtm').text(info.sysModDtm);

        common.Ajax.sendRequest("get"
                , _baseUrl + "goods/brandMgmt.getBrandImageList.do"
                , { brandNo : info.brandNo }
                , function ( data ) {

                    if(data.length < 1){
                        $('.btn_image_clear').click();
                        return false;
                    }

                    for(let imgInfo of data){
                        let imageView;
                        if(imgInfo.imgNo === '1'){
                           $('input[name=image1]').val(imgInfo.imgFileNm);
                           imageView = $('input[name=image1]').parent().parent().find('.imageView');
                           imageView.attr('src',_baseUrl+imgInfo.imgRouteNm);
                        }else if(imgInfo.imgNo === '2'){
                           $('input[name=image2]').val(imgInfo.imgFileNm);
                           imageView = $('input[name=image2]').closest('div').siblings('.imageView');
                           imageView.attr('src',_baseUrl+imgInfo.imgRouteNm);
                        }else{
                           $('input[name=image3]').val(imgInfo.imgFileNm);
                           imageView = $('input[name=image3]').closest('div').siblings('.imageView');
                           imageView.attr('src',_baseUrl+imgInfo.imgRouteNm);
                        }
                            imageView.removeClass('noimg');
                    }

               }
        );
    },
    validation() {
        let brandNm = $('#brandNm').val();
        if(brandNm === ''){
            alert(alertMessage.brandNm);
            return false;
        }

        let korBrandNm = $('#korBrandNm').val();
        if(korBrandNm === ''){
            alert(alertMessage.korBrandNm);
            return false;
        }

        let engBrandNm = $('#engBrandNm').val();
        if(engBrandNm === ''){
            alert(alertMessage.engBrandNm);
            return false;
        }

        if(!$('input:radio[name=brand-useYn]').is(':checked')){
            alert(alertMessage.useYn);
            return false;
        }

        if(!$('input:radio[name=disp-opt]').is(':checked')){
            alert(alertMessage.dispOptnCd);
            return false;
        }

        let korSchNm = $('#korSchNm').val();
        if(korSchNm === ''){
            alert(alertMessage.korSchNm);
            return false;
        }

        let engSchNm = $('#engSchNm').val();
        if(engSchNm === ''){
            alert(alertMessage.engSchNm);
            return false;
        }


        let image1Val = $('input[name=image1]').val();
        if(typeof image1Val === undefined || image1Val === ''){
            alert(alertMessage.imageNecessary);
            return false;
        }
        return true;
    },
    getImageSize : function ( imageURL, callback ) {
        // 이미지 크기 계산
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
};