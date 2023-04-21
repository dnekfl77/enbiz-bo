$.namespace("ntcMsgPop.settings");
ntcMsgPop.settings = {

    initBind : function() {
        var initFromAndToCalDate = recentlyCalenderData(-7);
        var today = new Date();
        var aplyStrDt = calendarFormatting(today.addDays(1));
        var aplyEndDt = calendarFormatting(today.addDays(7));

        if( $('#aplyStrDt').val() && $('#aplyEndDt').val()) {
            aplyStrDt = getCalendarDateFormat($('#aplyStrDt').val());
            aplyEndDt = getCalendarDateFormat($('#aplyEndDt').val());
        }
        $('#aplyStrDt').val(aplyStrDt);
        $('#aplyEndDt').val(aplyEndDt);


        if($("#stateCd").val() == 'PAST'){
            $('#btn_popup_apply').hide();
        }

        $("#btn_popup_close").click(function() {
            window.close();
        });

        $('#aplySrt').keyup(function(){
            $(this).val($(this).val().replace(/[^0-9]/g,""));
        });

        $('#aplyEnd').keyup(function(){
            $(this).val($(this).val().replace(/[^0-9]/g,""));
        });

        // 저장
        $('#btn_popup_apply').click(function(event) {
            event.preventDefault();

            if($("#isPast").val() == 'true') {
                window.close();
            }

            var msgGbCd = $('#msgGbCd option:selected').val();
            var siteNo = $('#siteNo option:selected').val();
            var baseNotiMethodCd = $('#baseNotiMethodCd option:selected').val();
            var aplySrt = $('#aplyStrDt').val().replace(/-/gi, "");
            var aplyEnd = $('#aplyEndDt').val().replace(/-/gi, "");
            var title = $('#title').val();
            var msg = $('#msg').val();
            var seq = $('#notiMsgSeq').val();
            var useYn = $('#useYn option:selected').val();

            if (msgGbCd === undefined || msgGbCd.trim() === "") {
                alert(_gbcdErr);
                return;
            }

            if (baseNotiMethodCd === undefined || baseNotiMethodCd.trim() === "") {
                alert(_mthdErr);
                return;
            }

            if (aplySrt === undefined || aplySrt.trim() === "") {
                alert(_strtErr);
                return;
            }

            if (aplyEnd === undefined || aplyEnd.trim() === "") {
                alert(_endErr);
                return;
            }

            if(!isDate(aplySrt)){
                console.log(aplySrt);
                alert(_strtDtFmtErr);
                return;
            }

            if(!isDate(aplyEnd)){
                console.log(aplyEnd);
                alert(_endDtFmtErr);
                return;
            }

            if(aplySrt){
                var strDt = new Date($('#aplyStrDt').val()).yyyymmdd();
                var now = new Date().yyyymmdd();
                if(strDt <= now){
                    console.log('today, strDt :',now , strDt);
                    alert(_aplyDtFuture);
                    return;
                }
            }

            if (siteNo === undefined || siteNo.trim() === "") {
                alert(_siteErr);
                return;
            }

            if (title === undefined || title.trim() === "") {
                alert(_titleErr);
                return;
            }

            if (msg === undefined || msg.trim() === "") {
                alert(_msgErr);
                return;
            }

            if ( aplySrt > aplyEnd) {
                alert(_aplyDtInvld);
                return;
            }

            var parameter = $("form[name=ntcMsgRegModPopForm]").serialize() ;
            console.log("aplyEndDt : ", parameter);

            common.Ajax.sendJSONRequest(
                "POST",
                _baseUrl + "/system/noticeMessageMgmt.saveNoticeMessageInfo.do",
                parameter,
                function(obj) {
                    if (obj.succeeded == true) {
                    opener.ntcGrid.eventhandler.onSearch();
                    window.close();
                }
            });
        });

        //달력
        $('#_sch_date_st-button').click(function() {
            if($("#stateCd").val() == 'PAST' || $("#stateCd").val() == 'ONGOING'){
                return;
            }
            showCalendar({
                type:'C', // A:시작,종료일선택, B:해당 날짜 1개 선택
                format:'yyyy-MM-dd',
                yyyymmdd:$('#aplyStrDt').val(),
                min_date: new Date().addDays(1),
                fn:function(pin) {
                    $('#aplyStrDt').val(pin.yyyymmdd);
                }
            });
        });

        //달력
        $('#_sch_date_ed-button').click(function() {
            if($("#stateCd").val() == 'PAST'){
                return;
            }
            showCalendar({
                type:'C', // A:시작,종료일선택, B:해당 날짜 1개 선택
                format:'yyyy-MM-dd',
                min_date: new Date().addDays(1),
                yyyymmdd:$('#aplyEndDt').val(),
                fn:function(pin) {
                    $('#aplyEndDt').val(pin.yyyymmdd);
                }
            });
        });

        // 닫기버튼
        $('#btn_close').click(function(event) {
            event.preventDefault();
            window.close();
        });

        function isDate(txtDate) {
            let currVal = txtDate;
            if (currVal == '')
                return false;

            let rxDatePattern = /^(\d{4})(\d{1,2})(\d{1,2})$/; //Declare Regex
            let dtArray = currVal.match(rxDatePattern); // is format OK?

            if (dtArray == null)
                return false;

            //Checks for yyyymmdd format.
            dtYear = dtArray[1];
            dtMonth = dtArray[2];
            dtDay = dtArray[3];

            if (dtMonth < 1 || dtMonth > 12)
                return false;
            else if (dtDay < 1 || dtDay > 31)
                return false;
            else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
                return false;
            else if (dtMonth == 2) {
                var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
                if (dtDay > 29 || (dtDay == 29 && !isleap))
                    return false;
            }
            return true;
        }


    }
}