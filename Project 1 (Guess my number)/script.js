let i = Math.ceil(Math.random()*20);
let score = 20;
console.log(i);
document.querySelector('.score').textContent = score;

let highscore= 0;
document.querySelector('.highscore').textContent = highscore;

document.querySelector('.check').addEventListener('click', function(){
    var guess = document.querySelector('.guess').value;
    document.querySelector('.score').textContent = score;
    if(!guess){
        document.querySelector('.message').textContent = 'No number!';
    }

    else if(score == 0){
        document.querySelector('body').style.backgroundColor = '#F1231D';
        document.querySelector('.message').textContent = 'No more chance remains. Game Over! YOU LOOSE';
    }

    else if (guess && score > 0){
        console.log(typeof(guess),typeof(i), i);
        if(guess == i){
            document.querySelector('.message').textContent = 'Congragulations!';
            document.querySelector('.number').textContent = i;

            document.querySelector('body').style.backgroundColor = '#4FAD0D';
            

            if(score > highscore){
                highscore = score;
                document.querySelector('.highscore').textContent = highscore;
            }
        }
        else if(guess<i){
            document.querySelector('.message').textContent = 'Too Low!';
            score -= 1;
            document.querySelector('.score').textContent = score;
        }
        else{
            document.querySelector('.message').textContent = 'Too High!';
            score -= 1;
            document.querySelector('.score').textContent = score;
        }
    }
})

document.querySelector('.again').addEventListener('click', function(){

    i = Math.ceil(Math.random()*20);
    score = 20;
    document.querySelector('.score').textContent = score; 
    document.querySelector('.number').textContent = '?'
    document.querySelector('.message').textContent = 'Start guessing...'
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = 'rgb(58, 73, 158)';
})