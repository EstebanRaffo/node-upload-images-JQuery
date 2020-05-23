
$(".upload").click(function(event) {
    event.preventDefault();
    var server = 'http://localhost:4000';
    var file = $('#image')[0].files[0];
    var formData = new FormData($('#form')[0]);
    
    $.post({
        url: server + "/images/upload",
        data: formData,
        contentType: false,
        processData: false,
        beforeSend: function() {
			    $('.card-img-top').prepend('<img src="images/Spinner-1s-200px.gif" />');
			},
        success: function(response) {
            console.log(response)
            if (response != 0) {
                $(".card-img-top").attr("src", "./public/uploads/" + file.name);
            } else {
                alert('Formato de imagen incorrecto.');
            }
        },
        error: function(error){
            console.log(error);
        }
    });
});
