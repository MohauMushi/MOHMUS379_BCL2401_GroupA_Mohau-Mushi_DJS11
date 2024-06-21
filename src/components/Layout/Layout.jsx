import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import {
  AudioPlayerProvider,
  useAudioPlayer,
} from "../AudioPlayer/AudioPlayerContext";

const LayoutContent = () => {
  const { isPlayerOpen, currentEpisodeFile, closePlayer } = useAudioPlayer();

  return (
    <div className="site-wrapper">
      <Navbar />
      <main>
        <Outlet />
      </main>
      {isPlayerOpen && (
        <AudioPlayer
          episodeFile={currentEpisodeFile}
          handleClosePlayer={closePlayer}
        />
      )}
      <Footer />
    </div>
  );
};

export default function Layout() {
  return (
    <AudioPlayerProvider>
      <LayoutContent />
    </AudioPlayerProvider>
  );
}
