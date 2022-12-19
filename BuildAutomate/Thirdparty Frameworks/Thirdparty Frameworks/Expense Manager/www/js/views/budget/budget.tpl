<%
var els = new EncryptedLocalStorage('secret'); 
var ackStatus_bugd = els.get("ackStatus_bugd");
console.log("ackStatus_bugd : "+ ackStatus_bugd);
var unCategorysList = els.get("AllunCategorysList");
%>
<form class="input-form">
<a href="javascript:void(0)" id="upClick1" class="pnkbg" style="
    padding: 4px !important;
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
    width:20px;
    z-index:999;
    height:45px;
    ">
    <i class="fa fa-2x fa-angle-left fn-blue" style="padding-top: 3px" aria-hidden="true"></i>
</a>

<a href="javascript:void(0)" id="downClick1" class="pnkbg" style="
    padding: 4px !important;
    position: absolute !important;
    right: 0 !important;
    top: 0 !important;
    width:20px;
    z-index:999;
    height:45px;
    ">
    <i class="fa fa-2x fa-angle-right fn-blue" style="padding-top: 3px" aria-hidden="true"></i>
</a>
<div class="row tabmenu" id="tabsss" style="-webkit-overflow-scrolling: auto !important;">
	 


           	<% if(ackStatus_bugd=="00000"){%>
	           	<a href="#/smartBudget" class="padtp active">&nbsp;DASHBOARD</a>
	            <a href="#/accounts">ACCOUNTS</a>
	            <a href="#/budgets">BUDGETS</a>
	            <a href="#/reports">REPORTS &emsp;</a>
			<%}else{%>
				<a class="padtp active">&nbsp;DASHBOARD</a>
				<a>ACCOUNTS</a>
				<a>BUDGETS</a>
				<a>REPORTS &emsp;</a>
			<%}%>
	</div>

<!-- <div class="row tabmenu">
<% if(ackStatus_bugd=="00000"){%>
           	<a href="#/smartBudget" class="padtp active">DASHBOARD</a>
            <a href="#/accounts">ACCOUNTS</a>
            <a href="#/budgets">BUDGETS</a>
            <a href="#/reports">REPORTS</a>
<%}else{%>
           	<a class="padtp active">DASHBOARD</a>
            <a>ACCOUNTS</a>
            <a>BUDGETS</a>
            <a>REPORTS</a>
<%}%>
</div> -->



<div class="row p-a-10">

<!--Budgets vs Expenses-->
    <div class="panel panel-shadow m-b-10">
	    <div class="panel-body">
	    	<p class="fn-source-l fn-size16 fn-lgrey"><span class="fn-yellow fn-source-sb">Budgets vs. Expenses</span>&nbsp;&nbsp;&nbsp;<span id="budexpTitle"></span></p>
	    	<% if(ackStatus_bugd=="9999"){%>
	    		<div id="BudgetandExpense"></div></br>
	    	<%}else{%>
	    		<a href="#/monthly"><div id="BudgetandExpense"></div></a></br>
	    	<%}%>
			<div id="bar_legend" style="color:#666666" ></div>
	    </div>
    </div>
<!--/Budgets vs Expenses-->

<!--Your Expenses-->
	<div class="panel panel-shadow m-b-10">
	    <div class="panel-body">
	    		<p class="fn-source-l fn-size16 m-b-0"><span class="fn-yellow fn-source-sb">Your Expenses</span>&nbsp;</p>
				
				<div id="categoryheader" class="row" style="position: relative;  z-index: 1;">
			    	<div class="col-xs-6 text-center"><span class="chartCur"><h2 class="text-left"><i class="fa fa-inr" aria-hidden="true"></i><span id="expn_amount"></span></h2></span></div>
			    	
			    	<div class="col-xs-6 text-center m-l-m">
			    		<label class="dropico">
							<select id="YourExpnType" name="YourExpnType">
								<option value="C" >By Category</option>
								<option value="A" >By Account</option>
							</select>
						</label>
			    	</div>
			    	
		    	</div>
		    	
		    	<div id="categorydetails"  class="row">
			    	
						<table width="100%" cellpadding="0" cellspacing="0" border="0">
							    	<!--<tr>
								    	<td><i class="fa fa-inr" aria-hidden="true"></i><span id="expn_amount"></span></td>
								    	<td><h2>By Category</h2></td>
							    	</tr>-->
							    	<tr>
											<td width="49%" valign="middle"><div id="ExpnsChart" style="height:180px;width:148px;"> </div><td>
											<td width="51%" valign="middle" id="expn_legd"> </td>
							    	</tr>
						</table>
					
				</div>
				<span id="errordiv"></span>
	    </div>
	    
    </div>
<!--/Your Expenses-->

<!--Uncategorized Expenses-->
    <div class="panel panel-shadow m-b-0">
	    <div class="panel-body">
	    	<p class="fn-source-l fn-size16"><span class="fn-yellow fn-source-sb">Uncategorized Expenses</span></p>
	    	<div class="row bg-lyellow">
			    <div class="col-xs-12 col-sm-12 small">
			    Note:
			        <div class="col-xs-12 col-sm-12">
			    <div class="text-muted small small">1. Swipe <span class="glyphicon glyphicon-arrow-left"></span> on expense to Categorize.</div>
			          <div class="text-muted small">2. Tap on expense to Split.<p></p></div></div>     
			    </div>
			</div>
	    	<!-- <div id="UncategorizedTxn"> </div> -->
			<% _.each(unCategorysList,function(data,indx){ %>
			<% if(indx<3) { %>
					<%
						var nickName="";
						var CateName = data.description;
						var catecode = "";
						if(CateName==null || CateName=="null"){
			        		CateName="";
			        	}
			        	if(CateName.indexOf("-")!=-1){
			        		catecode = CateName.substring(0,CateName.indexOf("-"));
			        		CateName = CateName.substring(CateName.indexOf("-")+1,CateName.length);
				        }else{
				        	catecode = CateName;
				        }
				        var TnxDate = data.transactionID+"";
				        
				        var TnxMonth = data.monthDesc;
				        if(TnxMonth.indexOf("|")!=-1){
							nickName = TnxMonth.split("|")[1];
							TnxMonth = TnxMonth.split("|")[0];
				        }
				        TnxDate = TnxMonth + " " +TnxDate.substring(6,8);
					%>
					<div class="cat_grp">
							<div class="media-left"><span class="question_ico">?</span></div>
							<div class="media-body">
								<span class="activeswipelable" id="unCategoriseId" >	
											
									<input type="hidden" name="TransactionId" id="TransactionId" value="<%-data.transactionID%>" />
									<input type="hidden" name="categoryId" id="categoryId" value="<%-data.categID%>" />
									<input type="hidden" name="AmountValue" id="AmountValue" value="<%-data.expense%>" />
									<input type="hidden" name="TransDesc" id="TransDesc" value="<%-CateName%>" />
									<input type="hidden" name="monthValue" id="monthValue" value="<%-TnxMonth%>" />
									<input type="hidden" name="yearValue" id="yearValue" value="<%-data.year_value%>" />
									<input type="hidden" name="categoryName" id="categoryName" value="<%-data.categoryDesc%>" />
									<input type="hidden" name="nickName" id="nickName" value="<%-nickName%>" />
									
									<div style="word-break: break-all" class="fn-blue fn-size19"><%-CateName%></div>
									<span class="amt pull-right"><i class="fa fa-inr" aria-hidden="true"></i><%-numberWithCommasstr(data.expense)%></span>
									<div class="text-muted fn-size15"> <%-data.categoryDesc %>&nbsp;|&nbsp;<%-data.txn_Timestamp%> </div>
					
								</span>
							</div>
					</div>
				<%}%>
			<%});%>
	    	
	    	
	    	
	    	
	    	
	    	
	    	<% if(ackStatus_bugd=="00000"){
	    	console.log("unCategorysList lengthhh",unCategorysList.length);
	    			if(unCategorysList.length>0)
	    			{
	    		%>
	    		<!-- <a href="#/categorize" class="btn btn-sm bg-yellow fn-white fn-museo-700 fn-size11 text-uppercase m-t-10">Select Category</a> -->
	    		<a href="#/categorize" class="btn btn-default btn-sm fn-museo-700 text-uppercase m-t-10">All Uncategorized</a>
	    	<%
	    			}else{ %>

	    				<div class="row">
	    					<div class="col-xs-12"><p>No expenses available.</p></div>	
	    				</div>

	    			<% }
	    		}%>
	    	
	    </div>
	    
    </div>
	<input type="hidden" name="catID" id="catID" value="" />
	<input type="hidden" name="txnID" id="txnID" value="" />
	<input type="hidden" name="aMT" id="aMT" value="" />
	<input type="hidden" name="idrec" id="idrec" value="" />

	<input type="hidden" name="catIDAcc" id="catIDAcc" value="" />
	<input type="hidden" name="txnIDAcc" id="txnIDAcc" value="" />
	<input type="hidden" name="aMTAcc" id="aMTAcc" value="" />
	<input type="hidden" name="catdescAcc" id="catdescAcc" value="" />
	<input type="hidden" name="monthAcc" id="monthAcc" value="" />
	<input type="hidden" name="eventtriggered" id="eventtriggered" value="" />
	<input type="hidden" name="categoryNameAcc" id="categoryNameAcc" value="" />
	<input type="hidden" name="accNickName" id="accNickName" value="" />

    <div id="otpModalinFooter" name="otpModalinFooter"></div>
    
<!--Uncategorized Expenses-->
</div>
</form>

<script>
var els = new EncryptedLocalStorage('secret'); 
var changeYourExpnType = els.get('changeYourExpnType');

console.log("changeYourExpnType ----> ",changeYourExpnType);

if(changeYourExpnType=="" || els.get('changeYourExpnType')==null ){
	$("select#YourExpnType").prop('selectedIndex', 0);
}else{
	$("select#YourExpnType").prop('selectedIndex', 1);
}

	$('#loginfooter').empty();
	//$('#loginfooter').hide();
	
	
	function myCategoryPopup(a){		
		console.log(a + " ------------------------------> " );
		$("#idrec").val(a+"");
		
		
		/*$("#txnID").val(a.split(",")[0]);
		$("#catID").val(a.split(",")[1]);
		$("#aMT").val(a.split(",")[2]);
		
		$("#txnID").val(b);
		$("#catID").val(a);
		$("#aMT").val(c);*/
	}
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
<script>
$(".content").animate({ scrollTop: 0 }, "fast");
$(window).on('popstate', function () {
      $('.commonpopupmodal').modal('hide');  // close the modal window
	  //$(".modal-backdrop").remove();//fade-out modal layer
	  $("#loginfooter").addClass("footerwrap");
    });
</script>


<script>
var step = 60;
var scrolling = false;

$("#upClick1").bind("touchstart", function (event) {
event.preventDefault();
// Animates the scrollTop property by the specified
// step.
	$(".tabmenu").animate({
	    scrollLeft: "-=" + step + "px"
	});
	scrolling = true;
	scrollContent("up");
}).bind("touchend", function (event) {
	//console.log("sssssadasd");
    scrolling = false;
});


$("#downClick1").bind("touchstart", function (event) {
	event.preventDefault();
    $(".tabmenu").animate({
        scrollLeft: "+=" + step + "px"
    });
    scrolling = true;
    scrollContent("down");
}).bind("touchend", function (event) {
	//console.log("sssssadasd");
    scrolling = false;
});

function scrollContent(direction) {
	console.log("===========------------direction-----------==========",direction);
    var amount = (direction === "up" ? "-=1px" : "+=1px");
    $(".tabmenu").animate({
        scrollLeft: amount,
        behaviour:"smooth"
    }, 1, function () {
        if (scrolling) {
            scrollContent(direction);
        }
    });
}


function chk_scroll(e) {
    var elem = $(e.currentTarget);
    console.log(elem);
    console.log("elem[0].scrollHeight",elem[0].scrollHeight);
    console.log("elem.scrollTop",elem.scrollTop());
    console.log("elem.outerHeight",elem.outerHeight());




    console.log("elem.scrollLeft",elem.scrollLeft());
    console.log("elem.outerWidth",elem.outerWidth());

    console.log("elem.width",document.getElementById("tabsss").scrollWidth);

var totalAvailableWitdh = document.getElementById("tabsss").scrollWidth;
    
var toalWitdhReached = elem.outerWidth()+elem.scrollLeft();

    if((toalWitdhReached+10) > totalAvailableWitdh) {

        console.log("Reached Right LAst");
        $("#downClick1").hide();
        $("#downClick1 i").removeClass("fn-white");
        
    }else{
    	$("#downClick1").show();
    	
        $("#downClick1 i").addClass("fn-white");
    }

    if(elem.scrollLeft()>10)
    {
    	$("#upClick1").show();	
    	$("#upClick1 i").addClass("fn-white");	
    }else{
    	$("#upClick1").hide();	
        $("#upClick1 i").addClass("fn-white");	
    }
}

$("#upClick1").hide();	
/*var outerWidth = $(".tabmenu").outerWidth();
console.log("outerWidth====>",outerWidth);*/
//$("#downClick1").css("left",+"px");
$('.tabmenu').bind('scroll', chk_scroll);

//console.log("===============================================>>>>>>>>>>>>>>>>>>>>",$("#tabsss").scrollLeft());
$(document).ready(function(){
	$('.tabmenu').scrollLeft(2);
});
</script>
