define(['jquery', 'underscore', 'Backbone', 'text!views/errors/error403.tpl'],
    function ($, _, Backbone, exceptionTemplate) {
       
		var exception = Backbone.View.extend({
			events:{
               'submit #login':'loginverification'
            },
            initialize : function(){ 
    		},
            render:function () {
            	var compiledTemplate = _.template(exceptionTemplate);
            	$("#content").html(compiledTemplate).trigger("create");
            	$('#spinner').hide();
            }
        });
        return exception;
    });