 <%
var els = new EncryptedLocalStorage('secret'); 
var acNumber=els.get("acNumber");
%>

<!--accouts details popup-->
<div id="accountsedit" style="overflow-y:hidden"  class="modal fade sb-popup commonpopupmodal" aria-labelledby="commonOtpModalLabel" role="dialog" tabindex="-1">
	<div class="modal-dialog otpbox" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="popup-title">Rename <%-acNumber%></h4>
			</div>
			</br></br>
			<div class="modal-body">
				<!-- <h4 class="popup-title">Rename <%-acNumber%></h4> -->
				<form class="input-form form-inline">
					<label>Enter New Name</label>
					<input class="foramt b-b-l" type="text" id="accountNewNick" name="accountNewNick" value="<%-nickname%>" />
					<input type="hidden" id="actIdPop" name="actIdPop" value="<%-acctid%>"/>
				</form>
			</div>
			</br></br>
			<div class="modal-footer">
				<button class="btn btn-default" id="butCancelNick" name="butCancelNick" type="button">Cancel</button>
				<button class="btn btn-default" id="butSaveNick" name="butEditNick" type="button">Save</button>
			</div>
		</div>
	</div>
</div>
<!-- end-->
