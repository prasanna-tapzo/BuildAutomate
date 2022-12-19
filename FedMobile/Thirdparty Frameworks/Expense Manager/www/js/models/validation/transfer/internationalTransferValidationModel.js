define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var internationalTransferValidationModel = Backbone.Model.extend({
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
    			/*SwiftCode:{
      				required: true,
     				msg: "app.transfer.internationaltransfer.swiftcodenull"
    			},*/
    			paymentRemarks: {
     				required: true,
    				msg: "validation.transfer.remarksisnotnull"
    			},
    			fromAccountId: {
     				fromtoaccountvalidation: true,
    				msg: "validation.transfer.fromtoaccountmsg"
    			},
    			purposetransfer:{
    				required:true,
    				msg: "validation.transfer.purposetransfernull"
    			},
    			/*payDate: {
    				required: true,
    				msg: "validation.transfer.paydateempty"
    			},*/
    			startDate: {
     				required: true,
    				msg: "validation.transfer.startdate"
    			},
    			endDate: {
     				required: true,
    				msg: "validation.transfer.enddate"
    			},
    		},
  			initialize: function(props){		
				this.url = props.url;			
			}
		});
    return internationalTransferValidationModel;
});