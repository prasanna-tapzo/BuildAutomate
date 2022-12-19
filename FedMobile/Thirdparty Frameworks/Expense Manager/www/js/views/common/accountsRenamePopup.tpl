 <%
var els = new EncryptedLocalStorage('secret'); 
var acNumber=els.get("acNumber");
%>

<!--accouts details popup-->
<div id="accountsedit" style="overflow-y:hidden"  class="modal fade sb-popup commonpopupmodal" aria-labelledby="commonOtpModalLabel" role="dialog" tabindex="-1">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="popup-title">Rename <%-acNumber%></h4>
			</div>
			</br></br>
			<div class="modal-body">
				<!-- <h4 class="popup-title">Rename <%-acNumber%></h4> -->
				<form class="input-form form-inline">
					<label>Enter New Name</label>					
					<input type="text" class="foramt b-b-l lenthcontrol"   maxlength="16" id="accountNewNick" name="accountNewNick" value="<%-nickname%>"/>
					<input type="hidden" id="actIdPop" name="actIdPop" value="<%-acctid%>"/>
				</form>
			</div>
			</br></br>
			<div class="modal-footer">
				<button class="btn btn-default" id="butCancelNick" name="butCancelNick" type="button">Cancel</button>
				<button class="btn btn-primary" id="butSaveNick" name="butEditNick" type="button">Save</button>
			</div>
		</div>
	</div>
</div>
<!-- end-->
<script>  
	(function ($){
		$.fn.inputlengthnameval=function(){
			return this.each(function(){
	    		var makelength=$(this).attr("maxlength");
	     		$(this).on('keyup',function(e){
					var allowedTest ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 "; 
					var orignalValue=$(this).val();
				
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
	
	(function ($){
     $.fn.inputlength=function(){
       // options=$.extend({},$.fn.inputlenght.add,options); // Setting default height for the component
        return this.each(function(){
          var makelength=$(this).attr("maxlength");
          $(this).on('keypress',function(e){
           // alert(makelength);
             if($(this).val().length>=makelength &&  e.keyCode != '8' && e.keyCode != '46'){
               //alert("length shoutnot exceed to"+ +makelength );
                e.preventDefault();
               return false;
             }
            // return true;
          });

        });
     };
}(jQuery));
$('.lenthcontrol').inputlength();
</script>