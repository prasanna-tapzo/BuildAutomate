<!-- ==============================Common OTP Template================== -->
<!--             The template will open as a popup window           	-->
<!-- ==============================Common OTP Template================== -->
<%
var els = new EncryptedLocalStorage('secret'); 
var isOtporMPIN=els.get("isOtporMPIN");
var devicePlatform = els.get("device.platform");
%>


<% if(isOtporMPIN=='otp') { %>
	<div id="commonOtpModal" class="modal fade otp-popup" aria-labelledby="commonOtpModalLabel" role="dialog" tabindex="-1">				
<%}else{%>
	<div class="modal fade mpinboxx-popup" id="commonOtpModal" tabindex="-1" role="dialog" aria-labelledby="commonOtpModalLabel">			 	
<% } %>	

	<!-- popup -->
<!-- <div class="modal fade commonpopupmodal otp-popup" id="commonOtpModal" tabindex="-1" role="dialog" aria-labelledby="commonOtpModalLabel"> -->

	<div class="modal-dialog otpbox" role="document">
		<div class="modal-content">
			<div class="modal-header">
				
				 <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>--> 
				<% if(isOtporMPIN=='otp') { %>
				<h4 class="modal-title" id="commonOtpModalLabel"><%-$.i18n.t('app.otp.title1')%></h4>
				 <%}else if(isOtporMPIN=='mpin'){%>
				 <h4 class="modal-title" id="commonOtpModalLabel"><%-$.i18n.t('app.mpin.mpin')%></h4>
				  <% } %>	
			</div>
			<div class="modal-body">
				<form id="otpformvalidate" class="input-form form-inline">
				<div id="mpinWrong" style="display:none">
					<p class="help-block error-message"><font color="#A94442"><%-$.i18n.t('validation.mpingeneration.wrongmpin')%></font></p>
				</div>
				<div id="mpinEmpty" style="display:none">
					<p class="help-block error-message"><font color="#A94442"><%-$.i18n.t('validation.mpingeneration.mpinnotnull')%></font></p>
				</div>

				
				<div id="errDescription" style="display:none">
					<p class="help-block error-message"><font color="#A94442"><span id="error_description_message"></span></font></p>
				</div>
		<!--OTP ERROR MESSAGE SHOWN HERE -->
			<div id="invalidMPINError" style="display:none">
					<p class="help-block error-message"><font color="#A94442"><span id="mPIN_error_description_message"></span></font></p>
				</div>

				<div id="otpWrong" style="display:none">
					<p class="help-block error-message"><font color="#A94442"><%-$.i18n.t('validation.otp.otpnotnull')%></font></p>
				</div>
				<div id="otpEmpty" style="display:none">
					<p class="help-block error-message"><font color="#A94442"><%-$.i18n.t('validation.otp.otpnotnull')%></font></p>
				</div>
				<div id="otpLength" style="display:none">
					<p class="help-block error-message"><font color="#A94442"><%-$.i18n.t('validation.otp.otpLength')%></font></p>
				</div>
				<div id="otpValueCheck" style="display:none">
					<p class="help-block error-message"><font color="#A94442"><%-$.i18n.t('validation.otp.otpValueCheck')%></font></p>
				</div>
				
				
				<% if(isOtporMPIN=='otp') { %>
					<label><%-$.i18n.t('app.otp.enterotp')%> <span class="pinkfnt"> OTP</span></label>
					 <%}else if(isOtporMPIN=='mpin'){%>
					 <label><%-$.i18n.t('app.mpin.entermpin')%></label>
					 <% } %>
					<% if(isOtporMPIN=='otp') { %>
					<div class="otp">
						<% if ( devicePlatform == "Android" ) { %>
							<input type="number" pattern="[0-9]*" class="foramt masknumpwdotp lenthcontrol"  maxlength="4" id="otpValue" name="otpValue" placeholder=""> 
							
					 	<%}else{%>
					 		 <input type="number" pattern="[0-9]*" class="foramt masknumpwdotp lenthcontrolnumval"  maxlength="4" id="otpValue" name="otpValue" placeholder="">
					 		
					 	<%}%>	
					</div>
					<%}else{%>
					<div class="mpinnew">
					<div class="spacer25"></div>
					<input type="text" class="lenthcontrol"  id="otpValue"  >
					<div class="spacer25"></div>
					 <div class="spacer25"></div>
					</div>
					<% } %>
				</form>
				
				<% if(isOtporMPIN=='otp') { %>
					<a class="reotp" id="otpModalResend"><%-$.i18n.t('app.otp.resendOTP')%></a> 	
				<% } %>
			</div>
			<div class="modal-footer">
				<!-- <button type="button" id="otpModalSubmit" class="btn btn-default"><%-$.i18n.t('button.general.submit')%></button> -->
				<button class="btn btn-default" type="button" id="otpModalSubmit"><%-$.i18n.t('button.general.submit')%></button>
				<% if(isOtporMPIN=='otp') { %>
					<!-- <button type="button" id="otpModalResend" class="btn btn-default"><%-$.i18n.t('button.general.resend')%></button> -->
					<button type="button" class="btn btn-default" data-dismiss="modal"><%-$.i18n.t('button.general.cancel')%></button>
				<%}else if(isOtporMPIN=='mpin'){%>
				 	<button type="button" id="otpModalResend" class="btn btn-default" data-dismiss="modal"><%-$.i18n.t('button.general.cancel')%></button>
				<% } %>	
			</div>
		</div>
	</div>
</div>
<!-- /popup -->
<script>
var els = new EncryptedLocalStorage('secret'); 
var isOtporMPIN=els.get("isOtporMPIN");

if(isOtporMPIN=='otp' && otpExpiryPeriod!="" && otpExpiryPeriod!=null){

		var otpExpiryPeriod=els.get("otpExpiryPeriod");	
	
		var otpTimeOut;
		
		clearTimeout(otpTimeOut);	

		 otpTimeOut = setTimeout(function(){
			console.log("Timer Completed");
			$("#otpModalResend").removeAttr("disabled");
		},otpExpiryPeriod*60*1000);



		console.log("Initiated Timer");

	}

$("#otpWrong").hide();
$("#otpEmpty").hide();


(function ($){
     $.fn.inputlength=function(){
       // options=$.extend({},$.fn.inputlenght.add,options); // Setting default height for the component
        return this.each(function(){
          var makelength=$(this).attr("maxlength");
          $(this).on('keypress',function(e){
           // alert(makelength);
             if($(this).val().length>=makelength &&  e.keyCode != '8' && e.keyCode != '46'){
               //alert("length shoutnot exceed to"+ +makelength );
                e.preventDefault();
               return false;
             }
            // return true;
          });

        });
     };
}(jQuery));
 $('.lenthcontrol').inputlength();
$(".masknumpwdotp").masknumpwdotp();

</script>
<script>
(function ($){
    $.fn.inputlength=function(){
      // options=$.extend({},$.fn.inputlenght.add,options); // Setting default height for the component
       return this.each(function(){
         var makelength=$(this).attr("maxlength");
         $(this).on('keyup',function(e){
            if($(this).val().length>makelength &&  e.keyCode != '8' && e.keyCode != '46' || e.keyCode == '32'){
              var values=$(this).val();
              values=values.substring(0, values.length - 1);
               $(this).val(values).focus();
              e.preventDefault();
            }
         })

       });
    };
}(jQuery));
$('.lenthcontrol').inputlength();
var els = new EncryptedLocalStorage('secret'); 
var isOtporMPIN=els.get("isOtporMPIN");
$(document).ready( function () {
if(isOtporMPIN=='otp') {
}else{
	 $('#otpValue').pincodeInput({hidedigits:false,complete:function(value, e){
            	//alert(value+" and "+$("#otpValue").val())
            	
            }});
	}
			});
</script>
<script>  
	(function ($){
		$.fn.inputlengthnumval=function(){
			return this.each(function(){
	    		var makelength=$(this).attr("maxlength");
	     		$(this).on('keyup',function(e){
					//$(this).val($(this).val().replace(/([^A-Za-z\s])/g,""));
					var allowedTest ="1234567890"; 
					//var allowedTest =/^[a-zA-Z0-9 ]*$/;
					var notallowed ="!@#$%^&*()_+=-{};:\"?><|\/,'[].";
					var notallowednumber ="0123456789";
					var orignalValue=$(this).val();
					/*for (var i=0;i< orignalValue.length;i++){
						var atchar = orignalValue[i];
					 		if(notallowed.indexOf(atchar) != -1){
					 			var changeTest =orignalValue.substr(0,i);
					 			orignalValue=changeTest;
					 		}else{
					 		}
					 }*/
					 /*for (var i=0;i<= 1;i++){
						var atchar = orignalValue[i];
					 		if(notallowednumber.indexOf(atchar) != -1){
					 			var changeTest =orignalValue.substr(0,i);
					 			orignalValue=changeTest;
					 		}else{
					 		}
					 }*/
					 for (var i=0;i< orignalValue.length;i++){
						var atchar = orignalValue[i];
						if(allowedTest.indexOf(atchar) != -1){	
						}else{
						var changeTest =orignalValue.substr(0,i);
							orignalValue=changeTest;
						}
					}
					 $(this).val(orignalValue);
	            	 if($(this).val().length>makelength &&  e.keyCode != '8' && e.keyCode != '46' || e.keyCode == '32'){
	            		var values=$(this).val();
						if(e.keyCode != '32') {
			            	values=values.substring(0, values.length - 1);
				      	}
	           			$(this).val(values).focus();
	              		e.preventDefault();
	            	}
	     		});
	   		});
		};
	}(jQuery));
	$('.lenthcontrolnumval').inputlengthnumval();
	
</script> 