import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaStop, FaTimes } from "react-icons/fa";
import "./AudioPlayer.css";

const AudioPlayer = ({ episodeFile, handleClosePlayer }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const setAudioData = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsFinished(true);
      localStorage.setItem(episodeFile, 'finished');
    };

    const audioEvents = {
      canplay: () => {
        setDuration(audio.duration);
      },
      timeupdate: () => {
        setAudioData();
      },
      ended: handleEnded,
    };

    Object.entries(audioEvents).forEach(([event, handler]) => {
      audio.addEventListener(event, handler);
    });

    // Check if the episode was finished before
    if (localStorage.getItem(episodeFile) === 'finished') {
      setIsFinished(true);
    }

    return () => {
      Object.entries(audioEvents).forEach(([event, handler]) => {
        audio.removeEventListener(event, handler);
      });
    };
  }, [episodeFile]);

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
      <audio ref={audioRef} src={episodeFile} />
      <button onClick={togglePlayPause}>
        {isPlaying ? <FaStop /> : <FaPlay />}
      </button>
      <div>
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={(currentTime / duration) * 100 || 0}
        onChange={handleSeek}
      />
      {isFinished && <div>Episode finished</div>}
      <button onClick={handleCloseClick}>
        <FaTimes />
      </button>
      {showCloseConfirmation && (
        <div className="close-confirmation">
          <p>Are you sure you want to stop playing audio?</p>
          <button onClick={() => handleCloseConfirmation(true)}>Yes</button>
          <button onClick={() => handleCloseConfirmation(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
