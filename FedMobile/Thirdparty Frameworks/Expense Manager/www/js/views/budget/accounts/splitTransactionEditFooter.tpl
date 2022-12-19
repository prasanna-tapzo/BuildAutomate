<input type="button" id="submiteditsplittrans" name="submiteditsplittrans" class="col-xs-12" value="<%-$.i18n.t('app.smartbudget.general.save')%>" />
<div class="modal fade sb-popup" id="splitTransactionEditModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        	<h4 class="popup-title">Success</h4>
      </div>
      <div class="modal-body text-center">
        <img src="images/check.svg" width="100px">
        <h5 class="fn-yellow">Split transaction updated successfully.</h5>
      </div>
      <div class="modal-footer">
        	<button type="button" id="addSplitEditTransactionBtn" class="btn-block btn-primary"><%-$.i18n.t('button.general.ok')%></button>
      </div>
    </div>
  </div>
</div>
