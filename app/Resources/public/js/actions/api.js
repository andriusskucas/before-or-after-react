import axios from 'axios'

const baseUrl = ''

export function loadGameData(){
    return axios.get(baseUrl + '/game/init')
}



export function saveGame (username, gameId, rootFact, questions) {

    //let secretMaker = new Secret(rootFact, questions);

    let gameDetails = {};
    gameDetails.id = gameId;
    gameDetails.username = username;
    //gameDetails.secret = secretMaker.getSecret();

    var url = baseUrl + '/game/save';
    return axios.post(url, gameDetails);
};

export function finishGame (gameId, questionsAnswered, timeUsed, questions, rootFact) {

    //var secretMaker = new Secret(rootFact, questions);

    let gameDetails = {};
    gameDetails.id = gameId;
    gameDetails.questions_answered = questionsAnswered;
    gameDetails.time_used = timeUsed;
    //gameDetails.secret = secretMaker.getSecret();

    var url = baseUrl + '/game/finish';

    return axios.get(url, gameDetails);
};


export function isLeaderBetter (score, time) {
    var url = baseUrl + '/leaderboard/isbetter/' + score + '/' + time;
    return axios.get(url);
};

export function getLeaderboard () {
    var url = baseUrl + '/leaderboard/get';
    return axios.get(url);
};