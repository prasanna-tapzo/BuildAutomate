
 <%
var els = new EncryptedLocalStorage('secret'); 
var calendarMonthList=els.get("calendarMonthList");
%>
<div class="modal fade sb-popup commonpopupmodal" id="monthPopupId" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" >
		
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		    <div class="modal-header">
		    	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> 
		    	<h4 class="popup-title">Choose Month</h4>
		    </div>
		    
		      <div class="modal-body text-center">
		      <!-- <h4 class="popup-title">Choose Month</h4> -->
 			  <a href="javascript:void(0)" id="upClick" style="padding: 25px 35px 5px 35px;"><i class="fa fa-angle-up fn-vlgrey" aria-hidden="true"></i></a>
			  
			  <ul class="list-unstyled list-month" style="overflow-y: scroll"  id="divToScroll">
			  		<% _.each(calendarMonthList,function(data){ %>
						<li><a class="monthSubmit" href="javascript:void(0)"><%-data.monthDescription%>-<%-data.year_value%></a></li>
					<% }); %>
			  </ul>
			  
		      <a href="javascript:void(0)" id="downClick" style="padding: 5px 35px 25px 35px;"><i class="fa fa-angle-down fn-black" aria-hidden="true"></i></a>


		      </div>
		      <!-- <div class="modal-footer">
				<button class="btn btn-default" id="monthClose" name="monthClose" type="button">Cancel</button>
				<button type="button" id="monthSubmit" name="monthSubmit" class="btn btn-default"><%-$.i18n.t('button.general.submit')%></button>
			</div> -->
		    </div>
		  </div>
</div>

<select id="expnMonthList" name="expnMonthList" style="display: none">
	
</select>

<!--Show Month PopUp details -->

<!-- <div class="modal fade sb-popup commonpopupmodal" id="monthPopupId" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" >
	<div class="modal-dialog otpbox" role="document" >
		<div class="modal-content">
		
			
			<!--<div class="modal-header">
				<h4 class="popup-title" id="commonOtpModalLabel">Select Month</h4>
			</div>
			</br></br> 
			<div class="modal-body">
				<h4 class="popup-title" id="commonOtpModalLabel">Select Month</h4>
				<form id=otpformvalidate" class="input-form form-inline">
					<label class="dropico">
						<select id="expnMonthList" name="expnMonthList">
							<% _.each(calendarMonthList,function(data){ %>
									<option value="<%-data.monthDescription%>,<%-data.year_value%>" > <%-data.monthDescription%>-<%-data.year_value%> </option>
							<% }); %>
						</select>
					</label>
				</form>
			</div>
			
			<div class="modal-footer">
				<button class="btn btn-default" id="monthClose" name="monthClose" type="button">Cancel</button>
				<button type="button" id="monthSubmit" name="monthSubmit" class="btn btn-default"><%-$.i18n.t('button.general.submit')%></button>
			</div>
-->
		</div>
	</div>
</div>
<!-- end-->



<!-- 
<script type="text/javascript">
        $(function () {
        	var instance = mobiscroll.select('#demo', {
			    theme: 'mobiscroll',
			    display: 'bottom',
			    minWidth: 200
			});

            var curr = new Date().getFullYear();
           
            	$('#divToScroll').scroller({
            	  preset: 'date',
            	  dateOrder: 'd Dmmyy',
            	  dateFormat: 'dd/mm/yyyy',
            	  invalid: { dates: [ new Date("02/10/2014"), new Date("03/11/2014"), new Date("07/12/2014"), new Date("08/11/2015") ] }
            	  //invalid: { daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25'] }
            	});
            $('#demo').trigger('change');

            $('#trigger').click(function() {
                $('#toDate').scroller('show');
                return false;
            });

            $('#clear').click(function() {
                 $('#toDate').val('');
                return false;
            });
        });
        
    </script> -->

<script type="text/javascript">
	/*$.fn.attachDragger = function(){
    var attachment = false, lastPosition, position, difference;
    $( $(this).selector ).on("mousedown mouseup mousemove",function(e){
        if( e.type == "mousedown" ) attachment = true, lastPosition = [e.clientX, e.clientY];
        if( e.type == "mouseup" ) attachment = false;
        if( e.type == "mousemove" && attachment == true ){
            position = [e.clientX, e.clientY];
            difference = [ (position[0]-lastPosition[0]), (position[1]-lastPosition[1]) ];
            $(this).scrollLeft( $(this).scrollLeft() - difference[0] );
            $(this).scrollTop( $(this).scrollTop() - difference[1] );
            lastPosition = [e.clientX, e.clientY];
        }
    });
    $(window).on("mouseup", function(){
        attachment = false;
    });
}*/
//$("#divToScroll").attachDragger();



/*var scrolled=0;
$("#downClick").on("click" ,function(){
	console.log("ssss");
    scrolled=scrolled+300;
    $(".cover").animate({
        scrollTop:  scrolled
    });
});

$("#upClick").on("click" ,function(){
	console.log("ssss");
    scrolled=scrolled-300;
    $(".cover").animate({
        scrollBottom:  scrolled
    });
});
$(".clearValue").on("click" ,function(){
    scrolled=0;
});
*/

/************************************* CODE comment START ********************/
var defaultSelectedOption=els.get("cate_chart_month_year");
$('#expnMonthList').find('option').remove().end().append('<option value="'+defaultSelectedOption+'">'+defaultSelectedOption+'</option>').val(defaultSelectedOption);

$('#divToScroll li').click(function(e) {
	console.log(e);
	var value=e.currentTarget.innerText;
	var monthDescription="";
	var year_value=""
		if(value.length>6)
		{
			var splitValue=value.split('-');
			if(splitValue.length>1)
			{
				monthDescription=splitValue[0];
				year_value=splitValue[1];	
			}
			
		};
		
		console.log(e.currentTarget.innerText);
        
        var optionValue=monthDescription+","+year_value;

        $('#expnMonthList').find('option').remove().end().append('<option value="'+optionValue+'">'+optionValue+'</option>').val(optionValue);
    });


 
/*function swipeactiveReadyPop(){
	console.log("Active swipeactiveReadyPop");
	$(".activeswipelablePop").swipe( {
		allowPageScroll: 'auto',
		touchmove:function(event, direction, distance, duration, fingerCount, fingerData){
					console.log("event====================>>>> "+ event);
					console.log("direction====================>>>> "+ direction);
					console.log("distance====================>>>> "+ distance);
					console.log("duration====================>>>> "+ duration);
					console.log("fingerCount====================>>>> "+ fingerCount);
					console.log("fingerData====================>>>> "+ fingerData);
		},
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
					console.log("event::::::::::::::::"+ event);
					console.log("direction::::::::::::::::"+ direction);
					console.log("distance::::::::::::::::"+ distance);
					console.log("duration::::::::::::::::"+ duration);
					console.log("fingerCount::::::::::::::::"+ fingerCount);
					console.log("fingerData::::::::::::::::"+ fingerData);
					
					scrolling=false;
					if(direction==null){
						event.stopPropagation();
					}else if(direction=="up"){
						scrolling=true;
						scrollContent("down");
						console.log("Direction ==> ",direction);
						event.stopPropagation();
					}else if(direction=="down"){
						scrolling=true;
						scrollContent("up");
						console.log("Direction ==> ",direction);
						event.stopPropagation();
					}else{
						event.stopPropagation();
					}	

					//if(duration)

					setTimeout(function(){
						scrolling=false;
					},duration);
		},
		//Default is 75px, set to 0 for demo so any distance triggers swipe
	   threshold:0
	});
}*/
/************************************* CODE comment CLOSE ********************/
/*
var lastY;
var touchStart = function (event) {
        if (event.targetTouches.length > 1) { return; }

        console.log("TouchStart");

    };

    var touchMove = function (event) {


        if (event.targetTouches.length > 1) { return; }
        det = {
            client: { x: event.targetTouches[0].clientX, y: event.targetTouches[0].clientY },
            page: { x: event.targetTouches[0].pageX, y: event.targetTouches[0].pageY },
            screen: { x: event.targetTouches[0].screenX, y: event.targetTouches[0].screenX }
        };

        console.log("TouchMove ( x : " + event.targetTouches[0].pageX + ", y : " + event.targetTouches[0].pageY + ")");
        
        var currentY=event.targetTouches[0].pageY;

         if(currentY > lastY){
	         // moved down
	         
	         if(Math.abs(currentY - lastY) >3)
	         {
	         	console.log("downnnnnn");
	        	scrolling=true;
	        	scrollContent("down");
	         }
	         
	     }else if(currentY < lastY){

	     	if(Math.abs(currentY - lastY) >3)
	         {
	         	console.log("upppppp");
	        	scrolling=true;
	        	scrollContent("up");
	         }
	     	
	         // moved up
	     }
	     lastY = currentY;

              

        event.preventDefault();
    };

    var touchEnd = function (event) { console.log("TouchEnd"); scrolling=false; };
    var touchCancel = function (event) { console.log("TouchCancel"); scrolling=false; };

document.getElementById("divToScroll").addEventListener("touchstart",
        touchStart, false);
    document.getElementById("divToScroll").addEventListener("touchmove",
        touchMove, false);
    document.getElementById("divToScroll").addEventListener("touchend",
        touchEnd, false);
    document.getElementById("divToScroll").addEventListener("touchcancel",
        touchCancel, false);
*/

/************************************* CODE comment START ********************/

var step = 15;
var scrolling = false;

// Wire up events for the 'upClick' link:
$("#upClick").bind("touchstart", function (event) {
	event.preventDefault();
    // Animates the scrollTop property by the specified
    // step.
    $("#divToScroll").animate({
        scrollTop: "-=" + step + "px"
    });
    scrolling = true;
    scrollContent("up");
}).bind("touchend", function (event) {
	console.log("sssssadasd");
    scrolling = false;
});


$("#downClick").bind("touchstart", function (event) {
	event.preventDefault();
    $("#divToScroll").animate({
        scrollTop: "+=" + step + "px"
    });
    scrolling = true;
    scrollContent("down");
}).bind("touchend", function (event) {
	console.log("sssssadasd");
    scrolling = false;
});

function scrollContent(direction) {
	console.log("===========------------direction-----------==========",direction);
    var amount = (direction === "up" ? "-=1px" : "+=1px");
    $("#divToScroll").animate({
        scrollTop: amount,
        behaviour:"smooth"
    }, 1, function () {
        if (scrolling) {
            scrollContent(direction);
        }
    });
}



function chk_scroll(e) {
    var elem = $(e.currentTarget);
    
    console.log("elem[0].scrollHeight",elem[0].scrollHeight);
    console.log("elem.scrollTop",elem.scrollTop());
    console.log("elem.outerHeight",elem.outerHeight());

    if (elem[0].scrollHeight - (elem.scrollTop()+4) < elem.outerHeight()) {
        console.log("bottom");
        $("#downClick i").removeClass("fn-black");
        $("#downClick i").addClass("fn-vlgrey");
    }else{
    	$("#downClick i").removeClass("fn-vlgrey");
        $("#downClick i").addClass("fn-black");
    }

    if(elem.scrollTop()>10)
    {
    	$("#upClick i").removeClass("fn-vlgrey");
        $("#upClick i").addClass("fn-black");	
    }else{
    	$("#upClick i").removeClass("fn-black");
        $("#upClick i").addClass("fn-vlgrey");	
    }
}

$('#divToScroll').bind('scroll', chk_scroll);




//swipeactiveReadyPop();
/************************************* CODE comment CLOSE ********************/
</script>
