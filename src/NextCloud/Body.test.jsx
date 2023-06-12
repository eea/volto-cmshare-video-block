import React from 'react';
import renderer from 'react-test-renderer';
import Body from './Body';
import { isInternalURL } from '@plone/volto/helpers';
import { getFieldURL } from '@eeacms/volto-nextcloud-video-block/helpers';

jest.mock('@eeacms/volto-nextcloud-video-block/helpers', () => ({
  getFieldURL: jest.fn(),
}));

jest.mock('@plone/volto/helpers', () => ({
  isInternalURL: jest.fn(),
  flattenToAppURL: jest.fn(),
  withBlockExtensions: jest.fn((Component) => Component),
}));

jest.mock('./players', () => ({
  nextCloud: jest.fn(() => <div>NextCloud Player</div>),
}));

describe('Body', () => {
  it('renders correctly', () => {
    const props = {
      data: {
        url: 'nextCloud',
        align: 'full',
        preview_image: '/path/to/image',
      },
    };

    const component = renderer.create(<Body {...props} />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders the correct player based on the url', () => {
    const props = {
      data: {
        url: 'nextCloud',
        align: 'full',
        preview_image: '/path/to/image',
      },
    };

    isInternalURL.mockReturnValue(true);
    getFieldURL.mockReturnValue('/path/to/video');

    const component = renderer.create(<Body {...props} />);
    expect(component.toJSON().props.className).toContain('video-inner');
  });

  it('renders the correct player based on the url', () => {
    const props = {
      data: {
        url: 'nextCloud',
        align: 'full',
        preview_image: '/path/to/image',
      },
    };

    isInternalURL.mockReturnValue(false);
    getFieldURL.mockReturnValue('nextCloud');

    const component = renderer.create(<Body {...props} />);

    expect(component.toJSON().props.className).toContain('video-inner');
  });
});
