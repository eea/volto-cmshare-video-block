/**
 * VimeoEmbed video block.
 * @module components/manage/Blocks/Video/VimeoEmbed
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Embed } from 'semantic-ui-react';

/**
 * VimeoEmbed video block class.
 * @class VimeoEmbed
 * @extends Component
 */
const VimeoEmbed = ({ data, embedSettings }) => {
  const videoID = data.url.match(/^.*\.com\/(.*)/)[1];
  const placeholder = embedSettings.placeholder ? embedSettings.placeholder :
    'https://vumbnail.com/' + videoID + '.jpg';
  const resultEmbedSettings = { ...embedSettings, placeholder }

  return <Embed id={videoID} source="vimeo" {...resultEmbedSettings} />;
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
VimeoEmbed.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  embedSettings: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default VimeoEmbed;
