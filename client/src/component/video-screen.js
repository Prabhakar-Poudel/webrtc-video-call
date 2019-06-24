import React, { useState } from 'react';
import LocalVideo from './local-video';
import RemoteVideo from './remote-video';
import '../style/component/video-screen.css';
import { joinRoom, sendMessage, attachMessageHandler } from '../util/socket';

export default function VideoScreen({ match }) {
  const [mute, setmute] = useState(false);
  const [remoteVideoSrc, setRemoteVideoSrc] = useState()
  let isStarted = false;
  let peerConnection;

  const toggleMute = ()  => {
    setmute(!mute);
  };

  attachMessageHandler(messageHandler);

  const handleIceCandidate = (event) => {
    console.log('icecandidate event: ', event);
    if (event.candidate) {
      sendMessage({
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate
      });
    } else {
      console.log('End of candidates.');
    }
  }

  const handleRemoteStreamAdded = ({ stream }) => {
    console.log("called handleRemoteStreamAdded")
    console.log('Remote stream added.');
    setRemoteVideoSrc(stream)
  };

  const setLocalAndSendMessage = (sessionDescription) => {
    peerConnection.setLocalDescription(sessionDescription);
    sendMessage(sessionDescription);
  };

  const initializeConnection = () => {
    console.log("initialize called")
    peerConnection = new RTCPeerConnection({'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }]});
    peerConnection.icecandidate = handleIceCandidate;
    peerConnection.onaddstream = handleRemoteStreamAdded;
  };

  const createOffer = () => {
    console.log("initiating createOffer")
    peerConnection.createOffer().then(setLocalAndSendMessage);
  };

  const roomId = match.params.id;
  joinRoom(roomId, initializeConnection, createOffer);

  const createdAnswer = () => {
    console.log("createAnswer called")
    peerConnection.createAnswer().then(setLocalAndSendMessage);
  };

  const stop = () => {
    isStarted = false;
    peerConnection.close();
    peerConnection = null;
  }

  const handleRemoteHangup = () => {
    console.log('Session terminated.');
    stop();
  }

  function messageHandler(message) {
    console.log("message received", message)
    if (message === 'media accessed') {
      
    } else if (message.type === 'offer') {
      peerConnection.setRemoteDescription(new RTCSessionDescription(message));
      createdAnswer();
    } else if (message.type === 'answer' && isStarted) {
      peerConnection.setRemoteDescription(new RTCSessionDescription(message));
    } else if (message.type === 'candidate' && isStarted) {
      var candidate = new RTCIceCandidate({
        sdpMLineIndex: message.label,
        candidate: message.candidate
      });
      peerConnection.addIceCandidate(candidate);
    } else if (message === 'bye' && isStarted) {
      handleRemoteHangup();
    }
  };

  const onLocalStreamReceived = (stream) => {
    sendMessage('media accessed');
    // peerConnection.addStream(stream)
    isStarted = true;
  };

  return (
    <div className="video-wrapper">
      <RemoteVideo src={remoteVideoSrc} />
      <LocalVideo onStreamReceived={onLocalStreamReceived} mute={mute} />
      <div className="video-footer">
        <button className="mute-button" onClick={toggleMute}>
          {mute ? "Unmute" : "Mute"}
        </button>
      </div>
    </div>
  );
}
