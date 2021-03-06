/**
 * Main game class
 **/
var Game = function (gameContainer) {
    this.API = new API();

    var that = this;

    this.ScreenPicker = new ScreenPicker([
        new Screen('intro', '.screen--start'),
        new Screen('game', '.screen--game'),
        new Screen('end', '.screen--end')
    ]);


    // Facts array
    this.facts = [];
    this.factsCount = 0;
    this.mainFact = {};
    this.gameId;

    this.isPlaying = false;
    this.qestionIndex = 0;
    this.timer = null;
    this.beforeGameTimer = null;
    this.secondsToWait = 3;
    this.timeLeft = 0;
    this.maxTime = 0;

    // Init elements
    // Main container
    this.$gameContainer = $(gameContainer);
    this.$bottomWrapper = $('.bottom-wrapper');

    // Buttons
    this.$startBtn = $('.btn--start-game');
    this.$beforeBtn = $('.btn--before');
    this.$afterBtn = $('.btn--after');

    this.$restartGame = $('.restart-game');
    this.$goToMain = $('.go-to-main');
    this.$closeDetailsWiev = $('.close-full-details');

    // Screens
    this.$fullDetailsScreen = $('.modal--full-details');

    // Full details
    this.$fullDetailsTitle = $('.full-details-title');
    this.$fullDetailsContent = $('.full-details-content');

    // Loading screen
    this.Loader = new Loader();

    // Game objects
    this.$gameTimer = $('.timer-content');
    this.$gameQuestionCount = $('.question-count');
    this.$gameMainFact = $('.main-fact');
    this.$gameSecondaryFact = $('.socondary-fact');
    this.$gameWaitScreen = $('.game-starting-overlay');
    this.$gameWaitScreenCounter = $('.game-starting-overlay--counting');

    // End game objects
    this.$endGameTime = $('.time-holder');
    this.$endGameAnswers = $('.answers-holder');

    this.Alerter = new Alert();
    this.LeaderRegistrator = new LeaderRegistrator(this.Alerter, this.Loader, this.API);
    this.Leaderboard = new Leaderboard(this.API, this.Loader);
    this.resizer = new FontResizer();
    this.NumberTitleGenerator = new NumberText();

    this.GameQuiter = new QuitGame(that);
    this.gameResultsMaker = new GameResults();




    // Init click events
    // Start game event
    this.$startBtn.on('click', function (e) {
        e.preventDefault();
        // Init game with game type 1
        that.initGame(1);
    });


    this.$beforeBtn.on('click', function (e) {
        e.preventDefault();
        // True - fact was before main fact
        that.checkAnswer(true);
    });

    this.$afterBtn.on('click', function (e) {
        e.preventDefault();
        // False - fact was after main fact
        that.checkAnswer(false);
    });

    this.$gameWaitScreen.on('click', function (e) {
        e.preventDefault();
        // False - fact was after main fact
        clearTimeout(that.beforeGameTimer);
        that.startGame();
    });


    this.$restartGame.on('click', function (e) {
        e.preventDefault();
        that.gameResultsMaker.resetResults();
        that.initGame();
    });

    this.$goToMain.on('click', function (e) {
        e.preventDefault();
        that.quitToMainScreen(true);
    });

    this.$closeDetailsWiev.on('click', function (e) {
        e.preventDefault();
        that.$fullDetailsScreen.fadeOut();
    });


};

Game.prototype.initGame = function (gameType) {
    var that = this;
    // Display loader
    this.Loader.show('Ruošiamas žaidimas. Prašome palaukti.');

    clearInterval(this.timer);

    // Reset questions index
    this.qestionIndex = 0;
    this.facts = [];
    // Get game facts

    this.API.loadGameData(gameType).done(function (data) {
        // Parse data
        // Set main fact
        that.gameId = parseInt(data.game_id);

        that.mainFact = data.root;
        that.qestionIndex = 0;
        // Set questions array
        that.facts = data.questions;
        that.factsCount = that.facts.length;

        that.$gameMainFact.text(that.mainFact.name);

        that.resizer.setFontSize(that.$gameMainFact, that.mainFact.name);

        that.maxTime = parseInt(data.time);
        that.isPlaying = true;

        that.Loader.hide();
        that.secondsToWait = 3;
        that.setBeforeGameCounter();
        that.showBeforeStartScreen();
        that.GameQuiter.showBackBtn();

        that.ScreenPicker.showScreen('game');

    }).fail(function (response) {
        // Display error
        that.Loader.hide();
        console.error('Could not load game data. ' + response.status + ' ' + response.statusText);
    });

};


Game.prototype.startGame = function () {

    this.LeaderRegistrator.dissable();
    this.showNextQuestion();
    this.initTimer();
    this.initKeyboardControls();
    this.hideBeforeStartScreen();
};

Game.prototype.setBeforeGameCounter = function () {
    this.$gameWaitScreenCounter.text(this.secondsToWait--);
    this.$gameWaitScreenCounter.removeClass('animate');
    this.$gameWaitScreenCounter.addClass('animate');
    var that = this;
    that.beforeGameTimer = setTimeout(function () {
        if (that.secondsToWait > 0) {
            that.setBeforeGameCounter();
        } else {
            that.startGame();
        }
    }, 2000);
};


Game.prototype.quitToMainScreen = function (wantsToQuit) {
    if (!wantsToQuit)
        return;

    this.resetGame();
};

Game.prototype.initKeyboardControls = function () {
    var that = this;
    $(document).keyup(function (event) {
        if (event.keyCode == 39) {
            // Pressed right arrow button
            event.preventDefault();
            that.checkAnswer(false);
        } else if (event.keyCode == 37) {
            // Pressed left arroe button
            event.preventDefault();
            that.checkAnswer(true);
        }
    });
};

Game.prototype.removeKeyboardControls = function () {
    $(document).unbind('keyup');
};

Game.prototype.initTimer = function () {
    clearInterval(this.timer);
    var that = this;
    this.timeLeft = this.maxTime;
    this.$gameTimer.text(this.timeLeft + ' s');
    this.timer = setInterval(function () {
        that.checkTime();
    }, 1000);
};

Game.prototype.checkTime = function () {
    this.timeLeft--;

    if (this.timeLeft <= 0) {
        this.endGame();
        return;
    }

    this.$gameTimer.text(this.timeLeft + ' s');

    // Check if time is running out. If yes add allert class.
    if (this.timeLeft < 10 && !this.$gameTimer.hasClass('allert')) {
        this.$gameTimer.addClass('allert');
    }

};

Game.prototype.showBeforeStartScreen = function () {
    this.$gameWaitScreen.fadeIn();
};

Game.prototype.hideBeforeStartScreen = function () {
    this.$gameWaitScreen.fadeOut();
};


Game.prototype.showNextQuestion = function () {
    if (this.qestionIndex < this.factsCount) {
        // Display new question
        this.$gameSecondaryFact.text(this.facts[this.qestionIndex].name);
        this.$gameQuestionCount.text((this.qestionIndex + 1) + '/' + this.factsCount);

        this.resizer.setFontSize(this.$gameSecondaryFact, this.facts[this.qestionIndex].name);
    } else {

        this.endGame();
    }
};

/**
 * Checks if answer is wright or wrong
 */
Game.prototype.checkAnswer = function (answer) {
    this.facts[this.qestionIndex].answer_was_right = answer == this.facts[this.qestionIndex].is_before;
    this.$bottomWrapper.removeClass('right').removeClass('wrong');
    var that = this;
    if (this.facts[this.qestionIndex].answer_was_right) {
        this.$bottomWrapper.css({'background': '#00B259'});
    } else {

        this.$bottomWrapper.css({'background': '#fe6875'});
    }

    setTimeout(function () {
        that.$bottomWrapper.css({'background': '#445D73'});
    }, 300);

    this.qestionIndex++;
    this.showNextQuestion();
};

Game.prototype.endGame = function () {
    // Display end game screen
    // Get full details
    // Display results



    clearInterval(this.timer);
    //this.timer = null;

    this.Loader.show('Skaičiuojami rezultatai. Prašome palaukti.');
    this.removeKeyboardControls();
    this.isPlaying = false;
    var that = this;

    this.gameResultsMaker.generateResults(this.facts, this.mainFact);
    var goodAnswersCount = this.gameResultsMaker.getGoodAnswersCount();

    var timeSpent = this.maxTime - this.timeLeft;


    this.API.finishGame(that.gameId, goodAnswersCount, timeSpent, that.facts, that.mainFact).done(function (data) {


        var $endGameScore = $('.end-game-score');
        var scoreText = that.NumberTitleGenerator.getText(data.score, 'tašką', 'taškus', 'taškų');
        $endGameScore.text(data.score + ' ' + scoreText);

        if (data.can_register === true) {

            that.LeaderRegistrator.init(that.gameId, that.mainFact, that.facts);

        }

        var sec = that.NumberTitleGenerator.getText(timeSpent, 'sekundę', 'sekundes', 'sekundžių');
        var answers = that.NumberTitleGenerator.getText(goodAnswersCount, 'klausimą', 'klausimus', 'klausimų');

        that.$endGameTime.text(timeSpent + ' ' + sec);
        that.$endGameAnswers.text(goodAnswersCount + ' ' + answers);

        that.Loader.hide();
        that.ScreenPicker.showScreen('end');

    }).fail(function (response) {
        // Display error
        that.Loader.hide();
        console.error('Could not get better leaders count. ' + response.status + ' ' + response.statusText);
    });
};

Game.prototype.showDetails = function ($button) {
    var that = this;
    var factId = $button.data('fact_id');
    this.Loader.show('gauname fakto informaciją');
    this.API.loadFactsDetailsDataById(factId).done(function (data) {
        that.$fullDetailsTitle.text(data.title);
        that.$fullDetailsContent.html(data.content);
        that.$fullDetailsScreen.fadeIn();
        that.Loader.hide();
    }).fail(function (response) {
        console.error('Could not load full details data. ' + response.status + ' ' + response.statusText);
    });
};

Game.prototype.resetGame = function () {
    // Reset game and get back to main screen

    //console.log(this.timer);
    clearInterval(this.timer);
    //this.timer = null;

    var that = this;



    this.isPlaying = false;
    this.facts = [];
    this.gameResultsMaker.resetResults();

    this.GameQuiter.hideBackBtn();

    this.ScreenPicker.showScreen('intro');
};

