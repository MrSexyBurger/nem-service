$( document ).ready(function(){
	
	/*проверка на админа*/

	if ( $(location).attr('search') != '?admin') {
		$('.add__category__btn').attr('hidden', 'hidden');
	}




	// определяем формы
var category_form = $("#category__form");
var price_form = $("#price__form");


// сворачивание формы категорий

$('.category__form__close__btn').on('click', function(){
	closeCategoryForm();
});

// сворачивание формы цен

$('.price__form__close__btn').on('click', function(){
	closePriceForm();
});


// вызов формы категории

$('.add__category__btn').on('click', function(){
	openCategoryForm('add');
})


//функции для работы с формами

function closeCategoryForm(){
	$('.category__form__container').toggleClass('active');
	$(category_form).find( 'input[name="id"]' ).val('0');
	$(category_form).find( 'input[name="title"]' ).val('');
}

function closePriceForm(){
	$('.price__form__container').toggleClass('active');
	clearPriceForm();
}

function clearPriceForm(){
	$(price_form).find( 'input[name="id"]' ).val('0');
	$(price_form).find( 'input[name="title"]' ).val('');
	$(price_form).find( 'input[name="price"]' ).val('');
	$(price_form).find( 'input[name="category"]' ).val('0');
}

function openCategoryForm(mode){
	
	$('.category__form__container').toggleClass('active');

	$(category_form).find( 'input[type="submit"]' ).attr('hidden', 'hidden'); // прячем всё


	if (mode == 'add'){
		$(category_form).find( 'input[name="add"]' ).removeAttr('hidden');
	}

	if (mode == 'edit'){
		$(category_form).find( 'input[name="edit"]' ).removeAttr('hidden');
		$(category_form).find( 'input[name="delete"]' ).removeAttr('hidden');
	}
}


function openPriceForm(mode){
	$('.price__form__container').toggleClass('active');

	$(price_form).find( 'input[type="submit"]' ).attr('hidden', 'hidden'); // прячем всё

	if (mode == 'add'){
		$(price_form).find( 'input[name="add"]' ).removeAttr('hidden');
	}

	if (mode == 'edit'){
		$(price_form).find( 'input[name="edit"]' ).removeAttr('hidden');
		$(price_form).find( 'input[name="delete"]' ).removeAttr('hidden');
	}
}



/*--------------------------------------------------------------------*/


// очистить контейнер с категориями/ценами

function clearAll(){
	$(".price-itm").remove();
}


/*------------------------функции инициализации--------------------------------------------*/

function initAll(){
	initCategories();
	initPrices();
}
		

function initCategories(){

	$('.price-itm').on('click', '.price-category', function(){
	 	$(this).parent().toggleClass('active');
	 		 	
	 	if ( $(this).parent().hasClass('active') ) {
	 		$(this).children('.price-category__state').html('-');
	 	}else{
	 		$(this).children('.price-category__state').html('+');
	 	}

	});


	$('.price-category__edit-btn').on('click', function(){
		const id = $(this).attr('id');
    	openCategoryForm('edit');
    	$(category_form).find('input[name = "id"]').val(id);
    	getCategory(id);
    })

}


function initPrices(){
	// кликаем на кнопку добавить услугу

	$('.add-price__btn').on('click', function(){
    	const id = $(this).attr('id');
    	$(price_form).find('input[name="category"]').val(id);
    	openPriceForm('add');
    })

    // кликаем на услугу (только если админ)

    if ( $(location).attr('search') == '?admin') {
		$('.price-content-itm').on('click', function(){
	    	var id = $(this).attr('id');
	    	getPrice(id);
	    	openPriceForm('edit');
   		})
	}

   

}

/*-----------------------ajax для категорий-----------------------------------*/

function getCategories(){
	var categories;

	$.get({
		type: "GET",
		url: "/getcategories",
		async: false,
		success: function(data){
			categories = data;
		}
	})

	return categories;
}

function getCategory(id){
	$.get("/getcategory", {id: id})
		.done(function(data){
			$(category_form).find('input[name = "title"]').val(data.title);
		})
	.fail(function(){
		console.log("Ошибка выдачи отзыва");
	});
}

function editCategory(id, title){
	$.post("/editcategory", {id: id, title: title})
		.done(function(data){
			getAll();
		})
	.fail(function(){
		console.log("Ошибка выдачи отзыва");
	});
}

function postCategory(title){
	$.post("/postcategory", {title: title})
		.done(function(){
			getAll();
		})
		.fail(function(){
			console.log("Ошибка выдачи отзывов");
		});
}


function deleteCategory(id){
	$.get("/deletecategory", {id: id})
		.done(function(data){
			getAll();
		})
	.fail(function(){
		console.log("Ошибка выдачи отзыва");
	});
}

/*---------------------ajax для цен-----------------------------------------*/


function getPrices(){
	var prices;

	$.get({
		type: "GET",
		url: "/getprices",
		async: false,
		success: function(data){
			prices = data;
		}
	})

	return prices;
}


function getPrice(id){
	$.get("/getprice", {id: id})
		.done(function(data){
			$(price_form).find( 'input[name="title"]' ).val(data.title);
			$(price_form).find( 'input[name="price"]' ).val(data.price);
			$(price_form).find( 'input[name="id"]' ).val(data._id);
		})
		.fail(function(){
			console.log("Ошибка выдачи отзывов");
		});
}

function postPrice(title, price, category){
	$.post("/postprice", {title: title, price: price, category: category})
		.done(function(data){
			getAll();
			closePriceForm();
		})
	.fail(function(){
		console.log("Ошибка отправки цены");
	});
}

function editPrice(title, price, id){
	$.post("/editprice", {title: title, price: price, id: id})
		.done(function(data){
			console.log('Услуга успешно изменена');
			getAll();
			closePriceForm();
		})
	.fail(function(){
		console.log("Ошибка отправки цены");
	});
}

function deletePrice(id){
	$.post("/deleteprice", {id: id})
		.done(function(data){
			getAll();
			closePriceForm();
		})
	.fail(function(){
		console.log("Ошибка выдачи отзыва");
	});
}

/*------------------------------------------Вывод категорий и цен-------------------------------------------------------*/

function getAll(){

	var categories = getCategories();
	var prices = getPrices();
	var row = "";

	$(categories).each(function(index, category){
		row += "<div class=\"price-itm\">";

		if ( $(location).attr('search') == '?admin') {
			row += "<button class=\"price-category__edit-btn\" id=\"" + category._id + "\"></button>";
		}
					
    					
    	row +=		"<div class=\"price-category\">" +
						"<span class=\"price-category__name\">" + category.title + "</span>" +
						"<span class=\"price-category__state\">+</span>" +
					"</div>" +
					"<div class=\"price-content\">" +
					"<table width=\"100%\">";
	

		$(prices).each(function(index, price){
			if (category._id == price.category){
			row += 		"<tr class=\"price-content-itm\" id=\"" + price._id + "\">" +
							"<th class=\"price-name\">"  + price.title + "</th>" +
							"<th class=\"price-value\">" + сheckPrice(price.price) + "</th>" + 
						"</tr>";
			}
		})

			row += 	"</table>";

			if ( $(location).attr('search') == '?admin') {
				row += "<button id=\"" + category._id + "\" class=\"add-price__btn\">Добавить услугу</button>";
			}
							
			row +=		"</div>" +
					"</div>";

	});

	clearAll();
	$(".prices__container").append(row);
  	initAll();
}


function сheckPrice(value){
	if (value == 0){
		return 'БЕСПЛАТНО';
	} else {
		return 'Oт ' + value + ' руб.';
	}
}


/*------------------------------обработчики для submit-------------------------------------------------------*/

$(":submit", category_form).on('click', function(){
	event.preventDefault();

	var attr = $(this).attr('name'); // выясняем какой submit нажат
	var id = $(category_form).find('input[name = "id"]').val(); // берем значение id
	var title = $(category_form).find( 'input[name="title"]' ).val(); // берём введенное название

	if (attr == 'add') {
		postCategory(title);
		closeCategoryForm();
	} else if (attr == 'delete') {
		deleteCategory(id);
		closeCategoryForm()
	} else if (attr == 'edit') {			
		editCategory(id, title);
		closeCategoryForm()
	}

})


$(":submit", price_form).on('click', function(){
	event.preventDefault();

	var attr = $(this).attr('name'); // выясняем какой submit нажат		
	var title = $(price_form).find( 'input[name="title"]' ).val(); // берём введенное название
	var price = $(price_form).find( 'input[name="price"]' ).val();
	var category = $(price_form).find('input[name="category"]').val() // берём id категории
	var id = $(price_form).find('input[name="id"]').val() // берём id цены
	if (attr == 'add') {
		postPrice(title, price, category);
	} else if (attr == 'delete') {
		deletePrice(id);
	} else if (attr == 'edit') {
		editPrice(title, price, id);
	}

})



getAll();
});