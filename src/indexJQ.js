$('#image').change((event) => {
    var formData = new FormData($('#form')[0]);
    renderImage(formData);
});

function renderImage(formData){
    const file = formData.get('image');
    const image = URL.createObjectURL(file);
    $('.card-img-top').attr('src', image);
}

$(".upload").click(function(event) {
    event.preventDefault();
    var server = 'http://localhost:4000';
    // var file = $('#image')[0].files[0];
    var formData = new FormData($('#form')[0]);
    
    $.post({
        url: server + "/images/upload",
        data: formData,
        contentType: false,
        processData: false,
        beforeSend: function() {
            $('#enviando').prepend('<img src="images/Spinner-1s-200px.gif" />');
        },
        complete: function(){
            $('#enviando').empty();
            $('#enviando').prepend('<h1> Imagen subida </h1>');
        },
        success: function(response) {
            console.log(response)
            if (response != 0) {
                $(".card-img-top").attr("src", response.root);
            } else {
                alert('Formato de imagen incorrecto.');
            }
        },
        error: function(error){
            console.log(error);
        }
    });
});
