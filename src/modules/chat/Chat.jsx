import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import openSocket from 'socket.io-client';
import { port, host } from "../../const/node-server-config";

import { Grid, TextField } from '@material-ui/core';

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      socket: openSocket(`${host}:${port}`)
    }
  }

  componentDidMount() {
    this.state.socket.emit('needMessages');

    this.state.socket.on('gettingMessages', (result) => {
      this.setState({messages: result.reverse()});
    });
  }

  render() {
    const mappedMessages = this.state.messages.map((item) => {
      return <p key={item._id} className="message light-grey">
        <Link to=''>{item.author}:</Link> {item.msg}
      </p>
    });

    return <Grid container className="chat" direction={"column"} alignItems={"center"} justify={"space-between"}>
      <h2 className="chat-header">Pixel Chat</h2>

      <div className="msgs-wrapper">
        {mappedMessages}
      </div>

      <label htmlFor="chat_input" className="text-field_label">
        <TextField 
          id={`chat_input`}
          className="input-override text-field"
          multiline={true}
          placeholder={"Enter message..."}
          onKeyPress={this.handleInput}
          onChange={this.handleTyping}
        />
      </label>
    </Grid>
  }

  handleInput = e => {
    if (e.key === "Enter") {
      e.preventDefault();
    }

    if (e.key === "Enter" && !e.shiftKey && e.target.value !== '') {
      const val = e.target.value;
      const message = {
        author: this.props.nickname,
        msg: val
      }
      e.target.value = "";

      this.state.socket.emit('message sent', message);
    }
  }
};
