let alreadyClickedOnce = false;
const goToLearning = function(){
    if(!alreadyClickedOnce){
        $('#play-button').addClass('rotating-play-button');
        $('#start-learning-link').html('Again');
        alreadyClickedOnce = true;
    }else{
        $.ajax({
            context: this,
            dataType : "html",
            url : "html/learning.html",
            success : function(results) {
                $('#content').html(results);
                $('head').append('<link rel="stylesheet" type="text/css" href="css/learning.css">');
            }            
        });
    }
};

const setLanguage = function(language){
    $.ajax({
        context:this,
        dataType: "html",
        url: "html/gameStart.html",
        success : function(results) {
            $('#content').html(results);
            $('#heading').hide(250);
            $('#footer').hide(250);
            $('#content').animate({
                height: "90%"
            }, 750);
            $('#root').css('margin-top', '1%');
        }
    });
};