'use strict';
(function(){

//dane slajdow
const slides = [
	{
		"image":"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
		"title":"Slajd 1",
		"description":'<p>Opis slajdu nr 1 <img src="http://via.placeholder.com/100x100" alt="Photo placeholder"></p>',
		"coords":{
			"lat":50.264421,
			"lng":19.023572
		}
	},
	{
		"image":"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
		"title":"Slajd 2",
		"description":'<p>Opis slajdu nr 2 <img src="http://via.placeholder.com/100x100" alt="Photo placeholder"></p>',
		"coords":{
			"lat":-4.068807,
			"lng":-59.488983
		}
	},
	{
		"image":"https://images.unsplash.com/photo-1484807352052-23338990c6c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
		"title":"Slajd 3",
		"description":'<p>Opis slajdu nr 3 <img src="http://via.placeholder.com/100x100" alt="Photo placeholder"></p>',
		"coords":{
			"lat":6.218420,
			"lng":20.910665
		}
	},
	{
		"image":"https://images.unsplash.com/photo-1480506132288-68f7705954bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1586&q=80",
		"title":"Slajd 4",
		"description":'<p>Opis slajdu nr 4 <img src="http://via.placeholder.com/100x100" alt="Photo placeholder"></p>',
		"coords":{
			"lat":40.236959,
			"lng":-100.337797
		}
	},
	{
		"image":"https://images.unsplash.com/photo-1455165814004-1126a7199f9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
		"title":"Slajd 5",
		"description":'<p>Opis slajdu nr 5 <img src="http://via.placeholder.com/100x100" alt="Photo placeholder"></p>',
		"coords":{
			"lat":39.349473,
			"lng":85.245783
		}
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

//inicjalizacja mapy
let map;
window.initMap = function() {
	map = new google.maps.Map(
	  document.querySelector('.googlemap'), {zoom: 1, center: slides[0].coords});

	//dodawanie markerow
	for(let i=0; i<slides.length; i++) {
		let marker = new google.maps.Marker({position: slides[i].coords, map: map});
		//klikniecie markera
		marker.addListener('click', function(){
			//przesuniecie slidera
			slider.select(i);
		});
	}

	//zoom do markera wybranego slajdu
	//niekonicznie jest to pierwszy slajd
	smoothPanAndZoom(map, 4, slides[slider.selectedIndex].coords);
}

//centrowanie mapy po zmianie slajdu
slider.on('change', function(index) {
	smoothPanAndZoom(map, 4, slides[index].coords);
});

var smoothPanAndZoom = function(map, zoom, coords){
	var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
	jumpZoom = Math.min(jumpZoom, zoom -1);
	jumpZoom = Math.max(jumpZoom, 3);

	// Zaczynamy od oddalenia mapy do wyliczonego powiększenia.
	smoothZoom(map, jumpZoom, function(){
		// Następnie przesuwamy mapę do żądanych współrzędnych.
		smoothPan(map, coords, function(){
			// Na końcu powiększamy mapę do żądanego powiększenia.
			smoothZoom(map, zoom);
		});
	});
};

var smoothZoom = function(map, zoom, callback) {
	var startingZoom = map.getZoom();
	var steps = Math.abs(startingZoom - zoom);

	// Jeśli steps == 0, czyli startingZoom == zoom
	if(!steps) {
		// Jeśli podano trzeci argument
		if(callback) {
			// Wywołaj funkcję podaną jako trzeci argument.
			callback();
		}
		// Zakończ działanie funkcji
		return;
	}

	// Trochę matematyki, dzięki której otrzymamy -1 lub 1, w zależności od tego czy startingZoom jest mniejszy od zoom
	var stepChange = - (startingZoom - zoom) / steps;

	var i = 0;
	// Wywołujemy setInterval, który będzie wykonywał funkcję co X milisekund (X podany jako drugi argument, w naszym przypadku 80)
	var timer = window.setInterval(function(){
		// Jeśli wykonano odpowiednią liczbę kroków
		if(++i >= steps) {
			// Wyczyść timer, czyli przestań wykonywać funkcję podaną w powyższm setInterval
			window.clearInterval(timer);
			// Jeśli podano trzeci argument
			if(callback) {
				// Wykonaj funkcję podaną jako trzeci argument
				callback();
			}
		}
		// Skorzystaj z metody setZoom obiektu map, aby zmienić powiększenie na zaokrąglony wynik poniższego obliczenia
		map.setZoom(Math.round(startingZoom + stepChange * i));
	}, 80);
};

// Poniższa funkcja działa bardzo podobnie do smoothZoom. Spróbuj samodzielnie ją przeanalizować.
var smoothPan = function(map, coords, callback) {
	var mapCenter = map.getCenter();
	coords = new google.maps.LatLng(coords);

	var steps = 12;
	var panStep = {lat: (coords.lat() - mapCenter.lat()) / steps, lng: (coords.lng() - mapCenter.lng()) / steps};

	var i = 0;
	var timer = window.setInterval(function(){
		if(++i >= steps) {
			window.clearInterval(timer);
			if(callback) callback();
		}
		map.panTo({lat: mapCenter.lat() + panStep.lat * i, lng: mapCenter.lng() + panStep.lng * i});
	}, 1000/30);
};

})();
