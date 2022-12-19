define(['jquery', 'underscore', 'Backbone',
'collections/logout/logoutCollections',
'text!views/layout/loginLayout.tpl'],
    function ($, _, Backbone, 
	logoutCollections,
	loginLayoutTemplate) {
	var els = new EncryptedLocalStorage('secret'); 
	 
	var loginLayout = Backbone.View.extend({
	 		el:'#container',
	 		e2:'#loginmobcontent',
	 		e3:'#loginfooter',
			events:{
				"click #logout":"logout"
			
            },
            initialize : function(){ 
            	 //this.router= new approuter();
    		},
            render:function()
			{
			   
    		    //$(".subnav").hide();
    		    console.log("App Landing....................1");
    		    Backbone.history.navigate("#/smartBudget");
    		    console.log("App Landing....................2");
    		    //Backbone.history.navigate("#/wealthFooter");
    		    console.log("App Landing....................3");
    		    setTimeout(function(){
				$(".subnav").show();
				$("#approwhead").show();
				},500);
				this.loginlandingcompile();
    		    return this;
            },
			loginlandingcompile:function(){
				this.$el.html(_.template(loginLayoutTemplate)).i18n();
			},
			logout:function(){
				/*function gotoLogout(){	
 	var mobileapp=/iPad|iPhone|iPod|Android/.test( navigator.userAgent );
	if(mobileapp){
         	navigator.notification.confirm(
            			$.i18n.t("app.login.layout.logoutconfirm"),
            	        onConfirmlogout,
            	        '',
            	       
            	       [$.i18n.t("app.login.layout.yes"),$.i18n.t("app.login.layout.no")]
            	    );
					
					function onConfirmlogout(button){
            	    if(button == 1){
            	    	var dte=getToday();
						var dt = getMonthNameShrt(dte,"S");
						
						var yr = parseInt(dte.substring(0,4));
						var mn = getTxnMonthName(dte,"S");
						var dt = parseInt(dte.substring(6,8));
						
						dte = dt + " " + mn + " " + yr + " 00:00:00 IST";
						els = new EncryptedLocalStorage('secret'); 
						els.set('date',dte);
                		Backbone.history.navigate("#/logout");                		
            	    }else if(button == 2){
            	        
            	    }
            	}
					
					
  	}else{
  		if(confirm($.i18n.t("app.login.layout.logoutconfirm"))){
			var dte=getToday();
			var dt = getMonthNameShrt(dte,"S");
			
			var yr = parseInt(dte.substring(0,4));
			var mn = getTxnMonthName(dte,"S");
			var dt = parseInt(dte.substring(6,8));
			
			dte = dt + " " + mn + " " + yr + " 00:00:00 IST";
			
			console.log("date",dte);
			var els = new EncryptedLocalStorage('secret'); 
			els.set('date',dte);
			Backbone.history.navigate("#/logout");  		
		}else{
		}
	}
}*/
            	console.log("Inside changeMpinReview render..........");
            	var that = this;
      			var onDataHandler = function(collection) {   				
      				that.preLogin();}
  				var onErrorHandler = function(collection) {that.errorresponse(); }
      				showSpinner();
      				var deviceId=getDeviceId();	    
      				that.collection= new logoutCollections();
      				that.collection.fetch({
         			//data: $.param({device_id:deviceId}),
         			dataType: "json",
         			type: 'POST',
         			cache: false,
         			success : function(data)
         			{
         				if(ackStatus == "00000"){
         				console.log("inside ackStatus");
 						gotoLogout();
         				}else{
         					onErrorHandler(data);
         				}
         			},
         			error:onErrorHandler
      				});
  			
			}
            
        });
        return loginLayout;
    });