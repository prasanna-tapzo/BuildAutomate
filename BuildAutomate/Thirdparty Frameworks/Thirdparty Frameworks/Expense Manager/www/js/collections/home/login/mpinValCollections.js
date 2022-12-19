define(['underscore',
        'Backbone',
        'models/home/login/mpinValModel'], 
		function(_, Backbone, 
				mpinValModel){
	
	var els = new EncryptedLocalStorage('secret'); 
	var mpinValCollection = Backbone.Collection.extend({
    	model: mpinValModel,
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
	       	var appLoginContextPath = els.get('app.login.context.path');
	       //	appResponeMode="local-static-response";
	    	//Setting up application URL  
        	if(appResponeMode == 'server-dynamic-response'){
				appurl=appContextPath+'prelogin/mpinvalidation';
        		//appurl=appContextPath+'common/mpinvalidation';
//        		appurl=appLoginContextPath+'oauth/token';
        		
        	}else if(appResponeMode == "server-static-response"){
        		appurl=appLocalContextPath+'User_Mpin_Login_and User_profile.json';
        	}else if(appResponeMode == "local-static-response"){
        		appurl=appLocalContextPath+'User_Mpin_Login_and User_profile.json';
        	}
        	console.log("appResponeMode : "+appResponeMode);
        	console.log("appResponeMode : "+appResponeMode);
        	return appurl;
        }
    });
    return mpinValCollection; 
});
  