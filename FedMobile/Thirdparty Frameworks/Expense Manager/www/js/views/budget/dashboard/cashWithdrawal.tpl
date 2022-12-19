<%
var els = new EncryptedLocalStorage('secret');
var categorysList = els.get("categorysList");
var ATMTXN = els.get("ATMTXN");
var catIDAcc = ATMTXN.split(",")[0];
var txnIDAcc = ATMTXN.split(",")[1];
var aMTAcc = ATMTXN.split(",")[2];
var catdescAcc = ATMTXN.split(",")[3];
var monthAcc = ATMTXN.split(",")[4];
var acct_nick_name = els.get("acct_nick_name");
var catIDDesc = els.get("ATMTXN_CATE");
var cateName = els.get("ATMTXN_CATE_NAME");
var eventTriggered = els.get("eventTriggered");

var tempDecText = "";
if(catdescAcc.indexOf("|COMMA|")!=-1){
	var catdescAccArr = catdescAcc.split("|COMMA|");
	for(var xa=0;xa < catdescAccArr.length;xa++){
		tempDecText += catdescAccArr[xa];
		if(xa < catdescAccArr.length-1){
			tempDecText += ",";
		}
	}
}else{
	tempDecText = catdescAcc;
}
catdescAcc = tempDecText;
// && catIDDesc=="CSW"
$("#screentitle").text("");
%>
<h1 class="inner_title" style="margin:10px 0 10px 0">
	<span><%-$.i18n.t('app.smartbudget.general.transaction')%></span>
</h1>
    <div class="row bg-lyellow top-gradiant"><br>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cat_grp nobrder no-bg p-b-5">
					<% if(catIDAcc=="1"){ %>
						<div class="media-left"><span class="sb_ico transport center-block"></span></div>
					<% } else if(catIDAcc=="2"){ %>
						<div class="media-left"><span class="sb_ico entertainment center-block"></span></div>
					<% } else if(catIDAcc=="3"){ %>
						<div class="media-left"><span class="sb_ico utility center-block"></span></div>
					<% } else if(catIDAcc=="4"){ %>
						<div class="media-left"><span class="sb_ico invest center-block"></span></div>
					<% } else if(catIDAcc=="5"){ %>
						<div class="media-left"><span class="sb_ico shop center-block"></span></div>
					<% } else if(catIDAcc=="6"){ %>
						<div class="media-left"><span class="sb_ico food center-block"></span></div>
					<% } else if(catIDAcc=="7"){ %>
						<div class="media-left"><span class="sb_ico travel center-block"></span></div>
					<% } else if(catIDAcc=="8"){ %>
						<div class="media-left"><span class="sb_ico groceries center-block"></span></div>
					<% } else if(catIDAcc=="9"){ %>
						<div class="media-left"><span class="sb_ico health center-block"></span></div>
					<% } else if(catIDAcc=="10"){ %>
						<div class="media-left"><span class="sb_ico emi center-block"></span></div>
					<% } else if(catIDAcc=="11"){ %>
						<div class="media-left"><span class="sb_ico education center-block"></span></div>
					<% } else if(catIDAcc=="12"){ %>
						<div class="media-left"><span class="sb_ico beauty center-block"></span></div>
					<% } else if(catIDAcc=="13"){ %>
						<div class="media-left"><span class="sb_ico rent center-block"></span></div>
					<% } else if(catIDAcc=="14"){ %>
						<div class="media-left"><span class="sb_ico ccard center-block"></span></div>
					<% } else if(catIDAcc=="28"){ %>
						<div class="media-left"><span class="sb_ico other center-block"></span></div>
					<% } else { %>
						<div class="media-left"><span class="question_ico center-block">?</span></div>
					<% } %>

					<div class="media-body text-left">
						<div class="fn-blue fn-size19" style="word-break: break-all"><%-catdescAcc%></div>
						<span class="amt pull-right"><i class="fa fa-inr" aria-hidden="true"></i><%-numberWithCommasstr(aMTAcc)%></span>
						<div class="text-muted fn-size15"><%-cateName%>&nbsp;|&nbsp;<%-acct_nick_name%></div>
					</div>
					<%
						console.log("catIDAcc : "+ catIDAcc);
						console.log("eventTriggered : "+ eventTriggered);
					%>
					<% if(catIDAcc=="27" && eventTriggered!="CS"){%>
						<span class="pull-right pnkfont tap-btn small"><span class="fn-split">SPLIT</span><a href="#/splittrans" class="sb_ico split pull-right"></a></span>
					<% } else if(catIDAcc=="27" && eventTriggered=="CS") { %>
						<span class="pull-right pnkfont tap-btn small"><span class="fn-split">SPLIT</span><a href="#/splittransedit" class="sb_ico split pull-right"></a></span>
					<% } %>
					<br>
            </div>
    </div>
<!--
    <div class="panel">
			<div class="panel-body b-b-l">
					
					<div class="row p-tb-5">
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 sb-txn ldate trans_cal">
							<span class="fn-vlgrey">Date</span><p class="m-a-0"><%-monthAcc%></p>
						</div>
					</div>
					
					<div class="row p-tb-5">
						<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 sb-txn lwallet trans_wal">
							<span class="fn-vlgrey">Expense</span>
						</div>
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
							<span class="switch pull-right margin-t5">
									<input id="cmn-toggle-1" class="cmn-toggle cmn-toggle-round-flat" type="checkbox">
									<label for="cmn-toggle-1"></label>
							</span>
						</div>
					</div>
					
			</div>   
    </div>
    -->

		