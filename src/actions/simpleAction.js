export function fetchMusic() {
	return dispatch => {
		dispatch(fetchMUSICBegin());
		return fetch("http://rallycoding.herokuapp.com/api/music_albums")
			.then(handleErrors)
			.then(res => res.json())
			.then(json => {
				dispatch(fetchMUSICSuccess(json));
				return json;
			})
			.catch(error => dispatch(fetchMUSICFailure(error)));
	};
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

export const FETCH_MUSIC_BEGIN   = 'FETCH_MUSIC_BEGIN';
export const FETCH_MUSIC_SUCCESS = 'FETCH_MUSIC_SUCCESS';
export const FETCH_MUSIC_FAILURE = 'FETCH_MUSIC_FAILURE';

export const fetchMUSICBegin = () => ({
	type: FETCH_MUSIC_BEGIN
});

export const fetchMUSICSuccess = MUSIC => ({
	type: FETCH_MUSIC_SUCCESS,
	payload: { MUSIC }
});

export const fetchMUSICFailure = error => ({
	type: FETCH_MUSIC_FAILURE,
	payload: { error }
});