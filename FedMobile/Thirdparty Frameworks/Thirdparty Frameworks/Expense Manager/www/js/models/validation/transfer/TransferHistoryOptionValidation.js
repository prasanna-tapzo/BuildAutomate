define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var withinAccountTransferValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
    			/*paymentAmount: [{
      				required: true,
     				msg: "validation.transfer.amountisnotnull"
    				},{
      				pattern: 'number',
      				msg: "validation.transfer.validamount"
    				}
    			],*/
    			fromTransferDate: {
     				required: true,
    				msg: "validation.transfer.startdate"
    			},
    			/*transferType:{
					oneOf: ['All','Own Account','Within SHB','Local Transfers','International Transfers','Charity Transfers'],
	    			msg: "app.transfer.transferhistory.selecttranstype"
    			},*/
    			toTransferDate: {
     				required: true,
    				msg: "validation.transfer.enddate"
    					
    			},
    			fromAccountId: {
     				fromtoaccountvalidation: true,
    				msg: "validation.transfer.fromtoaccountmsg"
    			},
    			sariebank: {
     				fromtoaccountvalidation: true,
    				msg: "validation.transfer.fromtoaccountmsg"
    			}
    		},
  			initialize: function(props){		
				this.url = props.url;			
			}
		});
    return withinAccountTransferValidationModel;
});