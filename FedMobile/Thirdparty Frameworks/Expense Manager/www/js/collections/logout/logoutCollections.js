define(['underscore','Backbone','models/logout/logoutModel'], function(_, Backbone, logoutModel){
	var els = new EncryptedLocalStorage('secret');  
	var logoutCollections = Backbone.Collection.extend({
    	model: logoutModel,
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
	       	//to set null for acces token and deviceid
	       	/*var deviceid=getDeviceId();els.get('predevid');
			els.set('device_id',deviceid);
			els.set("appSessionId","");*/
	       	
	       	var deviceid = getDeviceId();
	       	
	       	//var deviceid="201312311706615734403761345";/*getDeviceId();*///els.get('predevid');
			els.set('device_id',deviceid);
			//els.set("appSessionId","");
	       	
	       	//Setting up application URL
        	if(appResponeMode == 'server-dynamic-response'){
        		appurl=appContextPath+'user/exitpfm';
        		//appurl=appContextPath+'user/mpinlogout';
        	}else if(appResponeMode == "server-static-response"){
        		appurl=appStaticContextPath+'preloginAuth.json';
        	}else if(appResponeMode == "local-static-response"){
        		appurl=appLocalContextPath+'preloginAuth.json';
        	}
			
        	return appurl;
        }
    });
    return logoutCollections; 
});
  
  
      