define(['underscore','Backbone','models/locator/locatorResultModel'], function(_, Backbone, locatorResultModel){
	
	var els = new EncryptedLocalStorage('secret'); 
	var locatorResultCollections = Backbone.Collection.extend({
    	model: locatorResultModel,
        initialize : function(models, options) {
        },
        url:function() {
        	var appurl = '';
        	
        	//Retrieve application response mode from local cache
	       	var appResponeMode = els.get('app.respone.mode');
	       	var appContextPath = els.get('app.context.path');
	       	var appStaticContextPath = els.get('app.static.context.path');
	       	var appLocalContextPath = els.get('app.local.context.path');
	       	appLocalContextPath="json/";
	       	//appurl=appLocalContextPath+'locatorSearchResult.json';
	    	//alert("appurl.."+appurl);
	    	//Setting up application URL
        	if(appResponeMode == 'server-dynamic-response'){
        		//appurl=appContextPath+'prelogin/atmbranchdetails';
        		appurl=appLocalContextPath+'locatus.json';
        		//appurl=appLocalContextPath+'locatorResult.json';
        	}else if(appResponeMode == "server-static-response"){
        		appurl=appStaticContextPath+'locatorSearchResult.json';
        	}else if(appResponeMode == "local-static-response"){
        		appurl=appLocalContextPath+'locatorSearchResult.json';
        	}
        	return appurl;
        }
    });
    return locatorResultCollections; 
});
  
  
      