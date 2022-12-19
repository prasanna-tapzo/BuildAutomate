<%
var els = new EncryptedLocalStorage('secret');
var allow =els.get("allowAppAccessFlag"); 
var notConfirm =els.get("allowOnConfirmAppAccessFlag"); 

%>
<body class="loginbg">
	<div  class="pagewrapper">
		<div class="container">
            <div class="row ">
				<div class="col-sm-6">
					<h1 class="lgn-logo"><span></span></h1>
						
			        			    		<form method="post" id="loginform" name="loginform" action="#">
				                            			<fieldset>
																<div class="alert alert-danger text-center"> 
																	<h4><%-$.i18n.t('app.login.general.nointernet')%></h4>
																</div> 
															
													</fieldset>
			        			      		</form>
		        			   
        			</div>
             	</div><!-- row ends here-->
        	</div>
    	</div>
</body>