import NextCloudVideoEdit from './NextCloud/NextCloudVideoEdit';
import NextCloudVideoView from './NextCloud/NextCloudVideoView';
import VideoBlockSchema from './NextCloud/schema';
import Bell from '@plone/volto/icons/video.svg';

const applyConfig = (config) => {
  config.blocks.blocksConfig.nextCloudVideo = {
    ...config.blocks.blocksConfig.nextCloudVideo,
    id: 'nextCloudVideo',
    title: 'nextCloudVideo',
    icon: Bell,
    group: 'text',
    view: NextCloudVideoView,
    edit: NextCloudVideoEdit,
    schema: VideoBlockSchema,
    restricted: false,
    mostUsed: true,
    blockHasOwnFocusManagement: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
    autoAdd: false,
  };

  return config;
};

export default applyConfig;
