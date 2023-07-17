import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import View from './NextCloudVideoView';

jest.mock('@plone/volto/helpers', () => ({
  withBlockExtensions: jest.fn((Component) => Component),
}));

describe('View', () => {
  it('renders the video block', () => {
    const data = { align: 'center' };
    const { container } = render(<View data={data} className="test-class" />);

    expect(container).toBeInTheDocument();
  });
});
