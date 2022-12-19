define(['underscore', 'Backbone'], 
	function(_, Backboner) {
		var moiValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {    			
  				saudipassports: {
	     			required: true,
	    			msg: "validation.moi.saudinotnull"
    			},
    			VisaNumber: {
	      			required: true,
	     			msg: "validation.moi.visanumbernotnull"
    			},
    			BorderNumber:{
	      			required: true,
	     			msg: "validation.moi.bordernumbernotnull"
    			},
    			CitizenID:{
	      			required: true,
	     			msg: "validation.moi.citizenidnotnull"
    			},
    			DependentCount:{
	      			required: true,
	     			msg: "validation.moi.dependentcountnotnull"
    			},
    			Household:{
	      			required: true,
	     			msg: "validation.moi.householdnotnull"
    			},
    			Job_Category:{
	      			required: true,
	     			msg: "validation.moi.jobcategorynotnull"
    			},
    			IqamaTime:{
	      			required: true,
	     			msg: "validation.moi.iqamatimenotnull"
    			},
    			MotorType:{
	      			required: true,
	     			msg: "validation.moi.motortypenotnull"
    			},
    			BodyType:{
	      			required: true,
	     			msg: "validation.moi.bodytypenotnull"
    			},
    			NewRegistrationType:{
	      			required: true,
	     			msg: "validation.moi.newregtypenotnull"
    			},
    			SequenceNumber:{
	      			required: true,
	     			msg: "validation.moi.sequencenonotnull"
    			},
    			NewOwnerID:{
	      			required: true,
	     			msg: "validation.moi.newowneridnotnull"
    			},
    			CurrentOwnerID:{
	      			required: true,
	     			msg: "validation.moi.currentowneridnotnull"
    			},
    			CustomCardNumber:{
	      			required: true,
	     			msg: "validation.moi.customcardnonotnull"
    			},
    			CivilRegistration:{
	      			required: true,
	     			msg: "validation.moi.civilregistrationnotnull"
    			},
    			DateOfBirth:{
	      			required: true,
	     			msg: "validation.moi.dobnotnull"
    			},
    			DateOfDeath:{
	      			required: true,
	     			msg: "validation.moi.dodnotnull"
    			},
    			DateOfDivorce:{
	      			required: true,
	     			msg: "validation.moi.dodvnotnull"
    			},
    			DateOfLoss:{
	      			required: true,
	     			msg: "validation.moi.dolnotnull"
    			},
    			DateOfMarriage:{
	      			required: true,
	     			msg: "validation.moi.domnotnull"
    			},
    			DeportionControl:{
	      			required: true,
	     			msg: "validation.moi.deportioncontrolnotnull"
    			},
    			DeportionSentences:{
	      			required: true,
	     			msg: "validation.moi.deportionsentsnotnull"
    			},
    			DeporteeID:{
	      			required: true,
	     			msg: "validation.moi.deporteeidnotnull"
    			},
    			Saudi_Passport:{
	      			required: true,
	     			msg: "validation.moi.saudipassportsnotnull"
    			},
    			PassportType:{
	      			required: true,
	     			msg: "validation.moi.passporttypenotnull"
    			},
    			
    			LaborImportation:{
	      			required: true,
	     			msg: "validation.moi.labornotnull"
    			},
    			Visano:{
	      			required: true,
	     			msg: "validation.moi.visanonotnull"
    			},
    			VisaType:{
	      			required: true,
	     			msg: "validation.moi.visatypenotnull"
    			},
    			LicenceType:{
	      			required: true,
	     			msg: "validation.moi.licencetypenotnull"
    			},
    			Licence:{
	      			required: true,
	     			msg: "validation.moi.licencenotnull"
    			},
    			LicenseDuration:{
	      			required: true,
	     			msg: "validation.moi.licensetimenotnull"
    			},
    			LicenceID:{
	      			required: true,
	     			msg: "validation.moi.licenceidnotnull"
    			},
    			IqamaNumber:{
	      			required: true,
	     			msg: "validation.moi.iqamanumbernotnull"
    			},
    			SponsorID:{
	      			required: true,
	     			msg: "validation.moi.sponsorIDnotnull"
    			},
    			NationalID:{
	      			required: true,
	     			msg: "validation.moi.nationalidnotnull"
    			},
    			ServiceType:{
	      			required: true,
	     			msg: "validation.moi.iqamaIDnotnull"
    			},
    			ViolationID:{
	      			required: true,
	     			msg: "validation.moi.violIDnotnull"
    			},
    			
    			ApplicationType:{
	      			required: true,
	     			msg: "validation.moi.apptypenotnull"
    			},
    			
    			TrafficApplicationType:{
	      			required: true,
	     			msg: "validation.moi.trafapptypenotnull"
    			},
    			IqamaID:{
	      			required: true,
	     			msg: "validation.moi.iqamaIDnotnull"
    			}
    		},    
  			initialize: function(props){
				this.url = props.url;
			}
		});
    return moiValidationModel;
});
