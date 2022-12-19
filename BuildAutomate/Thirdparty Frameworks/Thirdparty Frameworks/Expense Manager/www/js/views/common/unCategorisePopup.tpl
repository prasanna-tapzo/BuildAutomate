<%
	var els = new EncryptedLocalStorage('secret');
	var categoryNames = els.get("categoryNames");
%>

<input type="hidden" name="popcatID" id="popcatID" value="<%-categID%>"/ >
<input type="hidden" name="poptxnID" id="poptxnID" value="<%-TxnID%>"/ >
<input type="hidden" name="popaMT" id="popaMT" value="<%-spentAmt%>"/ >
<input type="hidden" name="popassigncatID" id="popassigncatID" value=""/ >

<div class="modal fade sb-popup commonpopupmodal cat-scroll" id="unCategorisePopupId" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
	    <div class="modal-content">
	    <div id="modheader1" class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> 
	   	 	<h4 class="popup-title">Categorize</h4>
	    </div>
			<div class="modal-body cat_item center-block">
				<!-- <h4 class="popup-title">Categorize</h4> -->
					<br>
				
		<!-- Last Else statement question_ico is for incase any new category ID id comes in -->			

					<% _.each(categoryNames,function(data,index){
					console.log("index ==>",index);

					var icon;
						
						 if(data.categoryID=="1"){ icon ="transport" ; }
					else if(data.categoryID=="2"){ icon ="entertainment" ; }
					else if(data.categoryID=="3"){ icon ="utility" ; }
					else if(data.categoryID=="4"){ icon ="invest" ; }
					else if(data.categoryID=="5"){ icon ="shop" ; }
					else if(data.categoryID=="6"){ icon ="food" ; }
					else if(data.categoryID=="7"){ icon ="travel" ; }
					else if(data.categoryID=="8"){ icon ="groceries" ; }
					else if(data.categoryID=="9"){ icon ="health" ; }
					else if(data.categoryID=="10"){ icon ="emi" ; }
					else if(data.categoryID=="11"){ icon ="education" ; }
					else if(data.categoryID=="12"){ icon ="beauty" ; }
					else if(data.categoryID=="13"){ icon ="rent" ; }
					else if(data.categoryID=="14"){ icon ="ccard" ; }
					else if(data.categoryID=="28"){ icon ="other" ; }
					//else{ icon ="question_ico" ; }
					
					 if(index%3==0){ %>  

					 	<p class="text-center"> 
					 <% } %>
						<% if(data.categoryID != "27") { %>
					 		<a onClick="assignValue(<%-data.categoryID%>)" id="assignNewCategory"><span class="sb_ico <%-icon%> center-block"></span><%-data.categoryValue%></a>
						<% } %>
					<% if((index+1)%3==0){ %>  

					 	</p> 

					 <% } %>	


					<% }); %>


					<!-- <p class="text-center"> 						
						<a onClick="assignValue(1)" id="assignNewCategory"><span class="sb_ico transport center-block"></span>Transport</a>
						<a onClick="assignValue(2)" id="assignNewCategory"><span class="sb_ico entertainment center-block"></span>Entertainment</a>
						<a onClick="assignValue(3)" id="assignNewCategory"><span class="sb_ico utility center-block"></span>Utilities and fees</a>
					</p>    
					<p class="text-center"> 
						<a onClick="assignValue(4)" id="assignNewCategory"><span class="sb_ico invest center-block"></span>Investments</a>
						<a onClick="assignValue(5)" id="assignNewCategory"><span class="sb_ico shop center-block"></span>Lifestyle shopping</a>
						<a onClick="assignValue(6)" id="assignNewCategory"><span class="sb_ico food center-block"></span>Food and Drinks/Dineout</a>
					</p>
					<p class="text-center"> 
						<a onClick="assignValue(7)" id="assignNewCategory"><span class="sb_ico travel center-block"></span>Travel & Leisure</a>
						<a onClick="assignValue(8)" id="assignNewCategory"><span class="sb_ico groceries center-block"></span>Groceries</a>
						<a onClick="assignValue(9)" id="assignNewCategory"><span class="sb_ico health center-block"></span>Health & Wellness</a>
					</p>
					
					<p class="text-center"> 
					 	<a onClick="assignValue(28)" id="assignNewCategory"><span class="sb_ico other center-block"></span>Others</a>
					</p> -->
					
			</div>
		</div>
	</div>
</div>
<script>
function assignValue(cateId){
	$("#popassigncatID").val(cateId);
	
	console.log("assignValue : cateId "+ cateId);
	//$("#appheaderwrapperID").css('zIndex', '1');
	//$(".subnav").css('zIndex', '9999');
}
</script>
