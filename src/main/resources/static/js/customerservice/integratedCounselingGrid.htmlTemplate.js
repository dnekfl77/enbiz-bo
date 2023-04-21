<!--문의내역-->
var inquiryDetailsForm = '';
inquiryDetailsForm +='<div class="data">'
inquiryDetailsForm +='    <div class="data-head">'
inquiryDetailsForm +='        <div class="left">'
inquiryDetailsForm +='            <span class="title">문의내역</span>'
inquiryDetailsForm += '            <div class="button-group">'
inquiryDetailsForm += '                <a href="#" class="button inside" id="btn_csCpRegist"><span class="text">고객보상</span></a>'
inquiryDetailsForm += '                <a href="#" class="button inside" id="btn_related_cs"><span class="text">관련상담</span></a>'
inquiryDetailsForm += '                <a href="#" class="button inside" id="btn_work_contract"><span class="text">업무연락</span></a>'
inquiryDetailsForm += '            </div>'
inquiryDetailsForm +='        </div>'
inquiryDetailsForm +='    </div>'
inquiryDetailsForm +='    <div class="data-body">'
inquiryDetailsForm +='    <form name="inquiryDetailForm" id="inquiryDetailForm">'
inquiryDetailsForm +='        <table class="data-table">'
inquiryDetailsForm +='            <colgroup>'
inquiryDetailsForm +='                <col width="120">'
inquiryDetailsForm +='                <col>'
inquiryDetailsForm +='                <col width="120">'
inquiryDetailsForm +='                <col>'
inquiryDetailsForm +='                <col width="120">'
inquiryDetailsForm +='                <col>'
inquiryDetailsForm +='            </colgroup>'
inquiryDetailsForm +='            <tbody>'
inquiryDetailsForm +='            <tr>'
inquiryDetailsForm +='                <td class="label">상담번호</td>'
inquiryDetailsForm +='                <td>'
inquiryDetailsForm +='                    <span id="detail-ccnNo"></span>'
inquiryDetailsForm +='                </td>'
inquiryDetailsForm +='                <td class="label">접수자/접수일자</td>'
inquiryDetailsForm +='                <td>'
inquiryDetailsForm +='                    <span id="detail-acpData"></span>'
inquiryDetailsForm +='                </td>'
inquiryDetailsForm +='                <td class="label">회원정보</td>'
inquiryDetailsForm +='                <td class="ls0">'
inquiryDetailsForm +='                    <span id="detail-userData"></span>'
inquiryDetailsForm +='                    <a id="tel" class="mr5 vm"><img src="../../static/img/ic_phone.gif"></a><a id="sms" class="vm"><img src="../../static/img/ic_sms.gif"></a>'
inquiryDetailsForm +='                </td>'
inquiryDetailsForm +='            </tr>'
inquiryDetailsForm +='            <tr>'
inquiryDetailsForm +='                <td class="label">상담구분/접수매체</td>'
inquiryDetailsForm +='                <td>'
inquiryDetailsForm +='                    <span id="detail-gbcdMedia"></span>'
inquiryDetailsForm +='                </td>'
inquiryDetailsForm +='                <td class="label">접수유형</td>'
inquiryDetailsForm +='                <td>'
inquiryDetailsForm +='                    <span id="detail-accpTypNm"></span>'
inquiryDetailsForm +='                </td>'
inquiryDetailsForm +='                <td class="label">전화번호</td>'
inquiryDetailsForm +='                <td>'
inquiryDetailsForm +='                    <span id="detail-telNo"></span>'
inquiryDetailsForm +='                </td>'
inquiryDetailsForm +='            </tr>'
inquiryDetailsForm +='            <tr>'
inquiryDetailsForm +='                <td class="label">처리상태</td>'
inquiryDetailsForm +='                <td>'
inquiryDetailsForm +='                    <span id="detail-ccnPrgsStatNm"></span>'
inquiryDetailsForm +='                </td>'
inquiryDetailsForm +='                <td class="label">상담유형</td>'
inquiryDetailsForm +='                <td>'
inquiryDetailsForm +='                    <span id="detail-cnslTypText"></span>'
inquiryDetailsForm +='                </td>'
inquiryDetailsForm +='                <td class="label">업무유형</td>'
inquiryDetailsForm +='                <td>'
inquiryDetailsForm +='                    <span id="detail-obTypNm"></span>'
inquiryDetailsForm +='                </td>'
inquiryDetailsForm +='            </tr>'
inquiryDetailsForm +='            <tr>'
inquiryDetailsForm +='                <td class="label">문의내용</td>'
inquiryDetailsForm +='                <td colspan="5">'
inquiryDetailsForm +='                    <span id="detail-accpCont"></span>'
inquiryDetailsForm +='                </td>'
inquiryDetailsForm +='            </tr>'
inquiryDetailsForm +='            <tr>'
inquiryDetailsForm +='                <td class="label">고객센터 이관사유</td>'
inquiryDetailsForm +='                <td colspan="5">'
inquiryDetailsForm +='                    <span id="detail-mvotCaus"></span>'
inquiryDetailsForm +='                </td>'
inquiryDetailsForm +='            </tr>'
inquiryDetailsForm +='            <tr>'
inquiryDetailsForm +='                <td class="label">상담상품정보</td>'
inquiryDetailsForm +='                <td colspan="5">'
inquiryDetailsForm +='                    <table class="data-table inbox fixed goodsAndOrdTable">'
inquiryDetailsForm +='                        <colgroup>'
inquiryDetailsForm +='                            <col width="120">'
inquiryDetailsForm +='                            <col width="120">'
inquiryDetailsForm +='                            <col>'
inquiryDetailsForm +='                            <col width="120">'
inquiryDetailsForm +='                            <col width="120">'
inquiryDetailsForm +='                            <col width="120">'
inquiryDetailsForm +='                            <col width="120">'
inquiryDetailsForm +='                        </colgroup>'
inquiryDetailsForm +='                        <tbody>'
inquiryDetailsForm +='                        <tr>'
inquiryDetailsForm +='                            <th class="label center">주문번호</th>'
inquiryDetailsForm +='                            <th class="label center">상품번호</th>'
inquiryDetailsForm +='                            <th class="label center">상품명</th>'
inquiryDetailsForm +='                            <th class="label center">단품명</th>'
inquiryDetailsForm +='                            <th class="label center">주문수량</th>'
inquiryDetailsForm +='                            <th class="label center">판매가</th>'
inquiryDetailsForm +='                            <th class="label center">협력사명</th>'
inquiryDetailsForm +='                        </tr>'
inquiryDetailsForm +='                        </tbody>'
inquiryDetailsForm +='                    </table>'
inquiryDetailsForm +='                </td>'
inquiryDetailsForm +='            </tr>'
inquiryDetailsForm +='            </tbody>'
inquiryDetailsForm +='        </table>'
inquiryDetailsForm +='        </form>'
inquiryDetailsForm +='    </div>'
inquiryDetailsForm +='    <!-- //문의내역 -->'
inquiryDetailsForm +='</div>'

var oneToOneForm = '';
oneToOneForm += '<!-- 1:1문의 답변처리 -->'
oneToOneForm += '<div class="data">'
oneToOneForm += '    <div class="data-head">'
oneToOneForm += '        <div class="left"><span class="title">1:1문의 답변처리</span>'
oneToOneForm += '            <div class="button-group">'
oneToOneForm += '                <a href="#" class="button inside" id="tempRegist"><span class="text">임시저장</span></a>'
oneToOneForm += '                <a href="#" class="button inside" id="responseProc"><span class="text">답변처리</span></a>'
oneToOneForm += '                <a href="#" class="button inside" id="preTreatment"><span class="text">기처리</span></a>'
oneToOneForm += '            </div>'
oneToOneForm += '        </div>'
oneToOneForm += '    </div>'
oneToOneForm += '    <div class="data-body">'
oneToOneForm += '        <table class="data-table">'
oneToOneForm += '            <colgroup>'
oneToOneForm += '                <col width="120">'
oneToOneForm += '                <col>'
oneToOneForm += '                <col width="120">'
oneToOneForm += '                <col>'
oneToOneForm += '                <col width="120">'
oneToOneForm += '                <col>'
oneToOneForm += '            </colgroup>'
oneToOneForm += '            <tbody>'
oneToOneForm += '            <tr>'
oneToOneForm += '                <td class="label">템플릿구분</td>'
oneToOneForm += '                <td>'
oneToOneForm += '                    <label class="radio-inline"><input type="radio" name="oneToOneCheck" value="0" checked="checked">공통</label>'
oneToOneForm += '                    <label class="radio-inline"><input type="radio" name="oneToOneCheck" value="1">개인</label></td>'
oneToOneForm += '                <td class="label">상담템플릿</td>'
oneToOneForm += '                <td>'
oneToOneForm += '                    <select class="tmpl-nm">'
oneToOneForm += '                       <option value="">:: 선택 ::</option>'
oneToOneForm += '                    </select>'
oneToOneForm += '                </td>'
oneToOneForm += '                <td class="label">답변알림</td>'
oneToOneForm += '                <td>'
oneToOneForm += '                   <span id="detail-ansText"></span>'
oneToOneForm += '                </td>'
oneToOneForm += '            </tr>'
oneToOneForm += '            <tr>'
oneToOneForm += '                <td class="label">답변내용작성</td>'
oneToOneForm += '                <td colspan="5">'
oneToOneForm += '                    <textarea id="detail-ansCont" name="memo" rows="5" class="textarea" data-limitByte="4000" data-markId="ansContByte"></textarea>'
oneToOneForm += '                    <em><span id="ansContByte">0</span>/4000</em>'
oneToOneForm += '                </td>'
oneToOneForm += '            </tr>'
oneToOneForm += '            </tbody>'
oneToOneForm += '        </table>'
oneToOneForm += '    </div>'
oneToOneForm += '</div>'
oneToOneForm += '<!-- //1:1문의 답변처리 -->'

var processDetailForm = "";
<!-- 처리내역 -->
processDetailForm +='<div class="data">'
processDetailForm +='    <div class="data-head">'
processDetailForm +='        <div class="left"><span class="title">처리내역</span>'
processDetailForm +='           <div class="button-group">'
processDetailForm +='               <a href="#" class="button inside" id="registProcDetail"><span class="text">처리내역등록</span></a>'
processDetailForm +='               <a href="#" class="button inside" id="productQnA"><span class="text">상품Q&A답변</span></a>'
processDetailForm +='           </div>'
processDetailForm +='        </div>'
processDetailForm +='    </div>'
processDetailForm +='    <div class="scroll">'
processDetailForm +='        <table class="data-table" id="procDetailTable">'
processDetailForm +='            <colgroup>'
processDetailForm +='                <col width="120">'
processDetailForm +='                <col>'
processDetailForm +='                <col width="120">'
processDetailForm +='                <col>'
processDetailForm +='                <col width="120">'
processDetailForm +='                <col>'
processDetailForm +='            </colgroup>'
processDetailForm +='            <tbody class="detailBody bo-top">'
processDetailForm +='                <tr>'
processDetailForm +='                   <td class="label" colspan="6"></td>'
processDetailForm +='                </tr>'
processDetailForm +='                <tr>'
processDetailForm +='                    <td class="label">처리자</td>'
processDetailForm +='                    <td>'
processDetailForm +='                        <span id="sysRegId"></span>'
processDetailForm +='                    </td>'
processDetailForm +='                    <td class="label">처리일시</td>'
processDetailForm +='                    <td class="date">'
processDetailForm +='                        <span id="cnslProcDtm"></span>'
processDetailForm +='                    </td>'
processDetailForm +='                    <td class="label"></td>'
processDetailForm +='                    <td></td>'
processDetailForm +='                </tr>'
processDetailForm +='            </tbody>'
processDetailForm +='        </table>'
processDetailForm +='    </div>'
processDetailForm +='</div>'


var processDetailFormBody = "";
processDetailFormBody +='            <tbody class="detailBody bo-top">';
processDetailFormBody +='                <tr>'
processDetailFormBody +='                   <td class="label" colspan="6"></td>'
processDetailFormBody +='                </tr>'
processDetailFormBody +='                <tr>';
processDetailFormBody +='                    <td class="label">처리자</td>';
processDetailFormBody +='                    <td>';
processDetailFormBody +='                        <span id="sysRegId"></span>';
processDetailFormBody +='                    </td>';
processDetailFormBody +='                    <td class="label">처리일시</td>';
processDetailFormBody +='                    <td class="date">';
processDetailFormBody +='                        <span id="cnslProcDtm"></span>';
processDetailFormBody +='                    </td>';
processDetailFormBody +='                    <td class="label"></td>';
processDetailFormBody +='                    <td></td>';
processDetailFormBody +='                </tr>';
processDetailFormBody +='            </tbody>';