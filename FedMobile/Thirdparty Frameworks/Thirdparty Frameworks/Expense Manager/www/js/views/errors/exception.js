define(['jquery', 'underscore', 'Backbone',
        'text!views/errors/exception.tpl',
        'text!views/errors/exceptionFooter.tpl'],
       // 'collections/wealth/wealthCollections'], 
function ($, _, Backbone,exceptionTemplate,exceptionFooterTemplate) {
	var els = new EncryptedLocalStorage('secret'); 
	
	//Body Content 
	var exception = Backbone.View.extend({	 		
		el:'#mobcontent',
		
	    render:function()
		{
			//els.set("exceptionconnection",navigator.connection.type);
			els.set("exceptionconnection","");
        	console.log("Inside exception render..........");
        	var errordesc = els.get("errordesc");
        	var errorCode=els.get("errorcode");
        	if(errorCode=="8888"){
        		$("#iosBackButton").hide();
        	}else{
        		$("#iosBackButton").show();
        	}
        	if(errordesc=="SUCCESS"){
    			els.set("errordesc","");
        	}
        	 		errordesc = els.get("errordesc");
        	 		$("#screentitle").text("");
					console.log("elsefailurew51");
                    $("#loginfooter").show();
                    $("#loginfooter").addClass("footerwrap");
                    // incase if session gets expired in EM these above 2 lines will make sure of footer aligned 
					this.$el.html(_.template(exceptionTemplate)).i18n();
				    var footer = new exceptionFooter();
				    footer.render();
				    return this;
				//}
        }
        
	});
	
	//Footer Content
	var exceptionFooter = Backbone.View.extend({
 		el:'#loginfooter',
		events:{
			"click #logoutapp":"BacktoLogin"
        },
      
        render:function()
		{
        	console.log("Inside exceptionFooter render..........");
			console.log("exceptionsessionmaintanance");
        	this.$el.html(_.template(exceptionFooterTemplate)).i18n();
            var errBack=els.get("errback");
            console.log("renderrr  exception == ",errBack);
        	return this;
        },
        
        BacktoLogin:function(event){
        	var errBack=els.get("errback");
			var errorCode=els.get("errorcode");
            console.log("BacktoLogin == ",errBack);
            var stateofcon=els.get("exceptionconnection");
            console.log("stateofcon == ",stateofcon);
            console.log("errorCode == ",errorCode);
		if(errorCode=="8888" || stateofcon==Connection.UNKNOWN || stateofcon==Connection.NONE){
			$('.logout').empty();
			$('.ico_backward').empty();
			$('.shownav').empty();
			Backbone.history.navigate("#/");
        			hideSpinner();
		}else{
				if(errBack=="contactus"){
	        		Backbone.history.navigate("#/contactus");
	        		hideSpinner();
	    		}else if(errBack=="services"){
	        		Backbone.history.navigate("#/services");
	        		hideSpinner();
        		}else if(errBack=="transfer"){
	    			Backbone.history.navigate("#/transfer");
	    			hideSpinner();
        		}else if(errBack=="wealth"){
        			Backbone.history.navigate("#/wealth");
        			hideSpinner();	
        		}else if(errBack=="settings"){
        			Backbone.history.navigate("#/settings");
        			hideSpinner();	
        		}else if(errBack=="stopchequerequest"){
                    Backbone.history.navigate("#/stopchequerequest");
                    hideSpinner();  
                }else if(errBack=="contactus"){
            			Backbone.history.navigate("#/contactus");
            			hideSpinner();	
        		}else if(errBack=="aboutus"){
        			Backbone.history.navigate("#/aboutus");
        			hideSpinner();	
        		}else if(errBack=="transfersi"){
        			Backbone.history.navigate("#/standingInstruction");
        			hideSpinner();		
        		}else if(errBack=="depositoffers"){
	                    Backbone.history.navigate("#/depositoffers");
	                    hideSpinner();  
	            }else if(errBack=="mail"){
                   	 Backbone.history.navigate("#/mail");
                    	hideSpinner();  
	            }else if(errBack=="billpay"){
                        Backbone.history.navigate("#/billpay");
                        hideSpinner();  
                }else if(errBack=="viewstatement"){
	                	Backbone.history.navigate("#/viewstatement");
	                	hideSpinner();
                }else if(errBack=="statementfilter"){
	                	Backbone.history.navigate("#/statementfilter");
	                	hideSpinner();
                    }else{        	
        			Backbone.history.navigate("#/");
        			hideSpinner();
        		}
		}
        }
       
       
	});
	return exception;
	
});
