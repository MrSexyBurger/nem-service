$( document ).ready(function(){
	$('.question-1').on('click', function(){
		if (!$(this).hasClass('active')){
			$(this).toggleClass('active');
			$(".question-2").toggleClass('active');

			$("#content-1").toggleClass('active');
			$("#content-2").toggleClass('active');
		}
	});

	$('.question-2').on('click', function(){
		if (!$(this).hasClass('active')){
			$(this).toggleClass('active');
			$(".question-1").toggleClass('active');

			$("#content-1").toggleClass('active');
			$("#content-2").toggleClass('active');
		}
	});
});