import React, { Component} from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';


class Album extends Component {

constructor(props){
  super(props);

  const album = albumData.find( album => {
    return album.slug === this.props.match.params.slug
  });

  this.state={
    album: album,
    currentSong: album.songs[0],
    isPlaying: false
  };

  this.audioElement = document.createElement('audio');
  this.audioElement.src = album.songs[0].audioSrc;
  this.handleSongClick = this.handleSongClick.bind(this);
  this.play = this.play.bind(this);
  this.pause = this.pause.bind(this);
}

play(){
  this.audioElement.play();
  this.setState({isPlaying: true});
}

pause(){
  this.audioElement.pause();
  this.setState({isPlaying: false});
}

setSong(song){
  this.audioElement.src = song.audioSrc;
  this.setState({currentSong: song});
}

handleSongClick(song){
  const isSameSong = this.state.currentSong === song;
  if(this.state.isPlaying && isSameSong){
    console.log("this should pause the song");
    this.pause();

  }
  else {
    if(!isSameSong) {this.setSong(song);}
    this.play();
  }
}

showController(song, index){
  const isSameSong = this.state.currentSong === song;
  const p1 = document.getElementById(index).childNodes;
  if(this.state.isPlaying && isSameSong){
    p1[0].style.visibility='hidden';
    p1[1].style.visibility="visible";
    p1[2].style.visibility='hidden';
    console.log("Enter: pause should be shown");

  }
    if(!this.state.isPlaying){
      p1[0].style.visibility="visible";
      p1[1].style.visibility="hidden";
      p1[2].style.visibility="hidden";
    console.log("Enter: play should be shown");

  }
}

showIndex(song, index){
  const isSameSong = this.state.currentSong === song;
  const p = document.getElementById(index).childNodes;
  if(this.state.isPlaying && isSameSong){
    p[0].style.visibility="hidden";
    p[1].style.visibility="visible";
    p[2].style.visibility="hidden";
    console.log("Leave: pause should be shown");
  }
  if(!this.state.isPlaying && isSameSong){
    p[0].style.visibility="visible";
    p[1].style.visibility="hidden";
    p[2].style.visibility="hidden";
  }
  if(!this.state.isPlaying && !isSameSong){
    p[0].style.visibility="hidden";
    p[1].style.visibility="hidden";
    p[2].style.visibility="visible";
  }

}

handlePrevClick(song){
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
  const newIndex = Math.max(0, currentIndex -1);
  const newSong = this.state.album.songs[newIndex];
    console.log("new index prev:" + newIndex);
  this.setSong(newSong);
  this.play();
}


handleNextClick(song){
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
  const len = this.state.album.songs.length
  const newIndex = Math.min(currentIndex + 1, len -1);
  console.log("new index:" + newIndex);
  const newSong = this.state.album.songs[newIndex];
  console.log( newSong);
  this.setSong(newSong);
  this.play();
}


  render() {
    return(
      <section className="album">
        <section id="album-info">
           <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
           <div className="album-details">
             <h1 id="album-title">{this.state.album.title}</h1>
             <h2 className="artist">{this.state.album.artist}</h2>
             <div id="release-info">{this.state.album.releaseInfo}</div>
           </div>
         </section>
         <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <thead>
            <tr>
              <th>Song number</th>
              <th>Song Title</th>
              <th>Song duration</th>

            </tr>

            {
            this.state.album.songs.map( (song, index) =>
                  <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.showController(song, index)} onMouseLeave={() => this.showIndex(song, index)}>
                    <td><span id={index}><i className="ion-md-play-circle"></i><i className="ion-pause"></i><p className="childIndex">{index+1}</p></span></td>
                    <td>{song.title}</td>
                    <td>{song.duration}</td>
                    <td><audio src="song.audioSrc"></audio></td>
                  </tr>
                )}


          </thead>
          <tbody>
          </tbody>
         </table>
         <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
           />
      </section>
    );
  }
}

export default Album;
