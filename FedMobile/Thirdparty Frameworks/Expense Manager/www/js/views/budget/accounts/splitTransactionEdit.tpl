<%
var els = new EncryptedLocalStorage('secret');
var categorysList = els.get("categorysList");
var ATMTXN = els.get("ATMTXN");
var catIDAcc = ATMTXN.split(",")[0];
var txnIDAcc = ATMTXN.split(",")[1];
var aMTAcc = ATMTXN.split(",")[2];
var catdescAcc = ATMTXN.split(",")[3];
var monthAcc = ATMTXN.split(",")[4];
var cateName = els.get("ATMTXN_CATE_NAME");
var categoryNames = els.get("categoryNameList");
%>


    <div class="row bg-lyellow top-gradiant"><br>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 cat_grp nobrder no-bg p-b-5">
					<span class="fn-yellow fn-source-sb fn-size16" style="margin-left:12px;">Original Transaction</span>
					<% if(catIDAcc=="1"){ %>
						<div class="media-left"><span class="sb_ico transport center-block"></span></div>
					<% } else if(catIDAcc=="2"){ %>
						<div class="media-left"><span class="sb_ico entertainment center-block"></span></div>
					<% } else if(catIDAcc=="3"){ %>
						<div class="media-left"><span class="sb_ico utility center-block"></span></div>
					<% } else if(catIDAcc=="4"){ %>
						<div class="media-left"><span class="sb_ico invest center-block"></span></div>
					<% } else if(catIDAcc=="5"){ %>
						<div class="media-left"><span class="sb_ico shop center-block"></span></div>
					<% } else if(catIDAcc=="6"){ %>
						<div class="media-left"><span class="sb_ico food center-block"></span></div>
					<% } else if(catIDAcc=="7"){ %>
						<div class="media-left"><span class="sb_ico travel center-block"></span></div>
					<% } else if(catIDAcc=="8"){ %>
						<div class="media-left"><span class="sb_ico groceries center-block"></span></div>
					<% } else if(catIDAcc=="9"){ %>
						<div class="media-left"><span class="sb_ico health center-block"></span></div>
					<% } else if(catIDAcc=="10"){ %>
						<div class="media-left"><span class="sb_ico emi center-block"></span></div>
					<% } else if(catIDAcc=="11"){ %>
						<div class="media-left"><span class="sb_ico education center-block"></span></div>
					<% } else if(catIDAcc=="12"){ %>
						<div class="media-left"><span class="sb_ico beauty center-block"></span></div>
					<% } else if(catIDAcc=="13"){ %>
						<div class="media-left"><span class="sb_ico rent center-block"></span></div>
					<% } else if(catIDAcc=="14"){ %>
					    <div class="media-left"><span class="sb_ico ccard center-block"></span></div>
					<% } else if(catIDAcc=="28"){ %>
						<div class="media-left"><span class="sb_ico other center-block"></span></div>
					<% } else { %>
						<div class="media-left"><span class="question_ico center-block">?</span></div>
					<% } %>
					
					<div class="media-body text-left">
							<div class="fn-blue fn-size19" style="word-break: break-all"><%-catdescAcc%></div>
							<span class="amt pull-right"><i class="fa fa-inr" aria-hidden="true"></i><%-numberWithCommasstr(aMTAcc)%></span>
							<div class="text-muted fn-size15"><%-cateName%>&nbsp;|&nbsp;<%-monthAcc%></div>
					</div>  
					<br>
            </div>
    </div> 

	<div class="p-tb-5 pinkfnt fn-source-sb fn-size16">Split into:</div>

<form class="input-form">
<div class="category whitebg">

    <table>
        <tbody>
        </tbody>
    </table>
    <div id="lastRow"></div>
</div>
<input type="hidden" name="hid_totamt" id="hid_totamt" value=""/>
<input type="hidden" name="hid_acttotamt" id="hid_acttotamt" value=""/>
<input type="hidden" name="hid_amt_exists" id="hid_amt_exists" value=""/>
<input type="hidden" name="numofrec" id="numofrec" value=""/>
<p class="help-block error-message"><font color="#A94442"><span id="errorTxt"></span></font></p>
<a id="ADD_CATE" class="btn btn-sm fn-size11 fn-museo-700 bg-yellow fn-white add_category" onclick="addRow()">ADD CATEGORY</a>

<br>
<div id="failureMessage" style="display:none">
								<p class="help-block error-message"><font color="#A94442"><%-$.i18n.t('validation.smartbudget.failureMessage')%></font></p>
							</div>
</form>
</br></br>


<script>
		var categorysList = els.get("categorysList");
		var ATMTXN = els.get("ATMTXN");
		var aMTAcc = ATMTXN.split(",")[2];
		var categoryNames = els.get("categoryNameList");
		var devicePlatform = els.get("device.platform");
		
		var categoryIdArr = els.get("categoryIdArr");
		var txnIdArr = els.get("txnIdArr");
		var txnAmtArr = els.get("txnAmtArr");

		
		var num=0;
		var counter=0;
		
		var currentFieldAmt=0;
		var splitedAmt=0;
		var balancedAmt=0;
		var validAmt=0;
		function prepareSplit(obj)
			{
					var amtval = obj.value;
					if(amtval=="" || amtval==NaN){
						amtval = "0.00";
					}
					validAmt=parseFloat(amtval);
					var splitamt=$("#splitTxnAmtTot").val();
					splamt_t="0";
					console.log("====splitamt==splitamt==>>",splitamt);
					if(splitamt.indexOf(",")!=-1){
						var splarr = splitamt.split(",");
						for(var ii=0;ii<splarr.length;ii++){
							splamt_t += splarr[ii];
						}
						splamt_t = parseFloat(splamt_t).toFixed(2);	
					}else{
						splamt_t = parseFloat(splitamt).toFixed(2);
					}
					console.log("splitamt===2===splitamt",splamt_t);
					balancedAmt = parseFloat(splamt_t).toFixed(2);
					console.log("balancedAmt ---==----> ",balancedAmt);
					currentFieldAmt = parseFloat(amtval).toFixed(2);
					splitedAmt = parseFloat(aMTAcc) - (parseFloat(balancedAmt) + parseFloat(currentFieldAmt));
					//console.log("balancedAmt : "+balancedAmt);
					//console.log("currentFieldAmt : "+currentFieldAmt);
					//console.log("splitedAmt : "+splitedAmt);
					
			}
		
		function settotamt(obj)
			{
					if($("#errorTxt").is(':visible')){
						$("#hid_amt_exists").val("");
						$("#errorTxt").text("");
						$("#errorTxt").hide();
					}
					var amtval = obj.value;

					/*if(amtval.indexOf(".")!=-1){
						var W = amtval.split(".")[0];
						var R = amtval.split(".")[1];
						if(R.length==1){
							obj.value = amtval+"0";
						}
					}else{
						if(obj.value==""){
							obj.value = "0.00";
						}else{
							obj.value = amtval+".00";
						}
					}*/

					obj.value=parseFloat(amtval).toFixed(2);

					var splitTxnAmtTot= $("#splitTxnAmtTot").val();

					if( parseFloat(splitTxnAmtTot)<0){
						console.log("Total amount should not be greater than transaction amount -=-=-=");
						//$("#hid_amt_exists").val("Y");
						//$("#errorTxt").text("Total amount should not be greater than transaction amount.");
			    		//$("#errorTxt").show();
						return false;
					}			

					$("#hid_acttotamt").val($("#hid_totamt").val());
					//console.log("S-hid_totamt : "+ $("#hid_totamt").val());
					//console.log("S-hid_acttotamt : "+ $("#hid_acttotamt").val());
			}
			
		function checkAmountVal(obj)
			{

					
					if($("#errorTxt").is(':visible')){
						$("#hid_amt_exists").val("");
						$("#errorTxt").text("");
						$("#errorTxt").hide();
					}
				
					var amtval = obj.value;
					if(amtval=="" || amtval==NaN){
						amtval = "0.00";
					}
					var EnteredAmt = parseFloat(amtval).toFixed(2);

					if(EnteredAmt < 0 || isNaN(EnteredAmt))
					{
						console.log("EnteredAmt========",EnteredAmt);
						console.log("INVALID AMOUNT");
						obj.value=validAmt;
						return false;
					}
				
					//balancedAmt
					//currentFieldAmt
					//splitedAmt
					console.log("EnteredAmt ---> ",EnteredAmt);

					var balamt = 0;
					console.log("aMTAcc ---> ",parseFloat(aMTAcc).toFixed(2));
					var tottalAmt = parseFloat(parseFloat(aMTAcc).toFixed(2));
					console.log("balancedAmt ---> ",parseFloat(balancedAmt).toFixed(2));
					console.log("tottalAmt ---> ",parseFloat(tottalAmt).toFixed(2));
					console.log("currentFieldAmt ---> ",parseFloat(currentFieldAmt).toFixed(2));

					//if(parseFloat(EnteredAmt)>parseFloat(currentFieldAmt)){
					//	console.log("LARGEER  AMOUNT THAN BBALNCE");
					//	return false;
						/*balamt = tottalAmt - (splitedAmt+EnteredAmt);
						console.log("balamt > " + balamt + " : " + currentFieldAmt + " : "+  balancedAmt + " : "+ EnteredAmt + " : "+ splitedAmt);*/
					if(parseFloat(EnteredAmt)<parseFloat(currentFieldAmt)){
						balamt = (parseFloat(currentFieldAmt)+parseFloat(balancedAmt)) - parseFloat(EnteredAmt) ;
						console.log("balamt < " + balamt.toFixed(2));
					}else{
						balamt = parseFloat(tottalAmt) - (parseFloat(splitedAmt)+parseFloat(EnteredAmt));
						//balamt = parseFloat(balancedAmt);
						console.log("balamt = " + balamt);
					}

					if(parseFloat(balamt)<0){
						obj.value=validAmt;
						//$("#hid_amt_exists").val("Y");
						//$("#errorTxt").text("Total amount should not be greater than or equal to transaction amount.");
			    		//$("#errorTxt").show();	
						return false;
					}else{
						validAmt=parseFloat(amtval);
						//$("#hid_amt_exists").val("");
						//$("#errorTxt").text("");
						//$("#errorTxt").hide();	
						$("#splitTxnAmtTot").val(numberWithCommasstr(balamt));	
					}
					
			}
		
		function deleterow(obj)
			{
					var splitTxnAmtTot= $("#splitTxnAmtTot").val();

					console.log("amtVal ======================>>>>>>",splitTxnAmtTot);

					if(splitTxnAmtTot=="" || splitTxnAmtTot==NaN){
						splitTxnAmtTot = "0.00";
					}

					if(parseFloat(splitTxnAmtTot)<0){

						//$("#hid_amt_exists").val("Y");
						//$("#errorTxt").text("Total amount should not be greater than or equal to transaction amount.");
			    		//$("#errorTxt").show();	
						return false;
					}
					
					var t = obj.id;
					//console.log("CurrentField Id : "+t);
					t = t.split("_")[1];
					//console.log("Spliter : "+t);
					t = $("#splitTxnAmt_"+t).val();
					if(t=="" || t==NaN){
						t = "0.00";
					}
					
					console.log("CurrentField Amt  : "+t);
					
					var uncommatxt="";
					var uncommatxtVal = 0;
					
					if(t.indexOf(",")!=-1){
						var ta_arr = t.split(",");				
						for(var i=0;i<ta_arr.length;i++){
							uncommatxt += ta_arr[i];
						}
						uncommatxtVal = parseFloat(uncommatxt);
					}else{
						uncommatxtVal = parseFloat(t);
					}

					var curr_field_val = uncommatxtVal;
					console.log("-----> curr_field_val : " + curr_field_val);
					
					uncommatxt = "";
					uncommatxtVal = 0;
					t = $("#splitTxnAmtTot").val();

					if(t=="" || t==NaN){
						t = "0.00";
					}
					
					
					if(t.indexOf(",")!=-1){
						var ta_arr = t.split(",");				
						for(var i=0;i<ta_arr.length;i++){
							uncommatxt += ta_arr[i];
						}
						uncommatxtVal = parseFloat(uncommatxt);
					}else{
						uncommatxtVal = parseFloat(t);
					}
					var totalBalAmt = uncommatxtVal;
					
					console.log("-----> totalBalAmt : " + totalBalAmt);
					
					var mergAmt = totalBalAmt + curr_field_val;
					
					console.log("-----> mergAmt : " + mergAmt);
					
					$("#splitTxnAmtTot").val(numberWithCommasstr(mergAmt));
		
					//console.log("-----> splitTxnAmtTot : " + $("#splitTxnAmtTot").val());
					
					$("#ADD_CATE").show();
					//console.log("deleterow inside ........"+t);
				    $("table tbody").find('input[name="splitTxnAmt"]').each(function(){
						$(obj).parents("tr").remove();
				    });
			}
		function addRow()
			{
					var markup = "<tr id='TR_"+num+"'><td>"+add_New_Row()+"</td></tr>";
					$("table tbody").append(markup);
			}
		function add_New_Row()
			{
					var i=num;
					var innerhtmText="";
					innerhtmText +=	"<div class='form-group'>";
					innerhtmText +=		    "<div class='row'>";
					innerhtmText +=					"<div class='col-xs-8 col-sm-8 col-md-8 col-lg-8 b-r-l'>";
					innerhtmText +=							"<div class='input-tdcel'>";
					innerhtmText +=							"<div class='table-cel'><span class='sb_ico sb_ico_2x quest'></span></div>";
					innerhtmText +=								"<label class='dropico'>";
					innerhtmText +=										"<select class='fn-size16' onchange='onChangeIcon(this)' name='splitCombo_"+i+"' id='splitCombo_"+i+"'>";
					innerhtmText +=									  		"<option value=''>Uncategorized</option>";
																			_.each(categoryNames,function(data){
																				if(data.categoryID !="27"){
					innerhtmText +=													"<option value='"+data.categoryID+"'>"+data.categoryValue+"</option>";
																				}
																			});
					innerhtmText +=											"</select>";
					innerhtmText +=								"</label>";
					innerhtmText +=							"</div>";
					innerhtmText +=					"</div>";
					innerhtmText +=					"<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4'>";
					innerhtmText +=							"<div class='input-tdcel'>";
					innerhtmText +=								"<i class='fa fa-inr table-cel b-b-l' aria-hidden='true'>&nbsp;</i>";
					if ( devicePlatform == "Android" ) {
					innerhtmText +=								"<input type='number' onfocus='prepareSplit(this)' pattern='\d+(\.\d*)?' onkeyup='checkAmountVal(this)' onblur='settotamt(this)' class='foramt text-right fn-size16 fn-dgrey p-b-5 lenthcontrol' id='splitTxnAmt_"+i+"' name='splitTxnAmt' value='' placeholder='0.00' maxlength='15' />";
					}else{
					innerhtmText +=								"<input type='number' onfocus='prepareSplit(this)' pattern='[0-9.]*' inputmode='numeric' onkeyup='checkAmountVal(this)' onblur='settotamt(this)' class='foramt text-right fn-size16 fn-dgrey p-b-5 lenthcontrol' id='splitTxnAmt_"+i+"' name='splitTxnAmt' value='' placeholder='0.00' maxlength='15' />";
					}
					innerhtmText +=								"<span class='table-cel sp-trash'><i id='delete_"+i+"' onclick='deleterow(this)' class='fa fa-trash-o fn-size19 fn-yellow table-cel p-l-5' aria-hidden='true'></i></span>";
					innerhtmText +=							"</div>";
					innerhtmText +=					"</div>";
					innerhtmText +=	        "</div>";
					innerhtmText += "</div>";
					$("#numofrec").val(num+"");
					num++;
					return innerhtmText;
			}
		
		function add_Last_Row(splitamt,prevamt,i)
			{
					var i=num;
					var innerhtmText="";
					innerhtmText +=	"<div class='form-group'>";
					innerhtmText +=		    "<div class='row'>";
					innerhtmText +=					"<div class='col-xs-8 col-sm-8 col-md-8 col-lg-8 b-r-l'>";
					innerhtmText +=							"<div class='input-tdcel'>";
					innerhtmText +=							"<div class='table-cel'><span class='sb_ico sb_ico_2x quest'></span></div>";

					innerhtmText +=								"<label class='dropico'>";
					innerhtmText +=										"<select class='fn-size16' onchange='onChangeIcon(this)' name='splitComboTot' id='splitComboTot'>";
					innerhtmText +=									  		"<option value=''>Uncategorized</option>";
																			_.each(categoryNames,function(data){
																				if(data.categoryID !="27"){
					innerhtmText +=													"<option value='"+data.categoryID+"'>"+data.categoryValue+"</option>";
																				}
																			});
					innerhtmText +=											"</select>";
					innerhtmText +=								"</label>";
					innerhtmText +=							"</div>";
					innerhtmText +=					"</div>";
					innerhtmText +=					"<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4'>";
					innerhtmText +=							"<div class='input-tdcel'>";
					innerhtmText +=								"<i class='fa fa-inr table-cel b-b-l' aria-hidden='true'>&nbsp;</i>";
					innerhtmText +=								"<input type='text' class='foramt text-right fn-size16 fn-dgrey p-b-5' id='splitTxnAmtTot' name='splitTxnAmtTot' value='"+splitamt+"' readonly />";
					innerhtmText +=								"<span class='table-cel sp-trash'></span>";
					innerhtmText +=							"</div>";
					innerhtmText +=					"</div>";
					innerhtmText +=	        "</div>";
					innerhtmText += "</div>";
					$("#numofrec").val(num+"");
					num++;
					
					var splamt="";
					if(splitamt.indexOf(",")!=-1){
						var splarr = splitamt.split(",");
						for(var ii=0;ii<splarr.length;ii++){
							splamt += splarr[ii];
						}
					}else{
						splamt = splitamt;
					}
					var balamt = parseFloat(aMTAcc) - parseFloat(splamt);
					
					var totalamt = parseFloat(splamt) + parseFloat(prevamt); 
					
					$("#hid_totamt").val(splamt);
					$("#hid_acttotamt").val(totalamt);

					return innerhtmText;
			}
		function add_Edited_Row(splitamt,i)
			{
					var innerhtmText="";
					innerhtmText +=	"<div class='form-group'>";
					innerhtmText +=		    "<div class='row'>";
					innerhtmText +=					"<div class='col-xs-8 col-sm-8 col-md-8 col-lg-8 b-r-l'>";
					innerhtmText +=							"<div class='input-tdcel'>";
					innerhtmText +=							"<div class='table-cel'><span class='sb_ico sb_ico_2x quest'></span></div>";
					innerhtmText +=								"<label class='dropico'>";
					innerhtmText +=										"<select class='fn-size16' onchange='onChangeIcon(this)' name='splitCombo_"+i+"' id='splitCombo_"+i+"'>";
					innerhtmText +=									  		"<option value=''>Uncategorized</option>";
																			_.each(categoryNames,function(data){
																				if(data.categoryID !="27"){
					innerhtmText +=													"<option value='"+data.categoryID+"'>"+data.categoryValue+"</option>";
																				}
																			});
					innerhtmText +=											"</select>";
					innerhtmText +=								"</label>";
					innerhtmText +=							"</div>";
					innerhtmText +=					"</div>";
					innerhtmText +=					"<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4'>";
					innerhtmText +=							"<div class='input-tdcel'>";
					innerhtmText +=								"<i class='fa fa-inr table-cel b-b-l' aria-hidden='true'>&nbsp;</i>";
					if ( devicePlatform == "Android" ) {
					innerhtmText +=								"<input type='number' onfocus='prepareSplit(this)' pattern='\d+(\.\d*)?' onkeyup='checkAmountVal(this)' onblur='settotamt(this)' class='foramt text-right fn-size16 fn-dgrey p-b-5 lenthcontrol' id='splitTxnAmt_"+i+"' name='splitTxnAmt'  value='"+splitamt+"' maxlength='15' />";
					}else{
					innerhtmText +=								"<input type='number' onfocus='prepareSplit(this)' pattern='[0-9.]*' inputmode='numeric' onkeyup='checkAmountVal(this)' onblur='settotamt(this)' class='foramt text-right fn-size16 fn-dgrey p-b-5 lenthcontrol' id='splitTxnAmt_"+i+"' name='splitTxnAmt' value='"+splitamt+"' maxlength='15' />";
					}
					innerhtmText +=								"<span class='table-cel sp-trash'><i id='delete_"+i+"' onclick='deleterow(this)' class='fa fa-trash-o fn-size19 fn-yellow table-cel p-l-5' aria-hidden='true'></i></span>";
					innerhtmText +=							"</div>";
					innerhtmText +=					"</div>";
					innerhtmText +=	        "</div>";
					innerhtmText += "</div>";
					$("#numofrec").val(i+"");
					return innerhtmText;
			}
		
		function addEditedRows()
			{
					console.log("addEditedRows..........");
					console.log(txnAmtArr);
					console.log(categoryIdArr);
			// Add already edited Rows (Except last row)
					var prevamt = 0;
					if(categoryIdArr.length > 1) {
						for(var IM=categoryIdArr.length-1;IM>0;IM--){
							var splitamt = txnAmtArr[IM];
							if(splitamt.indexOf(".")!=-1){
								var tt = splitamt.split(".")[1];
								if(tt.length==1){
									splitamt += "0"; 
								}
							}else{
								splitamt += ".00"
							}
							prevamt = splitamt;
							var markup = "<tr id='TR_"+num+"'><td>"+add_Edited_Row(splitamt,num )+"</td></tr>";
							$("table tbody").append(markup);
							
							$("#splitCombo_"+num+" option").each(function () {
							    if ($(this).val() == categoryIdArr[IM]){
							        $(this).attr('selected', 'selected');

								        var icon;
											
											 if($(this).val()=="1"){ icon ="transport" ; }
										else if($(this).val()=="2"){ icon ="entertainment" ; }
										else if($(this).val()=="3"){ icon ="utility" ; }
										else if($(this).val()=="4"){ icon ="invest" ; }
										else if($(this).val()=="5"){ icon ="shop" ; }
										else if($(this).val()=="6"){ icon ="food" ; }
										else if($(this).val()=="7"){ icon ="travel" ; }
										else if($(this).val()=="8"){ icon ="groceries" ; }
										else if($(this).val()=="9"){ icon ="health" ; }
										else if($(this).val()=="10"){ icon ="emi" ; }
										else if($(this).val()=="11"){ icon ="education" ; }
										else if($(this).val()=="12"){ icon ="beauty" ; }
										else if($(this).val()=="13"){ icon ="rent" ; }
										else if($(this).val()=="14"){ icon ="ccard" ; }
										else if($(this).val()=="28"){ icon ="other" ; }
										else{ icon ="quest" ; }
										var parentDiv = $(this).parent().closest('div').find( "span" );
											parentDiv.removeClass();
										var newClass = "sb_ico sb_ico_2x "+icon;
											parentDiv.addClass(newClass);
							    }
							});
							num++;
						}
					}
					
			// Add Last row
					var IK=0;
					var markup = "<tr id='TR_"+num+"'><td>"+add_Last_Row(numberWithCommasstr(txnAmtArr[IK]),prevamt,num )+"</td></tr>";
					$("#lastRow").append(markup);
					$("#splitComboTot option").each(function () {
					    if ($(this).val() == categoryIdArr[IK]){
					        $(this).attr('selected', 'selected');
					        var icon;
											
											 if($(this).val()=="1"){ icon ="transport" ; }
										else if($(this).val()=="2"){ icon ="entertainment" ; }
										else if($(this).val()=="3"){ icon ="utility" ; }
										else if($(this).val()=="4"){ icon ="invest" ; }
										else if($(this).val()=="5"){ icon ="shop" ; }
										else if($(this).val()=="6"){ icon ="food" ; }
										else if($(this).val()=="7"){ icon ="travel" ; }
										else if($(this).val()=="8"){ icon ="groceries" ; }
										else if($(this).val()=="9"){ icon ="health" ; }
										else if($(this).val()=="10"){ icon ="emi" ; }
										else if($(this).val()=="11"){ icon ="education" ; }
										else if($(this).val()=="12"){ icon ="beauty" ; }
										else if($(this).val()=="13"){ icon ="rent" ; }
										else if($(this).val()=="14"){ icon ="ccard" ; }
										else if($(this).val()=="28"){ icon ="other" ; }
										else{ icon ="quest" ; }
										var parentDiv = $(this).parent().closest('div').find( "span" );
											parentDiv.removeClass();
										var newClass = "sb_ico sb_ico_2x "+icon;
											parentDiv.addClass(newClass);
					    }
					});		
					num++;
			}
		
		addEditedRows();
		
//-----------------------------------------------------------------------------------------------------

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
/*
function OnChangeIcon(e){
	var categoryID = e.currentTarget.value;
	console.log("eeeeeee",categoryID);
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
	else{ icon ="" ; }
	var parentDiv = $(e.target).parent().closest('div').find( "span" );
		parentDiv.removeClass();
	var newClass = "sb_ico sb_ico_2x "+icon;
		parentDiv.addClass(newClass);

	console.log(parentDiv);
//$(e.target).parent('div').find( "span" ).addClass("utility");
	

	console.log("value===>>",e.currentTarget.value);
};
*/

//$("select").on("change",function(e){
function onChangeIcon(e){
	var categoryID = e.value;
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
	var parentDiv = $(e).parent().closest('div').find( "span" );
		parentDiv.removeClass();
	var newClass = "sb_ico sb_ico_2x "+icon;
		parentDiv.addClass(newClass);

	console.log(parentDiv);
//$(e.target).parent('div').find( "span" ).addClass("utility");
	

	console.log("value===>>",e.value);
}
//});
</script>
