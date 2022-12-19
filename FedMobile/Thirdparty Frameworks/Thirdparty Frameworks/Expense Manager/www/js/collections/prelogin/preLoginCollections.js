define(['underscore','Backbone','models/home/prelogin/preLoginModel'], 
		function(_, Backbone, preLoginModel){
	var els = new EncryptedLocalStorage('secret');  
	var preLoginCollections = Backbone.Collection.extend({
    	model: preLoginModel,
        initialize : function(models, options) {
        },
        url:function() {        	
        	//Retrieve application response mode from local cache
	       	var appLoginContextPath = els.get('app.login.context.path');
	       	var appResponeMode = els.get('app.respone.mode');
	       	var appContextPath = els.get('app.context.path');
	       	var appStaticContextPath = els.get('app.static.context.path');
	       	var appLocalContextPath = els.get('app.local.context.path');
	       	
	       	var appurl = '';
	       	els.set("errordesc","");
	       	//Setting up application URL
        	if(appResponeMode == 'server-dynamic-response'){
        		appurl=appContextPath+'prelogin/preloginsummary';
        	}else if(appResponeMode == "server-static-response"){
        		appurl=appStaticContextPath+'preloginAuth.json';
        	}else if(appResponeMode == "local-static-response"){
        		appurl=appLocalContextPath+'preloginAuth.json';
        	}
			
        	return appurl;
        }
    });
    return preLoginCollections; 
});
  
  
      