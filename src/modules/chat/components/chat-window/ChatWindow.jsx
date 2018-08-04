import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

export default class ChatWindow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const mappedMessages = this.props.messages.map((item) => {
      return <p key={item._id} className="message light-grey">
        <Link className="link" to=''>{item.author}:</Link> {item.msg}
      </p>
    });

    return <div className="chat-window">
      <Scrollbars>
        {mappedMessages}
      </Scrollbars>
    </div>
  }
};
