<!-- ==============================Common OTP Template================== -->
<!--             The template will open as a popup window           	-->
<!-- ==============================Common OTP Template================== -->
<%
var els = new EncryptedLocalStorage('secret'); 

var coolingPeriod=els.get("coolingPeriod");

console.log("coolingPeriod ............. "+coolingPeriod);
%>

	<!-- popup -->
<div class="modal fade commonpopupmodal" id="coolingModal" tabindex="-1" role="dialog" aria-labelledby="commonOtpModalLabel">
	<div class="modal-dialog otpbox" role="document">
		<div class="modal-content">
			<div class="modal-header">
				
				 <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> 
				
				<h4 class="modal-title" >Disclaimer</h4>
				
			</div>
			<div class="modal-body">
				
				<form class="input-form form-inline">
					<label><%-$.i18n.t('app.transfer.general.coolingMessage')%> <%-coolingPeriod%>.</label>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" id="coolingOK" class="btn btn-default"><%-$.i18n.t('button.general.ok')%></button>
				
				 	<button type="button" id="coolingCancel"  data-dismiss="modal" class="btn btn-default"><%-$.i18n.t('button.general.cancel')%></button>
				
			</div>
		</div>
	</div>
</div>
<!-- /popup -->
