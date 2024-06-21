import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaStop, FaTimes } from "react-icons/fa";
import "./AudioPlayer.css";

const AudioPlayer = ({ episodeFile, handleClosePlayer }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const setAudioData = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    const audioEvents = {
      canplay: () => {
        setDuration(audio.duration);
      },
      timeupdate: () => {
        setAudioData();
      },
    };

    Object.entries(audioEvents).forEach(([event, handler]) => {
      audio.addEventListener(event, handler);
    });

    return () => {
      Object.entries(audioEvents).forEach(([event, handler]) => {
        audio.removeEventListener(event, handler);
      });
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    audio.currentTime = (e.target.value / 100) * audio.duration;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleCloseClick = () => {
    if (isPlaying) {
      setShowCloseConfirmation(true);
    } else {
      handleClosePlayer();
    }
  };

  const handleCloseConfirmation = (confirmed) => {
    if (confirmed) {
      setIsPlaying(false);
      setShowCloseConfirmation(false);
      handleClosePlayer();
    } else {
      setShowCloseConfirmation(false);
    }
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={episodeFile} preload="metadata" />
      <div className="controls">
        <button className="play-pause" onClick={togglePlayPause}>
          {isPlaying ? <FaStop /> : <FaPlay />}
        </button>
        <div className="progress-bar">
          <input
            type="range"
            min="0"
            max="100"
            value={currentTime && duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
          />
          <span className="time-display">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        <button className="close-button-player" onClick={handleCloseClick}>
          <FaTimes />
        </button>
      </div>
      {showCloseConfirmation && (
        <div className="close-confirmation">
          <p>Are you sure you want to stop playing audio?</p>
          <div>
            <button onClick={() => handleCloseConfirmation(true)}>Yes</button>
            <button onClick={() => handleCloseConfirmation(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
