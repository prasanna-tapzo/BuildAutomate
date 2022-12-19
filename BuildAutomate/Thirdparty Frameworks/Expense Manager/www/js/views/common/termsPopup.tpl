<%
console.log("termsPopup 1............");
var els = new EncryptedLocalStorage('secret'); 
var isOtporMPIN=els.get("isOtporMPIN");
var devicePlatform = els.get("device.platform");
console.log("termsPopup 2............");
var tandcContent1=els.get("tandcContentJFS");
console.log("tandcContent ............. "+tandcContent1);
%>

<!-- popup -->
<div class="modal fade commonpopupmodal" id="tncpopmodal" tabindex="-1" role="dialog" aria-labelledby="commonOtpModalLabel">
	<div class="modal-dialog otpbox" role="document">
		<div class="modal-content">
		<div class="modal-header">
		<button aria-label="Close" data-dismiss="modal" class="close" id="closebtn" type="button"><span aria-hidden="true">×</span></button>
		 <h4 id="myModalLabel" class="modal-title"><%-$.i18n.t('app.login.layout.t&c')%></h4>
		</div>
			<div class="modal-body">
				<form class="input-form form-inline">
					  <div class="read-form tspace terms">
     					<% _.each(tandcContent1,function(data){ %>
        					<p><%-data.message%></p><br>
    					 <% }) %>   
    				  </div>
				<div>
				</div>
				</form>
				</br>
			</div>
			</br><div class="row"></div>
			<div class="modal-footer">
			
			</div>
		</div>
	</div>
</div>
<!-- /popup -->
