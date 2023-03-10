import store from '../store';
import types from '../action-types';
import { Track } from '../../../shared/types/museeks';

/**
 * Start audio playback from the queue
 */
export const start = async (index: number): Promise<void> => {
  const { queue } = store.getState().player;
  const track = queue[index];

  window.MuseeksAPI.player.setTrack(track);
  await window.MuseeksAPI.player.play();

  store.dispatch({
    type: types.QUEUE_START,
    payload: {
      index,
    },
  });
};

/**
 * Clear the queue
 */
export const clear = (): void => {
  store.dispatch({
    type: types.QUEUE_CLEAR,
  });
};

/**
 * Remove track from queue
 */
export const remove = (index: number): void => {
  store.dispatch({
    type: types.QUEUE_REMOVE,
    payload: {
      index,
    },
  });
};

/**
 * Add tracks at the end of the queue
 */
export const addAfter = async (tracksIds: string[]): Promise<void> => {
  const tracks = await window.MuseeksAPI.db.tracks.findByID(tracksIds);
  store.dispatch({
    type: types.QUEUE_ADD,
    payload: {
      tracks,
    },
  });
};

/**
 * Add tracks at the beginning of the queue
 */
export const addNext = async (tracksIds: string[]): Promise<void> => {
  const tracks = await window.MuseeksAPI.db.tracks.findByID(tracksIds);
  store.dispatch({
    type: types.QUEUE_ADD_NEXT,
    payload: {
      tracks,
    },
  });
};

/**
 * Set the queue
 */
export const setQueue = (tracks: Track[]): void => {
  store.dispatch({
    type: types.QUEUE_SET_QUEUE,
    payload: {
      tracks,
    },
  });
};
