<%
	var els = new EncryptedLocalStorage('secret');
	var listAccountTransactionReport = els.get("cateWiseTxnReport");
%>
<% if(listAccountTransactionReport!=null){ %>
<!--/tabmenu-->
<div class="setng">
    <div class="tabmenu">
	        <a href="#/categoryexpensesreport" >MONTHLY</a>
            <a href="#/categoryexpensesreportquarterly" class="padtp active">QUARTERLY</a>
    </div>
</div>

<!--/tabmenu-->

<div class="row padt12 p-b-10 bar_top">
    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 fn-yellow padt12"><%- monthval %></div>
    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-center b-r-l fn-size19">
		<div class="fn-size14 fn-lgrey">Budgets</div>
		<i class="fa fa-inr fn-size16 fn-lgrey" aria-hidden="true"></i> <%-numberWithCommasWithoutZero(budg) %>
	</div>
    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-center chart-active fn-size19">
		<div class="fn-size14 fn-lgrey">Expenses</div>
        <i class="fa fa-inr fn-size16 fn-lgrey" aria-hidden="true"></i> <%-numberWithCommasWithoutZero(expc) %>
	</div>
</div>

<div class="row">
	<div class="panel m-a-0">
		<div class="panel-body p-tb-5 bg-lyellow">
			<br>
			<div id="plotYearChart"></div>
			<div class="spacer10"></div>
			<div id="bar_legend"></div>
			<div class="spacer10"></div>
		</div>
	</div>
</div>

<div class="row">
		<% if(listAccountTransactionReport!=null){ %>		
			
			
			<% if(listAccountTransactionReport.length>0){ %>
			<div class="bg-grey p-a-10 p-tb-5 p-l-15"><%-listAccountTransactionReport[0].periodValue%>  <%-listAccountTransactionReport[0].yearValue%></div>
					<div class="panel m-a-0">
						<div class="panel-body p-tb-5">
								<% _.each(listAccountTransactionReport,function(data){ %>
									<% if(data.categoryID==categoryId){ %>
											<div class="cat_grp">
												<a id="txnList" class="showMyModal">
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
													<% }  else if(categoryID=="28"){ %>
														<div class="media-left"><span class="sb_ico other center-block"></span></div>
													<% } else { %>
														<div class="media-left"><span class="question_ico center-block">?</span></div>
													<% } %>
													
													<div class="media-body">
														<div class="fn-size19" style="word-break: break-all"><%-data.transcDescription%></div>
														<span class="amt pull-right"><i class="fa fa-inr" aria-hidden="true"></i><%-numberWithCommasstr(data.expence)%></span>
														<div class="text-muted fn-size15"><%-data.category%>&nbsp;|&nbsp;<%-data.txn_Timestamp%></div>
														<!-- <div class="text-muted fn-size15"><%-data.category%>&nbsp;|&nbsp;<%-data.periodValue%>  <%-data.yearValue%></div> -->
													</div>
												</a>
											</div>
									<%}%>
								<%});%>
						</div>
					</div>
				
				<% } else { %>
				<div class="bg-grey p-a-10 p-tb-5 p-l-15"></div>
					<div class="panel m-a-0">
						<div class="panel-body p-tb-5">
							No records available.
						</div>
					</div>
					
				<% } %>
				
		<% } else { %>
			<div class="panel m-a-0">
				<div class="panel-body p-tb-5">
					No records available.
				</div>
			</div>
			
		<% } %>
</div>
<% } else {%>
	<div class="panel m-a-0">
		<div class="panel-body p-tb-5">
			No records available.
		</div>
	</div>
<% } %>
<script>
$(".content").animate({ scrollTop: 0 }, "fast");
$('html, body').animate({ scrollTop: 0 }, 'fast');
</script>