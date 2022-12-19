 <%
 
var els = new EncryptedLocalStorage('secret'); 
var contactDetails=els.get("contactDetails");
 %>
 <div class="read-form tspace">
        <div class="row">
                <div class="col-xs-6 bot_space"><label><%-$.i18n.t('app.contactus.general.contactcentreno')%></label></div>
                <div class="col-xs-6 label_size" id="SendMob"><%-contactDetails.contactCentreNumber%></div>
                <div class="col-xs-6 bot_space"><label class="sub tspace"><%-$.i18n.t('app.contactus.general.email')%></label></div>
                <div class="col-xs-6 label_size" id="SendEmail">ABC@GMAIL.COM</div>
                <div class="col-xs-6 bot_space"><label class="sub"><%-$.i18n.t('app.contactus.general.msdcall')%></label></div>
                <div class="col-xs-6 label_size" id="SendMobcall"><%-contactDetails.missedCall%></div>
                <div class="col-xs-6 bot_space"><label class="sub tspace"><%-$.i18n.t('app.contactus.general.chatwith')%></label></div>
                <div class="col-xs-6 label_size"><a href="javascript:void(0)"><%-contactDetails.chatWith%></a></div>
            </div>
         </div>
 <script>
	$(".content").animate({ scrollTop: 0 }, "fast");	
	$('#preloginmobcontent').removeClass("pnkbg");
	$('#preloginmobcontent').removeClass("login-content");
	$('#preloginmobcontent').addClass("content");	
    $("#menuicon").show();
  $("#closeicon").hide();  
    
</script>
<script>	
$(document).ready( function () {
    $('.bodywrapper').addClass("noFooter");
    $("#preloginfooter").hide();
});

</script>
 

<script>
    $(".content").animate({ scrollTop: 0 }, "fast");    
</script>
<script>
    function toggleChevron(e) {
        $(e.target)
            .prev('.panel-heading')
            .find("i.fa")
            .toggleClass('fa-plus fa-minus');
    }
    $('#accordion').on('hidden.bs.collapse', toggleChevron);
    $('#accordion').on('shown.bs.collapse', toggleChevron);
</script>

<script>
				
	$(function () {
      $('#SendEmail').click(function (event) {
		var contactDetails=els.get("contactDetails");
		var email = contactDetails.email;
        /*var email = $(this).find('#SendMob').val();
        var subject = 'Test';
        var emailBody = 'Hi Sample,';
        var attach = 'path';*/
        //document.location = "mailto:"+email+"?subject="+subject+"&body="+emailBody+"?attach="+attach;
		document.location = "mailto:"+email;
      });
	  
	  $('#SendMob').click(function (event) {
		var contactDetails=els.get("contactDetails");
        var mobilenum = contactDetails.contactCentreNumber;
		document.location.href = 'tel:'+mobilenum;
        
      });
	  
	  $('#SendMobcall').click(function (event) {
		var contactDetails=els.get("contactDetails");
        var mobilenumcall = contactDetails.missedCall;
		document.location.href = 'tel:'+mobilenumcall;
        
      });
    });
				
</script>