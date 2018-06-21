(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

//FkiIarCI

//object to hold app
var art = {};

//get art from the api
art.getArt = function () {
	var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'monkey';

	$.ajax({
		url: 'https://www.rijksmuseum.nl/api/en/collection',
		method: 'GET',
		dataType: 'jsonp',
		data: {
			key: art.key,
			format: 'jsonp',
			q: query,
			imgonly: true
			//get art with monkeys
		} }).then(function (res) {
		// console.log('it\'s back');
		// console.log(res);
		var artObject = res.artObjects;
		console.log(artObject);
		//call art.display
		art.displayArt(artObject);
	});
};

//display ar on page
art.displayArt = function (allArt) {
	console.log('displayArt allArt', allArt);
	$('#artwork').empty();

	//filter through to show art piece that has imgs
	allArt.filter(function (artPiece) {
		return artPiece.webImage != null;
	}).forEach(function (artPiece) {
		var $title = $('<h2>').text(artPiece.title);
		//console.log($title);
		var $artist = $('<p>').addClass('artist').text(artPiece.principalOrFirstMaker);
		var $img = $('<img>').attr('src', artPiece.webImage.url);
		$('#artwork').append($title, $artist, $img);
	});
};

art.init = function () {
	//global variables here & other code
	art.key = 'FkiIarCI';
	console.log('hiii');
	art.getArt();
	//event listener for change of dropdown
	$('#animal').on('change', function () {
		//console.log('change');
		//get value of option they've selected
		var animal = $(this).val();
		console.log(animal);
		art.getArt(animal);

		var animalName = $(this).find(':selected').text();
		$('h1').text('Art with ' + animalName);
	});
};

//main func to run app
$(function () {
	art.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL0Rlc2t0b3AvVG9Eby9KYXZhU2NyaXB0MTgvYXJ0LWFwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiZGV2L3NjcmlwdHMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNFQTs7QUFFQTtBQUNBLElBQU0sTUFBTSxFQUFaOztBQUVBO0FBQ0EsSUFBSSxNQUFKLEdBQWEsWUFBcUI7QUFBQSxLQUFwQixLQUFvQix1RUFBWixRQUFZOztBQUNqQyxHQUFFLElBQUYsQ0FBTztBQUNOLE9BQUssOENBREM7QUFFTixVQUFRLEtBRkY7QUFHTixZQUFVLE9BSEo7QUFJTixRQUFLO0FBQ0osUUFBSyxJQUFJLEdBREw7QUFFSixXQUFRLE9BRko7QUFHSixNQUFHLEtBSEM7QUFJSixZQUFTO0FBRVY7QUFOSyxHQUpDLEVBQVAsRUFXRyxJQVhILENBV1EsVUFBQyxHQUFELEVBQVE7QUFDZjtBQUNBO0FBQ0EsTUFBTSxZQUFZLElBQUksVUFBdEI7QUFDQSxVQUFRLEdBQVIsQ0FBWSxTQUFaO0FBQ0E7QUFDQSxNQUFJLFVBQUosQ0FBZSxTQUFmO0FBQ0EsRUFsQkQ7QUFtQkEsQ0FwQkQ7O0FBc0JBO0FBQ0EsSUFBSSxVQUFKLEdBQWlCLFVBQUMsTUFBRCxFQUFXO0FBQzNCLFNBQVEsR0FBUixDQUFZLG1CQUFaLEVBQWlDLE1BQWpDO0FBQ0EsR0FBRSxVQUFGLEVBQWMsS0FBZDs7QUFFQTtBQUNBLFFBQU8sTUFBUCxDQUFjLFVBQUMsUUFBRCxFQUFhO0FBQzFCLFNBQU8sU0FBUyxRQUFULElBQXFCLElBQTVCO0FBQ0EsRUFGRCxFQUVHLE9BRkgsQ0FFVyxVQUFDLFFBQUQsRUFBYTtBQUN2QixNQUFNLFNBQVMsRUFBRSxNQUFGLEVBQVUsSUFBVixDQUFlLFNBQVMsS0FBeEIsQ0FBZjtBQUNBO0FBQ0EsTUFBTSxVQUFVLEVBQUUsS0FBRixFQUFTLFFBQVQsQ0FBa0IsUUFBbEIsRUFBNEIsSUFBNUIsQ0FBaUMsU0FBUyxxQkFBMUMsQ0FBaEI7QUFDQSxNQUFNLE9BQU8sRUFBRSxPQUFGLEVBQVcsSUFBWCxDQUFnQixLQUFoQixFQUF1QixTQUFTLFFBQVQsQ0FBa0IsR0FBekMsQ0FBYjtBQUNBLElBQUUsVUFBRixFQUFjLE1BQWQsQ0FBcUIsTUFBckIsRUFBNkIsT0FBN0IsRUFBc0MsSUFBdEM7QUFDQSxFQVJEO0FBU0EsQ0FkRDs7QUFnQkEsSUFBSSxJQUFKLEdBQVcsWUFBSztBQUNmO0FBQ0EsS0FBSSxHQUFKLEdBQVUsVUFBVjtBQUNBLFNBQVEsR0FBUixDQUFZLE1BQVo7QUFDQSxLQUFJLE1BQUo7QUFDQTtBQUNBLEdBQUUsU0FBRixFQUFhLEVBQWIsQ0FBZ0IsUUFBaEIsRUFBMEIsWUFBVTtBQUNuQztBQUNBO0FBQ0EsTUFBTSxTQUFTLEVBQUUsSUFBRixFQUFRLEdBQVIsRUFBZjtBQUNBLFVBQVEsR0FBUixDQUFZLE1BQVo7QUFDQSxNQUFJLE1BQUosQ0FBVyxNQUFYOztBQUVBLE1BQU0sYUFBYSxFQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsV0FBYixFQUEwQixJQUExQixFQUFuQjtBQUNBLElBQUUsSUFBRixFQUFRLElBQVIsZUFBeUIsVUFBekI7QUFDQSxFQVREO0FBVUEsQ0FoQkQ7O0FBbUJBO0FBQ0EsRUFBRSxZQUFVO0FBQ1gsS0FBSSxJQUFKO0FBRUEsQ0FIRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxyXG5cclxuLy9Ga2lJYXJDSVxyXG5cclxuLy9vYmplY3QgdG8gaG9sZCBhcHBcclxuY29uc3QgYXJ0ID0ge307XHJcblxyXG4vL2dldCBhcnQgZnJvbSB0aGUgYXBpXHJcbmFydC5nZXRBcnQgPSAocXVlcnkgPSAnbW9ua2V5JykgPT57XHJcblx0JC5hamF4KHtcclxuXHRcdHVybDogJ2h0dHBzOi8vd3d3LnJpamtzbXVzZXVtLm5sL2FwaS9lbi9jb2xsZWN0aW9uJyxcclxuXHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0XHRkYXRhVHlwZTogJ2pzb25wJyxcclxuXHRcdGRhdGE6e1xyXG5cdFx0XHRrZXk6IGFydC5rZXksXHJcblx0XHRcdGZvcm1hdDogJ2pzb25wJyxcclxuXHRcdFx0cTogcXVlcnksXHJcblx0XHRcdGltZ29ubHk6IHRydWVcclxuXHRcdH1cclxuXHRcdC8vZ2V0IGFydCB3aXRoIG1vbmtleXNcclxuXHR9KS50aGVuKChyZXMpID0+e1xyXG5cdFx0Ly8gY29uc29sZS5sb2coJ2l0XFwncyBiYWNrJyk7XHJcblx0XHQvLyBjb25zb2xlLmxvZyhyZXMpO1xyXG5cdFx0Y29uc3QgYXJ0T2JqZWN0ID0gcmVzLmFydE9iamVjdHM7XHJcblx0XHRjb25zb2xlLmxvZyhhcnRPYmplY3QpO1xyXG5cdFx0Ly9jYWxsIGFydC5kaXNwbGF5XHJcblx0XHRhcnQuZGlzcGxheUFydChhcnRPYmplY3QpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLy9kaXNwbGF5IGFyIG9uIHBhZ2VcclxuYXJ0LmRpc3BsYXlBcnQgPSAoYWxsQXJ0KSA9PntcclxuXHRjb25zb2xlLmxvZygnZGlzcGxheUFydCBhbGxBcnQnLCBhbGxBcnQpO1xyXG5cdCQoJyNhcnR3b3JrJykuZW1wdHkoKTtcclxuXHJcblx0Ly9maWx0ZXIgdGhyb3VnaCB0byBzaG93IGFydCBwaWVjZSB0aGF0IGhhcyBpbWdzXHJcblx0YWxsQXJ0LmZpbHRlcigoYXJ0UGllY2UpID0+e1xyXG5cdFx0cmV0dXJuIGFydFBpZWNlLndlYkltYWdlICE9IG51bGw7XHJcblx0fSkuZm9yRWFjaCgoYXJ0UGllY2UpID0+e1xyXG5cdFx0Y29uc3QgJHRpdGxlID0gJCgnPGgyPicpLnRleHQoYXJ0UGllY2UudGl0bGUpO1xyXG5cdFx0Ly9jb25zb2xlLmxvZygkdGl0bGUpO1xyXG5cdFx0Y29uc3QgJGFydGlzdCA9ICQoJzxwPicpLmFkZENsYXNzKCdhcnRpc3QnKS50ZXh0KGFydFBpZWNlLnByaW5jaXBhbE9yRmlyc3RNYWtlcik7XHJcblx0XHRjb25zdCAkaW1nID0gJCgnPGltZz4nKS5hdHRyKCdzcmMnLCBhcnRQaWVjZS53ZWJJbWFnZS51cmwpO1xyXG5cdFx0JCgnI2FydHdvcmsnKS5hcHBlbmQoJHRpdGxlLCAkYXJ0aXN0LCAkaW1nKTtcclxuXHR9KTtcclxufVxyXG5cclxuYXJ0LmluaXQgPSAoKSA9PntcclxuXHQvL2dsb2JhbCB2YXJpYWJsZXMgaGVyZSAmIG90aGVyIGNvZGVcclxuXHRhcnQua2V5ID0gJ0ZraUlhckNJJztcclxuXHRjb25zb2xlLmxvZygnaGlpaScpO1xyXG5cdGFydC5nZXRBcnQoKTtcclxuXHQvL2V2ZW50IGxpc3RlbmVyIGZvciBjaGFuZ2Ugb2YgZHJvcGRvd25cclxuXHQkKCcjYW5pbWFsJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcblx0XHQvL2NvbnNvbGUubG9nKCdjaGFuZ2UnKTtcclxuXHRcdC8vZ2V0IHZhbHVlIG9mIG9wdGlvbiB0aGV5J3ZlIHNlbGVjdGVkXHJcblx0XHRjb25zdCBhbmltYWwgPSAkKHRoaXMpLnZhbCgpO1xyXG5cdFx0Y29uc29sZS5sb2coYW5pbWFsKTtcclxuXHRcdGFydC5nZXRBcnQoYW5pbWFsKTtcclxuXHJcblx0XHRjb25zdCBhbmltYWxOYW1lID0gJCh0aGlzKS5maW5kKCc6c2VsZWN0ZWQnKS50ZXh0KCk7XHJcblx0XHQkKCdoMScpLnRleHQoYEFydCB3aXRoICR7YW5pbWFsTmFtZX1gKTtcclxuXHR9KTtcclxufVxyXG5cclxuXHJcbi8vbWFpbiBmdW5jIHRvIHJ1biBhcHBcclxuJChmdW5jdGlvbigpe1xyXG5cdGFydC5pbml0KCk7XHJcblxyXG59KTsiXX0=
