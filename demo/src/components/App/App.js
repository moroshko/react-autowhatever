import styles from './App.less';

import React, { Component } from 'react';
import Example1 from 'Example1/Example1';
import Example2 from 'Example2/Example2';

export default class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Example1 />
        <Example2 />
      </div>
    );
  }
}
