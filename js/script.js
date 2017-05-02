let alreadyClickedOnce = false;
const startLearning = function(){
    if(!alreadyClickedOnce){
        $('#play-button').addClass('rotating-play-button');
        $('#start-learning-link').html('Yea');
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