import NextCloudVideoEdit from './NextCloud/NextCloudVideoEdit';
import NextCloudVideoView from './NextCloud/NextCloudVideoView';
import VideoBlockSchema from './NextCloud/schema';
import videoSVG from '@plone/volto/icons/videocamera.svg';

const applyConfig = (config) => {
  config.blocks.blocksConfig.nextCloudVideo = {
    ...config.blocks.blocksConfig.nextCloudVideo,
    id: 'nextCloudVideo',
    title: 'Video (NextCloud)',
    icon: videoSVG,
    group: 'media',
    view: NextCloudVideoView,
    edit: NextCloudVideoEdit,
    schema: VideoBlockSchema,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: false,
    sidebarTab: 1,
    whiteList: [
      'https://cmshare.eea.europa.eu',
      'https://shareit.eea.europa.eu',
    ],
    security: {
      addPermission: [],
      view: [],
    },
    autoAdd: false,
  };

  return config;
};

export default applyConfig;
