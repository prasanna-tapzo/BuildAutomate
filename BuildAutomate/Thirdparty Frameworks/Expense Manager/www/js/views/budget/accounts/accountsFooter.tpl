<%
var els = new EncryptedLocalStorage('secret'); 
var accountList = els.get("accountList");
%>
<!-- 
<% if(accountList.length>0){ %>
<input type="button" id="accountsid" name="accountsid " class="col-xs-12" value="<%-$.i18n.t('app.smartbudget.general.submit')%>" />
<div id="otpModalinFooter" name="otpModalinFooter"></div>
<% } %>
-->
<div id="otpModalinFooter" name="otpModalinFooter"></div>
