define(['jquery', 'underscore', 'Backbone',
        'text!views/transfer/favorites/favorites.tpl',
        'text!views/transfer/favorites/favoritesFooter.tpl',
        'collections/transfer/favTransferCollections'],
        
function ($, _, Backbone,
		favoritesTemplate,
		favoritesFooterTemplate,
		favTransferCollections) {
	var els = new EncryptedLocalStorage('secret'); 
	
	//Body Content 
	var favorites = Backbone.View.extend({	 		
		el:'#mobcontent',
		events:{
        },
		initialize:function(){
       	},
        render:function()
		{	
        	console.log('render method');
        	/*var that=this;			    
        	var onDataHandler = function(collection) 
        	{
        	that.favorites();
        	}
        	var onErrorHandler = function(collection) {
        	console.log("ERROR");
        	that.errorresponse();
        	}
        that.collection= new favTransferCollections([],{});
        var deviceId=getDeviceId();
        showSpinner();
    	that.collection.fetch({
 			data:$.param({device_id:deviceId}),
 			dataType: "json",
 			type: 'POST',
 			cache: false,
 			timeout:parseInt(els.get('calltimeout')),
 			success : function(data){
 				if(ackStatus == "0000"){
 					setTimeout(function(){
 						onDataHandler(data);		     						
 						hideSpinner();
 					},2000);
 				}else{
 					onErrorHandler(data);
 				}
 			},
 			error:onErrorHandler
 		});	           
    		*/
        	this.favorites();
        },
        favorites:function()
        {
        	console.log("Inside fundTransfer render..........");
		    this.$el.html(_.template(favoritesTemplate)).i18n();
		    $("#screentitle").text($.i18n.t('app.smartbudget.general.screenTitle'));
		    var footer = new favoritesFooter();
		    footer.render();
		    return this;
		}
		
        
	});
	//Footer Content
	var favoritesFooter = Backbone.View.extend({
 		el:'#loginfooter',
		events:{
			"click #initiatefav":"initiateFav"
				
        },
      
        render:function()
		{
        	console.log("Inside fundTransferFooter render..........");
        	this.$el.html(_.template(favoritesFooterTemplate)).i18n();
        	return this;
        },
        
        initiateFav:function()
        {
        	var payeeType = els.get("payeetype");
        	
        	if(payeeType=="Jana Bank"){
        		Backbone.history.navigate("#/janaTransferInitiate");
        	}else if(payeeType=="Mobile Payee"){
        		Backbone.history.navigate("#/mobPayeeAccountTransferInitiate");
        	}else if(payeeType=="Other Bank"){
        		Backbone.history.navigate("#/otherAccountTransferInitiate");
    		}
    	}
        
	});
	return favorites;
	
});