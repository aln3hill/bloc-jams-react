import React, { Component} from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';


// function PlayButton(props){
//   return <span><i className="ion-md-play-circle"></i></span>;
// }
//
// function PauseButton(props){
//   return <span><i className="ion-pause"></i></span>;
// }
//
// function IndexDisplay(index){
//   return <p>index+1</p>;
// }



class Album extends Component {

constructor(props){
  super(props);

  const album = albumData.find( album => {
    return album.slug === this.props.match.params.slug
  });

  this.state={
    album: album,
    currentSong: album.songs[0],
    isPlaying: false,
    isEntered: false,
    indexEntered: null,
    currentTime: 0,
    duration: album.songs[0].duration,
    volumeLevel: 0.5
  };

  this.audioElement = document.createElement('audio');
  this.audioElement.src = album.songs[0].audioSrc;
  this.handleSongClick = this.handleSongClick.bind(this);
  this.play = this.play.bind(this);
  this.pause = this.pause.bind(this);
  this.didEnter = this.didEnter.bind(this);
  this.didLeave = this.didLeave.bind(this);
}

componentDidMount(){

  this.eventListeners = {
    timeupdate: e => {
      this.setState({currentTime: this.audioElement.currentTime});
    },

    durationchange: e => {
      this.setState({duration: this.audioElement.duration});
    }
  }

  this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
  this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
}

componentWillUnmount(){
  this.audioElement.src = null;
  this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
  this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
}

play(){
  this.audioElement.play();
  this.setState({isPlaying: true});
}

pause(){
  this.audioElement.pause();
  this.setState({isPlaying: false,
                });
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


didEnter(index){
    this.setState({isEntered:true,
                  indexEntered: index});

    console.log("entered");
    console.log(this.state.isEntered);
}

didLeave(){
  this.setState({isEntered:false,
                indexEntered: null});
  console.log('left');
  console.log(this.state.isEntered);
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

handleTimeChange(e){
  const newTime = this.audioElement.duration * e.target.value;
  this.audioElement.currentTime = newTime;
  this.setState({currentTime: newTime});
}

higherVolume(){
  const currentVolume = this.state.volumeLevel;
  const newVolume = Math.min(1, currentVolume + 0.1);
  this.audioElement.volume = newVolume;
  this.setState({volumeLevel: newVolume})
}

lowerVolume(){
  const currentVolume = this.state.volumeLevel;
  const newVolume = Math.max(currentVolume - 0.1, 0);
  this.audioElement.volume = newVolume;
  this.setState({volumeLevel: newVolume})
}

// changeVolume(e){
//   const currentVolume = this.state.volumeLevel;
//   const newVolume = currentVolume * e.target.value;
//   this.audioElement.volume = newVolume;
//   this.setState({volumeLevel: newVolume});
//
// }


  render() {
    const isPlaying = this.state.isPlaying;
    const hover = this.state.isEntered;

    let button = null;
    //  if(hover){

        if(isPlaying ){
          button = <button><span className="ion-pause"></span></button>;
        }
        if(!isPlaying){
          button = <button><span className="ion-play"></span></button>;
        }
        // if(!hover && isPlaying){
        //   button = button = <button><span className="ion-pause"></span></button>;
        // }
        // if (!hover && !isPlaying){
        //   button = <button><span className="ion-play"></span></button>;
        // }
    //  }
    //  else { button = <button><span className="ion-play"></span></button>;}


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
                  <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.didEnter(index)} onMouseLeave={() => this.didLeave()}>
                    <td>{(hover && index === this.state.indexEntered) ?
                      (song === this.state.currentSong && isPlaying) ?
                      (<button><span className="ion-pause"></span></button>) :
                      (<button><span className="ion-play"></span></button>) :
                      (song === this.state.currentSong && isPlaying) ?
                      (button) : (index +1) }  </td>
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
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          volumeLevel={this.state.volumeLevel}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          higherVolume={() => this.higherVolume()}
          lowerVolume={() => this.lowerVolume()}
          changeVolume={(e) => this.lowerVolume(e)}
           />

      </section>
    );
  }
}

export default Album;
