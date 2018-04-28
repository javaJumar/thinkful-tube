const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search'; 

//search YouTube API for desired results
function getDataFromApi(searchTerm, callback) {
	const queryObj = {
		part: 'snippet',
		key: 'AIzaSyCgj-OBFUnpjpkPLuEHR5Je6CdXqNY2Hck',
		q: 'searchTerm'
	}
	$.getJSON(YOUTUBE_SEARCH_URL, queryObj, callback);
}
; 

//how to render the API results to the browser 
function renderResult(result){
	let template = `<div><a class="js-image-link" href=""><img class="js-image" src=""></a></div>`
	template.find(".js-image").attr("src", result.snippet.thumbnails.medium.url);
	template.find(".js-image-link").attr("href", 
  	'https://www.youtube.com/watch?v=' + result.id.videoId)
  	return template;
}

// show Youtube search results 
function youTubeSearchData(data){
	const searchResults = data.items.map((item, index) => renderResult(item));
	$('.search-results').html(searchResults);  
	}
}

//what happens when you click the search button
function goSubmit(){
	$('.search-form').submit(event => {
		event.preventDefault(); 
		let queryTarget = $(this).find('.query-input');
		let queryVal = queryTarget.val();
		queryTarget.val(''); //this clears out the input
		getDataFromApi(queryVal, youTubeSearchData); 
	});
}

$(goSubmit); 