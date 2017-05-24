let language = "en";
let alreadyClickedOnce = false;

$(document).ready(function(){
    $('#about-link').click(function () {
        showAbout();
    });
    this.language = "en";
});

const goToLearning = function(){
    if(!alreadyClickedOnce){
        $('#play-button').addClass('rotating-play-button');
        $('#start-learning-link').html('Again');
        alreadyClickedOnce = true;
    }else{
        $('#content').css('height', '1%');
        //$('#content').css('width', '1%');
        $('head').append('<link rel="stylesheet" type="text/css" href="css/learning.css">');
        $('#content').animate({
            //width: "auto",
            height: "70%",
            "border-radius":"2px",
        }, 750);
        $.ajax({
            context: this,
            dataType : "html",
            url : "html/learning.html",
            success : function(results) {
                $('#content').html(results);
            }            
        });
    }
};

const setLanguage = function(language){
    this.language = language;
    const gameUrl = "html/" + language + "/gameStart.html";
    const questionUrl = "html/" + language + "/question1.html";
    $.ajax({
        context:this,
        dataType: "html",
        url: gameUrl,
        success : function(results) {
            $('#content').html(results);
            $('#answersFieldset').html
            $.ajax({
                context:this,
                dataType: "html",
                url: questionUrl,
                success: function(response) {
                    $('#answersFieldset').html(response);
                    checkboxStuff(); //initialise behaviour of input radio buttons
                }
            });

            $('#content').children().hide();
            $('#heading').hide(350);
            $('#footer').hide(350);
            $('#content').animate({
                height: "90%",
                padding: "5%"
            }, 500, function(){
                //evaluate if hide+show is appropriate or too much, if so, change animation duration to 750 and remove the hide+show
                $('#content').children().show(300);
            });
            $('#root').css('margin-top', '1%');
        }
    });
};

const showAbout = function() {
    if(this.language === undefined) this.language = "en";
    const url = "html/" + this.language + "/about.html";
    $.ajax({
        context:this,
        dataType: "html",
        url: url,
        success: function(results) {
            $('#content').html(results);
            $("#about").css({
                "text-align" : "center",
                "padding-top" : "10%"
            });
        }
    });
};


const checkboxStuff = function () {
    const allRadios = document.getElementsByName('question1');
    var booRadio;
    var x = 0;
    for(x = 0; x < allRadios.length; x++){
        allRadios[x].onclick = function(){
        alert( $('input[name=question1]:checked').val());
            if(booRadio == this){
                this.checked = false;
                booRadio = null;
            }else{
            booRadio = this;
        }
        };
    }
}




//inforestudante teacher mail for questions