<%
	var els = new EncryptedLocalStorage('secret'); 
	var errorcode=els.get("errorcode");
	var errordesc=els.get("errordesc");
	var errordet=els.get("errordet");
	var stateofcon=els.get("exceptionconnection");
%>
<div class="read-form tspace">
    <div class="row">
			<div class="col-sm-6">
					
		    		<form method="post" id="exceptionform" name="exceptionform">
										<div class="alert alert-danger text-center"> 
											<% if (errordet!== null && errordet!=="" && errordet!== undefined){%>
													<% if(errorcode=="2951"){%>
														<h4><%-$.i18n.t('app.login.general.connectiontimedout')%></h4>
													<% }else if (errordesc!== null){%>
														<h4><%-errordesc%></h4>
													<%}else{%>
														<h4><%-$.i18n.t('app.login.general.failure')%></h4>
													<%}%>
											<% }else if (errordesc!== null){%>
														<h4><%-errordesc%></h4>
											<%}else{%>
												<h4><%-$.i18n.t('app.login.general.failure')%></h4>
											<%}%>
											</div> 
									
		      		</form>
    		</div>
   </div>
</div>
   
<script>
$("#menuicon").hide();
$("#closeicon").hide();
$("#termscloseicon").hide();
</script>
<script>
$(document).ready( function () {
	$('#preloginmobcontent').removeClass("pnkbg");
	$('#preloginmobcontent').removeClass("login-content");
	$('#preloginmobcontent').addClass("content");
	$('#preloginfooter').addClass("footerwrap");
	$('#preloginfooter').removeClass("loginfooter");
	$('#preloginfooter').show();
	
});
</script> 


