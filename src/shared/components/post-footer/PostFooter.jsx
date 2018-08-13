import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { initCmntsAmount, expandCmntsAmount } from '../../../const/post-config';

import Like from '../like/Like';

import { Grid, Divider, TextField, Checkbox } from '@material-ui/core';
import { CommentOutlined, DeleteOutlined } from '@material-ui/icons';


export default class PostFooter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      liked: false,
      moreComments: false,
      likesAmount: null,
      _id: '',
      authorName: '',
      authorComment: '',
      date: '',
      commentsAmount: null,
      commentCheckbox: false
    };

    this.textfieldRef = React.createRef();
  }

  componentDidMount() {
    const post = this.props.post;
    
    this.setState({
      comments: post.comments,
      liked: post.liked,
      moreComments: post.moreComments,
      likesAmount: post.likesAmount,
      _id: post._id,
      authorName: post.authorName,
      authorComment: post.authorComment,
      date: post.date,
      commentsAmount: initCmntsAmount
    });
  }
  
  render() {
    let comments = this.state.comments;

    const quantity = comments.length <= expandCmntsAmount ? `all ${comments.length}` : 'last'; 

    let load = <p className="light-grey load-comments" onClick={this.expandComments}>
      Load {quantity} comments
    </p>;

    const mappedComments = comments
      .filter((item, i) => i >= (comments.length - this.state.commentsAmount))
      .map((item, i) => {
        return <p className="comment" key={i}>
          <span className="author-name">
            {item.author}
          </span>
          <span className="author-comment">
            {item.comment}
          </span>
        </p>
      });

    return <Grid className="post-footer" item xs={11} container direction={"column"}>
      <Grid className="likes-panel" container alignItems={"center"} item xs={12}>
        <p className="likes-amount">
          {this.state.likesAmount} likes
        </p>
        <Like
          className="like-comp"
          liked={this.state.liked}
          handleLike={this.handleLike}
        />
        <Checkbox
          checked={this.state.commentCheckbox}
          onChange={this.focusTextfield}
          color={"primary"}
          icon={<CommentOutlined />}
          checkedIcon={<CommentOutlined />}
        />
        <Checkbox
          checked={"true"}
          color={"secondary"}
          icon={<DeleteOutlined />}
          checkedIcon={<DeleteOutlined />}
        />
      </Grid>
    
      <p className="comment author">
        <span className="author-name">
          {this.state.authorName}
        </span>
        <span className="author-comment">
          {this.state.authorComment}
        </span>
      </p>

      {this.state.moreComments || (comments.length <= initCmntsAmount) ? false :  load}

      {mappedComments}

      <p className="light-grey date">
        {this.state.date}
      </p>

      <Divider />
      
      <TextField 
        inputRef={this.textfieldRef}
        className="input-override text-field"
        multiline={true}
        placeholder={"Type your comment..."}
        onKeyPress={this.handleTextfieldInput}
        onBlur={this.handleTextfieldBlur}
        onFocus={this.handleTextfieldFocus}
      />
    </Grid>
  }

  expandComments = () => {
    this.setState({
      moreComments: !this.state.moreComments,
      commentsAmount: expandCmntsAmount
    });
  }

  handleLike = () => {
    this.setState((prev) => {
      const quantity = prev.liked ? prev.likesAmount - 1 : prev.likesAmount + 1;

      return {
        likesAmount: quantity,
        liked: !this.state.liked,
      };
    });
  }

  handleTextfieldInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }

    if (e.key === "Enter" && !e.shiftKey && e.target.value !== '') {
      const val = e.target.value;
      const comment = {
        author: this.props.nickname,
        comment: val
      }
      e.target.value = "";
      
      this.setState((prev) => {
        return {
          comments: [...prev.comments, comment],
        };
      });
    }
  }

  focusTextfield = () => {
    this.textfieldRef.current.focus();
    this.setState({
      commentCheckbox: true
    });
  }

  handleTextfieldBlur = () => {
    this.setState({
      commentCheckbox: false
    });
  }

  handleTextfieldFocus = () => {
    this.setState({
      commentCheckbox: true
    });
  }
};

PostFooter.propTypes = {
  post: PropTypes.object.isRequired
};
