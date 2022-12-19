	<%
	var els = new EncryptedLocalStorage('secret'); 
	var unCategorysList=els.get("AllunCategorysList");
	  $("#screentitle").text("");
%>
<h1 class="inner_title" style="margin:10px 0 10px 0">
		<span>All Uncategorized</span>
		</h1>
<span id="uncatetop" />
<div class="row bg-lyellow">
			    <div class="col-xs-12 col-sm-12 small">
			    Note:
			        <div class="col-xs-12 col-sm-12">
			    <div class="text-muted small small">1. Swipe <span class="glyphicon glyphicon-arrow-left"></span> on expense to Categorize.</div>
			          <div class="text-muted small">2. Tap on expense to Split.<p></p></div></div>     
			    </div>
			</div>
<%
var CateName, spentAmt, CateDec, TnxMonth, TnxDate,transactionID,categID,year_value,catecode,nickName;
var mnth = "";
%>

<% if(unCategorysList.length>0){ %>
<% var prevDate=""; for(var idx=0;idx < unCategorysList.length;idx++){ %>
<%
		CateName =unCategorysList[idx].description;
		CateDesc = unCategorysList[idx].categoryDesc;
		spentAmt = unCategorysList[idx].expense;
		TnxMonth = unCategorysList[idx].monthDesc;
		console.log("TnxMonth : "+ TnxMonth);
		if(TnxMonth.indexOf("|")!=-1){
			nickName = TnxMonth.split("|")[1];
			TnxMonth = TnxMonth.split("|")[0];
        }
        console.log("TnxMonth : "+ TnxMonth + " : nickName : "+ nickName);
		TnxDate = unCategorysList[idx].transactionID+"";
		transactionID = unCategorysList[idx].transactionID+"";
		TnxDate = TnxMonth + " " +TnxDate.substring(6,8);
		categID = unCategorysList[idx].categID;
		year_value = unCategorysList[idx].year_value;
		
		
		if(mnth!=TnxMonth)
		{
			mnth = TnxMonth;
			const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			var timestamp = unCategorysList[idx].txn_Timestamp.split(" ");
			var splitDate = timestamp[0].split("-");
			var startDate = new Date(splitDate[2]+"-"+splitDate[1]);
			var dateValue = monthNames[startDate.getMonth()]+", " +startDate.getFullYear();
			if(prevDate=="") { %>
				<div class="row">  
				        <div class="bg-grey p-a-10 p-l-16" ><%- dateValue%></div>
				</div>
			<%} else if(startDate.getTime() != prevDate.getTime()) {%>
				<div class="row">  
			        <div class="bg-grey p-a-10 p-l-16" ><%- dateValue%></div>
				</div>
			<%}}%>

		<%
			if(CateName==null || CateName=="null"){
        		CateName="";
        	}
        	if(CateName.indexOf("-")!=-1){
        		catecode = CateName.substring(0,CateName.indexOf("-"));
        		CateName = CateName.substring(CateName.indexOf("-")+1,CateName.length);
	        }else{
	        	catecode = CateName;
	        }
	      
		%>
		
		
		<div class="cat_grp">
			<div class="media-left"><span class="question_ico">?</span></div>
			<div class="media-body">
					<span class="activeswipelable" id="unCategoriseId" >	
												
							<input type="hidden" name="TransactionId" id="TransactionId" value="<%-transactionID%>" />
							<input type="hidden" name="categoryId" id="categoryId" value="<%-categID%>" />
							<input type="hidden" name="AmountValue" id="AmountValue" value="<%-spentAmt%>" />
							<input type="hidden" name="TransDesc" id="TransDesc" value="<%-CateName%>" />
							<input type="hidden" name="monthValue" id="monthValue" value="<%-TnxMonth%>" />
							<input type="hidden" name="yearValue" id="yearValue" value="<%-year_value%>" />
							<input type="hidden" name="categoryName" id="categoryName" value="<%-CateDesc%>" />
							<input type="hidden" name="nickName" id="nickName" value="<%-nickName%>" />
				
							<div class="fn-blue fn-size19" style="word-break: break-all"><%- CateName %>&nbsp;</div>
							<span class="amt pull-right"><i class="fa fa-inr" aria-hidden="true"></i> <%- numberWithCommasstr(spentAmt) %></span>
							<div class="text-muted fn-size15"> <%-CateDesc%> &nbsp; | &nbsp; <%- unCategorysList[idx].txn_Timestamp%> </div>
					</span>
			</div>
		</div>

<% prevDate= new Date(splitDate[2]+"-"+splitDate[1]);};%>
<% }else{ %>
<div class="cat_grp"> No records available </div>
<% } %>

<div id="failureMessage" style="display:none">
	<p class="help-block error-message"><font color="#A94442"><%-$.i18n.t('validation.smartbudget.failureMessage')%></font></p>
</div>


<input type="hidden" name="catIDAcc" id="catIDAcc" value="" />
<input type="hidden" name="txnIDAcc" id="txnIDAcc" value="" />
<input type="hidden" name="aMTAcc" id="aMTAcc" value="" />
<input type="hidden" name="catdescAcc" id="catdescAcc" value="" />
<input type="hidden" name="monthAcc" id="monthAcc" value="" />
<input type="hidden" name="eventtriggered" id="eventtriggered" value="" />
<input type="hidden" name="categoryNameAcc" id="categoryNameAcc" value="" />
<input type="hidden" name="accNickName" id="accNickName" value="" />
	
<div id="otpModalinFooter" name="otpModalinFooter"></div>
<script>
$("#uncatetop").focus();
$(".content").animate({ scrollTop: 0 }, "fast");
</script>

<script>
	function myCategoryPopup(a,b,c,d,e,f,g,h,i)
	{
		console.log("ALL------------> "+ a + " - " + b + " - " + c + " - "+ g + " - " + h);
		$("#catIDAcc").val(b);
		$("#txnIDAcc").val(a);
		$("#aMTAcc").val(c);
		$("#catdescAcc").val(d);
		$("#monthAcc").val(e+" "+f);
		$("#eventtriggered").val(g);
		$("#categoryNameAcc").val(h);
		$("#accNickName").val(i);
	}
</script>
<script>
function swipeactiveReady(){
	console.log("Active swipeactiveReady");
	$(".activeswipelable").swipe( {
		allowPageScroll: 'vertical',
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
					console.log("direction::::::::::::::::"+ direction);
					if(direction==null){
						var TransactionId = $(this).find("#TransactionId").val();
						var categoryId = $(this).find("#categoryId").val();
						var AmountValue = $(this).find("#AmountValue").val();
						var TransDesc = $(this).find("#TransDesc").val();
						var monthValue = $(this).find("#monthValue").val();
						var yearValue = $(this).find("#yearValue").val();
						var categoryName = $(this).find("#categoryName").val();
						var nickName = $(this).find("#nickName").val();
						
						console.log("Swipe : TransactionId : "+ TransactionId);
						console.log("Swipe : categoryId    : "+ categoryId);
						console.log("Swipe : AmountValue   : "+ AmountValue);
						console.log("Swipe : TransDesc     : "+ TransDesc);
						console.log("Swipe : monthValue    : "+ monthValue);
						console.log("Swipe : yearValue     : "+ yearValue);
						console.log("Swipe : categoryName  : "+ categoryName);
						console.log("Swipe : nickName      : "+ nickName);
						myCategoryPopup(TransactionId,categoryId,AmountValue,TransDesc,monthValue,yearValue,'C',categoryName,nickName);
						$("#unCategoriseId").trigger("click");
						els.set("Action_Type","CLICK");
						event.stopPropagation();
					}else if(direction=="left"){					
						var TransactionId = $(this).find("#TransactionId").val();
						var categoryId = $(this).find("#categoryId").val();
						var AmountValue = $(this).find("#AmountValue").val();
						var TransDesc = $(this).find("#TransDesc").val();
						var monthValue = $(this).find("#monthValue").val();
						var yearValue = $(this).find("#yearValue").val();
						var categoryName = $(this).find("#categoryName").val();
						var nickName = $(this).find("#nickName").val();
						
						console.log("Swipe : TransactionId : "+ TransactionId);
						console.log("Swipe : categoryId    : "+ categoryId);
						console.log("Swipe : AmountValue   : "+ AmountValue);
						console.log("Swipe : TransDesc     : "+ TransDesc);
						console.log("Swipe : monthValue    : "+ monthValue);
						console.log("Swipe : yearValue     : "+ yearValue);
						console.log("Swipe : categoryName  : "+ categoryName);
						console.log("Swipe : nickName      : "+ nickName);
						myCategoryPopup(TransactionId,categoryId,AmountValue,TransDesc,monthValue,yearValue,'S',categoryName,nickName);
						$("#unCategoriseId").trigger("click");
						els.set("Action_Type","SWIPE");
						event.stopPropagation();
					}else{
						event.stopPropagation();
					}
		},
		//Default is 75px, set to 0 for demo so any distance triggers swipe
	   threshold:0
	});
}
swipeactiveReady();
</script>