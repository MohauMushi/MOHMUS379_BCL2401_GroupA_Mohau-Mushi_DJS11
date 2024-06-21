import { createContext, useState, useContext } from "react";

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [currentEpisodeFile, setCurrentEpisodeFile] = useState(null);

  const openPlayer = (episodeFile) => {
    setCurrentEpisodeFile(episodeFile);
    setIsPlayerOpen(true);
  };

  const closePlayer = () => {
    setCurrentEpisodeFile(null);
    setIsPlayerOpen(false);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        isPlayerOpen,
        currentEpisodeFile,
        openPlayer,
        closePlayer,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);
