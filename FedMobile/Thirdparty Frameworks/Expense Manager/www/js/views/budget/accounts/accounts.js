define(['jquery', 'underscore', 'Backbone'
        , 'text!views/budget/accounts/accounts.tpl'
        , 'text!views/budget/accounts/accountsFooter.tpl'
        , 'collections/budget/accountsCollections'
        , 'collections/budget/saveNickNameCollections'
        //, 'routers/accountsrouter'
        , 'text!views/common/accountsRenamePopup.tpl'
        //, 'models/validation/common/accountsNameValidation'
        ],
        
function ($, _, Backbone
		, accountsTemplate
		, accountsFooterTemplate
		, accountsCollections
		, saveNickNameCollections
		//, accountsRouter
		, accountsRenameTemplate
		//, accountsNameValidation
		) {
	var els = new EncryptedLocalStorage('secret'); 
	var footer;
	var footer1;
	//Body Content 
	var accounts = Backbone.View.extend({
			el:'#mobcontent',
			events:{
				"click #clickAccount":"AccountDetails",
				"click .showMyModal":"editNickName"
	        },
			initialize:function(){
	       	},
	        render:function()
			{
	        	els.set('changeYourExpnType',"");
	        	els.set("gobackscreen","AC");
				$(".back_butt").hide();
	        	var tody = new Date();
				mon = getMonthNameShrt( (tody.getMonth()+1) +"" );
				yer = tody.getFullYear();
				
	        	var that=this;			    
	        	var onDataHandler = function(collection) 
	        	{
	        		hideSpinner();
	        		that.renderBodySuccess();
	        	}
	        	var onErrorHandler = function(collection) {
	        		hideSpinner();
	        		console.log("ERROR");
	        		if(ackStatus=="8888")
			          {
			            that.errorresponse();
			          }
	        		
	        		//Backbone.history.navigate("#/exception");
	        	}
		        that.collection= new accountsCollections([],{});
		        var deviceId=getDeviceId();
		        showSpinner();
		    	that.collection.fetch({
		 			data:$.param({
		 				customer_Id:els.get("customerID_EM"),
		 				type_category:"ALL",
		 				period_type:"M",
		 				number_of_month:"6",
		 				month_category:mon, //for example Feb Jan Mar... can be used to check previous months accounts for testing
		 				year_category:yer,//yer,
		 				expDescription:"",
		 				expDescriptionMonth:"",
		 				expDescriptionAll:"",
		 				flag:"A",
		 				customer_transactionID:"",
		 				acct_period_type:"",
		 				acct_number_of_month:"",
		 				acct_month_category:"",
		 				acct_year_category:""
		 			}),
		 			dataType: "json",
		 			type: 'POST',
		 			cache: false,
		 			timeout:parseInt(els.get('calltimeout')),
		 			success : function(data){
		 				console.log('data='+data.ackStatus);
		 				if(ackStatus == "00000"){ 					
		 						onDataHandler(data);		     						
		 						hideSpinner(); 					
		 				}else{
		 					console.log('data='+data.ackStatus);
		 					onErrorHandler(data);
		 					hideSpinner(); 	
		 				}
		 			},
		 			error:function(){ console.log("Common Error..............."); }
		 		});	           
	    		
	        },
	        errorresponse: function(){
	          hideSpinner();
	          Backbone.history.navigate("#/exception");
       		 },
	        renderBodySuccess:function()
	        {
	        	console.log("Inside accounts render..........");
	        	els.set("cate_expn_chart_month_year","");
			    this.$el.html(_.template(accountsTemplate)).i18n();
			    $("#screentitle").text($.i18n.t('app.smartbudget.general.accounts'));
			    $("#bdywrap").addClass('noFooter');
	        	$("#bdywrap").removeClass('sb-chartexp-gap');
	        	$("#genchartdiv").hide();
	 		    $("#loginfooter").hide(); 		   
			    footer1=null;
			    footer = new accountsFooter();
			    footer.render();
			    return this;
			},
	        AccountDetails:function(){
	        	/*footer=null;
	        	footer1 = new accountsFooter();
			    footer1.gotoSubmit();*/
	        	Backbone.history.navigate("#/budgetCategorise");
	        },
	        editNickName:function(){

	        	var acctid = $("#actId").val();
	        	var nickname = $("#nicName").val();
	        	els.set("acNumber",$("#nicName").val());
	        	$("#bdywrap").removeClass('noFooter');
	 		    $("#loginfooter").show(); 	
	        	footer1 = null;
	        	footer2 = new accountsFooter();
	        	footer2.undelegateEvents();
	        	footer2.showPopup(acctid,nickname);
	        	
	        }
	});

//Footer Content
	var accountsFooter = Backbone.View.extend({
		 		el:'#loginfooter',
				events:{
					"click #accountsid":"editNickNamePopup",
					"click #butSaveNick":"saveNewNickName",
					"click #butCancelNick":"cancelNickName"
		        },
		        render:function()
				{
		        	console.log("Inside accountsFooterTemplate render..........");
		        	this.$el.html(_.template(accountsFooterTemplate)).i18n();
		        	return this;
		        },
		    	editNickNamePopup:function(){
		    		var acctid = $("#actId_0").val();
		        	var nickname = $("#nicName_0").val();
		        	console.log("===========>>>>>",$("#actnum").val());
		        	els.set("acNumber",$("#actnum").val());
		    		this.showPopup(acctid,nickname);
			    },
			    showPopup:function(acctid,nickname){
			    	els.set("isOtporMPIN","mpin");
			    	var tempnick = nickname;
			    	nickname = tempnick.substring(0,tempnick.length-5);
			    	
					this.$("#otpModalinFooter").html(_.template(accountsRenameTemplate,{acctid:acctid,nickname:nickname})).i18n(); //bind the common template
					console.log("OTP TEMPLATE2");
					$("#accountsedit").modal({backdrop: 'static'}); //invoke the modal
					$("#accountsedit").show();  //open the modal
					setTimeout(function(){
						var divlen = $('div[id^=accountsedit]').length;
						console.log("div-len :...................."+divlen);
						if(divlen>1){
							for(i=1;i<divlen;i++){
								$(".commonpopupmodal").slice(i).empty();
								$(".commonpopupmodal").slice(i).remove();
							}
						}
						//$(".modal-backdrop").remove();
					}, 1000);
			    },
			    accountsnameedit:function(){
			    	console.log('accountsnameedit'+$('#accountNewName').val());
			    	this.model = new accountsNameValidation({url:'json/'});
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
			    saveNewNickName:function(){
			    	var newNickName=$("#accountNewNick").val();
			    	var acctID=$("#actIdPop").val();
			    	console.log("--------------> "+newNickName+" <----------> "+acctID);

			    	var that=this;			    
		        	var onDataHandler = function(collection) 
		        	{
		        		hideSpinner();
		        		//that.renderBodySuccess();
		        		var acctrnd= Math.floor((Math.random() * 1000000))+"";
		        		Backbone.history.navigate("#/accountss/"+acctrnd);
		 				$('#accountsedit').modal('hide');  // close the modal window
			        	$(".modal-backdrop").remove(); //fade-out modal layer
			        	//$("#butSaveNick").delegateEvents();
			        	//$("#butCancelNick").delegateEvents();
						$("#accountsedit").unbind();
						$("#accountsedit").remove();
						$("#bdywrap").removeClass('noFooter');
			 		    $("#loginfooter").show();
		        	}
		        	var onErrorHandler = function(collection) {
		        		hideSpinner();
		        		console.log("ERROR");
						if(ackStatus=="8888")
				          {
				            that.errorresponse();
				          }
		 				$('#accountsedit').modal('hide');  // close the modal window
			        	$(".modal-backdrop").remove(); //fade-out modal layer
			        	//$("#butSaveNick").delegateEvents();
			        	//$("#butCancelNick").delegateEvents();
						$("#accountsedit").unbind();
						$("#accountsedit").remove();
						$("#bdywrap").removeClass('noFooter');
			 		    $("#loginfooter").show();
			 		    
		        		

		        	}
			        that.collection= new saveNickNameCollections([],{});
			        var deviceId=getDeviceId();
			        showSpinner();
			    	that.collection.fetch({
			 			data:$.param({
			 				accountId:acctID,
			 				accountNickName:newNickName
			 			}),
			 			dataType: "json",
			 			type: 'POST',
			 			cache: false,
			 			timeout:parseInt(els.get('calltimeout')),
			 			success : function(data){
			 				console.log('data='+data.ackStatus);
			 				if(ackStatus == "00000"){ 					
			 						onDataHandler(data);		     						
			 						hideSpinner(); 					
			 				}else{
			 					console.log('data='+data.ackStatus);
			 					onErrorHandler(data);
			 					hideSpinner(); 	
			 				}
			 			},
			 			error:function(){ console.log("Common Error..............."); }
			 		});
			    },
			    errorresponse: function(){
	          hideSpinner();
	          Backbone.history.navigate("#/exception");
       		 },
			    cancelNickName:function(){
			    	$('#accountsedit').modal('hide');  // close the modal window
		        	$(".modal-backdrop").remove(); //fade-out modal layer
		        	//$("#butSaveNick").delegateEvents();
		        	//$("#butCancelNick").delegateEvents();
					$("#accountsedit").unbind();
					$("#accountsedit").remove();
					$("#bdywrap").removeClass('noFooter');
		 		    $("#loginfooter").show();
			    }
	});
	return accounts;
});