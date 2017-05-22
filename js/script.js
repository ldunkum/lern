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
    alert(language);
};