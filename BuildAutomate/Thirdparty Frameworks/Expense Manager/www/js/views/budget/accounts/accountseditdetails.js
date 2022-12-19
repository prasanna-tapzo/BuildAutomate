define(['jquery', 'underscore', 'Backbone',
        'text!views/budget/accounts/accounteditdetails.tpl',
        'text!views/budget/accounts/accounteditdetailsfooter.tpl',
        '/routers/accountsrouter'],
        
function ($, _, Backbone,
		accounteditdetailsTemplate,
		accounteditdetailsfooterTemplate,
		accountsRouter) {
	var els = new EncryptedLocalStorage('secret'); 
	
	//Body Content 
	var compose = Backbone.View.extend({	 		
		el:'#mobcontent',
		
		initialize:function(){
       	},
	    render:function()
		{
		    this.$el.html(_.template(accounteditdetailsTemplate)).i18n();
		    console.log("MAIL");
		    $("#screentitle").text($.i18n.t('app.messagecenter.general.title'));
		    var footer=new composeFooter();
		    footer.render();
		    return this;
        }
      
	});
	var composeFooter = Backbone.View.extend({	 		
		el:'#loginfooter',
		
		events:{
			"click #compose":"compose"
		},
		
		initialize:function(){
			
       	},
	    render:function()
		{
		    this.$el.html(_.template(accounteditdetailsfooterTemplate)).i18n();
		    return this;
        },
        compose:function(){
        	backbone.history.navigate("#/composeMail");
        }
	});
	
	return compose;
	
});