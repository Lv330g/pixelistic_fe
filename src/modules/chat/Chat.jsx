import React, { Component } from 'react';
import ChatWindow from './components/chat-window/ChatWindow';
import { socketConnect } from 'socket.io-react';

import { Grid, TextField } from '@material-ui/core';

export class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    this.props.socket.emit('needMessages');

    this.props.socket.on('gettingMessages', (result) => {
      this.setState({messages: result});
    });
  }

  render() {
    return <Grid container className="chat" direction={"column"} alignItems={"center"} justify={"space-between"}>
      <h2 className="chat-header">Pixel Chat</h2>

      <ChatWindow 
        messages={this.state.messages}
      />

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

      this.props.socket.emit('message sent', message);
    }
  }
};

export default socketConnect(Chat);
