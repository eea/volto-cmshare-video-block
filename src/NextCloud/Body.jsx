/**
 * Body video block.
 * @module components/manage/Blocks/Video/Body
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { isInternalURL } from '@plone/volto/helpers';
import { getFieldURL } from '@eeacms/volto-nextcloud-video-block/helpers';
import players from './players';

/**
 * Body video block class.
 * @class Body
 * @extends Component
 */
const Body = ({ data }) => {
  const previewImage = getFieldURL(data.preview_image);
  const url = getFieldURL(data.url);
  let placeholder = previewImage
    ? isInternalURL(previewImage)
      ? `${previewImage}/@@images/image`
      : previewImage
    : null;

  const ref = React.createRef();
  const onKeyDown = (e) => {
    if (e.nativeEvent.keyCode === 13) {
      ref.current.handleClick();
    }
  };

  const embedSettings = {
    placeholder,
    icon: 'play',
    defaultActive: false,
    autoplay: false,
    aspectRatio: '16:9',
    tabIndex: 0,
    onKeyPress: onKeyDown,
    ref: ref,
  };
  // for future there can be more embed players
  const allowedPlayersList = ['nextCloud'];
  // only use allowed embed players from all that exist
  const allowedPlayers = allowedPlayersList.reduce((acc, playerName) => {
    const player = players[playerName];
    return {
      ...acc,
      [playerName]: player,
    };
  }, {});
  // select the appropriate embed player or default nextCloud, based on provided url
  const SelectedPlayerComponent = allowedPlayersList.reduce(
    (acc, currentPlayerName) => {
      // eslint-disable-next-line no-unused-expressions
      const result = url?.match(currentPlayerName)
        ? allowedPlayers[currentPlayerName]
        : acc;
      return result;
    },
    allowedPlayers.nextCloud,
  );

  return (
    <>
      {url && (
        <figure
          className={cx('video-inner', {
            'full-width': data.align === 'full',
          })}
        >
          <SelectedPlayerComponent {...{ data, embedSettings }} />
          {data.title && <figcaption>{data.title}</figcaption>}
        </figure>
      )}
    </>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Body.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Body;
