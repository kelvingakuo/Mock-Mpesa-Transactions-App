 $.LoadingOverlaySetup({
		    background      : "rgba(0, 153, 0, 0.5)",
		    imageAnimation  : "1.5s fadein",
		    imageColor      : "#000066"
		});

		$('.load').click(function(){
			$.LoadingOverlay('show');

			setTimeout(function(){
				$.LoadingOverlay('hide');
			}, 10000);

		});