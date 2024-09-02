class Game {
    constructor() {
        this.startScreen = document.getElementById("game-intro");
        this.instructionsScreen = document.getElementById("instructions");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("game-end");
        this.player = new Player(this.gameScreen, 40, -300, './img/Playerright.png');
        this.height = 600;
        this.width = 900;

        this.obstacles = [];

        this.hearts = [new Heart(this.gameScreen)];

        this.bonuses = [new Bonus(this.gameScreen)];

        this.soundTrack = null;
        this.score = 0;
        this.bubbles = 0;
        this.lives = 5;
        this.isGameOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = 1000 / 60;
        this.counter = 0
        this.level = 120
    }

    loadAudio(url) {
        fetch(url)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => new (window.AudioContext || window.webkitAudioContext)().decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                this.soundTrack = audioBuffer;
            })
            .catch(e => console.error('Error with decoding audio data', e));
    }

    playSoundTrack() {
        if (this.soundTrack) {
            const source = this.audioContext.createBufferSource();
            source.buffer = this.soundTrack;
            source.loop = true;
            source.connect(this.audioContext.destination);
            source.start(0);
        }
    }
    instructions() {
        this.instructionsScreen.style.display = "block"
        this.instructionsScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "none";

    }


    start() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.instructionsScreen.style.display = "none"
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";
        this.gameIntervalId = setInterval(() => {
            this.gameLoop();
        }, this.gameLoopFrequency);
        this.loadAudio('./sounds/bg.mp3');
        setTimeout(() => {
            this.playSoundTrack();
        }, 1000);
    }



    gameLoop() {
      this.update();
      this.counter++
      if(this.counter % this.level === 0) {
        this.obstacles.push(new Obstacle(this.gameScreen, this.speed))
      }
      if (this.score >= 200){
        this.level = 80;
      }
      if (this.score >= 400){
        this.level = 70;
      }
      if (this.score >= 600){
        this.level = 60;
      }
      if (this.score >= 800){
        this.level = 50;
      }
      if (this.score >= 1000){
        this.level = 40;
      }
      if (this.isGameOver) {
        clearInterval(this.gameIntervalId);
        this.gameOver()
        this.setHighScores()
      }
    }
    update() {
    
        this.player.move();

        this.obstacles.forEach((oneObstacle, oneObstacleIndex) => {
            oneObstacle.move();

                const thereWasACollisionCollision = this.player.didCollide(oneObstacle)
                if (thereWasACollisionCollision) {
                    this.obstacles.splice(oneObstacleIndex, 1);
                    oneObstacle.element.remove();
                    this.lives -=1
                    if(this.lives === 0) {
                        this.isGameOver = true
                    }
                    const livesElement = document.getElementById('lives')
                    livesElement.innerText = this.lives
                    this.player.directionX = -5;
                    this.player.directionY = +2;
                        setTimeout(() => {
                            return;
                        }, 500);
                        console.log(setTimeout)

                }
                
            
            if (oneObstacle.left < (0-oneObstacle.width)) {
                this.obstacles.splice(oneObstacleIndex, 1);
                oneObstacle.element.remove();
                this.score += 10;
                const scoreElement = document.getElementById('score')
                scoreElement.innerText = this.score
            }
        })

        

        this.hearts.forEach((oneHeart, oneHeartIndex) => {
            oneHeart.move();
            
            const heartAcquired = this.player.didCollide(oneHeart)
            if (heartAcquired) {
                this.hearts.splice(oneHeartIndex, 1);
                oneHeart.element.remove();
                this.hearts.push(new Heart(this.gameScreen));
                if (this.lives < 5) {
                    this.lives +=1
                } else {
                    this.lives +=0
                }
                const livesElement = document.getElementById('lives')
                livesElement.innerText = this.lives 

            }

            
            if (oneHeart.left < (0-oneHeart.width)) {
                this.hearts.splice(oneHeartIndex, 1);
                oneHeart.element.remove();
                this.hearts.push(new Heart(this.gameScreen));
        }})

        this.bonuses.forEach((oneBonus, oneBonusIndex) => {
            oneBonus.move();

            const bonusAcquired = this.player.didCollide(oneBonus)
            if (bonusAcquired) {
                this.bonuses.splice(oneBonusIndex, 1);
                oneBonus.element.remove();
                this.score += 50;
                const scoreElement = document.getElementById('score')
                scoreElement.innerText = this.score
                this.bonuses.push(new Bonus(this.gameScreen));
            }

        
            if (oneBonus.left < (0-oneBonus.width)) {
                this.bonuses.splice(oneBonusIndex, 1);
                oneBonus.element.remove();
                this.bonuses.push(new Bonus(this.gameScreen));
        }})
        

  
    } 
    gameOver() {
        this.gameScreen.style.display = "none"
        this.gameEndScreen.style.display = "block"
        document.getElementById('final-score').innerText = this.score
    }
}