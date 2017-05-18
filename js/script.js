let alreadyClickedOnce = false;
const startLearning = function(){
    if(!alreadyClickedOnce){
        $('#play-button').addClass('rotating-play-button');
        $('#start-learning-link').html('Yea');
        alreadyClickedOnce = true;
    }else{
        console.log("already clicked once");
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