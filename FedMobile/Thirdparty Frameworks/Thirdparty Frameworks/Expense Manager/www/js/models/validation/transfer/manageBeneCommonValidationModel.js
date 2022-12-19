define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var manageAddBeneValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
  				beneAcno: [{
      				required: true,
     				msg: "validation.transfer.beneactnoisnotnull"
    				},{
      				/*pattern: 'number',
      				msg: "validation.transfer.validbeneactno"*/
    				}
    			],
    			benewithAcno: [{
      				required: true,
     				msg: "validation.transfer.beneactnoisnotnull"
    				},{
      				pattern: 'number',
      				msg: "validation.transfer.validbeneactno"
    				}
    			],
    			beneName: {
     				required: true,
    				msg: "validation.transfer.benenameisnotnull"
    			},
    			beneNicknName: {
     				required: true,
    				msg: "validation.transfer.benenicknameisnotnull"
    			},
    			benfyName: {
     				required: true,
    				msg: "validation.transfer.benenameisnotnull"
    			},
    			benfyAd1: {
     				required: true,
    				msg: "validation.transfer.benfyAd1isnotnull"
    			},
    			benfyAd2: {
     				required: true,
    				msg: "validation.transfer.benfyAd2isnotnull"
    			},
    			bankName: {
     				required: true,
    				msg: "validation.transfer.bankNameisnotnull"
    			},
    			bankCity: {
     				required: true,
    				msg: "validation.transfer.bankCityisnotnull"
    			},
    			/*bankCountry: {
     				required: true,
    				msg: "validation.transfer.bankCountryisnotnull"
    			},*/
    			beneIban: {
     				required: true,
    				msg: "validation.transfer.bankacctibanisnotnull"
    			},
    			beneCurr: {
     				required: true,
    				msg: "validation.transfer.bankacctcurrisnotnull"
    			},
    			bankSwift: {
     				required: true,
    				msg: "validation.transfer.bankswiftcodeisnotnull"
    			}
    		},
  			initialize: function(props){
				this.url = props.url;			
			}
		});
    return manageAddBeneValidationModel;
});