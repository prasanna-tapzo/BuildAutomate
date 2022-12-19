define(['jquery', 'underscore', 'Backbone'
	        , 'text!views/budget/budgets/add_new_budget.tpl'
	        , 'text!views/budget/budgets/add_new_budgetFooter.tpl'
	        , 'collections/budget/addNewBudgetCollections'
        
        ],
function ($, _, Backbone
			,addNewBudgetTemplate
			,addNewBudgetFooterTemplate
			,addNewBudgetCollections
		) {
	var els = new EncryptedLocalStorage('secret'); 
	
	//Body Content 
	var budget_AUD_Header = Backbone.View.extend({
		el:'#mobcontent',
		events:{
				
        },
		initialize:function(){
       	},
        render:function()
		{
        	console.log("Inside fundTransfer render..........");
		    this.$el.html(_.template(addNewBudgetTemplate,{hparam:"N",})).i18n();
		    $(".back_butt").show();
		    //$("#screentitle").text($.i18n.t('app.smartbudget.general.AddNewBudget'));
        $("#failureMessage").hide();
		    var footer = new budget_AUD_Footer();
		    footer.render();
		    return this;
        },
        update:function(amt,desc,id){
        	console.log("Inside fundTransfer render..........");
		    this.$el.html(_.template(addNewBudgetTemplate,{hparam:"U",amt:amt, catdesc:desc ,catid:id})).i18n();
		    $(".back_butt").show();
		    //$("#screentitle").text($.i18n.t('app.smartbudget.general.EditBudget'));
        $("#failureMessage").hide();
		    var footer1 = new budget_AUD_Footer();
		    footer1.update();
		    return this;
        },
        addNewBudget:function(flag){
        	var that = this;
          $("#failureMessage").hide();
          var budgetamount = $("#budgetamount").val();
          
          if((isNaN(budgetamount) || budgetamount <= 0) && flag!="D")
          {
            $("#budgetValidAmount").show();
            console.log("Please enter a valid amount");
            return false;
          }
          $("#budgetValidAmount").hide();

          console.log("budget amount -----> ",$("#budgetamount").val());

  			var onDataHandler = function(collection) {
  				hideSpinner();
  				//that.renderSuccess();
          if(flag== "I") {
            $("#addBudgetModel").modal('show'); 
            $("#addBtn").unbind('click');
            $("#addBtn").click(function() {
              Backbone.history.navigate("#/budgets");
            });
          }
          if(flag == "U") {
            $("#editBudgetModel").modal('show'); 
            $("#updateBtn").unbind('click');
            $("#updateBtn").click(function() {
              Backbone.history.navigate("#/budgets");
            });
          }
          if(flag == "D") {
  				  Backbone.history.navigate("#/budgets");
          }
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
  				//that.errorresponse();
  			};
        	that.collection= new addNewBudgetCollections();
        	var deviceId=getDeviceId();
        	showSpinner();
        	
        	var i_id,i_cust_id,i_budget,i_month_sdesc,i_year_value,i_action_flag,i_category_id;
        	i_id="1";
        	i_cust_id = els.get("customerID_EM");
        	var monthyear=$("#monthandyear").val();
        	i_month_sdesc=monthyear.split(",")[0];
        	i_year_value=monthyear.split(",")[1];
        	i_action_flag=flag;
        	if(i_action_flag=="I")
        		i_budget=$("#newcatlist option:selected").val();
        	else
        		i_budget=$("#newcatlist").val();
        	i_amount=$("#budgetamount").val();
        	//i_category_id=
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
						hideSpinner();
     				}else{
     					onErrorHandler(data);
     					hideSpinner();
     				}
     			},
     			error:onErrorHandler
     		});
        },
        errorresponse: function(){
          hideSpinner();
          Backbone.history.navigate("#/exception");
        }
	});
	//Footer Content
	var budget_AUD_Footer = Backbone.View.extend({
 		el:'#loginfooter',
		events:{
			//"click #budgetsFooterId":"initiateFav",
			"click #newBudgetSaveId":"saveNewBudget",
			"click #editBudget":"editBudget",
			"click #deleteBudget":"deleteBudget"
        },
      
        render:function()
		{
        	console.log("Inside addNewBudgetFooter render..........");
        	this.$el.html(_.template(addNewBudgetFooterTemplate,{fotparam:"N"})).i18n();
        	return this;
        },
        update:function()
        {
        	console.log("Inside addNewBudgetFooter render..........");
        	this.$el.html(_.template(addNewBudgetFooterTemplate,{fotparam:"U"})).i18n();
        	return this;
        },
        /*initiateFav:function()
        {
        	els.set("isOtporMPIN","mpin");
			this.$("#otpModalinFooter").html(_.template(accountsRenameTemplate)).i18n(); //bind the common template
			console.log("OTP TEMPLATE2");
			$("#accountsedit").modal({backdrop: 'static'}); //invoke the modal
			$("#accountsedit").show();
    	},*/
    	saveNewBudget:function(){
    		var header1 = new budget_AUD_Header();
    		header1.addNewBudget("I");
    	},
    	editBudget:function(){
    		var header2 = new budget_AUD_Header();
    		header2.addNewBudget("U");
    	},
    	deleteBudget:function(){
    		var header3 = new budget_AUD_Header();
        $("#deleteBudgetModel").modal('show');
        $("#deleteConfirmBtn").unbind("click");
        $("#deleteConfirmBtn").click(function(){
          header3.addNewBudget("D");
        });
        $("#deleteCancelBtn").unbind("click");
        $("#deleteCancelBtn").click(function(){
          $("#deleteBudgetModel").modal('hide');
        });
    		//
    	}     
	});
	return budget_AUD_Header;
	
});