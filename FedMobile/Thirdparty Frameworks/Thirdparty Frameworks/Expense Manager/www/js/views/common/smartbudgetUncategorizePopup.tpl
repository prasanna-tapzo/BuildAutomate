<%
	var els = new EncryptedLocalStorage('secret'); 
	var accountList = els.get("accountList");
%>

<div class="modal fade sb-popup commonpopupmodal" id="unCategoriseInfoPopupId" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="popup-title">For your Attention</h4>
			</div>
			<div class="modal-body">
				<!-- <h4 class="popup-title">For your Attention</h4> -->
				</br></br>
					You have <%-tottxn%> uncategorized transactions. Would you like to categorize it now?
				</br></br>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" id="ButIdLater">Later</button>
				<button type="button" class="btn btn-default" id="ButIdNow">Categorize Now</button>
			</div>
		</div>
	</div>
</div>
