$( document ).ready(function(){
    
    var form = $('.discount__form');

    $(":submit", form).on('click', function(){
        event.preventDefault();

        var phone = $(form).find( 'input[name = "phone"]' ).val(); // берём введенное название
        sandMail(phone);

    })

    function sandMail(phone){
        $.post('/mailer', {phone: phone})
            .done(function(data){
                console.log(data);
            })
            .fail(function(){
                console.log('Не удалось отправить сообщение');
            })
    }

});