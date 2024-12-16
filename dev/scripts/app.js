// Load environment variables from .env file
require('dotenv').config();

// Object to hold app
const art = {};

// Use the API key from environment variables
art.key = process.env.RIJKSMUSEUM_API_KEY;

// Display art on page
art.displayArt = (allArt) => {
    console.log('displayArt allArt', allArt);
    $('#artwork').empty();

    if (!Array.isArray(allArt)) {
        console.error('Expected an array but got:', allArt);
        return;
    }

    // Manually filter through to show art pieces that have images
    const filteredArt = [];
    allArt.forEach((artPiece) => {
        if (artPiece.webImage != null) {
            filteredArt.push(artPiece);
        }
    });

    filteredArt.forEach((artPiece) => {
        const $title = $('<h2>').text(artPiece.title);
        const $image = $('<img>').attr('src', artPiece.webImage.url);
        const $artPiece = $('<div>').addClass('art-piece').append($title, $image);
        $('#artwork').append($artPiece);
    });
};

// Get art from the API
art.getArt = async (query) => {
    try {
        const response = await fetch(`https://www.rijksmuseum.nl/api/en/collection?key=${art.key}&format=json&q=${query}&imgonly=true`);
		console.log('response', response);
        const data = await response.json();
		console.log('API response:', data);
        const artObject = Array.isArray(data.artObjects) ? data.artObjects : [];
        console.log('API response artObjects:', artObject);
        // Call art.display
        art.displayArt(artObject);
    } catch (error) {
        console.error('Error fetching art:', error);
        art.displayArt([]);
    }
};

art.init = () => {
    // Global variables here & other code
    console.log('hiii');
    art.getArt('default query'); // Provide a default query or handle it appropriately
    // Event listener for change of dropdown
    $('#animal').on('change', function () {
        const animal = $(this).val();
        art.getArt(animal); // Fetch art based on the selected animal
    });
};

// Initialize the app
$(document).ready(() => {
    art.init();
});