<%
var els = new EncryptedLocalStorage('secret');
var categorysList = els.get("categorysList");
var categoryNames = els.get("categoryNameList");
var cateIDList = els.get("cateIDList");

if(categoryNames==null)
{
	categoryNames=[];
}

if(cateIDList==null || cateIDList.trim()=="" || cateIDList=="undefined")
{
	cateIDList=[];
}else{
	cateIDList=cateIDList.split(",");
}

	var availableCount=0;
	_.each(categoryNames,function(data){ 

	var cat_id=data.categoryID;
	if(cateIDList.indexOf(cat_id.toString()) !=-1){ }else{
		availableCount=1;
	}

	});
%>


<% if(availableCount>0){ %>

	<input type="button" id="budgetsFooterId" name="budgetsFooterId " class="col-xs-12" value="<%-$.i18n.t('app.smartbudget.general.addnewbudget')%>" />

<% }else{ %>
	
	<input type="button" disabled="true" id="budgetsFooterId" name="budgetsFooterId " class="col-xs-12 disabled" value="<%-$.i18n.t('app.smartbudget.general.addnewbudget')%>" />

<% } %>

<div id="addBugetNewUserFooter"></div>
 
