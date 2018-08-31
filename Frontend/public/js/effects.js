addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); }

$(document).ready(function () {
         	$('#horizontalTab').easyResponsiveTabs({
         		type: 'default', //Types: default, vertical, accordion           
         		width: 'auto', //auto or any width like 600px
         		fit: true // 100% fit in a container
    	});

        $.LoadingOverlaySetup({
		    background      : "rgba(0, 153, 0, 0.5)",
		    imageAnimation  : "1.5s fadein",
		    imageColor      : "#000066"
		});

		$('.load').click(function(){
			$.LoadingOverlay('show');

			setTimeout(function(){
				$.LoadingOverlay('hide');
			}, 2200);

		});
});