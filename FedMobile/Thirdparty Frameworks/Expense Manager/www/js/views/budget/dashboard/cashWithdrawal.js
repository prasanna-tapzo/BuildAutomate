define(['jquery', 'underscore', 'Backbone',
        'text!views/budget/dashboard/cashWithdrawal.tpl',
        'text!views/budget/dashboard/cashWithdrawalFooter.tpl',
        'collections/budget/cashWithdrawalCollections'
        /*'routers/accountsrouter',
        'text!views/common/accountsRenamePopup.tpl',
        'models/validation/common/accountsNameValidation'*/
        ],
        
function ($, _, Backbone,
		cashWithdrawalTemplate,
		cashWithdrawalFooterTemplate,
		cashWithdrawalCollections
		/*accountsRouter,
		accountsRenameTemplate,
		accountsNameValidation*/
		) {
	var els = new EncryptedLocalStorage('secret'); 
	
	//Body Content 
	var cashWithdrawal = Backbone.View.extend({	 		
		el:'#mobcontent',
		events:{
			
				
        },
      
		initialize:function(){
       	},
        render:function()
		{	
		        	/*var that=this;			    
		        	var onDataHandler = function(collection) 
		        	{
		        		that.favorites();
		        	}
		        	var onErrorHandler = function(collection) {
		        		console.log("ERROR");
		        		//that.errorresponse();
		        		that.favorites();
		        	}
		        that.collection= new cashWithdrawalCollections([],{});
		        var deviceId=getDeviceId();
		        showSpinner();
		    	that.collection.fetch({
		 			data:$.param({amount:5000}),
		 			dataType: "json",
		 			type: 'POST',
		 			cache: false,
		 			timeout:parseInt(els.get('calltimeout')),
		 			success : function(data){
		 				console.log('data='+data.ackStatus);
		 				if(ackStatus == "00000"){
		 					setTimeout(function(){
		 						onDataHandler(data);		     						
		 						hideSpinner();
		 					},2000);
		 				}else{
		 					console.log('data='+data.ackStatus);
		 					onErrorHandler(data);
		 				}
		 			},
		 			error:onErrorHandler
		 		});	 */     
        	this.renderSuccess();
    		
        },
        update:function(p1,p2,p3,p4,p5,p6){
        	els.get("ATMTXN",p1+","+p2+","+p3+","+p4+","+p5);
        	els.set("goBackScreen",p6);
        	this.renderSuccess();
        },
        renderSuccess:function()
        {
        	$("#bdywrap").addClass('noFooter');
        	console.log("Inside accounts render..........");
		    this.$el.html(_.template(cashWithdrawalTemplate)).i18n();
		    $(".back_butt").show();
		    //$("#screentitle").text($.i18n.t('app.smartbudget.general.transaction'));
		    var footer = new cashWithdrawalFooter();
		    footer.render();
		    return this;
		}
	});
	//Footer Content
	var cashWithdrawalFooter = Backbone.View.extend({
 		el:'#loginfooter',
		events:{
			"click #cashWithdrawalId":"cashWithdrawalNavigator"
			//"click #accountsid":"initiateFav",
			//"click #accountsid":"gotoSubmit"
			//"click #nameedit":"accountsnameedit"
			
				
        },
      
        render:function()
		{  
        	console.log("Inside cashWithdrawalFooterTemplate render..........");
        	this.$el.html(_.template(cashWithdrawalFooterTemplate)).i18n();
        	return this;
        },
        
        initiateFav:function()
        {
        	this.gotoSubmit();
        	console.log('initiateFav');
        	//Backbone.history.navigate("#/accountsid");
    	},
    	cashWithdrawalNavigator:function()
        { 
        	console.log('cashWithdrawalNavigator');
        	Backbone.history.navigate("#/budgetCategorise");
    	},

    	gotoSubmit:function(){
            /*	console.log("inside gotoSubmit ownAcctTransferConfirmFooter"); 
        	validationDone=false;
        	var header = new ownAcctTransferConfirm();
        	header.submitTransfer();
        	if(validationDone){*/
        		els.set("isOtporMPIN","mpin");
    			this.$("#otpModalinFooter").html(_.template(accountsRenameTemplate)).i18n(); //bind the common template
    			console.log("OTP TEMPLATE2");
    			$("#accountsedit").modal({backdrop: 'static'}); //invoke the modal
    			$("#accountsedit").show();  //open the modal 
        	//}
	    },
	    accountsnameedit:function(){
	    	console.log('accountsnameedit'+$('#accountNewName').val());
	    	this.model = new accountsNameValidation({url:'json/'});
        	//this.$('.alert').hide();
            Backbone.Validation.bind(this);                             
			var data = $('.form').serializeObject();
			console.log("data",data);
			
			if(this.model.set(data, {validate: true})){				
				this.model.clear();
			    Backbone.Validation.unbind(this); 
			    
			   var accountNewName= $('#accountNewName').val();
			   
			   console.log("accountNewName="+accountNewName);
	    	
	           }
	    },
	    
        
	});
	return cashWithdrawal;
	
});