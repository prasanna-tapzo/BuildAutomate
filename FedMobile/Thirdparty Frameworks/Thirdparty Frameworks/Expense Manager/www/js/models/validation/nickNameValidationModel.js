define(['underscore', 'Backbone'], 
	function(_, Backboner) {
		var nickNameValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
			nickname:{
				required:true,
				msg:"validation.activatecc.nicknamenotnull"
			},
			nicknameid:{
				required:true,
				msg:"validation.activatecc.nicknamenotnull"
			}
    		},    
  			initialize: function(props){	
  				this.url = props.url;			
			}
		});
    return nickNameValidationModel;
});