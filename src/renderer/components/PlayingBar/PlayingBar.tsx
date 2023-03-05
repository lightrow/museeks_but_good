import React, { useState } from 'react';
import Icon from 'react-fontawesome';
import cx from 'classnames';
import useClickOut from '@bscop/use-click-out';

import Queue from '../Queue/Queue';
import PlayingBarInfos from '../PlayingBarInfo/PlayingBarInfo';
import { TrackModel, Repeat } from '../../../shared/types/museeks';

import styles from './PlayingBar.module.css';

interface Props {
  queue: TrackModel[];
  queueCursor: number | null;
  shuffle: boolean;
  repeat: Repeat;
}

const PlayingBar: React.FC<Props> = (props) => {
  const { queue, queueCursor, repeat, shuffle } = props;

  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const clickOutRef = useClickOut<HTMLDivElement>(() => {
    setIsQueueOpen(false);
  });

  const queueContainerClasses = cx(styles.queueContainer, {
    [styles.isOpen]: isQueueOpen,
  });

  if (queueCursor === null) return null;

  const trackPlaying = queue[queueCursor];

  return (
    <div className={styles.playingBar}>
      <PlayingBarInfos trackPlaying={trackPlaying} shuffle={shuffle} repeat={repeat} />
    </div>
  );
};

export default PlayingBar;
