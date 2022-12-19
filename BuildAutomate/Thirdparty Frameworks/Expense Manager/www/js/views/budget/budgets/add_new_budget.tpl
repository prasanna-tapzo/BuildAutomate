<%
var els = new EncryptedLocalStorage('secret'); 
var categoryNames = els.get("categoryNameList");
var devicePlatform = els.get("device.platform");
var cateIDList = els.get("cateIDList");

if(cateIDList==null || cateIDList.trim()=="" || cateIDList=="undefined"){
	cateIDList=[];
}else{
	cateIDList=cateIDList.split(",");
}
$("#screentitle").text("");
%>
<h1 class="inner_title" style="margin:10px 0 10px 0">
	<% if(hparam=="N") { %>	
		<span><%-$.i18n.t('app.smartbudget.general.AddNewBudget')%></span>
	<%}else{%>
		<span><%-$.i18n.t('app.smartbudget.general.EditBudget')%></span>
	<%}%>
</h1>

		<form class="input-form tspace">
			<% if(hparam=="N") { %>
					<div class="form-group p-t-10">
						<label>Category</label>
						<div class="input-tdcel">
							<% 
							var set=0;
							 _.each(categoryNames,function(data){ %>
							<%
							var cat_id=data.categoryID;
							if(cateIDList.indexOf(cat_id.toString()) !=-1){ }else{%>

								<%	
									var icon;
										
										 if(cat_id.toString()=="1"){ icon ="transport" ; }
									else if(cat_id.toString()=="2"){ icon ="entertainment" ; }
									else if(cat_id.toString()=="3"){ icon ="utility" ; }
									else if(cat_id.toString()=="4"){ icon ="invest" ; }
									else if(cat_id.toString()=="5"){ icon ="shop" ; }
									else if(cat_id.toString()=="6"){ icon ="food" ; }
									else if(cat_id.toString()=="7"){ icon ="travel" ; }
									else if(cat_id.toString()=="8"){ icon ="groceries" ; }
									else if(cat_id.toString()=="9"){ icon ="health" ; }
									else if(cat_id.toString()=="10"){ icon ="emi" ; }
									else if(cat_id.toString()=="11"){ icon ="education" ; }
									else if(cat_id.toString()=="12"){ icon ="beauty" ; }
									else if(cat_id.toString()=="13"){ icon ="rent" ; }
									else if(cat_id.toString()=="14"){ icon ="ccard" ; }
									else if(cat_id.toString()=="28"){ icon ="other" ; }
									else{ icon ="quest" ; }
								%>	

								<% if(set==0){ %>
									<div class="table-cel"><span class="sb_ico sb_ico_2x <%-icon%>"></span></div>
								<% set=1; } %>
								

							<%}%>
							<%});%>
						
						<label class="dropico">
							<select id="newcatlist" name="newcatlist">
								<% _.each(categoryNames,function(data){ %>
								<%
								var cat_id=data.categoryID;
								if(cateIDList.indexOf(cat_id.toString()) !=-1){ }else{%>
									<% if(data.categoryID !="27"){ %>
									<option value="<%-data.categoryID%>"><%- data.categoryValue%></option>
									<% } %>
								<%}%>
								<%});%>					
							</select>
						</label>
					</div>	
					</div>
					<label><span>*</span>Monthly Budget Amount</label>
					<div class="input-tdcel b-b-l">
						<span class="input-rupee nobrder">
							<i class="fa fa-inr" aria-hidden="true"></i>
						</span>
						
						<% if ( devicePlatform == "Android" ) { %>
												<input type="text"  onfocus="(this.type='number')"  pattern="\d+(\d*)?"   value="" class="tdrupee nobrder lenthcontrol" onBlur="amountFormat(this)"  value="" id="budgetamount" name="budgetamount" maxlength="10">
											<%}else{%>
												<input type="text"  onfocus="(this.type='number')"  pattern="[0-9]*" inputmode="numeric" onkeyup="f(this)"  value="" class="tdrupee nobrder lenthcontrol" onBlur="amountFormat(this)"  value="" id="budgetamount" name="budgetamount" maxlength="10">
											<%}%>
					</div>

					<div id="budgetValidAmount" style="display:none">
						<p class="help-block error-message"><font color="#A94442"><%-$.i18n.t('validation.smartbudget.budgetValidAmount')%></font></p>
					</div>
					

					<input type="hidden" name="monthandyear" id="monthandyear" value="<%- els.get("budget_Month_Year") %>" />
			<% } else { %>
		            <div class="form-group p-t-10">
			             <label>Category</label>
			             <br>
			             <div class="row">
				         <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 b-r-l">
			             	<%	
									var icon;
										
										 if(catid.toString()=="1"){ icon ="transport" ; }
									else if(catid.toString()=="2"){ icon ="entertainment" ; }
									else if(catid.toString()=="3"){ icon ="utility" ; }
									else if(catid.toString()=="4"){ icon ="invest" ; }
									else if(catid.toString()=="5"){ icon ="shop" ; }
									else if(catid.toString()=="6"){ icon ="food" ; }
									else if(catid.toString()=="7"){ icon ="travel" ; }
									else if(catid.toString()=="8"){ icon ="groceries" ; }
									else if(catid.toString()=="9"){ icon ="health" ; }
									else if(catid.toString()=="10"){ icon ="emi" ; }
									else if(catid.toString()=="11"){ icon ="education" ; }
									else if(catid.toString()=="12"){ icon ="beauty" ; }
									else if(catid.toString()=="13"){ icon ="rent" ; }
									else if(catid.toString()=="14"){ icon ="ccard" ; }
									else if(catid.toString()=="28"){ icon ="other" ; }
									else{ icon ="quest" ; }
								%>	

			             	<div class="input-tdcel">
							<div class="table-cel"><span class="sb_ico sb_ico_2x <%-icon%>"></span></div>	
							<label class="cat_fuel"><input type="text" readonly  value="<%- catdesc%>" /></label>
			             </div>
			             </div>
			              <!-- <input type="text" class="tdrupee" id="desc" name="desc" value="<%-catdesc%>" readonly /> -->
			             <input type="hidden" id="newcatlist" name="newcatlist" value="<%- catid%>" />
		            </div>
		            <div class="form-group p-t-10">
		                <label>Monthly Budget Amount</label>
		                <br>
		                <div class="input-tdcel b-b-l"><span class="input-rupee nobrder"><i class="fa fa-inr" aria-hidden="true"></i></span>
		                
						<% if ( devicePlatform == "Android" ) { %>
												<input type="text"  onfocus="(this.type='number')"  pattern="\d+(\.\d*)?"   class="tdrupee nobrder lenthcontrol" onBlur="amountFormat(this)"  value="<%-amt%>" id="budgetamount" name="budgetamount" maxlength="15">
											<%}else{%>
												<input type="text"  onfocus="(this.type='number')"  pattern="[0-9.]*" inputmode="numeric" onkeyup="f(this)"   class="tdrupee nobrder lenthcontrol" onBlur="amountFormat(this)"  value="<%-amt%>" id="budgetamount" name="budgetamount" maxlength="15">
											<%}%>
		            </div>
		            <input type="hidden" name="monthandyear" id="monthandyear" value="<%- els.get("budget_Month_Year") %>" />

		            <div id="budgetValidAmount" style="display:none">
						<p class="help-block error-message"><font color="#A94442"><%-$.i18n.t('validation.smartbudget.budgetValidAmount')%></font></p>
					</div>
			<% } %>
			
			<div class="form-group">
				<div id="failureMessage" style="display:none">
								<p class="help-block error-message"><font color="#A94442"><%-$.i18n.t('validation.smartbudget.failureMessage')%></font></p>
							</div>
			</div>
</form>



<script type="text/javascript">
function f(o){
  o.value=o.value.replace(/([^0-9.])/g,"");  
}
</script>
<script>
function amountFormat(obj){
	var amtval = obj.value;
	var vall=0;
	if(amtval > vall ){
	obj.value = Number(amtval).toFixed(2);
	}
}
</script>
<script>
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
<script>
$(window).on('popstate', function () {
      $('.commonpopupmodal').modal('hide');  // close the modal window
	  $(".modal-backdrop").remove();//fade-out modal layer
	  $("#loginfooter").addClass("footerwrap");
    });


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
	else if(categoryID=="10"){ icon ="emi" ; }
	else if(categoryID=="11"){ icon ="education" ; }
	else if(categoryID=="12"){ icon ="beauty" ; }
	else if(categoryID=="13"){ icon ="rent" ; }
	else if(categoryID=="14"){ icon ="ccard" ; }
	else if(categoryID=="28"){ icon ="other" ; }
	else{ icon ="quest" ; }
	var parentDiv = $(e.target).parent().closest('div').find( "span" );
		parentDiv.removeClass();
	var newClass = "sb_ico sb_ico_2x "+icon;
		parentDiv.addClass(newClass);

	console.log(parentDiv);
//$(e.target).parent('div').find( "span" ).addClass("utility");
	

	console.log("value===>>",e.currentTarget.value);
});
</script>