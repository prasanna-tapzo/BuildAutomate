define(['underscore',
        'Backbone',
        'models/home/login/loginModel'], 
		function(_, Backbone, 
				loginModel){
	
	var els = new EncryptedLocalStorage('secret'); 
	var loginCollection = Backbone.Collection.extend({
    	model: loginModel,
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
        		appurl=appContextPath+'user/authenicateentry';
        		//appurl=appLoginContextPath+'oauth/token';        		
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
    return loginCollection; 
});
  