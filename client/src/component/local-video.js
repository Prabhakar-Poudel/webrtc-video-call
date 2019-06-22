import React, { useEffect, useRef } from 'react';
import '../style/component/local-video.css';

export default function LocalVideo({ mute }) {

  let localVideo = useRef(null);

  const mediaStreamConstraints = {
    audio: true,
    video: true,
  };

  const gotLocalMediaStream = mediaStream => {
    localVideo.current.srcObject = mediaStream;
  };

  const handleLocalMediaStreamError = error => {
    alert('Video loading failed. Make sure you allowed cameera and microphone access.')
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
    .then(gotLocalMediaStream)
    .catch(handleLocalMediaStreamError);
  });

  return (
    <video autoPlay playsInline ref={localVideo} muted={mute} id="local-video"></video>
  )
}
