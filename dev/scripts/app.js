

//FkiIarCI

//object to hold app
const art = {};

//get art from the api
art.getArt = (query = 'monkey') =>{
	$.ajax({
		url: 'https://www.rijksmuseum.nl/api/en/collection',
		method: 'GET',
		dataType: 'jsonp',
		data:{
			key: art.key,
			format: 'jsonp',
			q: query,
			imgonly: true
		}
		//get art with monkeys
	}).then((res) =>{
		// console.log('it\'s back');
		// console.log(res);
		const artObject = res.artObjects;
		console.log(artObject);
		//call art.display
		art.displayArt(artObject);
	});
};

//display ar on page
art.displayArt = (allArt) =>{
	console.log('displayArt allArt', allArt);
	$('#artwork').empty();

	//filter through to show art piece that has imgs
	allArt.filter((artPiece) =>{
		return artPiece.webImage != null;
	}).forEach((artPiece) =>{
		const $title = $('<h2>').text(artPiece.title);
		//console.log($title);
		const $artist = $('<p>').addClass('artist').text(artPiece.principalOrFirstMaker);
		const $img = $('<img>').attr('src', artPiece.webImage.url);
		$('#artwork').append($title, $artist, $img);
	});
}

art.init = () =>{
	//global variables here & other code
	art.key = 'FkiIarCI';
	console.log('hiii');
	art.getArt();
	//event listener for change of dropdown
	$('#animal').on('change', function(){
		//console.log('change');
		//get value of option they've selected
		const animal = $(this).val();
		console.log(animal);
		art.getArt(animal);

		const animalName = $(this).find(':selected').text();
		$('h1').text(`Art with ${animalName}`);
	});
}


//main func to run app
$(function(){
	art.init();

});