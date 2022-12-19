define(['underscore','Backbone','models/budgets/addNewBudgetModel'], 
	function(_, Backbone, addNewBudgetModel){
	
	var els = new EncryptedLocalStorage('secret'); 
	var addNewBudgetCollections = Backbone.Collection.extend({
    	model: addNewBudgetModel,
        initialize : function(models, options) {
        	/*this.id = options.id;
        console.log("this.id="+this.id);	*/
        },
        url:function() {
        	var appurl = '';
        	//Retrieve application response mode from local cache
	       	var appResponeMode = els.get('app.respone.mode');
	       	var appContextPath = els.get('app.context.path');
	       	var appStaticContextPath = els.get('app.static.context.path');
	       	var appLocalContextPath = els.get('app.local.context.path');
	       	console.log('appLocalContextPath='+appLocalContextPath);
	    	//Setting up application URL  
        	if(appResponeMode == 'server-dynamic-response'){
        		//appurl=appLocalContextPath+'budgetsAUD.json';
        		appurl=appContextPath+'expBudg/custbudgetcategory';
        	}else if(appResponeMode == "server-static-response"){
        		appurl=appStaticContextPath+'Expenase_by_Accountwise.json';
        	}else if(appResponeMode == "local-static-response"){
        		appurl=appLocalContextPath+'Expenase_by_Accountwise.json';
        	}
        	console.log("appResponeMode : "+appResponeMode);
        	return appurl;
        }
    });
    return addNewBudgetCollections; 
});
  
  
      