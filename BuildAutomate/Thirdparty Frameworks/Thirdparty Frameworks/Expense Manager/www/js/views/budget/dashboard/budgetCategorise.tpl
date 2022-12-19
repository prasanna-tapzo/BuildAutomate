<%
	var els = new EncryptedLocalStorage('secret'); 
	var categorysListAcct = els.get("ExpencesCategoryListAcct");
	var els_acct_id = els.get("acct_id");
	var accountType="";
	var indexString="";
	var accttypearr=[];
	var expAmtArr=[];
	var indexarr=[];
	els.set("Action_Type","");
	$("#screentitle").text("");
%>
<!--
<div id="categoryChartDiv" class="row">
		<div class="row" style="position: relative; z-index: 1;">
			<div class="col-xs-12 text-center"><span class="chartCur"><h2><i class="fa fa-inr" aria-hidden="true"></i><span id="Genexpn_amount"></span></h2></span></div>
		</div>
		<div class="col-xs-12">
						<table width="100%" cellpadding="0" cellspacing="0" border="0">
							    	<tr>
											<td width="49%" valign="middle"><div id="GenExpnsChart" style="height:180px;width:148px;"> </div><td>
											<td width="51%" valign="middle" id="Genexpn_legd"> </td>
							    	</tr>
			</table>
		</div>
</div>
-->
<h1 class="inner_title" style="margin:10px 0 10px 0">
	<span><%-$.i18n.t(name)%></span>
</h1>
<div id="categoryChartDiv" class="row bg-lyellow" align="center">
		</br>
		<div align="center" id="GenExpnsChart" style="height:210px;width:220px;" />
		
		<div class="row" style="position: relative; z-index: 1;">
			<div class="col-xs-12 text-center"><span class="chartCur_large"><h2><i class="fa fa-inr" aria-hidden="true"></i><span id="Genexpn_amount"></span></h2></span></div>
		</div>
		
		<div valign="middle" align="center" id="Genexpn_legd" />
		</br>
</div>

<div class="row">
	<div class="bg-grey p-a-10 p-tb-5 p-l-15"><%-getMonthNameShrt(getMonthNumber(mon),'F')%></div>
</div>

 		<% _.each(categorysListAcct,function(dataz,idx){ %>
				<% 
						accountType = dataz.accountType;
						if(!(accountType=="" || accountType==null)){
							accountType = accountType.split("|")[1];
							if(!(accountType=="" || accountType==null)){
								var isexists=false;
								for(var i=0;i<accttypearr.length;i++){
									if(accountType==accttypearr[i]){
										isexists=true;
									}
								}
								if(!isexists){
				            		accttypearr.push(accountType);
				            	}
							}
						}

				 %>
		<%});%>
 		
 		<% for(var j=0;j<accttypearr.length;j++) { %>
 				<%
 				var expnAmt=0;
 				indexString=""; 
 				%>
		 		<% _.each(categorysListAcct,function(datay,index){ %>
						<% 
								accountType = datay.accountType;
								if(!(accountType=="" || accountType==null)){
									accountType = accountType.split("|")[1];
									if(!(accountType=="" || accountType==null)){
										if(accttypearr[j]==accountType){
											expnAmt += parseFloat(datay.expence);
											indexString += index + "|";
										}
									}
								}
		
						 %>
				<%});%>
				<% expAmtArr.push(numberWithCommasstr(expnAmt)); %>
				<%
					if(indexString.indexOf("|")!=-1){
						indexString = indexString.substring(0,indexString.length-1);
					}
				%>
				<% indexarr.push(indexString); %>
		<% } %>
		
		<%
			console.log("accttypearr......" + accttypearr);
			console.log("expAmtArr........" + expAmtArr);
			console.log("indexarr........." + indexarr);
			var counter=0;
			var groupflagfirsttxn=true;
			var groupflaglasttxn=false;
			var groupTxnId = 0;
		%>
		
				<% _.each(categorysListAcct,function(data,indx){ %>
				
						<% if(els_acct_id==data.custAcctID){ %>
								
								<%
									var data_acttype = data.accountType;
									var tempAmt =0;
									var isgroup = false;
									data_acttype = data_acttype.split("|")[1];
									
									//console.log("data_acttype : "+ data_acttype);
									
									var txndatadesc = data.description;
									var datadesc = data.description;
									
									
									datadesccode = datadesc.substring(0,datadesc.indexOf("-"));
									datadesc = datadesc.substring(datadesc.indexOf("-")+1,datadesc.length);
									
									var date = data.transcID;
									for(var k=0;k<accttypearr.length;k++) { 
										if(data_acttype == accttypearr[k]){
											tempAmt = numberWithCommasstr(expAmtArr[k]);
											isgroup = true;
										}
									}
									if(isgroup){
										
										if(groupflagfirsttxn && !groupflaglasttxn){
											counter=0;
											groupflagfirsttxn=true;
											groupflaglasttxn=false;
										}else if(!groupflagfirsttxn && groupflaglasttxn){
											counter++;
											groupflagfirsttxn=false;
											groupflaglasttxn=false;
										}else{
											counter++;
											groupflagfirsttxn=false;
											groupflaglasttxn=false;
										}
										
									}else{
											//if(!groupflagfirsttxn && !groupflaglasttxn){
												counter++;
												groupflagfirsttxn=true;
												groupflaglasttxn=true;
											//}
									}
									
								%>
								
								<% if(isgroup) { %>
								
									<% if(groupTxnId != data_acttype){%>
										<% 
											groupflaglasttxn=false; 
											groupflagfirsttxn=true;
											counter=0;
											groupTxnId = data_acttype;
											if(indx>0){
												
										%>
											</div>
										<% } %>
									<% } %>
									<% if(counter==0 && groupflagfirsttxn ){ %>
										<div class="split_grp">
	        								<div class="corner"></div>
	        								<% groupflagfirsttxn=false; %>
	        						<% } %>
	        						<% if(indx==0){%>
	        							<div class="spacer10"></div>
	        						<%}%>
											<div class="cat_grp no-bg">
													<!-- <span class="activeswipelable" id="unCategoriseId" onclick="myCategoryPopup('<%-data.transcID%>','<%-data.categoryID%>','<%-data.expence%>','<%-txndatadesc%>','<%-data.periodValue%>','<%-data.yearvalue%>','C')"> -->
													<span class="activeswipelable" id="unCategoriseId" >	
															<input type="hidden" name="TransactionId" id="TransactionId" value="<%-data_acttype%>"/ >
															<input type="hidden" name="categoryId" id="categoryId" value="<%-data.categoryID%>"/ >
															<input type="hidden" name="AmountValue" id="AmountValue" value="<%-tempAmt%>"/ >
															<input type="hidden" name="TransDesc" id="TransDesc" value="<%-txndatadesc%>"/ >
															<input type="hidden" name="monthValue" id="monthValue" value="<%-data.periodValue%>"/ >
															<input type="hidden" name="yearValue" id="yearValue" value="<%-data.yearvalue%>"/ >
															<input type="hidden" name="categoryName" id="categoryName" value="<%-data.category%>"/ >
															<input type="hidden" name="groupflag" id="groupflag" value="Y" />
															
															<%
																var categoryID="";
																try{
																	categoryID = data.categoryID;
																}catch(E){}
															%>
															<% if(categoryID=="1"){ %>
																<div class="media-left"><span class="sb_ico transport center-block"></span></div>
															<% } else if(categoryID=="2"){ %>
																<div class="media-left"><span class="sb_ico entertainment center-block"></span></div>
															<% } else if(categoryID=="3"){ %>
																<div class="media-left"><span class="sb_ico utility center-block"></span></div>
															<% } else if(categoryID=="4"){ %>
																<div class="media-left"><span class="sb_ico invest center-block"></span></div>
															<% } else if(categoryID=="5"){ %>
																<div class="media-left"><span class="sb_ico shop center-block"></span></div>
															<% } else if(categoryID=="6"){ %>
																<div class="media-left"><span class="sb_ico food center-block"></span></div>
															<% } else if(categoryID=="7"){ %>
																<div class="media-left"><span class="sb_ico travel center-block"></span></div>
															<% } else if(categoryID=="8"){ %>
																<div class="media-left"><span class="sb_ico groceries center-block"></span></div>
															<% } else if(categoryID=="9"){ %>
																<div class="media-left"><span class="sb_ico health center-block"></span></div>
															<% } else if(categoryID=="10"){ %>
																<div class="media-left"><span class="sb_ico emi center-block"></span></div>
															<% } else if(categoryID=="11"){ %>
																<div class="media-left"><span class="sb_ico education center-block"></span></div>
															<% } else if(categoryID=="12"){ %>
																<div class="media-left"><span class="sb_ico beauty center-block"></span></div>
															<% } else if(categoryID=="13"){ %>
																<div class="media-left"><span class="sb_ico rent center-block"></span></div>
															<% } else if(categoryID=="14"){ %>
															    <div class="media-left"><span class="sb_ico ccard center-block"></span></div>
															<% } else if(categoryID=="28"){ %>
																<div class="media-left"><span class="sb_ico other center-block"></span></div>
															<% } else { %>
																<div class="media-left"><span class="question_ico center-block">?</span></div>
															<% } %>
															<%
																if(datadesc.length>20){
																	datadesc = datadesc.substring(0,16);
																}
															%>
															<div class="media-body">
																<span class="fn-blue fn-size19" style="word-break: break-all"><%-datadesc%></span>
																<span class="amt pull-right"><i class="fa fa-inr" aria-hidden="true"></i><%-tempAmt%></span>
																
																<div class="text-muted fn-size15"><%-data.category%>&nbsp;|&nbsp;<%-data.txn_Timestamp%>
																	<span class="amt pull-right fn-size15 fn-vlgrey"><i class="fa fa-inr fn-vlgrey" aria-hidden="true"></i><%-numberWithCommasstr(data.expence+"")%></span>
																</div>

																<!-- <div class="text-muted fn-size15"><%-data.category%>&nbsp;|&nbsp;<%-getMonthNameShrt(parseInt(date.substring(4,6)),'').toUpperCase()%>&nbsp;<%-date.substring(6,8)%>
																	<span class="amt pull-right fn-size15 fn-vlgrey"><i class="fa fa-inr fn-vlgrey" aria-hidden="true"></i><%-numberWithCommasstr(data.expence+"")%></span>
																</div> -->																	
															</div>
													</span>
											</div>
								<% } else { %>
									<% if(indx==0){%>
	        							<div class="spacer10 whitebg"></div>
	        						<%}%>
									<% if(groupflaglasttxn){%>
										<% groupflaglasttxn=false; %>
										</div>
									<% } %>
									
										<div class="cat_grp">
													<!-- <span class="activeswipelable" id="unCategoriseId" onclick="myCategoryPopup('<%-data.transcID%>','<%-data.categoryID%>','<%-data.expence%>','<%-txndatadesc%>','<%-data.periodValue%>','<%-data.yearvalue%>','C')"> -->
													<span class="activeswipelable" id="unCategoriseId" >
															
															<input type="hidden" name="TransactionId" id="TransactionId" value="<%-data.transcID%>"/ >
															<input type="hidden" name="categoryId" id="categoryId" value="<%-data.categoryID%>"/ >
															<input type="hidden" name="AmountValue" id="AmountValue" value="<%-data.expence%>"/ >
															<input type="hidden" name="TransDesc" id="TransDesc" value="<%-txndatadesc%>"/ >
															<input type="hidden" name="monthValue" id="monthValue" value="<%-data.periodValue%>"/ >
															<input type="hidden" name="yearValue" id="yearValue" value="<%-data.yearvalue%>"/ >
															<input type="hidden" name="categoryName" id="categoryName" value="<%-data.category%>"/ >
															<input type="hidden" name="groupflag" id="groupflag" value="N" />
															
															<%
																var categoryID="";
																try{
																	categoryID = data.categoryID;
																}catch(E){}
															%>
															<% if(categoryID=="1"){ %>
																<div class="media-left"><span class="sb_ico transport center-block"></span></div>
															<% } else if(categoryID=="2"){ %>
																<div class="media-left"><span class="sb_ico entertainment center-block"></span></div>
															<% } else if(categoryID=="3"){ %>
																<div class="media-left"><span class="sb_ico utility center-block"></span></div>
															<% } else if(categoryID=="4"){ %>
																<div class="media-left"><span class="sb_ico invest center-block"></span></div>
															<% } else if(categoryID=="5"){ %>
																<div class="media-left"><span class="sb_ico shop center-block"></span></div>
															<% } else if(categoryID=="6"){ %>
																<div class="media-left"><span class="sb_ico food center-block"></span></div>
															<% } else if(categoryID=="7"){ %>
																<div class="media-left"><span class="sb_ico travel center-block"></span></div>
															<% } else if(categoryID=="8"){ %>
																<div class="media-left"><span class="sb_ico groceries center-block"></span></div>
															<% } else if(categoryID=="9"){ %>
																<div class="media-left"><span class="sb_ico health center-block"></span></div>
															<% } else if(categoryID=="10"){ %>
																<div class="media-left"><span class="sb_ico emi center-block"></span></div>
															<% } else if(categoryID=="11"){ %>
																<div class="media-left"><span class="sb_ico education center-block"></span></div>
															<% } else if(categoryID=="12"){ %>
																<div class="media-left"><span class="sb_ico beauty center-block"></span></div>
															<% } else if(categoryID=="13"){ %>
																<div class="media-left"><span class="sb_ico rent center-block"></span></div>
															<% } else if(categoryID=="14"){ %>
															    <div class="media-left"><span class="sb_ico ccard center-block"></span></div>
															<% } else if(categoryID=="28"){ %>
																<div class="media-left"><span class="sb_ico other center-block"></span></div>
															<% } else { %>
																<div class="media-left"><span class="question_ico center-block">?</span></div>
															<% } %>

															<div class="media-body">
																<span class="fn-blue fn-size19" style="word-break: break-all"><%-datadesc%></span>
																<span class="amt pull-right">
																	<i class="fa fa-inr" aria-hidden="true"></i>
																	<%-numberWithCommasstr(data.expence+"")%>
																</span>
																<div class="text-muted fn-size15"><%-data.category%>&nbsp;|&nbsp;<%-data.txn_Timestamp%></div>
																<!-- <div class="text-muted fn-size15"><%-data.category%>&nbsp;|&nbsp;
																<%-getMonthNameShrt(parseInt(date.substring(4,6)),'').toUpperCase()%>&nbsp;<%-date.substring(6,8)%></div> -->
															</div>
													</span>
											</div>
								<% } %>
						<%}%>
				<%});%>
<% if(categorysListAcct.length<=0){%>
	<div class="panel m-a-0">
		<div class="panel-body p-tb-5">
			No expenses available.
		</div>
	</div>
<% } %>
	<input type="hidden" name="catIDAcc" id="catIDAcc" value=""/ >
	<input type="hidden" name="txnIDAcc" id="txnIDAcc" value=""/ >
	<input type="hidden" name="aMTAcc" id="aMTAcc" value=""/ >
	<input type="hidden" name="catdescAcc" id="catdescAcc" value=""/ >
	<input type="hidden" name="monthAcc" id="monthAcc" value=""/ >
	<input type="hidden" name="eventtriggered" id="eventtriggered" value=""/ >
	<input type="hidden" name="categoryNameAcc" id="categoryNameAcc" value=""/ >

<div id="otpModalinFooter" name="otpModalinFooter"></div>

<script>
	function myCategoryPopup(a,b,c,d,e,f,g,h){
		console.log("ALL------------> "+ a + " - " + b + " - " + c + " - "+ g + " - " + h);
		$("#catIDAcc").val(b);
		$("#txnIDAcc").val(a);
		$("#aMTAcc").val(c);
		$("#catdescAcc").val(d);
		$("#monthAcc").val(e+" "+f);
		$("#eventtriggered").val(g);
		$("#categoryNameAcc").val(h);
	}
//$("#ttop").focus();
$(".content").animate({ scrollTop: 0 }, "fast");
</script>

<script>
function swipeactiveReady(){
	console.log("Active swipeactiveReady");
	$(".activeswipelable").swipe( {
		allowPageScroll: 'vertical',
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
					console.log("direction::::::::::::::::"+ direction);

					console.log("Group FLAG ============>>>>>",$(this).find("#groupflag").val());

					if(direction==null){
						var TransactionId = $(this).find("#TransactionId").val();
						var categoryId = $(this).find("#categoryId").val();
						var AmountValue = $(this).find("#AmountValue").val();
						var TransDesc = $(this).find("#TransDesc").val();
						var monthValue = $(this).find("#monthValue").val();
						var yearValue = $(this).find("#yearValue").val();
						var categoryName = $(this).find("#categoryName").val();
						var groupflag = $(this).find("#groupflag").val();
						
						console.log("Swipe : TransactionId : "+ TransactionId);
						console.log("Swipe : categoryId    : "+ categoryId);
						console.log("Swipe : AmountValue   : "+ AmountValue);
						console.log("Swipe : TransDesc     : "+ TransDesc);
						console.log("Swipe : monthValue    : "+ monthValue);
						console.log("Swipe : yearValue     : "+ yearValue);
						console.log("Swipe : categoryName     : "+ categoryName);
						var actionflag="C";
						if(groupflag=="Y"){
							actionflag="CS";
						}
						myCategoryPopup(TransactionId,categoryId,AmountValue,TransDesc,monthValue,yearValue,actionflag,categoryName);
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
						var groupflag = $(this).find("#groupflag").val();
						
						console.log("Swipe : TransactionId : "+ TransactionId);
						console.log("Swipe : categoryId    : "+ categoryId);
						console.log("Swipe : AmountValue   : "+ AmountValue);
						console.log("Swipe : TransDesc     : "+ TransDesc);
						console.log("Swipe : monthValue    : "+ monthValue);
						console.log("Swipe : yearValue     : "+ yearValue);
						console.log("Swipe : categoryName  : "+ categoryName);
						console.log("Swipe : groupflag     : "+ groupflag);
						var actionflag="S";
						if(groupflag=="N")
						{
							els.set("Action_Type","SWIPE");	
							myCategoryPopup(TransactionId,categoryId,AmountValue,TransDesc,monthValue,yearValue,actionflag,categoryName);
							$("#unCategoriseId").trigger("click");
						}else{
							console.log("groupflag checking =====>>>",groupflag);
							//els.set("Action_Type","DONOTHING");
						}
						

						
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
$(window).on('popstate', function () {
      $('.commonpopupmodal').modal('hide');  // close the modal window
	  $(".modal-backdrop").remove();//fade-out modal layer
	  $("#loginfooter").addClass("footerwrap");
    });
</script>
