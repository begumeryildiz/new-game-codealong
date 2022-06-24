

class Game {
    constructor(){
        this.time = 0;
        this.player = null;
        this.obstacleArr = [];
    }
    start(){
        this.player = new Player();
        this.attachEventListeners();
        
        

        setInterval( () => {

            if(this.time % 60 === 0) {
                const newObstacle = new Obstacle();
                this.obstacleArr.push(newObstacle);
            }


            this.obstacleArr.forEach(obstacleInstance => {
                obstacleInstance.moveDown();
                
                if (obstacleInstance.height + obstacleInstance.positionY < 0) {
                    const board = document.getElementById("board");
                    board.removeChild(obstacleInstance.domElement);

                    const index = this.obstacleArr.indexOf(obstacleInstance);
                    if (index > -1) {
                        this.obstacleArr.splice(index, 1); 
                    }
                }
            });



            this.obstacleArr.forEach((obstacleInstance) => {
                if (this.player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
                    this.player.positionX  + this.player.width > obstacleInstance.positionX &&
                    this.player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
                    this.player.height + this.player.positionY > obstacleInstance.positionY) {
                        console.log("game over");
                        //alert ("game over")
                }
            });

            
            this.time++;

        }, 50);
    }
    attachEventListeners(){
        document.addEventListener("keydown", (event) => {
            if(event.key === "ArrowLeft") {
                this.player.moveLeft();
            } else if(event.key === "ArrowRight") {
                this.player.moveRight();
            } 
        });
    }
}


class Player {
    constructor(){
        this.positionX = 45;
        this.positionY = 0;
        this.height = 10;
        this.width = 10;

        this.domElement = null;
        this.createDomElement();
    }
    createDomElement(){
        this.domElement = document.createElement("div");

        this.domElement.id = "player";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.width = this.width + "vw";


        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }
    moveLeft(){
        
        if(this.positionX > 0) {
            this.positionX--;
            this.domElement.style.left = this.positionX + "vw"; 
        }
    }
    moveRight(){
        const boardWidth = document.getElementById("board").offsetWidth;
        console.log(this.positionX + this.width)
        if(this.positionX +this.width +1 <= 100) {
            this.positionX++;
            this.domElement.style.left = this.positionX + "vw";
        }
        
    }   
}

class Obstacle {
    constructor(){
        this.width = 10;
        this.height = 10;
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1));
        this.positionY = 90;
        this.domElement = null;
        this.createDomElement();
    }
    createDomElement(){
        this.domElement = document.createElement("div");

        
        this.domElement.className= "obstacle";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.width = this.width + "vw";

        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }
    moveDown(){
        this.positionY--;
        this.domElement.style.bottom = this.positionY + "vh";
    }
}



const game = new Game();
game.start();





