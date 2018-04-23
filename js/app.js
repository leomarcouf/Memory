/*
Mise en place du timer
 */
var min = 0;
var sec = 0;
var hours = 0;
var letsStop = 0;
window.onload = function() {
    setInterval(function() {
        if (letsStop !== 1) {
            sec++;
            if (sec === 60) {
                min++;
                sec = 0;
            }
            if (min === 60) {
                hours++;
                min = 0;
                sec = 0;
            }
            $('.timer').html(hours + ':' + min + ':' + sec);
            // if(letsStop === 1)
            // {
            //     break;
            // } 
            console.log(min);
            console.log(sec);
        }

    }, 1000);
};
/*
 * Create a list that holds all of your cards
 */
var cartes = [];
var nomCarte = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];
var ouvrirCarte = [];
var modal = $("#win-modal");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


/*On cherche tous les li dans deck et on les stock dans un array cartes*/
$('.deck').each(function() {
    $(this).find('li').each(function() {
        cartes.push($(this));
    });
});
var temp = 0;

/*On utilise la fonction shuffle pour melanger les carte*/
nomCarte = shuffle(nomCarte);

var cardNumber = 0;
$('.deck').each(function() {
    $(this).find('li').find('i').each(function() {
        $(this).removeAttr('class');
        $(this).addClass(nomCarte[cardNumber]);
        cardNumber++;
    });
});

$('.deck').each(function() {
    $(this).find('li').find('i').each(function() {
        var tempClass = $($(cartes[temp][0]).find('i')[0]).attr('class');
        $(this).removeAttr('class');
        $(this).addClass(tempClass);
        temp++;
    });
    console.log(cartes)
});


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
var moves = 0,
    stars = 3;
/*fonction qui permettra d'enlever les proprieté classe lors de la comparaison de carte*/
removeProperties = function(prop) {
    setTimeout(function() {
        prop.removeClass('show open animated wobble');
        ouvrirCarte[0].removeClass('show open animated wobble');
        ouvrirCarte = [];
    }, 400);
};

/*Fonctions au clic des cartes*/
showCardOnClick = function(clickEvent) {
    clickEvent.on('click', function() {
        moves++;
        //calcul du nombre de mouvement enregistré
        if (moves === 16) {

        } else if (moves > 16 && moves <= 25) {
            $('section ul li').hide();
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            stars = 2;
        } else if (moves > 25) {
            $('section ul li').hide();
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            stars = 1;
        }
        $('.moves').html(moves);
        if ((ouvrirCarte.length % 2) === 0) {
            $(this).addClass('show open animated wobble');
            $(this).off('click');
            ouvrirCarte.push($(this));
        } else if (ouvrirCarte.length !== 0) {
            $(this).addClass('show open animated wobble');

            var self = $(this);
            //comparaison des carte pour voir si match ou non
            for (var i = 0; i < ouvrirCarte.length; i++) {
                if (ouvrirCarte[i].find('i').attr('class') === self.find('i').attr('class')) {
                    // ouvrirCarte.push(self);
                    self.removeClass('animated wobble');
                    self.addClass('show match animated rubberBand');
                    ouvrirCarte[i].removeClass('animated wobble');
                    ouvrirCarte[i].addClass('show match animated rubberBand');
                    console.log('match');
                    $(this).off('click');
                    //ouvrirCarte.push(self);
                    ouvrirCarte = [];
                    break;
                } else {
                    self.addClass('show open animated wobble');
                    removeProperties(self);
                    ouvrirCarte[0].on('click', showCardOnClick(ouvrirCarte[0]));
                    console.log('no match');
                }
            }
        }
        //ouverture de la fenetre modale
        if ($('.deck').find('.match').length === 16) {
		  modal.removeClass('hidden');
		  modal.addClass('visible');
		   letsStop = 1;
            
        }


    });
};
//retournement des carte au click
for (var i = 0; i < cartes.length; i++) {
    cartes[i].on('click', showCardOnClick(cartes[i]));
}
//bouton restart
$('.restart').on('click', function() {
    location.reload();
});
// bouton rejouer de la fenetre modale
$('.play-again').on('click', function() {
    location.reload();
});


