import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './router';

import { Grid } from '@material-ui/core';
import './index.css';

ReactDOM.render((
  <Grid container alignItems={"center"} justify={"center"} direction={"column"}>
    { Routes }
  </Grid>
), document.getElementById('root'));
