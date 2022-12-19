_.extend(Backbone.Validation.validators, {
  fromtoaccountvalidation: function(value, attr, customValue, model) {  
  var fromAccountIdVal = "";
  var toAccountVal = "";
  var fromAccountId = "";
  var toAccountId = "";
  var fromAccountIdVersion = "";
  var toAccountIdVersion = "";
  fromAccountIdVal = $('#fromAccountId').val();
  if(typeof fromAccountIdVal !='undefined' && fromAccountIdVal || undefined){
  	fromAccountIdVal = $('#fromAccountId').val().split('~');
  	fromAccountIdVersion = fromAccountIdVal[0];
  	fromAccountId = fromAccountIdVal[1];		
  }
   toAccountVal = $('#toAccountId').val();
   if(typeof toAccountVal !='undefined' && toAccountVal || undefined){  			
  	toAccountVal = $('#toAccountId').val().split('~');
  	toAccountIdVersion = toAccountVal[0];
  	toAccountId = toAccountVal[1];
  }
  
  	if(fromAccountIdVersion == toAccountIdVersion){
     	return 'error';
    }  	  
  },
  secureimagevalidation: function(value, attr, customValue, model) {  
    if($('#secureMessage').val() == "NO"){
      $('#secureMessage').prop("checked", false);
      return 'error';
    }
  },
  required: function(value, attr, customValue, model) {
    if(!value){
      return 'error';
    }
  },
});

