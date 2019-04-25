import React from "react";
import { connect } from "react-redux";
import { fetchMusic } from "./actions/simpleAction";
import './App.css';

class MusicList extends React.Component {
	state = {
		albumsAll: [],
		inputCount: 0,
	};
	
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.updateState = this.updateState.bind(this);
	}
	updateState() {
		const { albums } = this.props;
		this.setState({
			albumsAll: albums,
		});
	}
	onChange(event) {
		const q = event.target.value.toLowerCase();
		let { albumsAll } = this.state;
		albumsAll = albumsAll.filter((album) => {
			let albumTitle = album.title.toLowerCase();
			return albumTitle.indexOf(
				q.toLowerCase()) !== -1
		});
		this.setState({
			albumsAll,
			inputCount: q.length,
		});
		if (q.length === 0) {
			this.setState({
				inputCount: 0,
			});
		}
	}
	
	componentDidMount() {
		this.props.dispatch(fetchMusic());
		const { albums } = this.props;
		this.setState({
			albumsAll: albums,
		});
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
					onClick={this.updateState}
				/>
				<ul className="media-list">
					{
						this.state.inputCount > 0 && (this.state.albumsAll.map(music =>
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
						))
					}
					{
						this.state.inputCount === 0 && (albums.map(music =>
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
						))
					}
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