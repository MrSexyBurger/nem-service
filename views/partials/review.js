
    //вызыв формы отзыва

    $('.review__add__btn').on('click', function(){
        $('.review__form__container').toggleClass('active');
        resetForm();
    });



    //вызов заполненной формы вызова
    $('body').on('click', '.review__edit__btn', function(){
        $('.review__form__container').toggleClass('active');
        getReview($(this).attr('id'));
    });


    // очистить контейнер с отзывами
    
    function clearReviews(){
        $(".review-itm").remove();
    }

    //удаляем отзыв

    $('body').on('click', '.review__delete__btn', function(){
        $.get("/review/delete",{id: $(this).attr('id')})
            .done(function(){
                console.log("Отзыв удалён!");
                getReviews()
            })
            .fail(function(){
                console.log("Ошибка при удалении!")
            })
    });


    function getReview(id){
        $.get("/getreview", {id: id})
            .done(function(data){
                var $form = $( '.review__form__container' );
                $form.find( 'input[name="username"]' ).val(data.username);
                $form.find('select[name="rating"]').val(data.rating);
                $form.find('textarea').val(data.review);
                $form.find('input[name="id"]').val(data._id);
            })
            .fail(function(){
                console.log("Ошибка выдачи отзывова");
            });
    }



    // сворачивание формы отзыва

    $('.review__form__close__btn').on('click', function(){
        $('.review__form__container').toggleClass('active');
    });


    // thank you сворачивание

     $(".review__thank-you__close__btn").on('click', function(){
        $('.review__thank-you__container').toggleClass('active');
    });



    // вывести все отзывы
    
    function getReviews(){
        $.get("/getreviews")
            .done(function(data){
                var row = "";

                $(data).each(function(index, review){

                    row += "<div class=\"review-itm\">" +
                                "<div class=\"review-name\">" +
                                    "<h2>" + review.username + "<br><br></h2>" +
                                    showScore(review.rating) +
                                "</div>" +
                                "<div class=\"review-img\"><img src=\"../img/review/recommend.png\"></div>" +
                                "<p>" + review.review + "</p>" + 
                                "<div class=\"review__dev\">" + 
                                    "<button class=\"review__edit__btn\" id=\"" + review._id + "\">Изменить</button>" +
                                    "<button class=\"review__delete__btn\" id=\"" + review._id + "\">Удалить</button>" +
                                "</div>" + 
                            "</div>";
                });

                clearReviews();
                $(".review-container").append(row);
            })
            .fail(function(){
                console.log("Ошибка выдачи отзывов");
            });
    };

    function showScore(score){
        
        let result = "";

        for (var i = 0; i < score; i++){
            result += "<img src=\"../img/review/star-on.png\">";
        }

        for (var i = 0; i < 5 - score; i++) {
            result += "<img src=\"../img/review/star-off.png\">";
        }

        return result;
    };

    getReviews();
    
    // добавляем отзыв


    /* прикрепить событие submit к форме */

    $("#review__form").submit(function(event){
        event.preventDefault();
    
        var $form = $( this );

        var username = $form.find( 'input[name="username"]' ).val();
        var rating = $form.find('select[name="rating"]').val();
        var review = $form.find('textarea').val();
        var id = $form.find( 'input[name="id"]' ).val();

        if (id != 0){
            editReview(username, review, rating, id);
        }else{
            resetForm();
            postReview(username, review, rating);
        }
        

        $('.review__form__container').toggleClass('active');

    })

    function postReview(username, review, rating){
        $.post("/postreview", {username: username, review: review, rating: rating})
            .done(function(){
                console.log("Отзыв успешно создан!");
                getReviews();
                
                $('.review__thank-you__container').toggleClass('active');
            })
            .fail(function() {
                alert( "Ошибка при создании отзыва!" );
            });
    };

    function editReview(username, review, rating, id){
        $.post("/editreview", { id: id, username: username, review: review, rating: rating})
            .done(function(){
                console.log("Отзыв успешно изменен!");
                getReviews();
            
                $('.review__thank-you__container').toggleClass('active');
            })
            .fail(function() {
                alert( "Ошибка при создании отзыва!" );
            });
    };



    function resetForm(){
        var $form = $( '.review__form__container' );
        $form.find( 'input[name="username"]' ).val('');
        $form.find('select[name="rating"]').val(0);
        $form.find('textarea').val('');
        $form.find('input[name="id"]').val('');
    }