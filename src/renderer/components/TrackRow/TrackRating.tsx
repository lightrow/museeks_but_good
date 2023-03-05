import classNames from 'classnames';
import { FC, useMemo } from 'react';
import Icon from 'react-fontawesome';
import { TrackModel } from '../../../shared/types/museeks';
import { updateTrackRating } from '../../store/actions/LibraryActions';
import styles from './TrackRating.module.css';

interface ITrackRatingProps {
  track: TrackModel;
}

const TrackRating: FC<ITrackRatingProps> = ({ track }) => {
  const changeRating = (newRating: number) => {
    updateTrackRating(track._id, newRating);
  };

  const stars = useMemo(() => {
    const filled = Array.apply(null, Array(Math.round(track.rating || 0))).map((_, idx) => (
      <button
        onClick={(e) => changeRating(idx)}
        className={classNames('reset', styles.btn)}
        key={track.path + idx + 'filled'}
      >
        <Icon name='star' fixedWidth />
      </button>
    ));

    const unfilled = Array.apply(null, Array(Math.round(5 - filled.length))).map((_, idx) => (
      <button
        onClick={(e) => changeRating(filled.length + idx + 1)}
        className={classNames('reset', styles.btn, styles.unfilled)}
        key={track.path + idx + 'unfilled'}
      >
        <Icon name='star-o' fixedWidth />
      </button>
    ));

    return [filled, unfilled];
  }, [track.rating]);

  return (
    <div
      onMouseMove={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onMouseDown={(e) => e.stopPropagation()}
      className={styles.stars}
    >
      {stars}
    </div>
  );
};

export default TrackRating;
