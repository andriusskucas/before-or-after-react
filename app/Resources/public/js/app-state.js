const initialState = {
    appState : {
        window: 'INTRO',
        loading: false,
        loaded: true,
        loadingMessage: 'Kraunasi',
        openModal: false,
        modalToOpen: null,
    },

    gameState : {
        gameStatus: 'NOT_LOADED',
        time: null,
        timeLeft: null,
        questionsCount: 0,
        currentQuestion: 0,
        game_id: null,
        questions: [],
        root: {},
        currentQuestionName: '',
        answers: [],
    },

    leaderboardState: {
        displayLeaderboard: false,
        leaders: [],
    }

}

export default initialState