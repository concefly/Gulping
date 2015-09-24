import React from 'react';
import {test , test2} from './destructuring.js';
import {s1 ,template ,template2} from './string.js';
import { elearr } from './array.js';
import { App } from './reactDemo.js';

// test();
// test2();

// s1();
template('div');
template2();

React.render(<App/>, document.getElementById('app'));
