define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var withinAccountTransferValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
  				/*paymentAmount: [
    			                {
      				required: true,
     				msg: "validation.transfer.amountisnotnull"
    				},
    				{
      				pattern: 'number',
      				msg: "validation.transfer.validamount"
    				}
    			],*/
    			/*beneficiaryName:{
    				required: true,
    				msg: "validation.transfer.benenameisnotnull"
    			},
    			beneficiaryAccNo:{
    				required: true,
    				msg: "validation.transfer.beneactnoisnotnull"
    			},*/
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