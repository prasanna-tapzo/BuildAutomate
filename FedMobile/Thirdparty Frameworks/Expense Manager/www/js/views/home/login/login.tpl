<!--<script src="js/libs/security/crypto-js/sha512.js"></script>-->
<script src="js/libs/bootstrap/bootstrap-pincode-input.js"></script>
<%
var els = new EncryptedLocalStorage('secret'); 
var mpin=els.get("newMPIN");
var SuccessMsg=els.get("SuccessMsg");
var devicePlatform = els.get("device.platform");
%>

  <!-- login -->
  

      <div class="app_login">
      <h3 class="fn-white fn-size19 text-center"> Personal Finance Management </h3>
      <div class="spacer25"></div>
          	<form class="form-inline whitebg">
          		
          		
	          	<% if(SuccessMsg=='Y') { %>
	          		<label><%-$.i18n.t('app.login.general.successmsg')%></label>
	            <% }else if(SuccessMsg=='M'){ %>
          			<label><%-$.i18n.t('app.login.general.mpinchangesucc')%></label>
          	 	<% } %>
          			<label><%-$.i18n.t('app.login.general.plsenter')%> <span class="pinkfnt"><%-$.i18n.t('app.login.general.mpin')%></span> <%-$.i18n.t('app.login.general.successmsg1')%></label>
          		
          		<div id="mpinError" style="display:none">
					<p class="help-block error-message"><font color="#A94442"><%-$.i18n.t('validation.mpingeneration.mpin')%></font></p>
				</div>
				
				<div id="mpinWrong" style="display:none">
					<p class="help-block error-message"><font color="#A94442"><%-$.i18n.t('validation.mpingeneration.wrongmpin')%></font></p>
				</div>
				<div class="mpin" style="display:none">
          		<% if ( devicePlatform == "Android" ) { %>
	            		<input type="number" class="foramt "   id="mpin1" onkeyup="mpin_keypress(this,event)"  name="mpin1"/>
	            		<input type="number" class="foramt "   id="mpin2" onkeyup="mpin_keypress(this,event)" name="mpin2"/>
	            		<input type="number" class="foramt "   id="mpin3" onkeyup="mpin_keypress(this,event)" name="mpin3"/>
	            		<input type="number" class="foramt "  id="mpin4" onkeyup="mpin_keypress(this,event)"  name="mpin4"/>
	            <%}else{%>

	            		<input type="password" class="foramt" pattern="[0-9]*" inputmode="numeric" maxlength="1" id="mpin1" name="mpin1"/>
	            		<input type="password" class="foramt" pattern="[0-9]*" inputmode="numeric" maxlength="1" id="mpin2" name="mpin2"/>
	            		<input type="password" class="foramt" pattern="[0-9]*" inputmode="numeric" maxlength="1" id="mpin3" name="mpin3"/>
	            		<input type="password" class="foramt" pattern="[0-9]*" inputmode="numeric" maxlength="1" id="mpin4" name="mpin4"/>
	            <%}%>
        					<button type="button" id="submitMPIN">
            					<i class="fa fa-angle-right" aria-hidden="true"></i>
       					 	</button>
          		</div>
				 <div class="mpinnew">
				 <% if ( devicePlatform == "Android" ) { %>
           		<input type="text" class="lenthcontrolnameval" onkeyup="mpin_keypress(this,event)" id="mpininput" maxlength="4" >
           	  <%}else{%>
           	  <input type="text" class="lenthcontrol"  id="mpininput" maxlength="4" >
           	  <%}%>
             <button type="button" id="submitMPIN">
            					<i class="fa fa-angle-right" aria-hidden="true"></i>
       		</button>
           </div>
          		<!-- <a id="forgotmpin" name="forgotmpin"><%-$.i18n.t('app.login.general.forgotmpin')%></a> -->
		</form>
      </div>

  <!-- login -->
<script>
var els = new EncryptedLocalStorage('secret'); 
var devicePlatform = els.get("device.platform");


$('#mpin1').on('click focusin', function() {
	if(devicePlatform == "Android")
	{
    this.value = '';
    $(this).attr("type","number");
    $('#mpin1').focus();
    console.log("empty done");
    }
});
$('#mpin2').on('click focusin', function() {
	if(devicePlatform == "Android")
	{
    this.value = '';
    $(this).attr("type","number");
    $('#mpin2').focus();
    console.log("empty done");
    }
});$('#mpin3').on('click focusin', function() {
	if(devicePlatform == "Android")
	{
    this.value = '';
    $(this).attr("type","number");
    $('#mpin3').focus();
    console.log("empty done");
    }
});$('#mpin4').on('click focusin', function() {
	if(devicePlatform == "Android")
	{
    this.value = '';
    $(this).attr("type","number");
    $('#mpin4').focus();
    console.log("empty done");
    }
});

/*$('input.foramt').on('click focusin', function() {
    this.value = '';
    $(this).attr("type","number");
    console.log("empty done")
});*/
	
function moveOnMax(obj,evt) {
	
    var kecode = evt.keyCode;

    console.log("Keycode = ",kecode);
    console.log("obj.id = ",obj.id);
    console.log("obj.value = ",obj.value);

		if(kecode == 8 ){
			obj.value="";

			if(obj.id == "mpin4" ){
				//document.getElementById('mpin3').focus();
			}else if(obj.id == "mpin3" ){
				//document.getElementById('mpin2').focus();
			}else if(obj.id == "mpin2" ){
				//document.getElementById('mpin1').focus();
			}
		}else{
		if(obj.value.length == 1){
			if(obj.id=="mpin1") {
				document.getElementById('mpin2').focus();
			}else if(obj.id=="mpin2") {
				document.getElementById('mpin3').focus();
			}else if(obj.id=="mpin3") {
				document.getElementById('mpin4').focus();
			}
		}
		}
    
}
</script>

<script>
$(document).ready( function () {
	 $('#mpininput').pincodeInput({hidedigits:false,complete:function(value, e){
            	//alert(value+" and "+$("#mpininput").val())
            	
            }});


	$('.content').addClass("pnkbg");
	$('#preloginmobcontent').addClass("login-content");
	$('#preloginmobcontent').removeClass("content");
	$('#preloginfooter').removeClass("footerwrap");
	$('#preloginfooter').addClass("loginfooter");
	$('#preloginfooter').show();
});
</script>

<script>
$("#menuicon").hide();
$("#closeicon").hide();
$("#termscloseicon").hide();
</script>
<script>
function clicksubmit(){
				var mpinval_1 = $("#mpin1").val();
				var mpinval_2 = $("#mpin2").val();
				var mpinval_3 = $("#mpin3").val();
				var mpinval_4 = $("#mpin4").val();
				var mpinval;
				if(mpinval_1.length>=1 && mpinval_2.length>=1 && mpinval_3.length>=1 && mpinval_4.length>=1 ){
					mpinval = mpinval_1+""+mpinval_2+""+mpinval_3+""+mpinval_4;
					Backbone.history.navigate("#/loginlayout");
    			}else {
    				$("#mpinError").show();
    				$("#mpin1").val("");
    				$("#mpin2").val("");
    				$("#mpin3").val("");
    				$("#mpin4").val("");
    				
    			}		
			
		}
		</script>
<script type="text/javascript">

	function mpin_keypress(obj,evt){

	var kecode = evt.keyCode;

	console.log("Keycode = ",kecode);
    console.log("obj.id = ",obj.id);
    console.log("obj.value = ",obj.value);

		
		if(kecode == 8 || kecode == 229){



					console.log("obj.value.length---------",obj.value.length);

					//obj.value=obj.value.replace(/([^0-9.])/g,"");  		
					var id=obj.id;		
					var mpin=$("input[id='"+id+"']").val();

					
					if((id=="mpin1")&&(mpin.length == 0)) {
						$('#mpin1').focus();
					}else if((id=="mpin2")&&(mpin.length == 0)) {
						$('#mpin1').focus();
					}else if((id=="mpin3")&&(mpin.length == 0)) {
						$('#mpin2').focus();
					}else if((id=="mpin4")&&(mpin.length == 0)) {
						$('#mpin3').focus();
					}	

			/*
			$("#"+obj.id).val("");

			if(obj.id == "mpin4" ){
				$('#mpin3').focus();
			}else if(obj.id == "mpin3" ){
				$('#mpin2').focus();
			}else if(obj.id == "mpin2" ){
				$('#mpin1').focus();
			}*/
		}else{

			console.log("obj.value.length",obj.value.length);

			//obj.value=obj.value.replace(/([^0-9.])/g,"");  		
			var id=obj.id;		
			var mpin=$("input[id='"+id+"']").val();

		
		if(obj.value.length>1 || obj.value.length <1){
		 	$("#"+obj.id).val("");
		 	$("#"+obj.id).attr("type","number");
		 	$("#"+obj.id).focus();
		 	return false;
		 }
			if((id=="mpin1")&&(mpin.length == 1)) {
				
				if($('#mpin2').val().trim()=='')
				{
					$('#mpin2').focus();	
				}else if(($('#mpin3').val().trim()=='')){
					$('#mpin3').focus();	
				}else if(($('#mpin4').val().trim()=='')){
					$('#mpin4').focus();	
				}else{
					$('#submitMPIN').focus();
				}

				



			}else if((id=="mpin2")&&(mpin.length == 1)) {
				
				if(($('#mpin3').val().trim()=='')){
					$('#mpin3').focus();	
				}else if(($('#mpin4').val().trim()=='')){
					$('#mpin4').focus();	
				}else{
					$('#submitMPIN').focus();
				}

			}else if((id=="mpin3")&&(mpin.length == 1)) {
				
				if(($('#mpin4').val().trim()=='')){
					$('#mpin4').focus();	
				}else{
					$('#submitMPIN').focus();
				}


			}else if((id=="mpin4")&&(mpin.length == 1)) {
				$('#submitMPIN').focus();
			}	

			$("#"+obj.id).attr("type","password");
			$("#"+obj.id).val(obj.value.trim());

		}

		
	}

</script>		

<script>  
	
	(function ($){
		$.fn.inputlengthnameval=function(){
			return this.each(function(){
	    		var makelength=$(this).attr("maxlength");
	     		$(this).on('keyup',function(e){
					//$(this).val($(this).val().replace(/([^A-Za-z\s])/g,""));
					var allowedTest ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 "; 
					//var allowedTest =/^[a-zA-Z0-9 ]*$/;
					var notallowed ="!@#$%^&*()_+=-{};:\"?><|\/,'[]. ";
					var notallowednumber ="0123456789";
					var orignalValue=$(this).val();
					/*for (var i=0;i< orignalValue.length;i++){
						var atchar = orignalValue[i];
					 		if(notallowed.indexOf(atchar) != -1){
					 			var changeTest =orignalValue.substr(0,i);
					 			orignalValue=changeTest;
					 		}else{
					 		}
					 }*/
					 /*for (var i=0;i<= 1;i++){
						var atchar = orignalValue[i];
					 		if(notallowednumber.indexOf(atchar) != -1){
					 			var changeTest =orignalValue.substr(0,i);
					 			orignalValue=changeTest;
					 		}else{
					 		}
					 }*/
					 for (var i=0;i< orignalValue.length;i++){
						var atchar = orignalValue[i];
						if(allowedTest.indexOf(atchar) != -1){	
						}else{
						var changeTest =orignalValue.substr(0,i);
							orignalValue=changeTest;
						}
					}
					 $(this).val(orignalValue);
	            	 if($(this).val().length>makelength &&  e.keyCode != '8' && e.keyCode != '46' || e.keyCode == '32'){
	            		var values=$(this).val();
						if(e.keyCode != '32') {
			            	values=values.substring(0, values.length - 1);
				      	}
	           			$(this).val(values).focus();
	              		e.preventDefault();
	            	}
	     		});
	   		});
		};
	}(jQuery));
	$('.lenthcontrolnameval').inputlengthnameval();
	
</script> 