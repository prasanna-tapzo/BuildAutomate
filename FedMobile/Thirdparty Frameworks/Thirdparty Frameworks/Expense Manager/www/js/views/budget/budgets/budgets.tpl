<%
var els = new EncryptedLocalStorage('secret');
var categorysList = els.get("categorysList");
els.set("cateIDList","");
var monthDesc, yearDesc;
var totalBudget=0;
var totalExpense=0;
var tot_decrease=0;
var tot_percent=0;
var cateIDList="";
%>

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

<!--/tabmenu-->
<div class="row tabmenu" id="tabsss" style="-webkit-overflow-scrolling: auto !important;">
           	<a href="#/smartBudget" >&nbsp;DASHBOARD</a>
            <a href="#/accounts">ACCOUNTS</a>
            <a href="#/budgets" class="padtp active">BUDGETS</a>
            <a href="#/reports">REPORTS &emsp;</a>
</div>
	<!-- <div class="row tabmenu">
           	<a href="#/smartBudget" >DASHBOARD</a>
            <a href="#/accounts">ACCOUNTS</a>
            <a href="#/budgets" class="padtp active">BUDGETS</a>
            <a href="#/reports">REPORTS</a>
	</div> -->
<!--/tabmenu-->

<% if(categorysList.length>0) { %>

<% 
	_.each(categorysList,function(datax){
		if(!(datax.categoryDesc=="Uncategorized" || datax.categoryDesc=="" || datax.categoryDesc=="null" || datax.categoryDesc==null ) ) {
			totalBudget  += parseInt(datax.budget);
			totalExpense += parseInt(datax.expense);
		}
	});
	tot_decrease = parseInt(totalBudget) - (parseInt(totalBudget)-parseInt(totalExpense));
	tot_percent = tot_decrease / parseInt(totalBudget) * 100;
%>

<% if(parseFloat(totalBudget)>0){ %>
<div class="row">
	<div class="bud panel m-tb-0 p-t-0 p-b-0 whitebg">
			<div class="panel-body budget_today">
				<div class="fn-yellow fn-size16 fn-source-sb fn-size16"><%- categorysList[0].monthDesc%> <%- categorysList[0].year_value%></div>
				<!--<div class="text-muted fn-size11 text-right today">TODAY</div>-->
				<div class="row">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<a href="javascript:void(0)">
							<div class="progress m-a-0">
								<% if(tot_percent>=100) { %>
									<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: <%-tot_percent%>%"></div>
								<% } else if(tot_percent>=75) { %>
									<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: <%-tot_percent%>%"></div>
								<% } else {%>
									<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: <%-tot_percent%>%"></div>
								<% } %>
							</div>
						</a>
					</div>	
				</div>
				
				
		    	<div class="row">
			        	<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 p-r-0 fn-size11 fn-source-l">
			        			EXPENDITURE<div class="fn-size14"><i class="fa fa-inr" aria-hidden="true"></i><%-numberWithCommasWithoutZero(totalExpense+"") %> of <i class="fa fa-inr" aria-hidden="true"></i><%-numberWithCommasWithoutZero(totalBudget+"") %></div>
			        	</div>

			        	<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-right fn-size11 fn-source-l">
			        			REMAINING<div class="fn-size14"><i class="fa fa-inr" aria-hidden="true"></i><%- numberWithCommasWithoutZero( (parseInt(totalBudget)-parseInt(totalExpense)) +"") %></div>
			        	</div>
			        	<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>
		    	</div>
			</div>
	</div>
</div>
<%}%>


<%
var Decrease=0;
var percent=0;
%>
<% _.each(categorysList,function(data,idx){ %>
	<% if(!(data.categoryDesc=="Uncategorized" || data.categoryDesc=="" || data.categoryDesc=="null" || data.categoryDesc==null ) ) {

var categoryDescription ="";

if(data.categoryDesc=="Food and Drinks/Dineout")
{
	categoryDescription="food_and_drinks";
}else{
	categoryDescription=data.categoryDesc;	
}


	 %>
	<% if(data.budget>0) { %>

				<%	
					var icon;
						
						 if(data.categID=="1"){ icon ="transport" ; }
					else if(data.categID=="2"){ icon ="entertainment" ; }
					else if(data.categID=="3"){ icon ="utility" ; }
					else if(data.categID=="4"){ icon ="invest" ; }
					else if(data.categID=="5"){ icon ="shop" ; }
					else if(data.categID=="6"){ icon ="food" ; }
					else if(data.categID=="7"){ icon ="travel" ; }
					else if(data.categID=="8"){ icon ="groceries" ; }
					else if(data.categID=="9"){ icon ="health" ; }
					else if(data.categID=="10"){ icon ="emi" ; }
					else if(data.categID=="11"){ icon ="education" ; }
					else if(data.categID=="12"){ icon ="beauty" ; }
					else if(data.categID=="13"){ icon ="rent" ; }
					else if(data.categID=="14"){ icon ="ccard" ; }
					else if(data.categID=="28"){ icon ="other" ; }
					else{ icon ="quest" ; }
				%>	

		<div class="bud b-b-l whitebg">
				<div class="text-muted fn-size16"><%- data.categoryDesc%></div>
					<div class="row">
						<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
							<span class="sb_ico sb_ico_2x <%-icon%> center-block"></span>
						</div>
						<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 p-r-0">
				<%
					// decrease = budget - remaining
					// percentage = Decrease � budget � 100
					
					decrease = parseInt(data.budget) - (parseInt(data.budget)-parseInt(data.expense));
					percent = decrease / parseInt(data.budget) * 100;
					
					els.set("cateIDList", (els.get("cateIDList")+","+data.categID) );
					
					console.log(idx + " : cateIDList : "+ els.get("cateIDList") );
				%>
				<%
				var tmon = data.monthDesc;
				tmon = tmon.toUpperCase();
				if(mon==tmon){
				%>
				<% if(percent>=100) { %>
						<a id="montlyreports" onclick="gotoMonthReports('<%-data.categoryDesc%>','<%-data.categID%>')">
	
							<div class="progress m-a-0">
								<% if(percent>=100) { %>
									<% if(data.categID=="4"){%>
									<div class="progress-bar progress-investment" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: <%-percent%>%"></div>
									<% }else{%>
									<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: <%-percent%>%"></div>
									<%}%>
									
								<% } else if(percent>=75) { %>
									<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: <%-percent%>%"></div>
								<% } else {%>
									<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: <%-percent%>%"></div>
								<% } %>
							</div>
						</a>
						
				<%}else{%>
						<!-- <a href="#/budgetedit/<%-(parseInt(data.budget)-parseInt(data.expense))%>/<%-categoryDescription%>/<%-data.categID%>"> -->
						<a href="#/budgetedit/<%-(parseInt(data.budget))%>/<%-categoryDescription%>/<%-data.categID%>">
							<div class="progress m-a-0">
								<% if(percent>=100) { %>
									<% if(data.categID=="4"){%>
									<div class="progress-bar progress-investment" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: <%-percent%>%"></div>
									<% }else{%>
									<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: <%-percent%>%"></div>
									<%}%>
									
								<% } else if(percent>=75) { %>
									<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: <%-percent%>%"></div>
								<% } else {%>
									<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: <%-percent%>%"></div>
								<% } %>
							</div>
						</a>
				<%}%>
					</div>
					<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 p-r-0">
						<!-- <a href="#/budgetedit/<%-(parseInt(data.budget)-parseInt(data.expense))%>/<%-categoryDescription%>/<%-data.categID%>"><i class="fa fa-pencil pull-right fn-vlgrey" aria-hidden="true"></i></a> -->
						<a href="#/budgetedit/<%-(parseInt(data.budget))%>/<%-categoryDescription%>/<%-data.categID%>"><i class="fa fa-pencil pull-right fn-vlgrey" aria-hidden="true"></i></a>		
					</div>								
				</div>
				
			    <div class="row">
			    		<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>
				        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 p-r-0 fn-size11 fn-source-l">
				        	<div class="fn-size14">
				        		<i class="fa fa-inr" aria-hidden="true"></i><%-numberWithCommasWithoutZero(data.expense+"") %> of <i class="fa fa-inr" aria-hidden="true"></i><%-numberWithCommasWithoutZero(data.budget+"") %>
				        	</div>
				        </div>
				        	<% if(percent>=100) { %>
				        		<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right fn-size11 fn-source-l p-r-0">
						        Exceeded
						        <div class="fn-size14 fn-red"><i class="fa fa-inr fn-red" aria-hidden="true"></i><%- numberWithCommasWithoutZero( (parseInt(data.budget)-parseInt(data.expense)) +"") %></div>
						        </div>
				        	<% }else{ %>
				        		<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right fn-size11 fn-source-l p-r-0">
				        		Available
				        		<div class="fn-size14"><i class="fa fa-inr" aria-hidden="true"></i><%- numberWithCommasWithoutZero( (parseInt(data.budget)-parseInt(data.expense)) +"") %></div>
				        		</div>
				        	<% } %>
				</div>
			    
			    <%}%>
			</div>
		</div>
	<%}%>
	<%}%>
<%});%>

<%} else {%>
<div class="row">

	<div class="col-xs-12">
			</br>
			No budget available
	</div>
<%}%>

<br><br><br><br><br><br>
<input type="hidden" name="cateID" id="cateID" value="N" />
<input type="hidden" name="cateDesc" id="cateDesc" value="N" />

<script>
function gotoMonthReports(p1,p2)
{
	$("#cateID").val(p2);
	$("#cateDesc").val(p1);
	
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
	$('.tabmenu').scrollLeft($(document).outerWidth());
});
</script>
