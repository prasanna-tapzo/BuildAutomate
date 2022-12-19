define(['underscore', 'Backbone'], 
	function(_, Backboner) {
		var creditCardLimitValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
  			newlimit: {
    			
     			required: true,
    			msg: "validation.cclimit.limitnotnull"
			},
			reason: {
     			required: true,
    			msg: "validation.cclimit.reasonnotnull"
			},
		 /*  increaseLimit: {
     			oneOf: ['$.i18n.t("app.creditcard.cclimit.permanent")','$.i18n.t("app.creditcard.cclimit.temporary") '],
    			msg: "validation.cclimit.increaselimitnotnull"
			},*/
			currency: [{
  				required: true,
 				//msg: "validation.cclimit.transamtnotnull"
  				msg: "validation.cclimit.transamtnotnull"
				},{
  				pattern: 'number',
  				msg: "validation.transfer.validamount"
				}
			],
			transAmt: [{
  				required: true,
 				msg: "validation.cclimit.transamtnotnull"
				},{
  				pattern: 'number',
  				msg: "validation.transfer.validamount"
				}
			],
			remarks: {
				required: true,
				msg: "validation.cclimit.remarksnotnull"
			},
			/*payRemarks: {
				required: true,
				msg: "validation.cclimit.payremarksnotnull"
			},*/
			payDate: {
				required: true,
				msg: "validation.cclimit.paydatenotnull"
				}
		},
	
    	 initialize: function(props){		
				this.url = props.url;			
			}
		});
    return creditCardLimitValidationModel;
});