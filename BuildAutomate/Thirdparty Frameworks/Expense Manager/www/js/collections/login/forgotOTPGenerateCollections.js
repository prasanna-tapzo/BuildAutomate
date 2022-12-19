define(['underscore',
        'Backbone',
        'models/common/otpGenerateModel'], 
		function(_, Backbone, 
				OTPModel){
	
	var els = new EncryptedLocalStorage('secret'); 
	var forgotUserNameCollection = Backbone.Collection.extend({
    	model: OTPModel,
        initialize : function(models, options) {
        			this.id = options.id;
        },
        url:function() {
        	var appurl = '';
        	els.set("errordesc","");

        	//Retrieve application response mode from local cache
	       	var appResponeMode = els.get('app.respone.mode');
	       	var appContextPath = els.get('app.context.path');
	       	var appStaticContextPath = els.get('app.static.context.path');
	       	var appLocalContextPath = els.get('app.local.context.path');
	       //	appResponeMode="local-static-response";
	    	//Setting up application URL  
        	if(appResponeMode == 'server-dynamic-response'){
        		appurl=appContextPath+'payment/otpgenerate';
        	}else if(appResponeMode == "server-static-response"){
        		appurl=appStaticContextPath+'forgotusername.json';
        	}else if(appResponeMode == "local-static-response"){
        		appurl=appLocalContextPath+'forgotusername.json';
        	}
        	return appurl;
        }
    });
    return forgotUserNameCollection; 
});
  
  
      