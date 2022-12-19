define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var siCommonValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
  				transferAmt: [{
      				required: true,
     				msg: "validation.transfer.amountisnotnull"
    				},{
      				pattern: 'number',
      				msg: "validation.transfer.validamount"
    				}
    			],
    			startDate: {
     				required: true,
    				msg: "validation.transfer.startdate"
    			},
    			endDate: {
     				required: true,
    				msg: "validation.transfer.enddate"
    			},
    			freqList: {
     				required: true,
    				msg: "validation.transfer.freqList"
    			},
    			frmAct: {
     				required: true,
    				msg: "validation.transfer.fromact"
    			},
    			toAct: {
     				required: true,
    				msg: "validation.transfer.toact"
    			},
    			paymentAmount: [{
      				required: true,
     				msg: "validation.transfer.amountisnotnull"
    				},{
      				pattern: 'number',
      				msg: "validation.transfer.validamount"
    				}
    			],
    			SwiftCode:{
      				required: true,
     				msg: "app.transfer.internationaltransfer.swiftcodenull"
    			},
    			/*paymentRemarks: {
     				required: true,
    				msg: "validation.transfer.remarksisnotnull"
    			},*/
    			
    			purposetransfer:{
    				required:true,
    				msg: "validation.transfer.purposetransfernull"
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
    return siCommonValidationModel;
});