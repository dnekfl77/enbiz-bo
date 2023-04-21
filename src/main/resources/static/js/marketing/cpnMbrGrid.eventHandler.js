$.namespace("cpnMbrGrid.eventhandler");
cpnMbrGrid.eventhandler = {
    // 초기화
    init : function () {
        this.bindButtonEvent();
    },

    bindButtonEvent : function(){
        var self = this;

        //검색창 회원 팝업
        $("#btn-mbr-search").click(function (){
            self.popupMbrList("s");
        });

        //검색창 회원 clear
        $("#btn-mbr-reset").click(function(){
            $("#input-mbr-id").val('');
            $("#input-mbr-nm").val('');
            $("#input-mbr-no").val('');
        });

        //초기화 버튼
        $("#btn_init").click(function(){
            $('#cpnMbrGridForm')[0].reset();
            $("#input-mbr-no").val('');
        });

        //조회
        $("#btn_list").click(function(){
            self.onSearch(0,true);
        });

        //일괄등록
        $("#btn_grid_excel").click(function(){
            $('#input-coupon-excel').change(function(){
                self.onExcelLoad();
                $(this).clearFileInput();
            });
            $('#input-coupon-excel').click();

            return false;
        });

        //그리드 회원추가 버튼
        $("#btn_grid_add").click(function(){
            self.popupMbrList("g");
        });

        //회원 저장 버튼
        $("#btn_grid_save").click(function(){
            self.onSave();
        });

    },
    onSave : function() {
        var grid = this.grid;
        grid.commit();

        if(grid.getCheckedRows().length <= 0){
            alert(_msg.noSelectedDataMsg);
            return ;
        }

        this.controller.doSave(this, grid.localId);
    },
    onSearch : function(pageIdx,isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};
        var extraQueryString;
        extraQueryString = 'cpnNo=' + coupon.promoNo;
        this.controller.doQuery(this,extraQueryString,pageIdx, pagingFunc,false,isOpenToast);
    },
    onExcelLoad : function() {

        var gridName = "cpnMbrGrid";

        var uploadFile = $("#input-coupon-excel")[0].files[0];
        if (!uploadFile) {
            return false;
        }

        pin = {
            gridName : gridName,
            dtoClass : "com.x2commerce.backoffice.app.dto.response.marketing.CouponIssuedMemberResponse",
            dtoFields : "loginId",
            uploadFile : uploadFile
        };
        this.controller.doExcelLoad(pin,"marketing/couponMgmt.couponIssuedMemberloadExcel.do?cpnNo=" + coupon.promoNo);
    },
    gridEvent : {
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            console.log(data);
            openToast(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0);
            }
        }
    },
    popupMbrList : function(type) {
        var pin = {
              argSelectType: '1'
            , argMbrStatCd: ''
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
        popCommon(pin, POP_DATA, type === 's' ? this.popupMbrListSearchCallback : this.popupMbrListGridCallback.bind(this));
    },
    popupMbrListSearchCallback : function(e) {
        var mbrData = JSON.parse(e.data);
        mbrData.forEach(function(data){
            $("#input-mbr-id").val(data.loginId);
            $("#input-mbr-nm").val(data.mbrNm);
            $("#input-mbr-no").val(data.mbrNo);
        })
    },
    popupMbrListGridCallback : function(e) {
        var mbrData = JSON.parse(e.data);
        var self = this;
        var grid = self.grid;

        var aplyTermGbCd = coupon.aplyTermGbCd;
        var valiStrtDtm = null;
        var valiEndDtm = null;

        if(aplyTermGbCd === '01'){ // 기간 기준
            valiStrtDtm = coupon.usePsbStrDt;
            valiEndDtm = coupon.usePsbEndDt;
        }else if(aplyTermGbCd === '02'){ // 발급일 기준
            var issuDdStdCpnUseDds = coupon.issuDdStdCpnUseDds;
            var fromAndToDate = recentlyCalenderData(-issuDdStdCpnUseDds);
            valiStrtDtm = fromAndToDate[1];
            valiEndDtm = fromAndToDate[0];
        }


        var defaultValues = {
            loginId:  mbrData[0].loginId ,
            mbrNo : mbrData[0].mbrNo ,
            mbrNm : mbrData[0].mbrNm ,
            cpnNo : coupon.promoNo,
            mbrGradeCd : mbrData[0].mbrGradeCd ,
            mbrGradeNm : mbrData[0].mbrGradeNm ,
            valiStrtDtm : valiStrtDtm,
            valiEndDtm : valiEndDtm,
            useYn : 'N'
        };
        self.defaultHandler.onAdd(grid,defaultValues);
    }

};