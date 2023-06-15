    let canvas = document.getElementById("gameBoard");
    let ctx = canvas.getContext("2d");
    let scoreText = document.querySelector("#scoreText");
    let resetBtn = document.querySelector("#btn");

    let paddleWidth = 10;
    let paddleHeight = 80;
    let ballRadius = 10;

    let paddle1Y = canvas.height / 2 - paddleHeight / 2;
    let paddle2Y = canvas.height / 2 - paddleHeight / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballSpeedX = 2;
    let ballSpeedY = 2;

    let player1Score = 0;
    let player2Score = 0;


    resetBtn.addEventListener("click", resetGame);


    // update game state
    function update() {
      // move paddle 1
      if (keyWPressed) {
        paddle1Y -= 7;
      }

      if (keySPressed) {
        paddle1Y += 7;
      }

      // move paddle 2
      if (arrowUpPressed) {
        paddle2Y -= 7;
      }
      
      if (arrowDownPressed) {
        paddle2Y += 7;
      }

      // top wall and bottom wall
      if (paddle1Y < 0 ) {
        paddle1Y = 0
      } else if (paddle1Y > canvas.height - paddleHeight) {
        paddle1Y = canvas.height - paddleHeight;
      }

      if (paddle2Y <0) {
        paddle2Y = 0
      } else if (paddle2Y > canvas.height - paddleHeight) {
        paddle2Y = canvas.height - paddleHeight;
      }
      
        // reset ball after goes past paddle

        if (ballX < 0 && !ballX.resetting) {
            ballX.resetting = true;
            player2Score+=1;
            updateScore();
            return;

        } else if (ballX > canvas.width && !ballX.resetting) {
            ballX.resetting = true;
            player1Score+=1;
            updateScore();
            return;
        }

      // ball position
    
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // ball collide paddles
      if (ballX < paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
        ballSpeedX *= -1;
      }
      if (ballX > canvas.width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
        ballSpeedX *= -1;
      }

    //   ball collide wuht wlls
      if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY *= -1;
      }
      
    // delay before launching ball again
    if (ballX < 0 || ballX > canvas.width) {
    setTimeout(() => {
    ballX.resetting = false;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
     }, 200);
    }

   
      draw();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      
        // draw paddles
        ctx.fillStyle = "white";
        ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
        ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
      
        // draw ball
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      
        // update ball position
        ballX += ballSpeedX;
        ballY += ballSpeedY;
      }

    // ddown ebtn handler
    let keyWPressed = false;
    let keySPressed = false;
    let arrowUpPressed = false;
    let arrowDownPressed = false;

    document.addEventListener("keydown", function (event) {
    
        if (event.key === "w") {
        keyWPressed = true;
   
      } else if (event.key === "s" ) {
        keySPressed = true;

      } else if (event.key === "ArrowUp") {
        arrowUpPressed = true;

      } else if (event.key === "ArrowDown") {
        arrowDownPressed = true;
      }
    });

    // up event hadnler
    document.addEventListener("keyup", function (event) {
      if (event.key === "w") {
        keyWPressed = false;
       
      } else if (event.key === "s") {
        keySPressed = false;
        
      } else if (event.key === "ArrowUp") {
        arrowUpPressed = false;

      } else if (event.key === "ArrowDown"){
        arrowDownPressed = false;
      }
    });

    // loop
    function gameLoop() {
      update();
      requestAnimationFrame(gameLoop);
      
    }
    

    // start game loop
    gameLoop();

    function updateScore(){
        scoreText.textContent = `${player1Score} : ${player2Score}`;
    };

    function resetGame(){
        player1Score = 0;
        player2Score = 0;
   
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;

        paddle1Y = canvas.height / 2 - paddleHeight / 2;
        paddle2Y = canvas.height / 2 - paddleHeight / 2;

        updateScore();
    
    };

