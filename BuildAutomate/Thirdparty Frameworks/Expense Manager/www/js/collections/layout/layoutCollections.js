define(['underscore','Backbone','models/layout/layoutModel'], 
	function(_, Backbone, layoutModel){
	var els = new EncryptedLocalStorage('secret'); 
	var layoutCollections = Backbone.Collection.extend({
    	model: layoutModel,
		initialize: function(models, options) {
		//alert("layout collections = = =");
		},
        url:function() {
        	var appurl = '';   
			els.set("errordesc","");
        	//Retrieve application response mode from local cache
	       	var appResponeMode = els.get('app.respone.mode');
	       	var appContextPath = els.get('app.context.path');
	       	var appStaticContextPath = els.get('app.static.context.path');
	       	var appLocalContextPath = els.get('app.local.context.path');
	       	
	    	//Setting up application URL  
        	if(appResponeMode == 'server-dynamic-response'){
        		appurl=appContextPath+'common/customerdetails';
        	}else if(appResponeMode == "server-static-response"){
        		appurl=appStaticContextPath+'customerDetails.json';
        	}else if(appResponeMode == "local-static-response"){
        		appurl=appLocalContextPath+'customerDetails.json';
        	}  
        	return appurl;
        }
    });
    return layoutCollections; 
});