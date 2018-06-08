import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import albumData from './../data/albums';
import { Card } from 'material-design-lite';

class Library extends Component {
  constructor(props){
    super(props);
    this.state={
      albums: albumData
    };
  }

  render(){
    return (
      <section className="library">
      {
        this.state.albums.map((album,index) =>
          <div className="eachAlbum">
          <Link className="albumLink" to={`/album/${album.slug}`} key={index}>
            <img className="libraryImg" src={album.albumCover} alt={album.title} />
            <div className="albumTitle">{album.titel}</div>
            <div className="albumArtist">{album.artist}</div>
            <div className="albumSongs">{album.songs.length} songs</div>
          </Link>
          </div>
        )

      }
      <section className="footer">
        <div className="navfooter">About</div>
        <div className="navfooter">Contact</div>
        <div className="navfooter">Feedback</div>
      </section>
      </section>
    );
  }
}

export default Library;
