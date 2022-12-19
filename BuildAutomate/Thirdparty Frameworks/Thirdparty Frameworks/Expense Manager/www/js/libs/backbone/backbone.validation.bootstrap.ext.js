_.extend(Backbone.Validation.callbacks, {
  valid: function(view, attr, selector){
	  //alert("valid : "+ selector);
    var control = view.$('[' + selector + '=' + attr + ']');
    var group = control.parents(".form-group");
    //alert("Valid group : "+ group);
    group.removeClass("error");

    if (control.data("error-style") === "tooltip"){
      // CAUTION: calling tooltip("hide") on an uninitialized tooltip
      // causes bootstraps tooltips to crash somehow...
      if (control.data("tooltip"))
        control.tooltip("hide");
    }
    else if (control.data("error-style") === "inline"){
      group.find(".help-inline.error-message").remove();
    }
    else{
      group.find(".help-block.error-message").remove();
    }
  },
  invalid: function(view, attr, error, selector) {
	  //alert("invalid : "+selector + " : "+ attr + " : " + view + " : " + error);
    var control = view.$('[' + selector + '=' + attr + ']');
   	var group = control.parents(".form-group");
    //alert("invalid group : "+ group);

    group.addClass("has-error");

    if (control.data("error-style") === "tooltip"){
      var position = control.data("tooltip-position") || "right";
      control.tooltip({
        placement: position,
        trigger: "manual",
        title: error
      });
      control.tooltip("show");
    }
    else if (control.data("error-style") === "inline"){
      if (group.find(".help-inline").length === 0){
    	  group.append("<span class=\"help-inline\"></span>");
      }
      var target = group.find(".help-inline");
      target.text($.i18n.t(error));
    }
    else {
      if (group.find(".help-block").length === 0) {
        group.append("<p class=\"help-block error-message col-xs-12\"></p>");
      }
      var target = group.find(".help-block");
      target.text($.i18n.t(error));
    }
  }
});