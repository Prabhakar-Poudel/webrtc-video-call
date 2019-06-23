import React, { useState } from 'react';
import LocalVideo from './local-video';
import RemoteVideo from './remote-video';
import '../style/component/video-screen.css';

export default function() {
  const [mute, setmute] = useState(false);

  const toggleMute = ()  => {
    setmute(!mute);
  };

  const handleConnection = (iceCandidate, isLocal) => {
    if (iceCandidate) {
      const newIceCandidate = new RTCIceCandidate(iceCandidate);
      const otherPeer = isLocal ? remotePeerConnection : localPeerConnection;
      otherPeer.addIceCandidate(newIceCandidate);
    }
  }

  let localPeerConnection = new RTCPeerConnection(null);
  localPeerConnection.icecandidate = event => handleConnection(event.candidate, true);

  let remotePeerConnection = new RTCPeerConnection(null);
  remotePeerConnection.icecandidate = event => handleConnection(event.candidate, false);

  // const createdAnswer = (description) => {
  //   remotePeerConnection.setLocalDescription(description);
  //   localPeerConnection.setRemoteDescription(description);
  // }

  // const createdOffer = (description) => {
  //   localPeerConnection.setLocalDescription(description);
  //   remotePeerConnection.setRemoteDescription(description);
  //   remotePeerConnection.createAnswer().then(createdAnswer)
  // }


  // const hangupAction = () => {
  //   localPeerConnection.close();
  //   remotePeerConnection.close();
  //   localPeerConnection = null;
  //   remotePeerConnection = null;
  // }

  return (
    <div className="video-wrapper">
      <RemoteVideo peerConnection={remotePeerConnection}/>
      <LocalVideo peerConnection={localPeerConnection} mute={mute} />
      <div className="video-footer">
        <button className="mute-button" onClick={toggleMute}>
          {mute ? "Unmute" : "Mute"}
        </button>
      </div>
    </div>
  );
}
