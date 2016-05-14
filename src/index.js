
import React, { Component } from 'react';
import { render } from 'react-dom';

import * as Comp from './component';

// console.log( Comp )
class App extends Component {
  render(){
    return (
      <div>
        <h1>欢迎参加珠峰React高级课程</h1>
      </div>
    )
  }
}

let root = document.getElementById('app');
render(<App />, root);
