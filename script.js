$(document).ready(function(){
    $("#personal_info").draggable();

    fillTiles();

    $(".hidden_value").hide();

    let clickSound = $("#click_sound")[0];
    $selectedTile1 = null;
    $selectedTile2 = null;
    let action = false;
    let tileCount = 12;

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
                    console.log($selectedTile1.children(":first").text());
                    action = false;
                } else if ($selectedTile2 === null) {
                    action = true;
                    $selectedTile2 = $(this);
                    console.log($selectedTile2.children(":first").text());

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
            }
        }


        console.log(tileCount);

        if (tileCount === 0) {
            alert("Nyertél.");
        }
    });
});

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