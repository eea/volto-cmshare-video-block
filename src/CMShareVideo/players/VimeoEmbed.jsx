/**
 * VimeoEmbed video block.
 * @module components/manage/Blocks/Video/VimeoEmbed
 */
import React from 'react';
import PropTypes from 'prop-types';
import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers';
import { Embed } from 'semantic-ui-react';


/**
 * VimeoEmbed video block class.
 * @class VimeoEmbed
 * @extends Component
 */
const VimeoEmbed = ({ data, embedSettings }) => {
  let placeholder = data.preview_image
    ? isInternalURL(data.preview_image)
      ? `${flattenToAppURL(data.preview_image)}/@@images/image`
      : data.preview_image
    : null;

  let videoID = null;

  if (data.url) {
    if (data.url.match('vimeo')) {
      videoID = data.url.match(/^.*\.com\/(.*)/)[1];
      if (!placeholder) {
        placeholder = 'https://vumbnail.com/' + videoID + '.jpg';
      }
    }
  }

  return (
    <>
      {data.url.match('vimeo') ? (
        <Embed id={videoID} source="vimeo" {...embedSettings} />
      ) : null}
    </>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
VimeoEmbed.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default VimeoEmbed;
