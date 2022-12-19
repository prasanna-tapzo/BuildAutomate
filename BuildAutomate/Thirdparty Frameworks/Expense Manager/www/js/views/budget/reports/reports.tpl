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
            <a href="#/accounts">ACCOUNTS</a>
            <a href="#/budgets">BUDGETS</a>
            <a href="#/reports" class="padtp active">REPORTS &emsp;</a>
	</div>
<!--/tabmenu-->
<div class="row p-a-10">
<!--Budgets vs Expenses-->
    <div class="panel panel-shadow m-b-5">
	    <div class="panel-body">
	    	<p class="fn-source-l fn-size16 fn-lgrey"><span class="fn-yellow fn-source-sb">Budgets vs Expenses</span>&nbsp;<span id="budexpTitle"></span></p>
			<a href="#/monthly"><div id="BudgetandExpense"></div></a></br>
			<div id="bar_legend" style="color: #666666"></div>
	    </div>
    </div>
<!--/Budgets vs Expenses-->


<!--Your Expenses by Category-->
	<div class="panel panel-shadow m-b-5">
	    <div class="panel-body">
	    	<p class="fn-source-l fn-size16"><span class="fn-yellow fn-source-sb">Expenses by Category</span>&nbsp;</p>
				<div id="categoryheader" class="row" style="position: relative;  z-index: 1;">
			    	<div class="col-xs-6 text-center"><span class="chartCur"><h2 class="text-left"><i class="fa fa-inr" aria-hidden="true"></i><span id="expn_amount"></span></h2></span></div>
			    	<div class="col-xs-6 text-left"><h5>By Category</h5></div>
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
	    </div>
    </div>
<!--/Your Expenses by Category-->


<!--Expenses Day-->
    <div class="panel panel-shadow m-b-0">
	    <div class="panel-body">
	    	<p class="fn-source-l fn-size16"><span class="fn-yellow fn-source-sb">Expenses by Day</span><span id="daywiseid"></span></p>
			<div id="Expensebyday"></div>
	    </div>
    </div>
<!--/Budgets vs Expenses-->

</div>




<script>
$(".content").animate({ scrollTop: 0 }, "fast");
$(document).ready(function(){
	$('.tabmenu').scrollLeft($(document).outerWidth());
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

/*var outerWidth = $(".tabmenu").outerWidth();
console.log("outerWidth====>",outerWidth);*/
//$("#downClick1").css("left",+"px");

//console.log("===============================================>>>>>>>>>>>>>>>>>>>>",$("#tabsss").scrollLeft());


$('.tabmenu').bind('scroll', chk_scroll);



</script>
