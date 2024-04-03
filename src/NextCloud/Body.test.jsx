import React from 'react';
import { render, screen } from '@testing-library/react';
import Body from './Body';
import { isInternalURL } from '@plone/volto/helpers';
import { getFieldURL } from '@eeacms/volto-nextcloud-video-block/helpers';
import '@testing-library/jest-dom/extend-expect';

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

describe('Body component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the video component with the appropriate player based on URL', () => {
    const data = {
      url: 'https://example.com/nextCloud/video.mp4',
      title: 'Sample Video',
      align: 'center',
      preview_image: 'https://example.com/preview.jpg',
    };
    getFieldURL.mockReturnValueOnce('https://example.com/nextCloud/video.mp4');
    getFieldURL.mockReturnValueOnce('https://example.com/preview.jpg');
    isInternalURL.mockReturnValueOnce(false);

    render(<Body data={data} />);

    expect(screen.getByRole('figure')).toBeInTheDocument();
    expect(screen.getByText('Sample Video')).toBeInTheDocument();
    expect(screen.getByRole('figure')).toHaveClass('video-inner');
    expect(screen.getByRole('figure')).not.toHaveClass('full-width');
  });

  it('renders the video component with full-width class when align is set to "full"', () => {
    const data = {
      url: 'https://example.com/nextCloud/video.mp4',
      title: 'Sample Video',
      align: 'full',
      preview_image: 'https://example.com/preview.jpg',
    };
    getFieldURL.mockReturnValueOnce('https://example.com/nextCloud/video.mp4');
    getFieldURL.mockReturnValueOnce('https://example.com/preview.jpg');
    isInternalURL.mockReturnValueOnce(false);

    render(<Body data={data} />);

    expect(screen.getByRole('figure')).toHaveClass('full-width');
  });

  it('does not render the video component when URL is not provided', () => {
    const data = {
      title: 'Sample Video',
      align: 'center',
      preview_image: 'https://example.com/preview.jpg',
    };
    getFieldURL.mockReturnValueOnce(undefined);
    isInternalURL.mockReturnValueOnce(false);

    render(<Body data={data} />);

    expect(screen.queryByRole('figure')).not.toBeInTheDocument();
  });
});
