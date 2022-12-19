define(['underscore','Backbone','models/common/otpValidateModel'], function(_, Backbone, otpValidateModel){
	var els = new EncryptedLocalStorage('secret');  
	var otpValidateCollections = Backbone.Collection.extend({
    	model: otpValidateModel,
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
	       	
	       	//Setting up application URL
        	if(appResponeMode == 'server-dynamic-response'){
        		appurl=appContextPath+'common/otpvalidation';// need to change 
        		//appurl=appLocalContextPath+'otpValidate.json';
        	}else if(appResponeMode == "server-static-response"){
        		appurl=appStaticContextPath+'loginAuth.json';
        	}else if(appResponeMode == "local-static-response"){
        		appurl=appLocalContextPath+'loginAuth.json';
        	}
        	return appurl;
        }
    });
    return otpValidateCollections; 
});
  
  
      