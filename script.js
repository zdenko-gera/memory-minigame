$(document).ready(function(){
    $("#personal_info").draggable();

    fillTiles();
    setTimer(180);

    $(".hidden_value").hide();

    let clickSound = $("#click_sound")[0];
    $selectedTile1 = null;
    $selectedTile2 = null;
    let action = false;
    let tileCount = 12;
    let secondsLeft = 180;

    $(".card").click(function() {
        if (!action) {
            if ($(this).css('opacity') == 1) {
                clickSound.play();
                action = true;

                $(this).children(":first").toggle(100);

                $(this).animate({
                    height: '0',
                }, 100);

                $(this).animate({
                    height: '8rem',
                }, 100);

                if ($selectedTile1 === null) {
                    $selectedTile1 = $(this);
                    action = false;
                } else if ($selectedTile2 === null) {
                    action = true;
                    $selectedTile2 = $(this);

                    if ($selectedTile1.children(":first").text() === $selectedTile2.children(":first").text() && !$selectedTile1.is($selectedTile2)) {
                        $selectedTile1.animate({
                            opacity: '0',
                        }, 500);
                        $selectedTile2.animate({
                            opacity: '0',
                        }, 500);

                        $selectedTile1.css('cursor', 'default');
                        $selectedTile2.css('cursor', 'default');

                        tileCount -= 2;
                    } else {
                        $selectedTile1.children(":first").delay(500).toggle(100);
                        $selectedTile2.children(":first").delay(500).toggle(100);
                    }

                    $selectedTile1 = null;
                    $selectedTile2 = null;

                    setTimeout(function () {
                        action = false
                    }, 500);
                }

                if (tileCount === 0) {
                    $("#board").addClass("well_done");
                }
            }
        }
    });

    $("#restart").click(function() {
        restart();
        setTimer(secondsLeft);
    });

    $("#easy").click(function() {
        secondsLeft = 180;
        restart();
        setTimer(180);
    });

    $("#medium").click(function() {
        secondsLeft = 90;
        restart();
        setTimer(90);
    });

    $("#hard").click(function() {
        secondsLeft = 45;
        restart();
        setTimer(45);
    });




    function restart() {
        $("#board").removeClass("well_done");

        const tiles = document.getElementsByClassName('card');

        for (let i = 0; i < tileCount; i++) {
            tiles[i].style.opacity = 1;
        }

        $(".card").hide(300);
        $(".card").delay(500).show(300);

        fillTiles();
        $(".hidden_value").hide();
    }

    function fillTiles() {
        const availableValues =[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];

        availableValues.sort(() => Math.random() - 0.5);
        availableValues.sort(() => Math.random() - 0.3);
        availableValues.sort(() => Math.random() - 0.9);

        const tiles = document.getElementsByClassName('hidden_value');

        for (let i = 0; i < 12; i++) {
            tiles[i].innerText = availableValues[i];
        }
    }

    function setTimer(secondsLeft) {
        /*let timerGoal = new Date().getTime() + secondsLeft * 1000;


        var x = setInterval(function() {
            let now = new Date().getTime();

            let sub = timerGoal - now;

            let minutes = ((sub % (1000 * 60 * 60)) / (1000 * 60));

            $("#timer").text("Time left: " + (minutes * 60) + "s");

            if (sub < 0) {
                clearInterval(x);
                document.getElementById("timer").innerHTML = "EXPIRED";
            }
        }, 1000);*/
        $("#timer").text("Time left: " + secondsLeft + "s");
    }
});
