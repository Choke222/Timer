(function() {
    'use stirct';
 
    var timer = document.getElementById('timer');
    var hour = document.getElementById('hour');
    var min = document.getElementById('min');
    var sec = document.getElementById('sec');
    var reset = document.getElementById('reset');
    var start = document.getElementById('start');
 
    var startTime;
    var zerosecTime;
    var timeLeft;
    var timeToCountdown = 0;
    var timerId;
    var isRunning = false;
    var isRunning_0sec = false;
    var isRunning_last = false;
    var music;
    var flag=0;
    var p=0;
    music = new Audio();
    music.src = "audio/main.mp3";
    music.loop = true;
    
    new_music = new Audio();
    new_music.src = "audio/gong.mp3";
    // new_music.loop = true;
    
    function updateTimer(t){
        var d = new Date(t);
        var h = d.getHours()-9;
        // console.log(h)
        var m = d.getMinutes();
        var s = d.getSeconds();
        var ms = d.getMilliseconds();
        m = ('0' + m).slice(-2);
        s = ('0' + s).slice(-2);
        ms = ('00' + ms).slice(-3);
        timer.textContent = h + ':' + m + ':' + s + '.' + ms;
        point.textContent = 'Point:' + p;
    }
 
    function countDown(){
        timerId = setTimeout(function() {
            if(isRunning_0sec == false){
                timeLeft = timeToCountdown - (Date.now() -startTime);
            }else{
                console.log("over" + Date.now())
                timeLeft = (Date.now() -zerosecTime);
                if(timeLeft > 5000){//60000
                    
                    p -= 0.1;
                }
            }
            // if(timeLeft < 0){
            //     isRunning = false;
            //     // music.pause();
            //     music.src = "audio/gong.mp3";
            //     music.play();
            //     // new_music.src = "audio/gong.mp3";
            //     // new_music.play();
            //     start.textContent ='Start';
            //     clearTimeout(timerId);
            //     timeLeft = 0;
            //     timeToCountdown = 0;
            //     updateTimer(timeLeft);
            //     console.log("test")
            //     return;
            // }
            
            if((timeLeft < 0)&&(isRunning_0sec == false)){
                console.log("0.0sec")
                isRunning = false;
                isRunning_0sec = true;
                // music.pause();
                // new_music.src = "audio/gong.mp3";
                new_music.play();
                // new_music.src = "audio/gong.mp3";
                // new_music.play();
                // start.textContent ='Start';
                // clearTimeout(timerId);
                timeLeft = 0;
                // timeToCountdown = 0;
                // updateTimer(timeLeft);
                zerosecTime =Date.now()
                // return;
            }

        //    if(timeLeft < (10000)){//10秒以下で赤点滅
           if(timeLeft < (300000)){//5分以下で赤点滅
                timer.style.color = timeLeft%500<250?"red":"black";
                if(isRunning_last === false){
                    music.src = "audio/aux-enfers.mp3";
                    console.log("last10min")
                    music.play();
                }
                isRunning_last = true;
           }
         
            if(timeLeft == 0){//10秒以下で赤点滅
                //終了のチャイムを鳴らす
                console.log("end")
                new_music.play();
            }

            updateTimer(timeLeft);
            countDown(); 
        },10);
    }
 
     start.addEventListener('click',function() {
         if(isRunning === false){
             isRunning = true;
             start.textContent ='Stop';
             startTime = Date.now();
             countDown();
             music.play();
         }else{
             isRunning = false;
             start.textContent ='Start';
             timeToCountdown = timeLeft;
             clearTimeout(timerId);
             music.pause();
         }
         
        //  music.play();
        // music = new Audio();
        // music.src = "aux-enfers.mp3";
      
     });
     hour.addEventListener('click',function(){
        if(isRunning === true){
            return;
        }
        timeToCountdown += 60*60*1000;
        
        updateTimer(timeToCountdown);
    });
     min.addEventListener('click',function(){
         if(isRunning === true){
             return;
         }
         timeToCountdown += 60*1000;
        
         updateTimer(timeToCountdown);
     });
     sec.addEventListener('click',function(){
         if(isRunning === true){
             return;
         }
         timeToCountdown += 1000;
        
         updateTimer(timeToCountdown);
     });
     reset.addEventListener('click',function(){
         timeToCountdown = 0;
         music.pause();
        //  new_music.pause();
         updateTimer(timeToCountdown);
     });
 
 })();