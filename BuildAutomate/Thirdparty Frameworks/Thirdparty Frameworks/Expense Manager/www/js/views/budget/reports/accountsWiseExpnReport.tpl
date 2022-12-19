<%
	var els = new EncryptedLocalStorage('secret'); 
	var categorysListAcct = els.get("acctWiseTxnReport");
	var counter=0;
%>
<% if(categorysListAcct!=null){ %>
<!--
<span id="ttop"></span>

</br>
<div id="categoryChartDiv" class="row">
		<div class="row" style="position: relative; z-index: 1;">
			<div class="col-xs-12 text-center"><span class="chartCur"><h2><i class="fa fa-inr" aria-hidden="true"></i><span id="expnAmount"></span></h2></span></div>
		</div>
		<div class="row">
			<div class="col-xs-12">
						<table width="100%" cellpadding="0" cellspacing="0" border="0">
							    	<tr>
											<td width="49%" valign="middle"><div id="ExpnsCateChart" style="height:180px;width:148px;"> </div></td>
											<td width="51%" valign="middle" id="ExpnCate_legd"> </td>
							    	</tr>
						</table>
			</div>
		</div>
</div>
-->
<div id="categoryChartDiv" class="row bg-lyellow" align="center">
		</br>
		<div align="center" id="ExpnsCateChart" style="height:210px;width:220px;" />
		
		<div class="row" style="position: relative; z-index: 1;">
			<div class="col-xs-12 text-center"><span class="chartCur_large"><h2><i class="fa fa-inr" aria-hidden="true"></i><span id="expnAmount"></span></h2></span></div>
		</div>
		
		<div valign="middle" align="center" id="ExpnCate_legd" />
		</br>
</div>

<div class="row">
	<div class="bg-grey p-a-10 p-tb-5 p-l-15" id="MonName"><%getMonthNameShrt(getMonthNumber(mon),'F')%></div>
</div>
		<% if(categorysListAcct.length>0){ %>
				<% _.each(categorysListAcct,function(data,indx){ %>
						<% if(data.categoryID==categoryId){ %>
								<% if(counter==0){%>
	        						<div class="spacer10 whitebg"></div>
	        					<%}%>
								<div class="cat_grp">
										<% if(data.category=="Uncategorized"){%>
											<a id="unCategoriseId" onclick="myCategoryPopup('<%-data.transcID%>','<%-data.categoryID%>','<%-data.expence%>','<%-data.transcDescription%>','<%-data.periodValue%>','<%-data.yearvalue%>')">
												<div class="media-left"> <span class="question_ico">?</span> </div>
												<div class="media-body">
													<div class="fn-blue fn-size19" style="word-break: break-all"><%-data.transcDescription%></div>
													<span class="amt pull-right">
														<i class="fa fa-inr" aria-hidden="true"></i>
														<%-numberWithCommasstr(data.expence+"")%>
													</span>
													<div class="text-muted fn-size15"><%-data.category%>&nbsp;|&nbsp;<%-data.txn_Timestamp%></div>
													<!-- <div class="text-muted fn-size15"><%-data.category%>&nbsp;|&nbsp;<%-data.periodValue%>&nbsp;<%-data.yearvalue%></div> -->
												</div>
											</a>
										<%}else{%>

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
													<div class="fn-blue fn-size19" style="word-break: break-all"><%-data.transcDescription%></div>
													<span class="amt pull-right">
														<i class="fa fa-inr" aria-hidden="true"></i>
														<%-numberWithCommasstr(data.expence+"")%>
													</span>
													<div class="text-muted fn-size15"><%-data.category%>&nbsp;|&nbsp;<%-data.txn_Timestamp%></div>
													<!-- <div class="text-muted fn-size15"><%-data.category%>&nbsp;|&nbsp;<%-data.periodValue%>&nbsp;<%-data.yearvalue%></div> -->
												</div>
										<%}%>
								</div>
								<% counter++; %>
						<% } %>
				<%});%>
		<% } else {%>
			<div class="panel m-a-0">
				<div class="panel-body p-tb-5">
					No records available.
				</div>
			</div>
		<% } %>
	<input type="hidden" name="catIDAcc" id="catIDAcc" value=""/ >
	<input type="hidden" name="txnIDAcc" id="txnIDAcc" value=""/ >
	<input type="hidden" name="aMTAcc" id="aMTAcc" value=""/ >
	<input type="hidden" name="catdescAcc" id="catdescAcc" value=""/ >
	<input type="hidden" name="monthAcc" id="monthAcc" value=""/ >
<% } else {%>
	<div class="panel m-a-0">
		<div class="panel-body p-tb-5">
			No records available.
		</div>
	</div>
<% } %>
<script>
	function myCategoryPopup(a,b,c,d,e,f){
		console.log(a + " - " + b + " - " + c);
		$("#catIDAcc").val(b);
		$("#txnIDAcc").val(a);
		$("#aMTAcc").val(c);
		$("#catdescAcc").val(d);
		$("#monthAcc").val(e+" "+f);
	}
//$("#ttop").focus();
$(".content").animate({ scrollTop: 0 }, "fast");
</script>

<script>
$('html, body').animate({ scrollTop: 0 }, 'fast');
</script>
<script>
$(window).on('popstate', function () {
      $('.commonpopupmodal').modal('hide');  // close the modal window
	  $(".modal-backdrop").remove();//fade-out modal layer
	  $("#loginfooter").addClass("footerwrap");
    });
</script>
