define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var localTransferValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
    			paymentAmount: [{
      				required: true,
     				msg: "validation.transfer.amountisnotnull"
    				},{
      				pattern: 'number',
      				msg: "validation.transfer.validamount"
    				}
    			],
    			transferAmt: {
     				required: true,
    				msg: "validation.transfer.amountisnotnull"
    			},
    			fromAccountId: {
     				fromtoaccountvalidation: true,
    				msg: "validation.transfer.fromtoaccountmsg"
    			}
    		},
  			initialize: function(props){		
				this.url = props.url;			
			}
		});
    return localTransferValidationModel;
});