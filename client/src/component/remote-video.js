import React, { useRef, useEffect } from 'react';
import '../style/component/remote-video.css';

export default function RemoteVideo({ src }) {

  const remoteVideo = useRef(null);
  
  useEffect(() => {
    console.log("inside video remote comp")
    remoteVideo.current.srcObject = src;
  }, [src])

  return (
    <video id="remote-video" ref={remoteVideo} autoPlay playsInline></video>
  );
};
