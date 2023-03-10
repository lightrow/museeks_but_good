import React from 'react';
import InlineSVG from 'svg-inline-react';
import cx from 'classnames';

import icons from '../../lib/icons';
import * as PlayerActions from '../../store/actions/PlayerActions';

import styles from './common.module.css';

interface Props {
  shuffle: boolean;
}

const ButtonShuffle: React.FC<Props> = (props) => {
  const buttonClasses = cx(styles.button, {
    [styles.active]: props.shuffle,
  });

  return (
    <button
      type='button'
      className={buttonClasses}
      onClick={() => {
        PlayerActions.shuffle(!props.shuffle);
      }}
    >
      <InlineSVG src={icons.SHUFFLE} className={styles.icon} />
    </button>
  );
};

export default ButtonShuffle;
