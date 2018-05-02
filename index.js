const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search'; 

//search YouTube API for desired results
function getDataFromApi(searchTerm, callback) {
	const queryObj = {
		part: 'snippet',
		key: 'AIzaSyCgj-OBFUnpjpkPLuEHR5Je6CdXqNY2Hck',
		q: searchTerm
	}
	$.getJSON(YOUTUBE_SEARCH_URL, queryObj, callback);
}

let RESULT_HTML_TEMPLATE = (
  `<div class='video-list'>
	 <p class='video-title'></p>
	 <a class="js-image-link" href=""><img class="js-image" src="" alt=""></a>
    </div>
`);

//how to render the API results to the browser 
function renderResult(result){
  let template = $(RESULT_HTML_TEMPLATE);
  template.find(".js-image").attr("src", result.snippet.thumbnails.medium.url);
  template.find('.js-image').attr("alt", result.snippet.title);
  template.find(".js-image-link").attr("href", 
  'https://www.youtube.com/watch?v=' + result.id.videoId);
  template.find('.video-title').html(result.snippet.title);
  return template;
}

// show Youtube search results 
function youTubeSearchData(data){
	const searchResults = data.items.map((item, index) => renderResult(item));
	const numResults = data.items.length;
	$('.video-number').html(`<p id="num-results">   Number of Results: ${numResults} Videos</p>`).prop('hidden', false);
	$('.search-results').html(searchResults).prop('hidden', false);
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