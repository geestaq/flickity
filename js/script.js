//inicjalizacja slidera
let slider = new Flickity( '.main-carousel', {
	//opcje
	hash: true, //link w url
	pageDots: false, //wylaczenie kropek do nawigacji
	cellSelector: '.carousel-cell' //selektor slajdow
});

//restart - powrot do pierwszego slajdu
document.getElementsByClassName('btn-restart')[0].addEventListener('click', function(event) {
	event.preventDefault();
	slider.select(0);
});

//progress
slider.on('scroll', function(progress) {
	document.querySelector('.progress .fill').style.width = Math.round(progress * 100) + "%";
});
