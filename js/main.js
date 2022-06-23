

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
                obstacleInstance.moveDown()
            });



            this.obstacleArr.forEach((obstacleInstance) => {
                if (this.player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
                    this.player.positionX  + this.player.width > obstacleInstance.positionX &&
                    this.player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
                    this.player.height + this.player.positionY > obstacleInstance.positionY) {
                        //alert ("game over");
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
        this.height = 5;
        this.width = 20;

        this.domElement = null;
        this.createDomElement();
    }
    createDomElement(){
        this.domElement = document.createElement("div");

        this.domElement.id = "player";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.height = this.height + "vw";
        this.domElement.style.width = this.width + "vh";


        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }
    moveLeft(){
        this.positionX--;
        this.domElement.style.left = this.positionX + "vw";
    }
    moveRight(){
        this.positionX++;
        this.domElement.style.left = this.positionX + "vw";
    }   
}

class Obstacle {
    constructor(){
        this.positionX = 45;
        this.positionY = 90;
        this.width = 20;
        this.height = 5;
        this.domElement = null;
        this.createDomElement();
    }
    createDomElement(){
        this.domElement = document.createElement("div");

        
        this.domElement.className= "obstacle";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.height = this.height + "vw";
        this.domElement.style.width = this.width + "vh";

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





