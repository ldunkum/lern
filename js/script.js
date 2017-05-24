let language = "en";
let alreadyClickedOnce = false;
let score = 0;
let currentQuestion = 1;
const numberOfQuestions = 5;

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
    console.log("Language in setLanguage: " + language);
    const gameUrl = "html/" + language + "/gameStart.html";
    $('head').append('<link rel="stylesheet" type="text/css" href="css/questions.css">');
    $.ajax({
        context:this,
        dataType: "html",
        url: gameUrl,
        success : function(results) {
            $('#content').html(results);
            changeQuestion();
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

const changeQuestion = function () {
    //console.log("in changequestion nr:" + currentQuestion);
    //console.log("Language in changeQuestion: " + this.language);
    let questionUrl = "";
    if(currentQuestion <= numberOfQuestions)
        questionUrl = "html/" + this.language + "/question" + currentQuestion + ".html";
    else{
        goToGameEndScreen();
        return;
    }
    currentQuestion++;
    $.ajax({
        context:this,
        dataType: "html",
        url: questionUrl,
        success: function(response) {
            if(currentQuestion === 1){
                $('#game').html(response);
            }else{
                $('#game').fadeOut(350);
                $('#game').html(response)
                $('#game').fadeIn(350);
            }
            checkboxStuff(); //initialise behaviour of input radio buttons
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
        //alert( $('input[name=question1]:checked').val());
            if(booRadio == this){
                this.checked = false;
                booRadio = null;
            }else{
            booRadio = this;
        }
        };
    }
}

const evaluateAnswer = function() {
    let animationIsFinished = false;
    //alert('Answer is correct: ' + $('#answers-fieldset > input:checked').val());
    switch($('#answers-fieldset > input:checked').val()){
        case 'yes':
            score += 10;            
            console.log("score: " + score);
            $('#confirm-button').html("Correct");
            $('#confirm-button').addClass('correct-response');
            $('#confirm-button').on('cssanimationend', function() {
                //stuff();
            });
            changeQuestion();
            break;
        case 'no':
            $('#confirm-button').html("Incorrect");
            $('#confirm-button').addClass('incorrect-response');
            $('#confirm-button').on('cssanimationend', function() {
                $('#confirm-button').removeClass('incorrect-response');
                //changeQuestion();
            });
            changeQuestion();
            break;
        default:
            console.log("No answer selected")
            break;
    }
    //$.when(animationIsFinished).then(changeQuestion());
    //changeQuestion();
};

const stuff = function() {
    //alert("asdoh");
    $('#confirm-button').removeClass('correct-response');
    console.log("why doesn't it execute?");
    changeQuestion();
}

const goToGameEndScreen = function() {
    const url = "html/" + this.language + "/gameEndScreen.html";
    $.ajax({
        context:this,
        dataType: "html",
        url: url,
        success: function(results) {
            $('#content').html(results);
            $('#content > *').hide();
            if(score > 0)
                $('#game-end-message').html("Congratulations, you finished the game with " + score + " out of " + numberOfQuestions*10 + " possible points.");
            else
                $('#game-end-message').html("C'mon, were you even trying? It's not that hard..");
            $('#content > *').fadeIn(500);
        }
    });
};


//inforestudante teacher mail for questions