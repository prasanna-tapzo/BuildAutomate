

define(['jquery', 'underscore', 'Backbone',
        'text!views/prelogin/errors/exception.tpl',
        'text!views/prelogin/errors/exceptionFooter.tpl'],
       // 'collections/wealth/wealthCollections'], 
function ($, _, Backbone,exceptionTemplate,exceptionFooterTemplate) {
	var els = new EncryptedLocalStorage('secret'); 
	
	//Body Content 
	var exception = Backbone.View.extend({	 		
		el:'#preloginmobcontent',
		
	    render:function()
		{
			
			els.set("exceptionconnection","");
        	console.log("Inside exception render..........");
        	var errordesc = els.get("errordesc");
        	if(errordesc=="SUCCESS"){
    			els.set("errordesc","");
        	}
        	 errordesc = els.get("errordesc");
		    this.$el.html(_.template(exceptionTemplate)).i18n();
		    $("#screentitle").text("");
		    var footer = new exceptionFooter();
		    footer.render();
		    return this;
        }
        
	});
	
	//Footer Content
	var exceptionFooter = Backbone.View.extend({
 		el:'#preloginfooter',
		events:{
			"click #logoutapp":"BacktoLogin"
        },
      
        render:function()
		{
        	console.log("Inside exceptionFooter render..........");
        	this.$el.html(_.template(exceptionFooterTemplate)).i18n();
        	return this;
        },
        
        BacktoLogin:function(event){
        	var errBack=els.get("errback");
        	var stateofcon=els.get("connection");
        	if(errBack=='preloginsettings'){
        		Backbone.history.navigate("#/gotoderegister");
        		hideSpinner();
        	}else if(errBack=='prelogin'){
        		Backbone.history.navigate("#/newregistration");
        		hideSpinner();
        	}else if(errBack=='gotochangempin'){
                Backbone.history.navigate("#/gotochangempin");
            }else if(errBack=='forgotmpin'){
                Backbone.history.navigate("#/forgotmpin");
            }else if(errBack=='preloginbillpay'){
                Backbone.history.navigate("#/gotobillpay");
            }/*else if(stateofcon==Connection.UNKNOWN || stateofcon==Connection.NONE){
            	Backbone.history.navigate("#/");
    			hideSpinner();
            }*/else{
        		Backbone.history.navigate("#/");
    			hideSpinner();
        	}

        }
       
       
	});
	return exception;
	
});