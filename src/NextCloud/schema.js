import { defineMessages } from 'react-intl';

const messages = defineMessages({
  Title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  Video: {
    id: 'Video',
    defaultMessage: 'Video',
  },
  VideoURL: {
    id: 'Video URL',
    defaultMessage: 'Video URL',
  },
  Preview_image: {
    id: 'Preview Image URL',
    defaultMessage: 'Preview Image URL',
  },
  Alignment: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  autoPlay: {
    id: 'Video Autoplay',
    defaultMessage: 'Video Autoplay',
  },
  loop: {
    id: 'Video Loop',
    defaultMessage: 'Video Loop',
  },
});
export const VideoBlockSchema = (props) => ({
  title: props.intl.formatMessage(messages.Video),
  block: 'Video',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'url', 'preview_image', 'align', 'autoPlay', 'loop'],
    },
  ],

  properties: {
    title: {
      title: props.intl.formatMessage(messages.Title),
    },
    url: {
      title: props.intl.formatMessage(messages.VideoURL),
      widget: 'url',
    },
    preview_image: {
      title: props.intl.formatMessage(messages.Preview_image),
      widget: 'url',
    },
    align: {
      title: props.intl.formatMessage(messages.Alignment),
      widget: 'align',
    },
    autoPlay: {
      title: props.intl.formatMessage(messages.autoPlay),
      type: 'boolean',
    },
    loop: {
      title: props.intl.formatMessage(messages.loop),
      type: 'boolean',
    },
  },
  required: [],
});

export default VideoBlockSchema;
