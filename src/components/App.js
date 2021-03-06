import React, { Component } from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

class App extends Component {
  state = { videos: [], video: null };

  componentDidMount() {
    this.onSearchSubmit('surfing');
  }

  onSearchSubmit = async (term) => {
    const response = await youtube.get("/search", {
      params: {
        q: term
      }
    });

    this.setState({
      videos: response.data.items,
      video: response.data.items[0]
    });
  };

  onSelectVideo = (video) => {
    this.setState({video: video});
  };

  render() {
    return (
      <div className="ui container">
        <SearchBar onSubmit={this.onSearchSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.video} />
            </div>
            <div className="five wide column">
              <VideoList 
                onVideoSelect={this.onSelectVideo} 
                videos={this.state.videos} 
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;