//card contains original
let data = ['1','2','3','4','5','6','7','8'];
let item = data.concat(data);
// console.log(item);

//shuffling the items
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
    //to setup cards
    let card_setup = '';
    shuffle_item = shuffle(item);
    // console.log(shuffle_item);

    shuffle_item.forEach((ele, index) => {
        card_setup += `<div id="${index}"></div>`
    });
    //empty the board
    $('#board').empty();
    $('#board').append(card_setup);
}

//When page is setup
$(document).ready(() => {
    newBoard();
    //number of moves used by user
    let number_of_moves = 0;
    //recent user action
    let recent_flip_value = null;
    //track the game percent
    let game_track = 0;
    //check if the game is complete or not
    let is_complete = () => {
        if (game_track == 16) {
            if(number_of_moves==16){
                $('#modelTitleId').text('Your the Master of this game!!')
            }
            $('#moves').text(number_of_moves);
            $('#completion').modal('show');
        }
    }
    //Reseting the game after completion
    $('#reset').click(() => {
        location.reload();
    });

    //main game logic when card is clicked
    $("#board").children().click(function () {
        //checking if card is open or not
        if ($(this).attr('data-open') == 'yes') {
            //Do nothing
            $('#my_alert').append(`<div class="alert alert-danger fade show" role="alert">Card is Already Opened!</div>`);
            setTimeout(()=>$(".alert").alert('close'),900);
        } else {
            number_of_moves++;
            $(this).attr("data-open", "yes");
            let ind = $(this).attr('id');
            $(this).addClass('animated flipInY');
            $(this).css('background', '#fff').text(shuffle_item[ind]);

            if (recent_flip_value == null) {
                recent_flip_value = ind;
            } else {
                if (shuffle_item[recent_flip_value] == shuffle_item[ind]) {
                    let temp = recent_flip_value;
                    setTimeout(()=>{
                        $(this).css({color:'#fff',background:"green"});
                        $(`#${temp}`).css({color:'#fff',background:"green"});
                    },400)
                    recent_flip_value = null;
                    game_track += 2;
                    is_complete();
                } else {
                    setTimeout(() => {
                        $(this).text('').css('background', 'gold').removeAttr('data-open').removeAttr('class');
                        $(`#${recent_flip_value}`).text('').css('background', 'gold').removeAttr('data-open').removeAttr('class');
                        recent_flip_value = null;
                    }, 800)
                }
            }
        }
    });
})