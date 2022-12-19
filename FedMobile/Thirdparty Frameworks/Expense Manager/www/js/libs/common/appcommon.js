/***************  common layout handling scripts *********************/
$(".shownav").click(function(e) {
        e.preventDefault();
        $("#appwrapper").toggleClass("mnuactive");
        if($("#appwrapper").hasClass("mnuactive")){
            $(".subnav").after("<div class='subnav-overlay'></div>");
        }else {
            $(".subnav-overlay").remove();
        }
    });

/************** on click on the submenu hide the panel in portrait mode *************/

    $("body").on("click",".subnav li a,.subnav li .btn,.subnav-overlay",function(){
        if($("#appwrapper").hasClass("mnuactive")){
            $("#appwrapper").toggleClass("mnuactive");
            $(".subnav-overlay").remove();
        }
    });