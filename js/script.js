let language;
let alreadyClickedOnce = false;

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
            height: "70%"
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
    url = "html/" + language + "/gameStart.html";
    $.ajax({
        context:this,
        dataType: "html",
        url: url,
        success : function(results) {
            $('#content').html(results);
            $('#heading').hide(350);
            $('#footer').hide(350);
            $('#content').animate({
                height: "90%"
            }, 750);
            $('#root').css('margin-top', '1%');
        }
    });
};



//inforestudante teacher mail for questions