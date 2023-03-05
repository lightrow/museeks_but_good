import React, { useCallback, useState } from 'react';
import Icon from 'react-fontawesome';
import cx from 'classnames';
import Slider from 'react-rangeslider';

import * as PlayerActions from '../../store/actions/PlayerActions';
import controlStyles from '../PlayerControls/PlayerControls.module.css';

import styles from './VolumeControl.module.css';
import classNames from 'classnames';

// Volume easing - http://www.dr-lex.be/info-stuff/volumecontrols.html#about
const SMOOTHING_FACTOR = 2.5;

const smoothifyVolume = (value: number): number => value ** SMOOTHING_FACTOR;
const unsmoothifyVolume = (value: number): number => value ** (1 / SMOOTHING_FACTOR);

const getVolumeIcon = (volume: number, muted: boolean): string => {
  if (muted || volume === 0) return 'volume-off';
  if (volume < 0.5) return 'volume-down';
  return 'volume-up';
};

const VolumeControl: React.FC = (props) => {
  const audio = window.MuseeksAPI.player.getAudio();

  const [volume, setVolume] = useState(audio.volume);
  const [muted, setMuted] = useState(audio.muted);

  const setPlayerVolume = useCallback(
    (value: number) => {
      const smoothVolume = smoothifyVolume(value);

      PlayerActions.setVolume(smoothVolume);
      setVolume(smoothVolume);
    },
    [setVolume]
  );

  const mute = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const muted = !window.MuseeksAPI.player.isMuted();
    PlayerActions.setMuted(muted);
    setMuted(muted);
  }, []);

  return (
    <div className={styles.volumeControlContainer}>
      <button type='button' className={classNames(styles.btn, 'reset')} title='Volume' onClick={mute}>
        <Icon name={getVolumeIcon(unsmoothifyVolume(volume), muted)} />
      </button>
      <div className={styles.volumeControl}>
        <Slider
          min={0}
          max={1}
          step={0.01}
          tooltip={false}
          value={unsmoothifyVolume(volume)}
          onChange={setPlayerVolume}
        />
      </div>
    </div>
  );
};

export default VolumeControl;
