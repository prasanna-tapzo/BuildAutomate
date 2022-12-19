<% if(fotparam=="N") { %>
	<input class="col-xs-12" type="button" id="newBudgetSaveId" name="newBudgetSaveId" value="<%-$.i18n.t('app.smartbudget.general.save')%>">
<%} else {%>
	<div class="row">
		<div class="col-xs-6 col-sm-6 col-md-6">
			<input type="button" class="btn-block footer-default" id="deleteBudget" value="<%-$.i18n.t('app.smartbudget.general.delete')%>" />
		</div>
		<div class="col-xs-6 col-sm-6 col-md-6">
			<input type="button" class="btn-block" id="editBudget" value="<%-$.i18n.t('app.smartbudget.general.save')%>"/>
		</div> 
	</div> 
<%}%>

<div class="modal fade sb-popup" id="addBudgetModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        	<h4 class="popup-title">Success</h4>
      </div>
      <div class="modal-body text-center">
        <img src="images/check.svg" width="100px">
        <h5 class="fn-yellow">Budget added successfully.</h5>
      </div>
      <div class="modal-footer">
        	<button type="button" id="addBtn" class="btn-block btn-primary"><%-$.i18n.t('button.general.ok')%></button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade sb-popup" id="editBudgetModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        	<h4 class="popup-title">Success</h4>
      </div>
      <div class="modal-body text-center">
        <img src="images/check.svg" width="100px">
        <h5 class="fn-yellow">Budget updated successfully.</h5>
      </div>
      <div class="modal-footer">
        	<button type="button" id="updateBtn" class="btn-block btn-primary"><%-$.i18n.t('button.general.ok')%></button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade sb-popup" id="deleteBudgetModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        	<h4 class="popup-title">Confirmation</h4>
      </div>
      <div class="modal-body text-center">
        <h5 class="fn-yellow">Are you sure want to delete this budget?</h5>
      </div>
      <div class="modal-footer">
    	<button type="button" id="deleteCancelBtn" class="btn btn-default"><%-$.i18n.t('button.general.cancel')%></button>
      	<button type="button" id="deleteConfirmBtn" class="btn  btn-primary"><%-$.i18n.t('button.general.confirm')%></button>
      </div>
    </div>
  </div>
</div>