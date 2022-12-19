define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var TrHistoryBeneValidation = Backbone.Model.extend({
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
    			beneficiaryName: {
     				required: true,
    				msg: "validation.transfer.beneName"
    			},
    			beneficiaryAccNo: {
     				required: true,
    				msg: "validation.transfer.beneactName"
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
    return TrHistoryBeneValidation;
});