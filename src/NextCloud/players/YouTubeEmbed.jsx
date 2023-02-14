/**
 * YouTubeEmbed video block.
 * @module components/manage/Blocks/Video/YouTubeEmbed
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Embed } from 'semantic-ui-react';

/**
 * YouTubeEmbed video block class.
 * @class YouTubeEmbed
 * @extends Component
 */
const YouTubeEmbed = ({ data, embedSettings }) => {
  let videoID = null;
  let listID = null;

  if (data.url.match('list')) {
    const matches = data.url.match(/^.*\?list=(.*)|^.*&list=(.*)$/);
    listID = matches[1] || matches[2];
  } else {
    videoID = data.url.match(/.be\//)
      ? data.url.match(/^.*\.be\/(.*)/)[1]
      : data.url.match(/^.*\?v=(.*)$/)[1];
  }

  const placeholder = embedSettings.placeholder
    ? embedSettings.placeholder
    : 'https://img.youtube.com/vi/' + videoID + '/sddefault.jpg';
  const resultEmbedSettings = { ...embedSettings, placeholder };

  return (
    <>
      {listID ? (
        <Embed
          url={`https://www.youtube.com/embed/videoseries?list=${listID}`}
          {...resultEmbedSettings}
        />
      ) : (
        <Embed id={videoID} source="youtube" {...resultEmbedSettings} />
      )}
    </>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
YouTubeEmbed.propTypes = {
  embedSettings: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default YouTubeEmbed;
