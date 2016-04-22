import styles from './App.less';

import React, { Component } from 'react';
import ForkMeOnGitHub from 'ForkMeOnGitHub/ForkMeOnGitHub';
import Example0 from 'Example0/Example0';
import Example1 from 'Example1/Example1';
import Example2 from 'Example2/Example2';
import Example3 from 'Example3/Example3';
import Example4 from 'Example4/Example4';
import Example5 from 'Example5/Example5';
import Example6 from 'Example6/Example6';
import Example7 from 'Example7/Example7';
import Example8 from 'Example8/Example8';

export default class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h1 className={styles.header}>
            React Autowhatever
          </h1>
          <h2 className={styles.subHeader}>
            Accessible rendering layer for Autosuggest and Autocomplete components
          </h2>
        </div>
        <div className={styles.examplesContainer}>
          <div className={styles.exampleContainer}>
            <Example0 />
          </div>
          <div className={styles.exampleContainer}>
            <Example1 />
          </div>
          <div className={styles.exampleContainer}>
            <Example2 />
          </div>
          <div className={styles.exampleContainer}>
            <Example3 />
          </div>
          <div className={styles.exampleContainer}>
            <Example4 />
          </div>
          <div className={styles.exampleContainer}>
            <Example5 />
          </div>
          <div className={styles.exampleContainer}>
            <Example6 />
          </div>
          <div className={styles.exampleContainer}>
            <Example7 />
          </div>
          <div className={styles.exampleContainer}>
            <Example8 />
          </div>
        </div>
        <ForkMeOnGitHub user="moroshko" repo="react-autowhatever" />
      </div>
    );
  }
}
