define(['jquery', 'underscore', 'Backbone',
        'text!views/budget/accounts/splitTransactionEdit.tpl',
        'text!views/budget/accounts/splitTransactionEditFooter.tpl'
        ,'collections/budget/splitTransactionCollections'

],
        
function ($, _, Backbone,
		splitTransactionEditTemplate,
		splitTransactionEditFooterTemplate
		,splitTransactionCollections
		) {
	var els = new EncryptedLocalStorage('secret'); 
	
	//Body Content 
	var splitTransactionHeader = Backbone.View.extend({	 		
		el:'#mobcontent',
		events:{

		},
		initialize:function(){
       	},
        render:function()
		{	
        	this.renderSuccess();	
        },
        renderSuccess:function()
        {
        	console.log("Inside accounts render..........");
		    this.$el.html(_.template(splitTransactionEditTemplate)).i18n();
		    $("#screentitle").text($.i18n.t('app.smartbudget.general.splitTransaction'));
         $("#failureMessage").hide();
		    var footer = new splitTransactionFooter();
		    footer.render();
		    return this;
		},
		saveSplitTxn:function(){
       $("#failureMessage").hide();
			$("#errorTxt").text("");
			$("#errorTxt").hide();
			var txnAmtArr="";
    		var txnCatArr="";
    		var txnOrdArr="";
    		var txnAmt,txncate,txnorder;
    		txnorder = 1;
    		var ATMTXN = els.get("ATMTXN");
    		var repleatflag = false;
    		
    		var numofrec = $("#numofrec").val();
    		console.log("saveSplitTxn : numofrec : "+ numofrec);
    		for(var i=0;i<numofrec+1;i++){
    			txnAmt = $("#splitTxnAmt_"+i).val();
    			console.log(i+ " : saveSplitTxn : txnAmt : "+ txnAmt);
    			/*if(txncate==""){
    				break;
    			}*/
    			if( !(txnAmt =="" || txnAmt == null || txnAmt==undefined || txnAmt == "undefined" ))
    			{
    				txncate = $("#splitCombo_"+i+" option:selected").val();
    			
	    			//if(txncate !="27")
	    			//{
		    			if(txnAmt!="")
		    			{
		    				if(txnorder==1){
		    					txnAmtArr = txnAmt;
		    					txnCatArr = txncate;
		    					txnOrdArr = txnorder+"B"; 
		    				}else{
		    					if(txnCatArr.indexOf(txncate) != -1){
		    						repleatflag = true;
		    					}
		    					txnAmtArr += "," + txnAmt;
		    					txnCatArr += "," + txncate;
		    					txnOrdArr += "," + txnorder;
		    				}
		    				txnorder++;
		    			}
	    			//}
    			}
    		}
    		var splitComboTot = $("#splitComboTot option:selected").val();
    		var splitTxnAmtTot = $("#splitTxnAmtTot").val();
    		var splitTxnAmtTot_T="";
    		if(splitTxnAmtTot.indexOf(",")!=-1){
    			splitTxnAmtTotarr = splitTxnAmtTot.split(",");
    			for(var xx=0;xx<splitTxnAmtTotarr.length;xx++){
    				splitTxnAmtTot_T += splitTxnAmtTotarr[xx];
    			}
    			splitTxnAmtTot = splitTxnAmtTot_T;
    		}
    		if(txnAmtArr.length>0){
    			txnAmtArr += "," + splitTxnAmtTot;
    		}else{
    			txnAmtArr += splitTxnAmtTot;
    		}
    		if(txnCatArr.length>0){
    			txnCatArr += "," + splitComboTot;
    		}else{
    			txnCatArr += splitComboTot;
    		}
    		if(txnOrdArr.length>0){
    			txnOrdArr += "," + txnorder;
    		}else{
    			txnOrdArr += "1";
    		}
    		console.log("txnAmtArr............."+txnAmtArr);
    		console.log("txnCatArr............."+txnCatArr);
    		console.log("txnOrdArr............."+txnOrdArr);
    		var catefalg=true;
    		if(txnCatArr.length>0){
    			var cateArr = txnCatArr.split(",");
    			for(var a=0;a<cateArr.length;a++){
    				if(cateArr[a].length<=0){
    					catefalg=false;
    				}
    			}
    		}else{
    			catefalg=false;
    		}
    		console.log("saveSplitTxn : catefalg : "+ catefalg);
    		if(!catefalg){
	    		$("#errorTxt").text("Please select a category.");
				$("#errorTxt").show();
				return;
    		}
    		if(txnOrdArr==""){
    			$("#errorTxt").text("Amount should not be empty.");
    			$("#errorTxt").show();
    			return;
    		}
    		if(repleatflag==true){
    			$("#errorTxt").text("Category can not be same for more than one transaction.");
    			$("#errorTxt").show();
    			return;
    		}
    		var hid_amt_exists = $("#hid_amt_exists").val();
    		if(hid_amt_exists=="Y"){
    			$("#errorTxt").text("Total amount should not be greater than transaction amount.");
    			$("#errorTxt").show();
    			return;
    		}
    		var totamt=0;
    		if(txnAmtArr.length>0){
	    		var aMTAcc = ATMTXN.split(",")[2];
	    		var amtArr = txnAmtArr.split(",");
	    		for(var ij=0;ij<amtArr.length;ij++){
	    			totamt += parseFloat(amtArr[ij]);
	    		}
	    		if(totamt > parseFloat(aMTAcc)){
	    			$("#errorTxt").text("Total amount should not be greater than transaction amount.");
	    			$("#errorTxt").show();
	    			return;
	    		}
    		}    		

       var split_seq_check= txnOrdArr.split(",");
       if(split_seq_check.length<2)
       {
        txnOrdArr=txnOrdArr+"B";
       }

			console.log("===========> txnAmtArr : "+ txnAmtArr + " : txnCatArr : " + txnCatArr + " :  txnOrdArr : " + txnOrdArr +" : repleatflag : "+repleatflag);

			var that = this;
  			var onDataHandler = function(collection) {
  				hideSpinner();
  				//that.splitTxnSuccess();
  				 $("#splitTransactionEditModel").modal("show");
   				var goBackScreen = els.get("goBackScreen");
   				$("#addSplitEditTransactionBtn").unbind("click");
   				$("#addSplitEditTransactionBtn").click(function() {         
	  				if(goBackScreen=="DASHBOARD"){
	  					els.set("goBackScreen","");
	  					Backbone.history.navigate("#/smartBudget");
	  				}else{
	  					els.set("goBackScreen","");
	  					Backbone.history.navigate("#/budgetCategorise/"+els.get("acct_nick_name")+"/"+els.get("acct_id"));
	  				}
   				});
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
  			var txnID = ATMTXN.split(",")[1];
        	that.collection= new splitTransactionCollections();
        	var deviceId=getDeviceId();
        	showSpinner();
            that.collection.fetch({
				data : $.param({
					transction_Id:txnID,
					split_seq_id:txnOrdArr,
					category_Id:txnCatArr,
					i_amount:txnAmtArr
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
	var splitTransactionFooter = Backbone.View.extend({
 		el:'#loginfooter',
		events:{
			//"click #accountsid":"initiateFav",
			//"click #accountsid":"gotoSubmit"
			"click #submiteditsplittrans":"submitsplittrans"
			
				
        },
        render:function()
		{
        	console.log("Inside splitTransactionFooterTemplate render..........");
        	this.$el.html(_.template(splitTransactionEditFooterTemplate)).i18n();
        	return this;
        },
    	submitsplittrans:function(){
    		
    		var header1 = new splitTransactionHeader(); 
    		header1.saveSplitTxn();
    		//console.log($("#splitTxnAmt").val() + " ;;;;;;;;; " + $("#splitTxnAmt")[1].val() );
    		//Backbone.history.navigate("#/budgetCategorise");
	    }
	    
        
	});
	return splitTransactionHeader;
	
});