 <%
var els = new EncryptedLocalStorage('secret'); 
var acNumber=els.get("acNumber");
var acCurrencyAmount=els.get("acCurrencyAmount");
%>

				<form class="input-form tspace">
					<div class="form-group">
						<label>Category</label>
							<input class="tdrupee" type="text" readonly="" value=<%-acNumber%>>
							</div>
							<div class="form-group">
						<label>Monthly Budget Amount</label>
						
					<div class="input-tdcel b-b-l">
					<input class="tdrupee" type="text" readonly="" value=<%-acCurrencyAmount%>>
					</div>
					<div id="budgetValidAmount" style="display:none">
						<p class="help-block error-message"><font color="#A94442"><%-$.i18n.t('validation.smartbudget.budgetValidAmount')%></font></p>
					</div>
				</form>
		
