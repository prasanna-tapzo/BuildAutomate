<%
	var els = new EncryptedLocalStorage('secret');
	var listAccountTransactionReport = els.get("reportTxnList");
	var Daily_Txn_Detail = els.get("Daily_Txn_Detail");

%>


<div class="row bg-lyellow">
	<div class="panel m-a-0 bg-lyellow">
		<div class="panel-body p-tb-5">
			<div id="Expensebydaydetail" class="activeswipelable"></div>
		</div>
	</div><br>
</div>

<div class="row">
		<% if(listAccountTransactionReport!=null){ %>
				<% if(listAccountTransactionReport.length>0){ %>
						<%
							var currMonthName = (listAccountTransactionReport[0].periodValue).split("-")[1];
							currMonthName = currMonthName.toUpperCase();
							console.log("currMonthName : "+ currMonthName);
							var monthnumber = getMonthNumber(currMonthName);
							console.log("monthnumber : "+ monthnumber);
							var prevMon="";
							if(monthnumber=="1"){
								prevMon = "12";
							}else{
								prevMon = (parseInt(monthnumber)-1) +"";
							}
							console.log("prevMonNumber : "+ prevMon);
							var prvMontName = getMonthNameShrt(prevMon,"");
							prvMontName = prvMontName.toUpperCase();
							console.log("prevMonNumber : "+ prvMontName);
							console.log("Daily_Txn_Detail : "+ Daily_Txn_Detail);
							
						%>
						
						<% if(Daily_Txn_Detail.indexOf(currMonthName) !=-1 && Daily_Txn_Detail.indexOf(prvMontName) !=-1){ %>
							<div class="bg-grey p-a-10 p-l-16"><%-getMonthNameShrt(prevMon,"F")%> - <%-getMonthNameShrt(monthnumber,"F")%></div>
						<% }else if(Daily_Txn_Detail.indexOf(prvMontName) !=-1) { %>
							<div class="bg-grey p-a-10 p-l-16"><%-getMonthNameShrt(prevMon,"F")%></div>
						<% }else{ %>
							<div class="bg-grey p-a-10 p-l-16"><%-getMonthNameShrt(monthnumber,"F")%></div>
						<% } %>
						
						
						<div class="panel m-a-0">
							<div class="panel-body p-tb-5">
									<% _.each(listAccountTransactionReport,function(data,index){ %>
											<%
											var currday = data.periodValue;
											currday = currday.split("-")[0]+"-"+currday.split("-")[1];
											if(Daily_Txn_Detail.indexOf(currday)!=-1){
											%>
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
															<% } else if(categoryID=="28"){ %>
																<div class="media-left"><span class="sb_ico other center-block"></span></div>
															<% } else { %>
																<div class="media-left"><span class="question_ico center-block">?</span></div>
															<% } %>
															
															<div class="media-body">
																<div class="fn-size19" style="word-break: break-all"><%-data.transcDescription%></div>
																<span class="amt pull-right"><i class="fa fa-inr" aria-hidden="true"></i><%-numberWithCommasstr(data.expence)%></span>
																<div class="text-muted fn-size15"><%-data.category%>&nbsp;|&nbsp;<%-data.txn_Timestamp%></div>
																<!-- <div class="text-muted fn-size15"><%-data.category%>&nbsp;|&nbsp;<%-(data.periodValue).split("-")[0]%>&nbsp;<%-(data.periodValue).split("-")[1]%></div> -->
															</div>
														</a>
													</div>
											<%}%>
									<%});%>
							</div>
						</div>
				<% } else { %>
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

<script>
$(".content").animate({ scrollTop: 0 }, "fast");
	var els = new EncryptedLocalStorage('secret');
	var listAccountTransactionReport = els.get("reportDailyTxn");
	var tot_txn = listAccountTransactionReport.length;
	var div = tot_txn/6;
	var mod = tot_txn%6;
	els.set("day_total_pages",div);
	//console.log("Load Daily Txn " + tot_txn + " : div : "+ div +" : mod :" + mod);
function swipeactiveReady(){
	//console.log("Active swipeactiveReady : "+ tot_txn);
	$(".activeswipelable").swipe( {
		allowPageScroll: 'vertical',
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
					if(tot_txn>0)
					{
							//console.log("direction::::::::::::::::"+ direction);
							if(direction=="right")
							{
										var Day_Cur_Page = els.get("Day_Cur_Page");
										//console.log("Right Day_Cur_Page : "+ Day_Cur_Page);
										var temp_cur_page=1;
										if(Day_Cur_Page==null || Day_Cur_Page==null)
										{
											temp_cur_page = 1;
										}else{
											temp_cur_page = parseInt(Day_Cur_Page) - 1;
										}
										
										if(temp_cur_page>0){
											els.set("Day_Cur_Page",temp_cur_page);
											$("#Expensebydaydetail").trigger("click");
										}
										//console.log("Right temp_cur_page : "+ temp_cur_page + " : els.get('Day_Cur_Page') " + els.get("Day_Cur_Page"));
										
										
										event.stopPropagation();
							}
							else if(direction=="left")
							{
							
										var Day_Cur_Page = els.get("Day_Cur_Page");
										//console.log("Left Day_Cur_Page : "+ Day_Cur_Page);
										var temp_cur_page=1;
										if(Day_Cur_Page==null || Day_Cur_Page=="")
										{
											temp_cur_page += 1;
										}else{
											temp_cur_page = parseInt(Day_Cur_Page) + 1;
										}
										
										if(temp_cur_page<=div){
											els.set("Day_Cur_Page",temp_cur_page);
											$("#Expensebydaydetail").trigger("click");
										}
										//console.log("Left temp_cur_page : "+ temp_cur_page + " : els.get('Day_Cur_Page') " + els.get("Day_Cur_Page"));
										

										event.stopPropagation();
							}
							else
							{
										event.stopPropagation();
							}
					}
		},
		//Default is 75px, set to 0 for demo so any distance triggers swipe
	   threshold:0
	});
}
swipeactiveReady();
</script>