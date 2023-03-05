import classNames from 'classnames';
import React, { memo, ReactNode, useEffect, useLayoutEffect, useState } from 'react';

import { Track } from '../../../shared/types/museeks';

import styles from './Cover.module.css';
import { wait } from '../../lib/utils';

interface Props {
  track: Track | null;
  small?: boolean;
  children?: ReactNode;
  idx?: number;
}

const Cover: React.FC<Props> = (props) => {
  const [coverPath, setCoverPath] = useState<string | null>();

  useLayoutEffect(() => {
    const refreshCover = async () => {
      if (!props.track) {
        setCoverPath(null);
        return;
      }
      const coverPath = await window.MuseeksAPI.covers.getCoverAsBase64(props.track);
      setCoverPath(coverPath);
    };

    refreshCover();
  }, [props.track]);

  let inlineStyles;

  if (coverPath) {
    const encodedCoverPath = encodeURI(coverPath).replace(/'/g, "\\'").replace(/"/g, '\\"');
    inlineStyles = { backgroundImage: `url('${encodedCoverPath}')`, opacity: 1, transform: 'scale(1' };
  }

  return (
    <div
      className={classNames(styles.cover, {
        [styles.coverSmall]: props.small,
        [styles.coverPlaceholder]: coverPath === null,
      })}
    >
      <div style={inlineStyles} className={styles.cover__img}>
        {props.children}
      </div>
      {props.children}
    </div>
  );
};

export default memo(Cover);
