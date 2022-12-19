define(['underscore', 'Backbone'], 
	function(_, Backboner) {
		var activateCreditCardValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
  				shbcardno: [{
  	  				required: true,
  	 				msg: "validation.activatecc.cardnonotnull"
  					},{
  	  				pattern: 'number',
  	  				msg: "validation.activatecc.cardnonotnumber"
  					}
  				],
			otpValue: {
  				required: true,
 				msg: "validation.cclimit.paynowotpisnotnull"
				},
    			
  			month: {
     			required: true,
    			msg: "validation.activatecc.monthnotnull"
			},
			year: {
     			required: true,
    			msg: "validation.activatecc.yearnotnull"
			},
			nickname:{
				required:true,
				msg:"validation.activatecc.nicknamenotnull"
			},
			cardpin:{
				required:true,
				msg:"validation.activatecc.cardpinnotnull"
			},
			confirmpin:{
				required:true,
				msg:"validation.activatecc.newcardpinnotnull"
			},
			
    		},    
  			initialize: function(props){	
  				this.url = props.url;			
			}
		});
    return activateCreditCardValidationModel;
});