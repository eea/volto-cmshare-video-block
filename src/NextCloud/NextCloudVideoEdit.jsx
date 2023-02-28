/**
 * Edit video block.
 * @module components/manage/Blocks/Title/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { Button, Input, Message } from 'semantic-ui-react';
import cx from 'classnames';
import { isEqual } from 'lodash';

import { Icon, SidebarPortal } from '@plone/volto/components';
import VideoSidebar from './VideoSidebar';
import clearSVG from '@plone/volto/icons/clear.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import videoBlockSVG from '@plone/volto/components/manage/Blocks/Video/block-video.svg';
import Body from './Body';
import { withBlockExtensions, isInternalURL } from '@plone/volto/helpers';
import { compose } from 'redux';
import config from '@plone/volto/registry';

const messages = defineMessages({
  VideoFormDescription: {
    id: 'Specify a NextCloud video or playlist url',
    defaultMessage: 'Specify a NextCloud video or playlist url',
  },
  VideoBlockInputPlaceholder: {
    id: 'Video URL (NextCloud)',
    defaultMessage: 'Video URL (NextCloud)',
  },
});

/**
 * Edit video block class.
 * @class Edit
 * @extends Component
 */
class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    block: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    onFocusPreviousBlock: PropTypes.func.isRequired,
    onFocusNextBlock: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);

    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onSubmitUrl = this.onSubmitUrl.bind(this);
    this.isValidUrl = this.isValidUrl.bind(this);
    this.onKeyDownVariantMenuForm = this.onKeyDownVariantMenuForm.bind(this);
    this.allowedDomainList = [
      config.settings.publicURL,
      ...(config?.blocks?.blocksConfig?.nextCloudVideo?.whiteList || []),
    ];
    this.state = {
      url: '',
    };
  }

  isValidUrl(url) {
    const internalVideoUrl = isInternalURL(url);
    const isAllowed = url?.match('https://cmshare.eea.europa.eu');

    return internalVideoUrl || isAllowed;
  }

  /**
   * Change url handler
   * @method onChangeUrl
   * @param {Object} target Target object
   * @returns {undefined}
   */
  onChangeUrl({ target }) {
    this.setState({
      url: target.value,
    });
  }

  /**
   * @param {*} nextProps
   * @returns {boolean}
   * @memberof Edit
   */
  shouldComponentUpdate(nextProps) {
    return (
      this.props.selected ||
      nextProps.selected ||
      !isEqual(this.props.data, nextProps.data)
    );
  }

  /**
   * Submit url handler
   * @method onSubmitUrl
   * @returns {undefined}
   */
  onSubmitUrl() {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      url: this.state.url,
    });
  }

  resetSubmitUrl = () => {
    this.setState({
      url: '',
    });
  };

  /**
   * Keydown handler on Variant Menu Form
   * This is required since the ENTER key is already mapped to a onKeyDown
   * event and needs to be overriden with a child onKeyDown.
   * @method onKeyDownVariantMenuForm
   * @param {Object} e Event object
   * @returns {undefined}
   */
  onKeyDownVariantMenuForm(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      this.onSubmitUrl();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      // TODO: Do something on ESC key
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { data } = this.props;
    const placeholder =
      data.placeholder ||
      this.props.intl.formatMessage(messages.VideoBlockInputPlaceholder);
    return (
      <div
        className={cx(
          'block video align',
          {
            selected: this.props.selected,
            center: !Boolean(data.align),
          },
          data.align,
        )}
      >
        {data.url && this.isValidUrl(data.url) ? (
          <Body data={data} isEditMode={true} />
        ) : (
          <center>
            <img src={videoBlockSVG} alt="" />
            <div className="toolbar-inner">
              <Input
                onKeyDown={this.onKeyDownVariantMenuForm}
                onChange={this.onChangeUrl}
                placeholder={placeholder}
                value={this.state.url}
                // Prevents propagation to the Dropzone and the opening
                // of the upload browser dialog
                onClick={(e) => e.stopPropagation()}
                error={data.url && !this.isValidUrl(data.url)}
              />
              {this.state.url && (
                <Button.Group>
                  <Button
                    basic
                    className="cancel"
                    onClick={(e) => {
                      e.stopPropagation();
                      this.setState({ url: '' });
                    }}
                  >
                    <Icon name={clearSVG} size="30px" />
                  </Button>
                </Button.Group>
              )}
              <Button.Group>
                <Button
                  basic
                  primary
                  onClick={(e) => {
                    e.stopPropagation();
                    this.onSubmitUrl();
                  }}
                >
                  <Icon name={aheadSVG} size="30px" />
                </Button>
              </Button.Group>
            </div>
            {data.url && !this.isValidUrl(data.url) && (
              <Message
                error
                content={`Please enter a valid video URL, starting with: ${this.allowedDomainList.join(
                  ', ',
                )}`}
              />
            )}
          </center>
        )}
        <SidebarPortal selected={this.props.selected}>
          <VideoSidebar {...this.props} resetSubmitUrl={this.resetSubmitUrl} />
        </SidebarPortal>
      </div>
    );
  }
}

export default compose(injectIntl, withBlockExtensions)(Edit);
