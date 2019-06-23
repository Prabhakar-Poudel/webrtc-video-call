import React, { useRef } from 'react';
import '../style/component/remote-video.css';

export default function RemoteVideo({ peerConnection }) {

  const remoteVideo = useRef(null);

  const gotRemoteMediaStream = ({ stream }) => {
    remoteVideo.current.srcObject = stream;
  };

  // TODO: looks like a loop
  peerConnection.ontrack = gotRemoteMediaStream;

  return (
    <video id="remote-video" ref={remoteVideo} autoPlay playsInline></video>
  );
};
