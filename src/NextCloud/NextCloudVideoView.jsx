/**
 * View video block.
 * @module components/manage/Blocks/Video/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import Body from './Body';
import { withBlockExtensions } from '@plone/volto/helpers';
import cx from 'classnames';

/**
 * View video block class.
 * @class View
 * @extends Component
 */
const View = (props) => {
  const { data, className } = props;
  return (
    <div
      className={cx(
        'block video align',
        {
          center: !Boolean(data.align),
        },
        data.align,
        className,
      )}
    >
      <Body {...props} />
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withBlockExtensions(View);
