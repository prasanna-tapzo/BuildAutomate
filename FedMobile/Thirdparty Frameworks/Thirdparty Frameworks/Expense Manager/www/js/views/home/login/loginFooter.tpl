
 <!--loginfooter-->
 
  	<footer class="loginfooter" id="footerdiv">
    		<!--<button type="button" onclick="expandico();"><i class="fa fa-angle-up" aria-hidden="true"></i></button>-->
    		<button type="button"><i class="fa fa-angle-up" aria-hidden="true"></i></button>
    		
    		<div class="loginless">
        		<div class="col-xs-12">
          			<!--<div class="col-xs-4"><a href="#/gotobillpay" class="paybills"><%-$.i18n.t('app.login.general.paybills')%></a></div>
          			
          			<div class="col-xs-4"><a href="#/gotolocateus" class="locate"><%-$.i18n.t('app.login.general.locateus')%></a></div>
          			<div class="col-xs-4"><a href="#/gotocontactus" class="contact"><%-$.i18n.t('app.login.general.contactus')%></a></div>-->
          			
          			<div class="col-xs-4"><a href="#/gotolocateus" class="locate"><%-$.i18n.t('app.login.general.locateus')%></a></div>
          			<div class="col-xs-4">&nbsp;</div>
          			<div class="col-xs-4"><a href="#/gotocontactus" class="contact"><%-$.i18n.t('app.login.general.contactus')%></a></div>
          			
        		</div>
    		</div>
  	</footer>
  
  <!--/login.generalfooter--> 
  
<script>
$(document).ready(function(){
	var wheight=$(window).innerHeight();
	
	$(window).on("resize",function(){
		if($(window).innerHeight()==wheight)
		{
			$("#footerdiv").show()
				$(".bodywrapper").removeClass("noFooter");
		}
		else{$("#footerdiv").hide(); $(".bodywrapper").addClass("noFooter");}
	})
	
	
});
function expandico(){
			Backbone.history.navigate("#/expandico");
		}
</script>
