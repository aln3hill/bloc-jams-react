import React from 'react';

const Landings = () => (
  <section className="landing">
    <h1 className="hero-title">Turn the music up!</h1>

    <section className="selling-points">
      <div className="point">
        <img className="menu" src="/assets/images/menupics/md-musical-notes.svg" alt="a musical note" />
        <h2 className="point-title"> Choose your music</h2>
        <p className="point-description">The world is full of music, why should you have to listen to music soemone else chose?</p>
      </div>
      <div className="point">
        <img className="menu" src="/assets/images/menupics/md-infinite.svg" alt="an infinite loop" />
        <h2 className="point-title">Unlimited, streaming, ad-free</h2>
        <p className="point-description">No arbitrary limits. No distractions.</p>
      </div>
      <div className="point">
        <img className="menu" src="/assets/images/menupics/md-phone-portrait.svg" alt="a mobile phone" />
        <h2 className="point-title">Mobile enabled</h2>
        <p className="point-description">Listen to the music on the go. This service is available on all mobile platforms.</p>
      </div>
    </section>
  </section>
)

export default Landings;
