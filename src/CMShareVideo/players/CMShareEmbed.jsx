/**
 * CMShareEmbed video block.
 * @module components/manage/Blocks/Video/CMShareEmbed
 */
import React from 'react';
import PropTypes from 'prop-types';
import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers';


/**
 * CMShareEmbed video block class.
 * @class CMShareEmbed
 * @extends Component
 */
const CMShareEmbed = ({ data, embedSettings }) => {
  let placeholder = data.preview_image
    ? isInternalURL(data.preview_image)
      ? `${flattenToAppURL(data.preview_image)}/@@images/image`
      : data.preview_image
    : null;

  return (
    <>
      {!data.url.match('vimeo') &&
        !data.url.match('youtu') &&
        (<video
          src={`${data.url}/download`}
          controls
          poster={placeholder}
          type="video/mp4"
        />)
      }
    </>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
CMShareEmbed.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CMShareEmbed;
