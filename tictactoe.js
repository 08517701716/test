var grid, p1, p2, turn, win=null;
var p1Score = 0, p2Score = 0, draw = 0;
var difficulty, type;//0 or 1
//Function for starting/restarting game
function restart(){
    grid=[0,0,0,0,0,0,0,0,0];
    p1='x' , p2='o';
    turn = getRand(0, 1);//Assigns random turn
    win = null;

    difficulty = parseInt(document.getElementById("difficulty").value) || 1;
    
    if( document.getElementById("user").checked ) {
        type = "user";
    }
    else if(document.getElementById("bot").checked ) {
        type = "bot";
    }
    else {
        return alert("please select opponent");
    }

    document.getElementById("pregame").style.display = "none";
    document.getElementById("maingame").style.display = "block";

    for (var i=0;i<9;i++){
        document.getElementById('t'+i).innerHTML='';                
        document.getElementById('result').innerHTML='';
    }

    if(turn == 0 && type == 'bot') {
        computerMove();
    }

    showTurn();
}

function showTurn() {
    var div = document.getElementById("turn");

    if(turn == 1) {
        div.innerHTML = "Player1's Turn";
    }
    else {
        div.innerHTML = "Player2's Turn";
    }
}

function showPreGame() {
    document.getElementById("pregame").style.display = "block";
    document.getElementById("maingame").style.display = "none";
}
//Function to update scores
function updateScore() {
    document.getElementById("score").innerHTML = "Player 1 : " + p1Score + "  Player 2 : " + p2Score + "  Draw : " + draw;
}
//Function for marking on click
function mark(x){
    var val=grid[x];
    console.log(x);

    if(val !== 0 || win!=null) {
        return;
    }

    if(turn===1){
        grid [x]=p1;
        document.getElementById('t'+x).innerHTML='<img src="'+p1+'.png"/>';
        turn=0;
    }
    else{
        grid[x]=p2;
        document.getElementById('t'+x).innerHTML='<img src="'+p2+'.png"/>';
        turn=1;
    }
    
    checkWin();

    //Displaying the result
    if (win=='draw'){
        document.getElementById('result').innerHTML=('It is a Draw!');
        draw++;
    }
    else if(win==p1){
        document.getElementById('result').innerHTML=('Player 1 Wins!');
        p1Score++;
    }
    else if(win==p2){
        document.getElementById('result').innerHTML=('Player 2 Wins!');
        p2Score++;
    }

    updateScore();

    if(type === 'bot' && win == null && turn == 0) {
        computerMove();
    }

    showTurn();
}
//Checking winning conditions
function checkWin(){
    if(grid[0]==grid[1] && grid[1]==grid[2] && grid[0]!=0){
        if(grid[0]==p1){
            win=p1;
        }
        else{
            win=p2;
        }
    }
    else if(grid[3]==grid[4] && grid[4]==grid[5] && grid[3]!=0){
        if(grid[3]==p1){
            win=p1;
        }
        else{
            win=p2;
        }
    }
    else if(grid[6]==grid[7] && grid[7]==grid[8] && grid[6]!=0){
        if(grid[6]==p1){
            win=p1;
        }
        else{
            win=p2;
        }
    }
    else if(grid[0]==grid[3] && grid[3]==grid[6] && grid[0]!=0){
        if(grid[0]==p1){
            win=p1;
        }
        else{
            win=p2;
        }
    }
    else if(grid[1]==grid[4] && grid[4]==grid[7] && grid[1]!=0){
        if(grid[1]==p1){
            win=p1;
        }
        else{
            win=p2;
        }
    }
    else if(grid[2]==grid[5] && grid[5]==grid[8] && grid[2]!=0){
        if(grid[2]==p1){
            win=p1;
        }
        else{
            win=p2;
        }
    }
    else if(grid[0]==grid[4] && grid[4]==grid[8] && grid[0]!=0){
        if(grid[0]==p1){
            win=p1;
        }
        else{
            win=p2;
        }
    }
    else if(grid[2]==grid[4] && grid[4]==grid[6] && grid[2]!=0){
        if(grid[2]==p1){
            win=p1;
        }
        else{
            win=p2;
        }
    }
    else if(grid[0]!=0 && grid[1]!=0 && grid[2]!=0 && grid[3]!=0 && grid[4]!=0 && grid[5]!=0 && grid[6]!=0 && grid[7]!=0 && grid[8]!=0 ){
        win='draw';
    }
}
//Function for bot to check which spot in a line is empty
function check3(sym, a,b,c) {

    if(grid[a] == grid[b] && grid[a] == sym && grid[c] == 0) {
        return c;
    }
    else if(grid[a] == grid[c] && grid[a] == sym && grid[b] == 0) {
        return b;
    }
    else if(grid[b] == grid[c] && grid[b] == sym && grid[a] == 0) {
        return a;
    }

    return -1;
}
function userWinning(sym) {

    if(check3(sym, 0,1,2) > -1) {
        return check3(sym, 0,1,2);
    }
    else if(check3(sym, 3,4,5) > -1) {
        return check3(sym, 3,4,5);
    }
    else if(check3(sym, 6,7,8) > -1) {
        return check3(sym, 6,7,8);
    }
    else if(check3(sym, 0,3,6) > -1) {
        return check3(sym, 0,3,6);
    }
    else if(check3(sym, 1,4,7) > -1) {
        return check3(sym, 1,4,7);
    }
    else if(check3(sym, 2,5,8) > -1) {
        return check3(sym, 2,5,8);
    }
    else if(check3(sym, 0,4,8) > -1) {
        return check3(sym, 0,4,8);
    }
    else if(check3(sym, 2,4,6) > -1) {
        return check3(sym, 2,4,6);
    }

    return -1;
}
//Random number generator
function getRand(min, max) {
    return Math.floor( Math.random() * (max-min+1)) + min;
}
//Function for the Bot
function computerMove() {
    var pos = -1;
    //Difficulty levels
    if(difficulty === 0) {
        
        for(var i=0;i<grid.length;i++) {
            if(grid[i] === 0) {
                pos = i;
                break;
            }
        }
    }
    else if(difficulty === 1) {

        var winning = userWinning(p2);

        if(winning != -1) {
            pos = winning;
        }
        else {
            winning = userWinning(p1);
            if(winning != -1) {
                pos = winning;
            }
        }

        if(pos == -1) {
            var rand;
            do {
                rand = getRand(0, 8);
            }
            while(grid[rand] != 0);

            pos = rand;
        }
    }
    else if(difficulty === 2) {
        var winning = userWinning(p2);

        if(winning != -1) {
            pos = winning;
        }
        else {
            winning = userWinning(p1);
            if(winning != -1) {
                pos = winning;
            }
        }
        //Conditions so the Bot will never lose, may draw
        if(pos == -1) {
            if(grid[4] == 0) {
                pos = 4;
            }
            else if(grid[0] == 0) {
                pos = 0;
            }
            else if(grid[2] == 0) {
                pos = 2;
            }
            else if(grid[6] == 0) {
                pos = 6;
            }
            else if(grid[8] == 0) {
                pos = 8;
            }
            else {
                var rand;
                do {
                    rand = getRand(0, 8);
                }
                while(grid[rand] != 0);

                pos = rand;
            }
        }
    }

    mark(pos);
}