'use strict';
(function(){

//dane slajdow
const slides = [
	{
		"image":"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
		"title":"Slajd 1",
		"description":'<p>Opis slajdu nr 1 <img src="http://via.placeholder.com/100x100" alt="Photo placeholder"></p>'
	},
	{
		"image":"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
		"title":"Slajd 2",
		"description":'<p>Opis slajdu nr 2 <img src="http://via.placeholder.com/100x100" alt="Photo placeholder"></p>'
	},
	{
		"image":"https://images.unsplash.com/photo-1484807352052-23338990c6c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
		"title":"Slajd 3",
		"description":'<p>Opis slajdu nr 3 <img src="http://via.placeholder.com/100x100" alt="Photo placeholder"></p>'
	},
	{
		"image":"https://images.unsplash.com/photo-1480506132288-68f7705954bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1586&q=80",
		"title":"Slajd 4",
		"description":'<p>Opis slajdu nr 4 <img src="http://via.placeholder.com/100x100" alt="Photo placeholder"></p>'
	},
	{
		"image":"https://images.unsplash.com/photo-1455165814004-1126a7199f9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
		"title":"Slajd 5",
		"description":'<p>Opis slajdu nr 5 <img src="http://via.placeholder.com/100x100" alt="Photo placeholder"></p>'
	},
];

//szablon slajdow
let slideTemplate = document.getElementById("template-slide").innerHTML;
Mustache.parse(slideTemplate);

//renderowanie slajdow
for(let i=0; i<slides.length; i++) {
	//zapisanie indeksu w elemencie
	slides[i].index = i+1;
	
	document.querySelector(".main-carousel").insertAdjacentHTML("beforeend", Mustache.render(slideTemplate, slides[i]));
}

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

})();
