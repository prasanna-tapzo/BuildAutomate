<%
var els = new EncryptedLocalStorage('secret');
var allow =els.get("allowAppAccessFlag");
var allow1 =els.get("allowAppAccessFlag1");  
var notConfirm =els.get("allowOnConfirmAppAccessFlag"); 
var jailBroken = els.get("ifdevicejailBroken");

%>

<div class="read-form tspace">
    <div class="row">
			<div class="col-sm-6">
					
		    		<form method="post" id="serverexception" name="serverexception">
										<div class="alert alert-danger text-center"> 
											<h4><%-$.i18n.t('app.login.general.appserverchck')%></h4>
										</div> 
									
		      		</form>
    		</div>
   </div>
</div>