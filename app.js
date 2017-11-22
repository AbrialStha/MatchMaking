let item = ['1', '2', '3', '4', '5', '6', '7', '8', '1', '2', '3', '4', '5', '6', '7', '8'];
let shuffle_item = [];

//To shuffle the array
let shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//Generate new board
let newBoard = () => {
    flipped_card = 0;
    let card_setup = '';
    shuffle_item = shuffle(item);
    console.log(shuffle_item);
    shuffle_item.forEach((ele, index) => {
        card_setup += `<div id="${index}"></div>`
    });

    $('#board').empty();
    $('#board').append(card_setup);
}

//When page is setup
$(document).ready(() => {
    newBoard();

    let number_of_moves = 0;
    let time_taken = 0;
    let recent_flip_value = null;

    let game_track = 0;
    let is_complete = () => {
        if (game_track == 16) {
            $('#moves').text(number_of_moves);
            $('#completion').modal('show');
        }
    }

    $('#reset').click(() => {
        location.reload();
    });

    $("#board").children().click(function () {
        //checking if card is open or not
        if ($(this).attr('data-open') == 'yes') {
            //Do nothing
            console.log('not allowed');
            alert('already open');
        } else {
            number_of_moves++;
            $(this).attr("data-open", "yes");
            let ind = $(this).attr('id');
            $(this).css('background', '#fff').text(shuffle_item[ind]);

            if (recent_flip_value == null) {
                recent_flip_value = ind;
            } else {
                if (shuffle_item[recent_flip_value] == shuffle_item[ind]) {
                    recent_flip_value = null;
                    game_track += 2;
                    is_complete();
                } else {
                    console.log(recent_flip_value);
                    setTimeout(() => {
                        $(this).text('').css('background', 'gold').removeAttr('data-open');
                        $(`#${recent_flip_value}`).text('').css('background', 'gold').removeAttr('data-open');
                        recent_flip_value = null;
                        console.log(recent_flip_value);
                    }, 300)
                }
            }
        }
    });
})