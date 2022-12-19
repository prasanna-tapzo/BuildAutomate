define(['jquery', 'underscore', 'Backbone'
        , 'text!views/budget/budgets/budgets.tpl'
        , 'text!views/budget/budgets/budgetsFooter.tpl'
        , 'text!views/common/addBudgetNewUser.tpl'
        , 'views/budget/budgets/add_new_budget'
        , 'views/budget/budgets/editBudgets'
        , 'collections/budget/dashboardBandECollections'
        , 'collections/budget/addNewBudgetCollections'
        ],
        
function ($, _, Backbone
		, budgetsTemplate
		, budgetsFooterTemplate
		, addBudgetNewUser
		, add_new_budget
		, editBudgets
		, dashboardBandECollections
		,addNewBudgetCollections
		) {
		var els = new EncryptedLocalStorage('secret'); 
	
//Body Content 
		var smart_budgets = Backbone.View.extend({
			el:'#mobcontent',
			events:{
				'click #editBudgets':'editBudgets',
				'click #montlyreports':'montlyreports'
	        },
	      
			initialize:function(){
	       	},
	       	
	        render:function()
			{
				$("#failureMessage").hide();
				els.set("gobackscreen","AB");
				$(".back_butt").hide();
	        	els.set('changeYourExpnType',"");
	        	var mon,yer;
	        	if(els.get("emflag")!="Y")
	        	{
	        		var catList = els.get("categorysList");
		        	/*if(catList.length>0)
		        		els.set("budget_Month_Year",catList[0].monthDesc+","+catList[0].year_value);
		        	else{*/
		        		var tody = new Date();
		    			mon = getMonthNameShrt( (tody.getMonth()+1) +"" );
		    			mon = mon.toUpperCase();
		    			yer = tody.getFullYear();
		        		els.set("budget_Month_Year",mon+","+yer);
		        	/*}*/
		        	
		        	console.log("Inside header render..........");
				    this.$el.html(_.template(budgetsTemplate,{mon:mon})).i18n();
				    $("#screentitle").text($.i18n.t('app.smartbudget.general.budgets'));
				    $("#bdywrap").removeClass('noFooter');
		 		    $("#loginfooter").show();
				    var footer = new budgetsFooter();
				    footer.render();

				
				    return this;
	        	}else{

	        	var tody = new Date();
    			mon = getMonthNameShrt( (tody.getMonth()+1) +"" );
    			yer = tody.getFullYear();
    			
	        	var that = this;
	  			var onDataHandler = function(collection) {
	  				hideSpinner();
	  				mon = mon.toUpperCase();
	  				that.renderSuccess(mon);
	  			};
	  			var onErrorHandler = function(collection) {
	  				hideSpinner();
	  				console.log("Error here budget.js-Dashboard");
	  				if(ackStatus=="8888")
	  				{
	  					that.errorresponse();
	  				}else{
  						 mon = mon.toUpperCase();
	  					 //$("#failureMessage").show();
	  					 that.renderSuccess(mon);
  						// return false;
  					}
	  				//that.errorresponse();
	  				//Backbone.history.navigate("#/exception");
	  			};
	        	that.collection= new dashboardBandECollections();
	        	var deviceId=getDeviceId();
	        	showSpinner();
	            that.collection.fetch({
					data : $.param({
						customer_Id:els.get("customerID_EM"),
						period_type:"M",
						number_of_month:"6",
						flag:"CM", //ECUM
						type_category:"ALL",
						uncatagory:"ALL",
						month_category:mon+"-B",
						year_category:yer,
						last_n_value:"",
						calendar_months:"6",
						expensedescription:"OverAllMonthlyExpense"
					}),
	     			dataType: "json",
	     			type: 'POST',
	     			cache: false,
	     			timeout:parseInt(els.get('calltimeout')),
	     			success : function(data)
	     			{
	     				if(ackStatus == "00000")
	     				{
							onDataHandler(data);
							hideSpinner();
	     				}else{
	     					onErrorHandler(data);
	     					hideSpinner();
	     				}
	     			},
	     			error:onErrorHandler
	     		});
			   return this;

			   }
	    		
	        },
	        renderSuccess:function(mon)
	        {
	        	
	        	var catList = els.get("categorysList");
	        	if(catList.length>0)
	        		els.set("budget_Month_Year",catList[0].monthDesc+","+catList[0].year_value);
	        	else{
	        		var tody = new Date();
	    			mon = getMonthNameShrt( (tody.getMonth()+1) +"" );
	    			mon = mon.toUpperCase();
	    			yer = tody.getFullYear();
	        		els.set("budget_Month_Year",mon+","+yer);
	        	}
	        	console.log("Inside header render..........");
			    this.$el.html(_.template(budgetsTemplate,{mon:mon})).i18n();
			    $("#screentitle").text($.i18n.t('app.smartbudget.general.budgets'));
			    $("#bdywrap").addClass('noFooter');
	 		    $("#loginfooter").show();
			    var footer = new budgetsFooter();
			    footer.render();

			
			    return this;
			},
			montlyreports:function(){
				var cateID = $("#cateID").val();
				var cateDesc = $("#cateDesc").val();
				els.set("chartOptionVal",cateID + "," + 'M' + "," + cateDesc);
				Backbone.history.navigate("#/categoryexpensesreport");
			},
			addOneMoreBudget:function(){

					//Backbone.history.navigate("#/addnewbudget");
					
					/*var that = this;
		  			var onDataHandler = function(collection) {
		  				hideSpinner();
		  				that.renderSuccess();
		  			};
		  			var onErrorHandler = function(collection) {
		  				hideSpinner();
		  				console.log("Error here budget.js-Dashboard");
		  				//that.errorresponse();
		  			};
		        	that.collection= new dashboardBandECollections();
		        	var deviceId=getDeviceId();
		        	showSpinner();
		        	
		        	var i_id,i_cust_id,i_budget,i_month_sdesc,i_year_value,i_action_flag;
		        	i_cust_id = "1605632";
		        	
		            that.collection.fetch({
						data : $.param({
							
							i_id:i_id,
							i_cust_id:i_cust_id,
							i_budget:i_budget,
							i_month_sdesc:i_month_sdesc,
							i_year_value:i_year_value,
							i_action_flag:i_action_flag
						}),
		     			dataType: "json",
		     			type: 'POST',
		     			cache: false,
		     			timeout:parseInt(els.get('calltimeout')),
		     			success : function(data)
		     			{
		     				if(ackStatus == "00000")
		     				{
								onDataHandler(data);
								hideSpinner();
		     				}else{
		     					onErrorHandler(data);
		     					hideSpinner();
		     				}
		     			},
		     			error:onErrorHandler
		     		});*/

			},
			editBudgets:function(){
	        	 var footer = new editBudgets();
	  		    footer.render();
	  		    return this;
	        },
	        errorresponse: function(){
        	hideSpinner();
        	Backbone.history.navigate("#/exception");
        }

		});

//Footer Content
		var budgetsFooter = Backbone.View.extend({
	 		el:'#loginfooter',
			events:{
				"click #budgetsFooterId":"addNewBudget",
				"click #butCancelLaterUser":"butCancelLaterUser",
				"click #butSaveUserBudget":"butSaveUserBudget"
	        },
	        render:function()
			{
	        	console.log("Inside Footer render.........."+els.get("emflag"));
	        	this.$el.html(_.template(budgetsFooterTemplate)).i18n();

	        	var catList = els.get("categorysList");
	        	if(catList.length>0)
	        		
	        	if(els.get("emflag")!="N")
	        	{
	        		$("#atLeastOneBudget").hide();
					$("#categorySameError").hide();
	        		console.log("inside render");
					$(".modal-backdrop").remove();	
			        //this.$("#addBugetNewUserFooter").html(_.template(addBudgetNewUser)).i18n(); //bind the common template
					console.log("add budget new user popup");
					//$("#addBudgetModelNewUser").modal({backdrop: 'static'}); //invoke the modal
					//$("#addBudgetModelNewUser").show();	
	        	}
	        	

	        	return this;
	        },
			butCancelLaterUser:function(){
				$('#addBudgetModelNewUser').modal('hide');   // close the modal window
	        	$(".modal-backdrop").remove(); 		// fade-out modal layer
				$("#addBudgetModelNewUser").unbind();
				$("#addBudgetModelNewUser").remove();
			},
			butSaveUserBudget:function(){
				console.log("save budget");
				$("#atLeastOneBudget").hide();
				$("#categorySameError").hide();	

				var amounts = $("input[name='amount[]']")
              .map(function(){return $(this).val();}).get();

              var categories = $("select[name='categorynew[]']")
              .map(function(){return $(this).val();}).get();



				var valueArr = categories.map(function(item){ return item });

				var isDuplicate = valueArr.some(function(item, idx){ 
				    return valueArr.indexOf(item) != idx 
				});
				console.log("isDuplicate===> ",isDuplicate);


				var atleastAmount=false;
				var cateObj={};
				var addNewAmounts=[];
				var addNewCategory=[];
				var i_id=[];
				var ol=1;

					if(!isDuplicate)
					{
						for(kj=0;kj<categories.length;kj++)
						{
							if(!isNaN(amounts[kj]))
							{
								if(amounts[kj]>0)
								{
									addNewAmounts.push(amounts[kj].toString());
									addNewCategory.push(categories[kj].toString());
									//cateObj.push({"categoryId":,"cateAmount":})
									atleastAmount=true;
									var abc=ol++;
									i_id.push(abc.toString());
								}
							}
						}	
					}else{

						$("#categorySameError").show();
						console.log("Category Duplicate Error show");
						return false;
					}

				//atleast one budget is selected or not checking here
				console.log(atleastAmount);
				if(atleastAmount)
				{
					$("#atLeastOneBudget").hide();
					console.log("proceed with the call",addNewAmounts,addNewCategory);
					this.saveNewUserBudgets(addNewAmounts.join(','),addNewCategory.join(','),i_id.join(','));
				}else{
					$("#atLeastOneBudget").show();
					console.log("Atleast one budget should be selected");
					return false;;
				}

		},
			saveNewUserBudgets:function(amounts,categoryIds,i_id){
			$("#failureMessage").hide();
        	var that = this;
        	var flag="I"; //I for adding new budget
          
  			var onDataHandler = function(collection) {

  				$('#addBudgetModelNewUser').modal('hide');   // close the modal window
	        	$(".modal-backdrop").remove(); 		// fade-out modal layer
				$("#addBudgetModelNewUser").unbind();
				$("#addBudgetModelNewUser").remove();

  				els.set("emflag","Y");
  				var header1 = new smart_budgets();
    			header1.render();
    				
  				//hideSpinner();
  				//that.renderSuccess();
  				//Backbone.history.navigate("#/budgets");
  			};
  			var onErrorHandler = function(collection) {
  				hideSpinner();
  				console.log("Error here budget.js-Dashboard");
  				if(ackStatus=="8888")
  				{
  					that.errorresponse();
  				}else{
  					$("#failureMessage").show();
  					return false;
  				}
  				//
  			};
        	that.collection= new addNewBudgetCollections();
        	var deviceId=getDeviceId();
        	showSpinner();
        	
        	var i_id,i_cust_id,i_budget,i_month_sdesc,i_year_value,i_action_flag,i_category_id;


        	i_id="1";
        	i_cust_id = els.get("customerID_EM");
        	var monthyear=els.get("budget_Month_Year");//$("#monthandyear").val();
        	i_month_sdesc=monthyear.split(",")[0];
        	i_year_value=monthyear.split(",")[1];
        	i_action_flag=flag;

        	i_budget=categoryIds;//Category IDs
        	i_amount=amounts;//amounts

        	that.collection.fetch({
				data : $.param({
					i_id:i_id,
					i_cust_id:i_cust_id,
					i_category_id:i_budget,
					i_budget:i_amount,
					i_month_sdesc:i_month_sdesc,
					i_year_value:i_year_value,
					i_action_flag:i_action_flag
				}),
     			dataType: "json",
     			type: 'POST',
     			cache: false,
     			timeout:parseInt(els.get('calltimeout')),
     			success : function(data)
     			{
     				if(ackStatus == "00000")
     				{
						onDataHandler(data);
						//hideSpinner();
     				}else{
     					onErrorHandler(data);
     					hideSpinner();
     				}
     			},
     			error:onErrorHandler
     		});
        },
	        addNewBudget:function()
	        {
	        	Backbone.history.navigate("#/addnewbudget");
	        	/*var header1 = new smart_budgets();
	        	header1.addOneMoreBudget();*/
	    	},
	    	errorresponse: function(){
        	hideSpinner();
        	Backbone.history.navigate("#/exception");
        }
	        
		});
		return smart_budgets;
	
});