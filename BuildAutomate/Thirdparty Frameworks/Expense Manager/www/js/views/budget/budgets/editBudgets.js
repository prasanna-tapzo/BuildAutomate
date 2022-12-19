define(['jquery', 'underscore', 'Backbone'
        ,'text!views/budget/budgets/editBudgets.tpl'
        ,'text!views/budget/budgets/editBudgetsFooter.tpl'
       ,'collections/budget/editBudgetsCollections'
        , 'views/budget/budgets/add_new_budget'
        ],
        
function ($, _, Backbone
		,editBudgetsTemplate
		,editBudgetsFooterTemplate
		,editBudgetsCollections
		,add_new_budget
		) {
	var els = new EncryptedLocalStorage('secret'); 
	
	//Body Content 
	var favorites = Backbone.View.extend({	 		
		el:'#mobcontent',
		events:{
			'click #editBudgets':'editBudgets'
        },
      
		initialize:function(){
       	},
       	
        render:function()
		{	
        	var that=this;			    
        	var onDataHandler = function(collection) 
        	{
        	that.favorites();
        	}
        	var onErrorHandler = function(collection) {
        	//console.log("ERROR");
        	that.favorites();
        	}
        that.collection= new editBudgetsCollections([],{});
        var deviceId=getDeviceId();
        showSpinner();
    	that.collection.fetch({
 			data:$.param({amount:10000}),
 			dataType: "json",
 			type: 'POST',
 			cache: false,
 			timeout:parseInt(els.get('calltimeout')),
 			success : function(data){
 				if(ackStatus == "00000"){
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
        	//this.favorites();
    		
        },
        editBudgets:function(){
        	 var footer = new editBudgets();
  		    footer.render();
  		    return this;
        },
        favorites:function()
        {
        	console.log("Inside fundTransfer render..........");
		    this.$el.html(_.template(editBudgetsTemplate)).i18n();
		    //$("#screentitle").text($.i18n.t('app.smartbudget.general.EditBudget'));
		    var footer = new editBudgetsFooter();
		    footer.render();
		    return this;
		}
		
        
	});
	//Footer Content
	var editBudgetsFooter = Backbone.View.extend({
 		el:'#loginfooter',
		events:{
			"click #budgetsFooterId":"initiateFav",
			"click #delete":"deleteBudgets",
			"click #save":"saveBudgets",
			
				
        },
      
        render:function()
		{
        	console.log("Inside fundTransferFooter render..........");
        	this.$el.html(_.template(editBudgetsFooterTemplate)).i18n();
        	return this;
        },
        
        initiateFav:function()
        {
        	 var footer = new add_new_budget();
 		    footer.render();
 		    return this;
    	},
    	deleteBudgets:function(){
    		console.log('deleteBudgets');
    	},
    	saveBudgets:function(){
    		console.log('saveBudgets');
    	}
        
	});
	return favorites;
	
});