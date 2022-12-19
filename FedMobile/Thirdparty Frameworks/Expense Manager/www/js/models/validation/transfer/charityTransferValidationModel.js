define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var charityTransferValidationModel = Backbone.Model.extend({
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
    			/*paymentRemarks: {
     				required: true,
    				msg: "validation.transfer.remarksisnotnull"
    			},*/
    			fromAccountId: {
     				fromtoaccountvalidation: true,
    				msg: "validation.transfer.fromtoaccountmsg"
    			},
    			payDate: {
    				required: true,
    				msg: "validation.transfer.paydateempty"
    			}  			
    			
    		},
  			initialize: function(props){		
				this.url = props.url;			
			}
		});
    return charityTransferValidationModel;
});