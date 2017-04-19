import styles from './SourceCodeLink.less';

import React from 'react';
import PropTypes from 'prop-types';

export default function SourceCodeLink(props) {
  const { file } = props;

  return (
    <a
      className={styles.link}
      href={`//github.com/moroshko/react-autowhatever/tree/master/${file}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Source code
    </a>
  );
}

SourceCodeLink.propTypes = {
  file: PropTypes.string.isRequired
};
