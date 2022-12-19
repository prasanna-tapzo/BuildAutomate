define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var familyvisaModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
    			birthDate: {
     				required: true,
    				msg: "validation.moi.birthdate"
    			},
    			nationalIdNumber: {
     				required: true,
    				msg: "validation.moi.nationalidnumber"
    			},
    			deathDate: {
     				required: true,
    				msg: "validation.moi.deathdate"
    			},
    			marriageDate: {
     				required: true,
    				msg: "validation.moi.marriagedate"
    			},
    			divorceDate: {
     				required: true,
    				msg: "validation.moi.divorcedate"
    			},
    			dateOfLoss: {
     				required: true,
    				msg: "validation.moi.lostdate"
    			},
    			noofVisas: {
     				required: true,
    				msg: "validation.moi.noofvisas"
    			},
    			sponserId: {
     				required: true,
    				msg: "validation.moi.sponserid"
    			},
    			borderNumber: {
     				required: true,
    				msg: "validation.moi.bordernumber"
    			},
    			beneficiaryId: {
     				required: true,
    				msg: "validation.moi.beneficiaryid"
    			},
    			type: {
     				required: true,
    				msg: "validation.moi.type"
    			},
    			accountNumber: {
     				required: true,
    				msg: "validation.moi.accountnumber"
    			},
    			citizenId: {
     				required: true,
    				msg: "validation.moi.citizenid"
    			},
    			vehicleSequenceNumber: {
     				required: true,
    				msg: "validation.moi.vehiclesequencenumber"
    			},
    			currentOwnerId: {
     				required: true,
    				msg: "validation.moi.currentownerid"
    			},
    			newOwnerId: {
     				required: true,
    				msg: "validation.moi.newownerid"
    			}
    			
    			
    			
    		},
  			initialize: function(props){		
				this.url = props.url;			
			}
		});
    return familyvisaModel;
});