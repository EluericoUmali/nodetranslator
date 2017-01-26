var timer;
$('#text').on('keyup paste cut', function(){
    var parameters = $("form").serialize();
    clearTimeout(timer);
    timer = setTimeout(function() {
        $.get( '/translate',parameters, function(data) {
            console.log(data);
        });
    },500);
});