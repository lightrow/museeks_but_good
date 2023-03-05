import React from 'react';
import { useSelector } from 'react-redux';

import PlayingBar from '../PlayingBar/PlayingBar';
import PlayerControls from '../PlayerControls/PlayerControls';
import Search from '../Search/Search';
import { RootState } from '../../store/reducers';

import styles from './Header.module.css';
import Cover from '../Cover/Cover';
import VolumeControl from '../VolumeControl/VolumeControl';

const Header: React.FC = () => {
  const { playerStatus, queue, queueCursor, shuffle, repeat } = useSelector(({ player }: RootState) => {
    return {
      playerStatus: player.playerStatus,
      repeat: player.repeat,
      shuffle: player.shuffle,
      queue: player.queue,
      queueCursor: player.queueCursor,
    };
  });

  const trackPlaying = queueCursor !== null ? queue[queueCursor] : null;

  return (
    <header className={styles.header}>
      <div className={styles.playingBar__cover}>
        <Cover track={trackPlaying} />
      </div>
      <div className={styles.header__mainControls}>
        <PlayerControls playerStatus={playerStatus} />
      </div>
      <div className={styles.header__playingBar}>
        <PlayingBar queue={queue} queueCursor={queueCursor} shuffle={shuffle} repeat={repeat} />
      </div>
      <VolumeControl />
    </header>
  );
};

export default Header;
