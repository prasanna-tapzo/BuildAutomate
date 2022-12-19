

<div class="modal fade sb-popup commonpopupmodal" id="chartOptionPopupId" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" >
		
		<div class="modal-dialog" role="document">
				<div class="modal-content">
					    <div class="modal-header">
					    	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> 
					    	<h4 class="popup-title">Choose View</h4>
					    </div>
						<div class="modal-body">
						<!-- <h4 class="popup-title">Choose View</h4> -->
							<form id=otpformvalidate" class="input-form form-inline">
						  		<ul class="list-unstyled list-month" style="overflow-y: scroll"  id="divToScroll">
										<li><a class="submitAccounts" href="javascript:void(0)"><%-cateName%> - Across Accounts</a></li>
										<li><a class="submitMonths" href="javascript:void(0)"><%-cateName%> - Across Months</a></li>
						  		</ul>
						  		<input type="hidden" name="pop_categoryID" id="pop_categoryID" value="<%-cateId%>" />
								<input type="hidden" name="pop_categoryName" id="pop_categoryName" value="<%-cateName%>" />
					  		</form>
						</div>
				</div>
		</div>
</div>
