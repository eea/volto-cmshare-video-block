/**
 * Body video block.
 * @module components/manage/Blocks/Video/Body
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import players from './players';

/**
 * Body video block class.
 * @class Body
 * @extends Component
 */
const Body = ({ data }) => {
  let placeholder = data.preview_image
    ? isInternalURL(data.preview_image)
      ? `${flattenToAppURL(data.preview_image)}/@@images/image`
      : data.preview_image
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

  const allowedPlayersList = ['nextCloud'];
  const allowedPlayers = allowedPlayersList.reduce((acc, playerName) => {
    const player = players[playerName];
    return {
      ...acc,
      [playerName]: player,
    };
  }, {});
  const SelectedPlayerComponent = allowedPlayersList.reduce(
    (acc, currentPlayerName) => {
      // eslint-disable-next-line no-unused-expressions
      const result = data.url.match(currentPlayerName)
        ? allowedPlayers[currentPlayerName]
        : acc;
      return result;
    },
    allowedPlayers.nextCloud,
  );

  return (
    <>
      {data.url && (
        <div
          className={cx('video-inner', {
            'full-width': data.align === 'full',
          })}
        >
          <SelectedPlayerComponent {...{ data, embedSettings }} />
        </div>
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
