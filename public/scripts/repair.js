$( document ).ready(function(){
	
	/*проверка на админа*/

	if ( $(location).attr('search') != '?admin') {
		$('.repair-cause__add').attr('hidden', 'hidden');
		$('.repair-price-tab-add').attr('hidden', 'hidden');
	}











	//определяем ценник

	function checkPrice(price){
		if (price != 0){
			return  "От " + price + " руб.";
		}else{
			return 'Бесплатно';
		}
	}


	//таблицы

	var repair_table = $('.repair-prices__table');

	// формы

	var repair_form = $('.repair__form');



	/*функции для работы с формами*/


	$('.repair-price-tab-add').on('click', function(){
		$('.repair__form__container').toggleClass('active');
		priceFormMode('add');
	});

	$('.repair__form__close__btn').on('click', function(){
		closePriceForm();
	});


	function closePriceForm(){
		$('.repair__form__container').toggleClass('active');
		var id = $(repair_form).find('input[name = "id"]').val('0');
		var title = $(repair_form).find('input[name = "title"]').val(''); 
		var price = $(repair_form).find('input[name = "price"]').val('');  
	}

	function priceFormMode(mode){

		$(repair_form).find('input[type = "submit"]').attr('hidden', 'hidden');

		if (mode == 'add'){
			$(repair_form).find('input[name = "add"]').removeAttr('hidden'); 
		}else if (mode == 'edit'){
			$(repair_form).find('input[name = "edit"]').removeAttr('hidden'); 
			$(repair_form).find('input[name = "delete"]').removeAttr('hidden');  
		}
	}



	/*открытие и закрытие таблицы*/

	$('.repair-price-tab-more').on('click', function(){
		$(this).toggleClass('active');

		if($(this).hasClass('active')){
			openPriceTab();
		}else{
			closePriceTab();
		}
	});


	/*функции для работы с таблицей цен*/

	// инициализция при get параметре admin
	function initPriceTab(){
		closePriceTab();
		
		if ( $(location).attr('search') == '?admin') {

			$('.repair-price-itm').on('click', function (){
				var id = $(this).attr('id');
				getPrice(id);
				$('.repair__form__container').addClass('active');
				priceFormMode('edit');
			})
			console.log('initPriceTab')
		}

	}

	function closePriceTab(){
		$('.repair-price-tab-more').html('Развернуть');
		$('.repair-price-itm').attr('hidden', 'hidden');
		
		for (var i = 0; i < 3; i++) {
			$(".repair-price-itm:eq(" + i +")").removeAttr('hidden');
		}
		console.log('closePriceTab')
	}

	function openPriceTab(){
		$('.repair-price-tab-more').html('Свернуть');
		$('.repair-price-itm').removeAttr('hidden');
	}


	////////////////////////////////////////////////////////////////////////////////////

	/*функции для работы с таблицей брендов*/

	function initBrandTab(){
		closeBrandTab();

		$('.brand-more').on('click', function(){
			$(this).toggleClass('active');

			if($(this).hasClass('active')){
				openBrandTab();
			}else{
				closeBrandTab();
			}
		});

	}

	function closeBrandTab(){
		$('.brand-more').html('Развернуть');
		$('.repair-brand-itm').attr('hidden', 'hidden');
		
		for (var i = 0; i < 3; i++) {
			$(".repair-brand-itm:eq(" + i +")").removeAttr('hidden');
		}
	}

	function openBrandTab(){
		$('.brand-more').html('Свернуть');
		$('.repair-brand-itm').removeAttr('hidden');
	}


	initBrandTab();




	//////////////////////////////////////////////////////////////////////////////////

	//выяснили категорию

	function getCategory(){

		var url = $(location).attr('href').split('/');
		var url = url[4].split('?');

		return url[0];
	}


	//функции для работы с ценами

	function postPrice(){

		var title = $(repair_form).find('input[name = "title"]').val();
		var price = $(repair_form).find('input[name = "price"]').val();
		category = getCategory();



		$.post('/repair/postprice', {title: title, price: price, category: category})
			.done(function(data){
				getPrices();
			})
			.fail(function(){
				console.log("Ошибка отправки цены");
			});

	}

	function getPrices(){
	    var category = getCategory();
		$.get('/repair/getprices', {category: category})
			.done(function(data){
				var row = '';
				$(data).each(function(index, price){
				
				row +=	"<tr class=\"repair-price-itm\" id=\"" + price._id +"\">" +
							"<th class=\"repair-price__title\">" + price.title + "</th>" +
							"<th class=\"repair-price__price\">" + checkPrice(price.price) +"</th>" +
						"</tr>";
				})

				$(repair_table).html(row);
				
				initPriceTab();
			})
			.fail(function(){
				console.log("Ошибка вывода цен");
			})
	}

	function getPrice(id){
		$.get('/repair/getprice', {id: id})
			.done(function(data){
				$(repair_form).find('input[name = "id"]').val(data._id);
				$(repair_form).find('input[name = "title"]').val(data.title);
				$(repair_form).find('input[name = "price"]').val(data.price);
			})
			.fail(function(){
				console.log("Ошибка при выводе цены")
			})		
	}

	function deletePrice(id){
		$.post('/repair/deleteprice', { id: id})
			.done(function(data){
				getPrices();
			})
			.fail(function(){
				console.log('Ошибка удаления');
			})
	}

	function editPrice(id, title, price){
		$.post('/repair/editprice', {id: id, title: title, price: price})
			.done(function(data){
				getPrices();
			})
			.fail(function(){
				console.log('Не удалось изменить')
			})
	}

	// обработчик для submit
	

	$(':submit', repair_form).on('click', function(){
		event.preventDefault();

		var attr = $(this).attr('name'); // выясняем какой submit нажат
		var id = $(repair_form).find('input[name = "id"]').val();
		var title = $(repair_form).find('input[name = "title"]').val(); 
		var price = $(repair_form).find('input[name = "price"]').val();  

		if (attr == 'add'){
			postPrice();
		} else if (attr == 'delete'){
			deletePrice(id);
		} else if (attr == 'edit'){
			editPrice(id, title, price);
		}

		closePriceForm();

	})



	getPrices();

	///////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////cause///////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////

	var cause_form = $('.repair-cause__form');

	//клики
	
	$('.repair-cause__add').on('click', function(){
		$('.repair-cause__form__container').addClass('active');
		causeFormMode('add');
	});

	$('.repair-cause__form__close__btn').on('click', function(){
		closeCauseForm();
	});

	//функции для работы с формой

	function closeCauseForm(){
		$('.repair-cause__form__container').toggleClass('active');
		var id = $(cause_form).find('input[name = "id"]').val('0');
		var title = $(cause_form).find('input[name = "title"]').val(''); 
		var price = $(cause_form).find('input[name = "price"]').val('');  
	}

	function causeFormMode(mode){

		$(cause_form).find('input[type = "submit"]').attr('hidden', 'hidden');

		if (mode == 'add'){
			$(cause_form).find('input[name = "add"]').removeAttr('hidden'); 
		}else if (mode == 'edit'){
			$(cause_form).find('input[name = "edit"]').removeAttr('hidden'); 
			$(cause_form).find('input[name = "delete"]').removeAttr('hidden');  
		}
	}





	/*функции для работы с таблицей причин*/

	//инициализация только при get параметре админ
	function initCauses(){

		if ( $(location).attr('search') == '?admin') {
			$('.repair-cause-itm').on('click', function(){
				var id = $(this).attr('id');
				getCause(id);
				$('.repair-cause__form__container').toggleClass('active');
				causeFormMode('edit');
			})
		}	

	}


	

	//функции для работы с ценами////////////////////////////////////////////////////////////////////////////////////

	function postCause(){

		var title = $(cause_form).find('input[name = "title"]').val();
		var price = $(cause_form).find('input[name = "price"]').val();
		category = getCategory();



		$.post('/repair/postcause', {title: title, price: price, category: category})
			.done(function(data){
				getCauses();
			})
			.fail(function(){
				console.log("Ошибка отправки цены");
			});

	}

	function getCauses(){
	    var category = getCategory();
		$.get('/repair/getcauses', {category: category})
			.done(function(data){
				var row = '';
				$(data).each(function(index, cause){
				
				row +=	"<div class=\"repair-cause-itm\" id=\"" + cause._id + "\">" +
							"<div class=\"repair-cause__title\">" + cause.title + "</div>" +
							"<div class=\"repair-cause__price\">" + checkPrice(cause.price) + "</div>" +
						"</div>";
				})


				$(".repair-cause-itms__container").html(row);
				initCauses();
			})
			.fail(function(){
				console.log("Ошибка вывода цен");
			})
	}

	function getCause(id){
		$.get('/repair/getcause', {id: id})
			.done(function(data){
				$(cause_form).find('input[name = "id"]').val(data._id);
				$(cause_form).find('input[name = "title"]').val(data.title);
				$(cause_form).find('input[name = "price"]').val(data.price);
			})
			.fail(function(){
				console.log("Ошибка при выводе цены")
			})		
	}

	function deleteCause(id){
		$.post('/repair/deletecause', { id: id})
			.done(function(data){
				getCauses();
			})
			.fail(function(){
				console.log('Ошибка удаления');
			})
	}

	function editCause(id, title, price){
		$.post('/repair/editcause', {id: id, title: title, price: price})
			.done(function(data){
				getCauses();
			})
			.fail(function(){
				console.log('Не удалось изменить')
			})
	}

	// обработчик для submit
	

	$(':submit', cause_form).on('click', function(){
		event.preventDefault();

		var attr = $(this).attr('name'); // выясняем какой submit нажат
		var id = $(cause_form).find('input[name = "id"]').val();
		var title = $(cause_form).find('input[name = "title"]').val(); 
		var price = $(cause_form).find('input[name = "price"]').val();  

		if (attr == 'add'){
			postCause();
		} else if (attr == 'delete'){
			deleteCause(id);
		} else if (attr == 'edit'){
			editCause(id, title, price);
		}

		closeCauseForm();

	})

/////////////////////////////////////

	getCauses();
});