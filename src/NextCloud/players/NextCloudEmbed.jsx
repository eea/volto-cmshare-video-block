/* eslint-disable jsx-a11y/media-has-caption */
/**
 * NextCloudEmbed video block.
 * @module components/manage/Blocks/Video/NextCloudEmbed
 */
import React from 'react';
import PropTypes from 'prop-types';
import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers';

/**
 * NextCloudEmbed video block class.
 * @class NextCloudEmbed
 * @extends Component
 */
const NextCloudEmbed = ({ data, embedSettings }) => {
  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      src={
        isInternalURL(data.url)
          ? data.url.includes('@@download')
            ? flattenToAppURL(data.url)
            : `${flattenToAppURL(data.url)}/@@download/file`
          : `${data.url}/download`
      }
      controls={!data.autoPlay}
      autoPlay={data.autoPlay}
      muted={data.autoPlay}
      loop={data.loop}
      poster={embedSettings.placeholder}
      type="video/mp4"
    />
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
NextCloudEmbed.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  embedSettings: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default NextCloudEmbed;
