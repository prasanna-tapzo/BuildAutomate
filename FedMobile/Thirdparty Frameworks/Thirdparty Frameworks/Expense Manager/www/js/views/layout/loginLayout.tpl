<link rel="stylesheet" href="css/style.css" />
<link rel="stylesheet" type="text/css" href="js/libs/jqplot-master/jquery.jqplot.css" />
<script src="js/libs/common/appcommon.js"></script>

<%
var els = new EncryptedLocalStorage('secret');
var language_id = els.get("language_id");
var devicePlatform = els.get("device.platform");

%>


<!--App Wrapper Starts Here-->
<div class="appwrapper" id="appwrapper">
  <header class="appheaderwrapper" id="appheaderwrapperID">
	    <div class="appheader">
	        <div class="approw" id="approwhead" style="display:none">
		        <div class="app_topbtn" >
			        	<a class="hidden-md hidden-lg shownav" href="javascript:void(0);">
			        		<span class="glyphicon glyphicon-menu-left back_butt" onClick="javascript:hitBackButton();" aria-hidden="true"></span>
			        	</a>
		        </div> 
	            <!--<% if ( devicePlatform == "Android" ) { %>
	
	            <%}else{%> 
	            	<a onclick="iosBackButton(event)"  id="iosBackButton" class="ico_backward"></a>
	             <%}%>-->  
	            <h1><span id="screentitle"></span></h1>
	            <div class="app_topbtn"><a href="javascript:gotoLogout();" class="logout"><i class="fa fa-home" aria-hidden="true"></i></a></div>
	        </div>
	    </div>
  </header>
  
    <!-- <header class="appheaderwrapper">
    <div class="appheader">
        <div class="approw">
            <div class="app_topbtn"><a class="hidden-md hidden-lg shownav" ></a></div>
            <h1>PFM - Dashboard</h1>
            <div class="app_topbtn"><a href="#" class="logout"><i class="fa fa-home" aria-hidden="true"></i></a></div>
        </div>
    </div>
  </header> -->
  
  
  
  <!-- Left side main navigation area starts-->
  <aside class="subnav" style="display:none">
        <nav>
            <ul>
            <!--<li class="active"><a href="#/wealth" class="acc"><%-$.i18n.t('app.login.layout.myacct')%></a></li>-->
            <!--<li class="active"><a href="#/smartBudget" class="bud_ico"><%-$.i18n.t('app.login.layout.sbudget')%></a></li>-->
            <!--<li><a href="#/depositoffers" class="dep"><%-$.i18n.t('app.login.layout.opendep')%></a></li>
            <li><a href="#/transfer" class="tran"><%-$.i18n.t('app.login.layout.fundtransfer')%></a></li>
            <li><a href="#/billpay" class="bill"><%-$.i18n.t('app.login.layout.billpay')%></a></li>
            <li><a href="#/services" class="ser"><%-$.i18n.t('app.login.layout.services')%></a></li>
            <li><a href="#/mail" class="inbx"><%-$.i18n.t('app.messagecenter.general.title')%></a></li>
            <li><a href="#/rewards" class="rew"><%-$.i18n.t('app.login.layout.rewards')%></a></li>
            <li><a href="#/faq" class="faq"><%-$.i18n.t('app.login.layout.faq')%></a></li>
            <li><a href="#/contactus" class="cont"><%-$.i18n.t('app.login.general.contactus')%></a></li>
            <li><a href="#/settings" class="set"><%-$.i18n.t('app.login.layout.settings')%></a></li>
            <li><a href="#/tandc" class="help"><%-$.i18n.t('app.login.layout.t&c')%></a></li>
            <li><a href="#/aboutus" class="abt"><%-$.i18n.t('app.login.layout.about')%></a></li>-->
            
            </ul>
        </nav>  
  </aside>
<!--
<div class="sb-chart-exp" id="genchartdiv" style="display:none;overflow-x: auto;">
		<div class="row" style="position: relative; top: 50px; z-index: 1;">
			<div class="col-xs-12 text-center amt"><span class="contenthead"><h2><sup><i class="fa fa-inr" aria-hidden="true"></i></sup><span id="Genexpn_amount"></span></h2></span></div>
		</div>
		<div style="width: 30em; overflow-x: auto; white-space: nowrap;">
		<table width="120%" cellpadding="0" cellspacing="0" border="0">
	    	<tr>
					<td width="40%" valign="top"><div id="GenExpnsChart"> </div><td>
					<td width="75%" valign="middle" id="Genexpn_legd"> </td>
	    	</tr>
		</table>
		</div>
</div>
  -->
  <!-- Left side main navigation area ends-->
  	<!--Body Wrapper Starts Here-->
		<div id="bdywrap" class="bodywrapper">
		    <!-- Actual content wraping area -->
		    <div class="contentwrap"> 
		      	<section class="content" id="mobcontent">
				</section>
			</div>
		</div>
 		<!--Body Wrapper Ends Here-->

		<!--footwrap starts Here-->
		<footer class="footerwrap" id="loginfooter">
		</footer>
</div>
<!--App Wrapper Ends Here-->

<script>

function hitBackButton()
{
	var elsb = new EncryptedLocalStorage('secret');
	var gobackscreen = elsb.get("gobackscreen");
	switch(gobackscreen) {
		  case "SB":
		  	Backbone.history.navigate("#/smartBudget");
		    break;
		  case "AC":
			Backbone.history.navigate("#/accounts");
		    break;
		  case "AB":
			Backbone.history.navigate("#/budgets");
		    break;
		  case "RS":
			Backbone.history.navigate("#/reports");
		    break;
		  case "BW":
			Backbone.history.navigate("#/budgetcategorywise");
		    break;
		  case "CW":
			Backbone.history.navigate("#/cashwidhdral");
		    break;
		  default:
			Backbone.history.navigate("#/smartBudget");
	}
}
</script>

<script>
/*************************** LogOut ***********************************/
function gotoLogout(){

    
	Backbone.history.navigate("#/logout");
	/* 
		try{
			navigator.app.exitApp();
		} catch(ee){ }
	*/
 	/*var mobileapp=/iPad|iPhone|iPod|Android/.test( navigator.userAgent );
	if(mobileapp){
         	navigator.notification.confirm(
            			$.i18n.t("app.login.layout.logoutconfirm"),
            	        onConfirmlogout,
            	        '',
            	       
            	       [$.i18n.t("app.login.layout.cancel"),$.i18n.t("app.login.layout.confirm")]
            	    );
					
					function onConfirmlogout(button){
            	    if(button == 2){
            	    	var dte=getToday();
						var dt = getMonthNameShrt(dte,"S");
						
						var yr = parseInt(dte.substring(0,4));
						var mn = getTxnMonthName(dte,"S");
						var dt = parseInt(dte.substring(6,8));
						
						dte = dt + " " + mn + " " + yr + " 00:00:00 IST";
						els = new EncryptedLocalStorage('secret'); 
						els.set('date',dte);
                		Backbone.history.navigate("#/logout");                		
            	    }else if(button == 1){
            	        
            	    }
            	}
					
					
  	}else{
  		if(confirm($.i18n.t("app.login.layout.logoutconfirm"))){
			var dte=getToday();
			var dt = getMonthNameShrt(dte,"S");
			
			var yr = parseInt(dte.substring(0,4));
			var mn = getTxnMonthName(dte,"S");
			var dt = parseInt(dte.substring(6,8));
			
			dte = dt + " " + mn + " " + yr + " 00:00:00 IST";
			
			console.log("date",dte);
			var els = new EncryptedLocalStorage('secret'); 
			els.set('date',dte);
			Backbone.history.navigate("#/logout");  		
		}else{
		}
	}*/
}

$('li').click(function(e) {
        $('li').removeClass('active');
        $(this).addClass('active');
    });

$('.bud_ico').click(function(e) {

      els.set("smartbudgetUncateInfoShow","SHOWONCE");
        
    });

</script>

