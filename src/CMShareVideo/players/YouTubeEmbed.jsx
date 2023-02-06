/**
 * YouTubeEmbed video block.
 * @module components/manage/Blocks/Video/YouTubeEmbed
 */
import React from 'react';
import PropTypes from 'prop-types';
import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers';
import { Embed } from 'semantic-ui-react';


/**
 * YouTubeEmbed video block class.
 * @class YouTubeEmbed
 * @extends Component
 */
const YouTubeEmbed = ({ data, embedSettings }) => {
  let placeholder = data.preview_image
    ? isInternalURL(data.preview_image)
      ? `${flattenToAppURL(data.preview_image)}/@@images/image`
      : data.preview_image
    : null;

  let videoID = null;
  let listID = null;

  if (data.url) {
    if (data.url.match('youtu')) {
      if (data.url.match('list')) {
        const matches = data.url.match(/^.*\?list=(.*)|^.*&list=(.*)$/);
        listID = matches[1] || matches[2];
      } else {
        videoID = data.url.match(/.be\//)
          ? data.url.match(/^.*\.be\/(.*)/)[1]
          : data.url.match(/^.*\?v=(.*)$/)[1];
      }

      if (!placeholder) {
        //load video preview image from youtube
        placeholder =
          'https://img.youtube.com/vi/' + videoID + '/sddefault.jpg';
      }
    }
  }

  return (
    <>
      {data.url.match('youtu') && (
        <>
          {data.url.match('list') ? (
            <Embed
              url={`https://www.youtube.com/embed/videoseries?list=${listID}`}
              {...embedSettings}
            />
          ) : (
            <Embed id={videoID} source="youtube" {...embedSettings} />
          )}
        </>
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
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default YouTubeEmbed;
