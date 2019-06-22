import React, { useState } from 'react';
import LocalVideo from './local-video';
import RemoteVideo from './remote-video';
import '../style/component/video-screen.css';

export default function() {
  const [mute, setmute] = useState(false);

  const toggleMute = ()  => {
    setmute(!mute);
  };

  return (
    <div className="video-wrapper">
      <RemoteVideo />
      <LocalVideo mute={mute} />
      <div className="video-footer">
        <button className="mute-button" onClick={toggleMute}>
          {mute ? "Unmute" : "Mute"}
        </button>
      </div>
    </div>
  );
}
