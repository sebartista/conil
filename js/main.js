$(document).ready(function() {

    /***********************************************
    * Background Image Carousel- (c) Dynamic Drive (www.dynamicdrive.com)
    * Please keep this notice intact
    * Visit http://www.dynamicdrive.com/ for this script and 100s more.
    ***********************************************/

    var firstbgcarousel=new bgCarousel({
        wrapperid: 'mybgcarousel', //ID of blank DIV on page to house carousel
        imagearray: [
            ['img/backgrounds/06.jpg', ''],
          ['img/backgrounds/01.jpg', ''],
          ['img/backgrounds/02.jpg', ''],
          ['img/backgrounds/03.jpg', ''],
          ['img/backgrounds/04.jpg', ''],
          ['img/backgrounds/05.jpg', '']//<--no trailing comma after very last image element!
        ],
        displaymode: {type:'auto', pause:3000, cycles:10, stoponclick:false, pauseonmouseover:false},
        navbuttons: ['img/left.png', 'img/right.png', 'img/up.png', 'img/down.png'], // path to nav images
        activeslideclass: 'conil-selectedslide', // CSS class that gets added to currently shown DIV slide
        orientation: 'h', //Valid values: "h" or "v"
        persist: true, //remember last viewed slide and recall within same session?
        slideduration: 500 //transition duration (milliseconds)
      });

    
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 48)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Scroll reveal calls
    window.sr = ScrollReveal({
        reset: true
    });
    sr.reveal('.sr-icons', {
        duration: 900,
        scale: 1,
        distance: '0px',
        opacity: 0
    }, 200);

    sr.reveal('.sr-conil-thumbs', {
        duration: 900,
        scale: 1,
        distance: '0px',
        opacity: 0
    }, 300);

    $(document).on('click', '#enviarForm', function() {
        $("#errorMessage").hide();
        $("#enviarForm").hide();
        if (validateContactData()) {

            $.ajax({
                async: true,
                type: 'POST',
                data: $("#contactForm").serialize(),
                complete: function(request) {
                    var respuesta = request.responseText;
                    if (respuesta === "success") {
                        $("#email").hide();
                        showError("El mail ha sido enviado, le responderemos a la brevedad", true);
                        $("#contactForm").hide();
                    } else if (respuesta === "badcaptcha") {
                        showError("Debes confirmar que no eres un robot", false);
                        $("#enviarForm").show();
                    } else {
                        $("#enviarForm").show();
                        showError("No es posible enviar este pedido en este momento, por favor intente nuevamente", false);
                    }
                },
                url: 'commit_mail.php'
            });
        } else {
            //showError("Revise los campos");
            $("#enviarForm").show();
        }

    });


});


function validateContactData() {
    var validated = false;
    if ($("#contactoNombre").val() == "") {
        showError("Debe ingresar su Nombre", false);
        validated = false;
    } else if ($("#contactoEmpresa").val() == "") {
        showError("Debe ingresar su Empresa", false);
        validated = false;
    } else if ($("#contactoTelefono").val() == "") {
        showError("Debe ingresar su telefono", false);
        validated = false;
    } else if (!validateMail($("#contactoMail").val())) {
        showError("El Email es incorrecto", false);
        validated = false;
    } else if ($("#contactoConsulta").val() == "") {
        showError("Debe ingresar su consulta", false);
        validated = false;
    } else {
        validated = true;
    }
    return validated;

}

function showError(message, success) {
    $("#errorMessage").show().html(message);
    if (success) {
        $("#errorMessage").addClass("mailSuccess");
    } else {
        $("#errorMessage").removeClass("mailSuccess");
    }
}

function validateMail(value) {
    var x = value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
        return false;
    } else {
        return true;
    }
}