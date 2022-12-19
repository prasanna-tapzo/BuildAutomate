 <%
var els = new EncryptedLocalStorage('secret'); 
var categoryNames=els.get("categoryNameList");
var devicePlatform = els.get("device.platform");

var groceries="8";
var entertainment="2";
var transport="1";
var foodAndDrinks="6";
var others="28";
console.log("=================>",categoryNames);
%>

<!--accouts details popup-->
<div id="addBudgetModelNewUser"   class="modal fade sb-popup commonpopupmodal" aria-labelledby="addBudgetModelNewUser" role="dialog" tabindex="-1">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
			<h4 class="popup-title">Plan your Budgets</h4>	
			</div>
			
			<div class="modal-body">
				<!-- <h4 class="popup-title">Plan your Budgets</h4> -->
				<form class="input-form tspace">
					<div class="form-group">
				        <div class="row">
				        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 b-r-l">
				                    <div class="input-tdcel">
				                    <div class="table-cel"><span class="sb_ico sb_ico_2x groceries"></span></div>
					                    <label class="dropico">
											<select id="categorynew1" name="categorynew[]">
												<% _.each(categoryNames,function(data){ %>

													<% if(groceries==data.categoryID){ %> 
														<option selected value="<%-data.categoryID%>"><%- data.categoryValue%></option>	
													<% }else{ %> 
														<option value="<%-data.categoryID%>"><%- data.categoryValue%></option>
													<% } %> 
													
												<%});%>					
											</select>
										</label>
				                    </div>
				        </div>
				        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				                    <div class="input-tdcel">
				                    <i class="fa fa-inr table-cel b-b-l" aria-hidden="true">&nbsp;</i>
				                   		<% if ( devicePlatform == "Android" ) { %>
								        	<input type="text"  onfocus="(this.type='number')"  pattern="\d+(\.\d*)?"   value="" placeholder="0.00" class="foramt lenthcontrol" onBlur="amountFormat()"   name="amount[]" style="text-align: right" maxlength="10">
								        <%}else{%>
								        	<input type="text"  onfocus="(this.type='number')"  pattern="[0-9.]*" inputmode="numeric" value="" placeholder="0.00" class="foramt lenthcontrol" onBlur="amountFormat()"   name="amount[]" style="text-align: right" maxlength="10">
								        <%}%> 
				                    </div>
				        </div>
				        </div><!--/row-->
				    </div>
				    <div class="form-group">
				        <div class="row">
				        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 b-r-l">
				                    <div class="input-tdcel">
				                    <div class="table-cel"><span class="sb_ico sb_ico_2x entertainment"></span></div>
					                    <label class="dropico">
											<select id="categorynew2" name="categorynew[]">
												<% _.each(categoryNames,function(data){ %>

													<% if(entertainment==data.categoryID){ %> 
														<option selected value="<%-data.categoryID%>"><%- data.categoryValue%></option>	
													<% }else{ %> 
														<option value="<%-data.categoryID%>"><%- data.categoryValue%></option>
													<% } %> 
													
												<%});%>					
											</select>
										</label>
				                    </div>
				        </div>
				        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				                    <div class="input-tdcel">
				                    <i class="fa fa-inr table-cel b-b-l" aria-hidden="true">&nbsp;</i>
				                   		<% if ( devicePlatform == "Android" ) { %>
								        	<input type="text"  onfocus="(this.type='number')"  pattern="\d+(\.\d*)?"   value="" placeholder="0.00" class="foramt lenthcontrol" onBlur="amountFormat()"   name="amount[]" style="text-align: right" maxlength="10">
								        <%}else{%>
								        	<input type="text"  onfocus="(this.type='number')"  pattern="[0-9.]*" inputmode="numeric" value="" placeholder="0.00" class="foramt lenthcontrol" onBlur="amountFormat()"   name="amount[]" style="text-align: right" maxlength="10">
								        <%}%> 
				                    </div>
				        </div>
				        </div><!--/row-->
				    </div>
				    <div class="form-group">
				        <div class="row">
				        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 b-r-l">
				                    <div class="input-tdcel">
				                    <div class="table-cel"><span class="sb_ico sb_ico_2x travel"></span></div>
					                    <label class="dropico">
											<select id="categorynew3" name="categorynew[]">
												<% _.each(categoryNames,function(data){ %>

													<% if(transport==data.categoryID){ %> 
														<option selected value="<%-data.categoryID%>"><%- data.categoryValue%></option>	
													<% }else{ %> 
														<option value="<%-data.categoryID%>"><%- data.categoryValue%></option>
													<% } %> 
													
												<%});%>					
											</select>
										</label>
				                    </div>
				        </div>
				        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				                    <div class="input-tdcel">
				                    <i class="fa fa-inr table-cel b-b-l" aria-hidden="true">&nbsp;</i>
				                   		<% if ( devicePlatform == "Android" ) { %>
								        	<input type="text"  onfocus="(this.type='number')"  pattern="\d+(\.\d*)?"   value="" placeholder="0.00" class="foramt lenthcontrol" onBlur="amountFormat()"   name="amount[]" style="text-align: right" maxlength="10">
								        <%}else{%>
								        	<input type="text"  onfocus="(this.type='number')"  pattern="[0-9.]*" inputmode="numeric" value="" placeholder="0.00" class="foramt lenthcontrol" onBlur="amountFormat()"   name="amount[]" style="text-align: right" maxlength="10">
								        <%}%> 
				                    </div>
				        </div>
				        </div><!--/row-->
				    </div>
				    <div class="form-group">
				        <div class="row">
				        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 b-r-l">
				                    <div class="input-tdcel">
				                    <div class="table-cel"><span class="sb_ico sb_ico_2x food"></span></div>
					                    <label class="dropico">
											<select id="categorynew4" name="categorynew[]">
												<% _.each(categoryNames,function(data){ %>

													<% if(foodAndDrinks==data.categoryID){ %> 
														<option selected value="<%-data.categoryID%>"><%- data.categoryValue%></option>	
													<% }else{ %> 
														<option value="<%-data.categoryID%>"><%- data.categoryValue%></option>
													<% } %> 
													
												<%});%>					
											</select>
										</label>
				                    </div>
				        </div>
				        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				                    <div class="input-tdcel">
				                    <i class="fa fa-inr table-cel b-b-l" aria-hidden="true">&nbsp;</i>
				                   		<% if ( devicePlatform == "Android" ) { %>
								        	<input type="text"  onfocus="(this.type='number')"  pattern="\d+(\.\d*)?"   value="" placeholder="0.00" class="foramt lenthcontrol" onBlur="amountFormat()"   name="amount[]" style="text-align: right" maxlength="10">
								        <%}else{%>
								        	<input type="text"  onfocus="(this.type='number')"  pattern="[0-9.]*" inputmode="numeric" value="" placeholder="0.00" class="foramt lenthcontrol" onBlur="amountFormat()"   name="amount[]" style="text-align: right" maxlength="10">
								        <%}%> 
				                    </div>
				        </div>
				        </div><!--/row-->
				    </div>
				    <div class="form-group">
				        <div class="row">
				        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 b-r-l">
				                    <div class="input-tdcel">
				                    <div class="table-cel"><span class="sb_ico sb_ico_2x other"></span></div>
					                    <label class="dropico">
											<select id="categorynew5" name="categorynew[]">
												<% _.each(categoryNames,function(data){ %>

													<% if(others==data.categoryID){ %> 
														<option selected value="<%-data.categoryID%>"><%- data.categoryValue%></option>	
													<% }else{ %> 
														<option value="<%-data.categoryID%>"><%- data.categoryValue%></option>
													<% } %> 
													
												<%});%>					
											</select>
										</label>
				                    </div>
				        </div>
				        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				                    <div class="input-tdcel">
				                    <i class="fa fa-inr table-cel b-b-l" aria-hidden="true">&nbsp;</i>
				                   		<% if ( devicePlatform == "Android" ) { %>
								        	<input type="text"  onfocus="(this.type='number')"  pattern="\d+(\.\d*)?"   value="" placeholder="0.00" class="foramt lenthcontrol" onBlur="amountFormat()"   name="amount[]" style="text-align: right" maxlength="10">
								        <%}else{%>
								        	<input type="text"  onfocus="(this.type='number')"  pattern="[0-9.]*" inputmode="numeric" value="" placeholder="0.00" class="foramt lenthcontrol" onBlur="amountFormat()"   name="amount[]" style="text-align: right" maxlength="10">
								        <%}%> 
				                    </div>
				        </div>
				        </div><!--/row-->
				    </div>
					</form>
						
							<div id="atLeastOneBudget" style="display:none">
								<p class="help-block error-message"><font color="#A94442"><!-- <%-$.i18n.t('validation.smartbudget.budgetValidAmount')%>
								-->
								Atleast One budget should be Filled
								</font></p>
							</div>

							<div id="categorySameError" style="display:none">
								<p class="help-block error-message"><font color="#A94442">Category Cannot Be same</font></p>
							</div>

							<div id="failureMessage" style="display:none">
								<p class="help-block error-message"><font color="#A94442"><%-$.i18n.t('validation.smartbudget.failureMessage')%></font></p>
							</div>
							
					</div>
			


			</br></br>
			<div class="modal-footer">
				<button class="btn btn-default" id="butCancelLaterUser" name="butCancelNick" type="button">Later</button>
				<button class="btn btn-default" id="butSaveUserBudget" name="butEditNick" type="button">Save</button>
			</div>
		</div>
	</div>
</div>
<!-- end-->
<script>  
$("select").on("change",function(e){
	var categoryID = e.currentTarget.value;
	var icon;
		
		 if(categoryID=="1"){ icon ="transport" ; }
	else if(categoryID=="2"){ icon ="entertainment" ; }
	else if(categoryID=="3"){ icon ="utility" ; }
	else if(categoryID=="4"){ icon ="invest" ; }
	else if(categoryID=="5"){ icon ="shop" ; }
	else if(categoryID=="6"){ icon ="food" ; }
	else if(categoryID=="7"){ icon ="travel" ; }
	else if(categoryID=="8"){ icon ="groceries" ; }
	else if(categoryID=="9"){ icon ="health" ; }
	else if(categoryID=="14"){ icon ="ccard" ; }
	else if(categoryID=="28"){ icon ="other" ; }
	else{ icon ="" ; }
	var parentDiv = $(e.target).parent().closest('div').find( "span" );
		parentDiv.removeClass();
	var newClass = "sb_ico sb_ico_2x "+icon;
		parentDiv.addClass(newClass);

	console.log(parentDiv);
//$(e.target).parent('div').find( "span" ).addClass("utility");
	

	console.log("value===>>",e.currentTarget.value);
});
function amountFormat(){
	var amtval = $('#amount').val();
	var vall=0;
	if(amtval > vall ){
	$('#amount').val(Number(amtval).toFixed(2));
	}
}
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
</script>