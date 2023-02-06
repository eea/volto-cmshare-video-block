import CMShareVideoEdit from './CMShareVideo/CMShareVideoEdit';
import CMShareVideoView from './CMShareVideo/CMShareVideoView';
import VideoBlockSchema from './CMShareVideo/schema';
import Bell from '@plone/volto/icons/video.svg';

const applyConfig = (config) => {
  config.blocks.blocksConfig.cmsharevideo = {
    ...config.blocks.blocksConfig.cmsharevideo,
    id: 'cmsharevideo',
    title: 'CMShareVideo',
    icon: Bell,
    group: 'text',
    view: CMShareVideoView,
    edit: CMShareVideoEdit,
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
