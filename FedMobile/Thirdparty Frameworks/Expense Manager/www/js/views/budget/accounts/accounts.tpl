<!--/tabmenu-->

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
           	<a href="#/smartBudget" >&nbsp;DASHBOARD</a>
            <a href="#/accounts" class="padtp active">ACCOUNTS</a>
            <a href="#/budgets">BUDGETS</a>
            <a href="#/reports">REPORTS &emsp;</a>
</div>
	<!-- <div class="row tabmenu">
           	<a href="#/smartBudget" >DASHBOARD</a>
            <a href="#/accounts" class="padtp active" >ACCOUNTS</a>
            <a href="#/budgets">BUDGETS</a>
            <a href="#/reports">REPORTS</a>
	</div> -->
<!--/tabmenu-->
<%
var els = new EncryptedLocalStorage('secret'); 
var accountList = els.get("accountList");
var casaList = els.get("casaAccountList");
if(casaList==null){
casaList="";
}
console.log("=======================>\n"+casaList);

console.table("=======================>\n"+casaList);
var Expense_month;
var custAcctNo,cust_Acct_No;
var checkFirstRec = 0;
var index=0;
var expn_amount=0;
var expn_amount_arr=[];
var cnt=0;

var custID_arr=[];
var custID="";
%>

<div class="panel tspace">
	<% if(accountList.length>0){ %>
	
 		<% _.each(accountList,function(dataz){ %>
				<% 
					if(dataz.expenceDescription=="OverAllMonthlyExpense"){
						Expense_month = dataz.periodValue;
				 	}
					if(dataz.expenceDescription=="CategoryWiseExpenseSpecficAcct")
					{
						if(custID != dataz.custAcctID)
			            {
			            	custID = dataz.custAcctID;
			            	if(custID_arr.length<=0){
			            		custID_arr.push(custID);
			            	}else{
			            		var isexists=false;
				            	for(var mm=0;mm<custID_arr.length;mm++){
				            		if(custID == custID_arr[mm]){
				            			isexists=true;
				            		}
				            	}
				            	if(!isexists){
				            		custID_arr.push(custID);
				            	}
			            	}
			            }
			        }
		            console.log("accounts==> : custID_arr............................"+custID_arr);
				 %>
		<%});%>
		<% for(var iix=0;iix<custID_arr.length;iix++){ %>
				<% 
					expn_amount=0;
				 %>
				<% _.each(accountList,function(datax){ %>
						 <% 
						 	if(datax.expenceDescription=="CategoryWiseExpenseSpecficAcct"){
							 	if(custID_arr[iix]==datax.custAcctID){
							 		expn_amount += parseFloat(datax.expence);
							 	}
							 }
						 %>
				<%});%>
				<%
				console.log("expn_amount : "+ expn_amount);
				expn_amount_arr.push(numberWithCommasWithoutZero(expn_amount+""));
				%>
		<% } %>
		<% console.log("expn_amount_arr : "+ expn_amount_arr); %>

<!--
 		<% _.each(accountList,function(datay){ %>
				<% 
					if(datay.expenceDescription=="OverAllMonthlyExpense"){
						Expense_month = datay.periodValue;
				 	} 
				 %>
		<%});%> 
		<% _.each(accountList,function(datax,iix){ %>
				 <% 
				 	if(datax.expenceDescription=="CategoryWiseExpenseSpecficAcct"){
				 		
						if(cust_Acct_No == datax.custAcctID)
		                {
		                	expn_amount += parseFloat(datax.expence);
		                }else{

		                	cust_Acct_No = datax.custAcctID;
		                	if(cnt==0){
		                		expn_amount = parseFloat(datax.expence);
		                	}else{
		                		expn_amount_arr.push(numberWithCommasWithoutZero(expn_amount+""));
		                		expn_amount = parseFloat(datax.expence)
		                		cnt = -1;	                		
		                	}
		                }
		                cnt++;
				 	}
				 %>
		<%});%>
		<%
			if(expn_amount_arr.length<=0 || cnt==0){
				expn_amount_arr.push(numberWithCommasWithoutZero(expn_amount+""));
				expn_amount = 0;
			}
		%>
-->
		
		
	    <div class="row">
	        <div class="panel-heading b-b-l p-b-5 fn-lgrey fn-source-l fn-size16">Accounts 
	        <span class="pull-right"><%-Expense_month %> &nbsp; Expenses</span></div>
	    </div>
	    
		<% for(var iiy=0;iiy<custID_arr.length;iiy++){ %>
			    <% _.each(accountList,function(data,idx){ %>
						<% if(data.expenceDescription=="CategoryWiseExpenseSpecficAcct") { %>
				       			<%if(custID_arr[iiy]==data.custAcctID){ %>
				       					<%
					                		var acctNick = accountList[idx].acctNickName;
					                		var acctnumber = acctNick.split("|")[0];
					                		var acctnumber_lastfour = acctnumber.substring(acctnumber.length-4,acctnumber.length);
					                		acctNick = acctNick.split("|")[1];
					                	%>
						                <%  if(custAcctNo != data.custAcctID)
						                	{
						                		custAcctNo = data.custAcctID;
						                		//console.log("-------------> " + idx + " : " + custAcctNo + " : " + data.custAcctID);
										%>
												<!-- <div class="cat_grp"> -->
												<ul class="list-grp">
												<li>
						            					<a onclick="gotoCategory(event,'<%-acctNick%>','<%-data.custAcctID%>','<%-acctnumber%>')">
						          
<!--Account identifiers for ICONS

	ACCOUNT_TYPE ==>'Savings Account'   Then    'SA'
	ACCOUNT_TYPE ==>'Current Account'   Then    'CA'
	ACCOUNT_TYPE ==>'CASA Account'      Then    'SA'
	ACCOUNT_TYPE ==>'Wallet'            Then    'WA'
	ACCOUNT_TYPE ==>'Prepaid Card'      Then    'PA' 

-->

									<% if(data.accountType=="SA"){ %>
										<div class="media-left"><span class="sb_ico bank"></span></div>
									<% } else if(data.accountType=="PA") { %>
										<div class="media-left"><span class="sb_ico pre-paid"></span></div>
									<% } else if(data.accountType=="WA") { %>
										<div class="media-left"><span class="sb_ico wallet"></span></div>
									<% } else if(data.accountType=="CA") { %>
										<div class="media-left"><span class="sb_ico bank"></span></div>
									<% } %>
											                <div class="media-body">
											                	<span class="fn-size19">
												                	<% if( !(data.acctNickName == null || data.acctNickName == "null" || data.acctNickName == "") ){ %>
												                		<%- acctNick%> <!-- &nbsp;<%-acctnumber_lastfour%> -->
												                	<% } else { %>
												                		<%- custAcctNo%>
												                	<% } %>
												                	&nbsp;&nbsp; <i class="fa fa-pencil text-muted showMyModal" aria-hidden="true" onclick="functionHoldValues('<%-acctNick%>','<%-accountList[idx].custAcctID%>','<%-acctnumber%>')"></i>
																</span>
											                    <span class=" pull-right fn-size14"><i class="fa fa-inr" aria-hidden="true"></i>&nbsp; <%- numberWithCommasWithoutZero(expn_amount_arr[index]) %></span>
																	<%
																		var iix=idx;
											                        	var casa_balance=0;
											                        	/*if(iix==0){
																			casa_balance=606783;
																		}else if(iix==1){
																			casa_balance=2000;
																		}else if(iix==2){
																			casa_balance=45683;
																		}else if(iix==3){
																			casa_balance=23222;
																		}else if(iix==4){
																			casa_balance=12347;
																		}else if(iix==5){
																			casa_balance=122;
																		}else if(iix==6){
																			casa_balance=10000;
																		}else if(iix==7){
																			casa_balance=122;
																		}else if(iix==8){
																			casa_balance=10000;
																		}else if(iix==9){
																			casa_balance=5000;
																		}else if(iix==10){
																			casa_balance=5000;
																		}else if(iix==11){
																			casa_balance=5000;
																		}else if(iix==12){
																			casa_balance=5000;
																		}else{
																			casa_balance=0;
																		}*/
											                        	for(var xsl=0;xsl<casaList.length;xsl++){
											                        		var AcctNo = casaList[xsl].accountNumber;
											                        		if(AcctNo == acctnumber){
											                        			casa_balance = casaList[xsl].availableBalance;
											                        		}
											                        	}
											                        	console.log("=======================>casa_balance===========>"+casa_balance);
											                        %>
											                        <!--
											                    <div class="fn-size15">
											                         <span class="fn-vlgrey">&nbsp;</span>
											                        <span class="fn-lgrey">&nbsp;<i class="fa fa-inr fn-size13" aria-hidden="true"></i>&nbsp;<%- numberWithCommasWithoutZero(casa_balance) %></span>
											                        
											                    </div>
											                    -->
											                </div>
								                 		</a>
	<ul class="cat_list row">
		<% _.each(accountList,function(data1,idx1){%>
			<% if(data1.expenceDescription=="CategoryWiseExpenseSpecficAcct" && custAcctNo == data1.custAcctID && data1.category!=null && data1.category!='-') { %>
				<%	
					var icon;

					var CateGory = data1.category;

					var category_split = CateGory.split('-');
						
						 if(category_split[1]=="1"){ icon ="transport" ; }
					else if(category_split[1]=="2"){ icon ="entertainment" ; }
					else if(category_split[1]=="3"){ icon ="utility" ; }
					else if(category_split[1]=="4"){ icon ="invest" ; }
					else if(category_split[1]=="5"){ icon ="shop" ; }
					else if(category_split[1]=="6"){ icon ="food" ; }
					else if(category_split[1]=="7"){ icon ="travel" ; }
					else if(category_split[1]=="8"){ icon ="groceries" ; }
					else if(category_split[1]=="9"){ icon ="health" ; }
					else if(category_split[1]=="10"){ icon ="emi" ; }
					else if(category_split[1]=="11"){ icon ="education" ; }
					else if(category_split[1]=="12"){ icon ="beauty" ; }
					else if(category_split[1]=="13"){ icon ="rent" ; }
					else if(category_split[1]=="14"){ icon ="ccard" ; }
					else if(category_split[1]=="28"){ icon ="other" ; }
					else{ icon ="quest" ; }
				%>	
				<li>
					<div class="row">
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2r"><span class="sb_ico sb_ico_2x <%-icon%> center-block"></span></div>
						<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 p-a-0"><%-category_split[0] %></div>
						<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 fn-source-l text-right"><i class="fa fa-inr" aria-hidden="true"></i> <%- numberWithCommasWithoutZero(data1.expence) %></div>
					</div>
				</li>
			<% } %>
		<%});%>
	</ul>
	
								                 	</li>
								                 	</ul>
								                <!--  </div> -->
								                 <% index++; %>
										<%	} %>
								<%	} %>
						<% } %>
			    <%});%>
		<% } %>
		    <input type="hidden" id="actId_0" name="actId_0" value="<%-accountList[0].custAcctID%>" />
		    <input type="hidden" id="nicName_0" name="nicName_0" value="<%-accountList[0].acctNickName%>" />
		    <input type="hidden" id="actId" name="actId" />
		    <input type="hidden" id="nicName" name="nicName" />
		    <input type="hidden" id="actnum" name="actnum" />
	    <% } else { %>
	    	</br>
	    	No accounts available
	    <% } %>

	<script>
		function gotoCategory(event,param1,param2,param3){
			var className = $(event.target).attr('class');
			console.log("..................>"+className);
			if(className.indexOf("fa-pencil")!=-1){
				functionHoldValues(param1,param2,param3);
			}else{
				event.stopPropagation();
				Backbone.history.navigate("#/budgetCategorise/"+param1+"/"+param2);
			}
		}
		function functionHoldValues(param1,param2,param3){
			$("#nicName").val(param1);
			$("#actId").val(param2);
			$("#actnum").val(param3);
		}
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

/*var outerWidth = $(".tabmenu").outerWidth();
console.log("outerWidth====>",outerWidth);*/
//$("#downClick1").css("left",+"px");
$('.tabmenu').bind('scroll', chk_scroll);
//console.log("===============================================>>>>>>>>>>>>>>>>>>>>",$("#tabsss").scrollLeft());
$(document).ready(function(){
	$('.tabmenu').scrollLeft(2);
});
</script>
