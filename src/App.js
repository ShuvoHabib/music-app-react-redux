import React from "react";
import { connect } from "react-redux";
import { fetchMusic } from "./actions/simpleAction";
import './App.css';

class MusicList extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			albums: [],
			q: ''
		};
	}
	
	onChange(event) {
		const q = event.target.value.toLowerCase();
		console.log(q);
		let albums = this.props.albums;
		albums = albums.filter(function(album) {
			return album.title.toLowerCase().indexOf(q) != -1;
		});
		this.setState({ albums: albums });
	}
	
	componentDidMount() {
		this.props.dispatch(fetchMusic());
	}
	
	render() {
		const { error, loading, albums } = this.props;
		if (error) {
			return <div>Error! {error.message}</div>;
		}
		if (loading) {
			return <div>Loading...</div>;
		}
		return (
			<div className="App">
				<div className="logo">Albums</div>
				<input
					type="search"
					placeholder="Search"
					className="search-input form-control"
					onChange={this.onChange}
				/>
				<ul className="media-list">
					{albums.map(music =>
						<li className="media">
							<div className="media-left">
								<img className="media-object media-thumb" src={music.thumbnail_image} alt="..." />
							</div>
							<div className="media-body media-middle">
								<h4 className="media-heading music-title">{music.title}</h4>
								<h4 className="media-heading">{music.artist}</h4>
							</div>
							<div className="below">
								<img className="media-object" src={music.image} alt="..." />
							</div>
						</li>
					)}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	albums: state.simpleReducer.items,
	loading: state.loading,
	error: state.error
});

export default connect(mapStateToProps)(MusicList);