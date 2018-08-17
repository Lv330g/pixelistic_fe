import React, { Component } from 'react';
import { TextField, Button, ClickAwayListener, InputAdornment} from '@material-ui/core';
import { Redirect } from 'react-router';
import { Comment } from '@material-ui/icons';
import { connect } from 'react-redux';

import { postAddPost } from '../../../../actions/post';
import LocationAutocomplete from '../location-autocomplete/LocationAutocomplete';
import LoadingSpinner from '../../../../shared/components/loading-spinner/LoadingSpinner'; 

import { postOwnPosts } from '../../../../actions/post';


export class SavePost extends Component{
  constructor(props){
    super(props);
    this.state = {
      description: '', 
      customGeolocation: '',
      savingStarted: false
    }
  }

  async componentWillMount () {
    if(!this.props.ownPosts.length)
      await this.props.postOwnPosts(this.props.user);  
  }

  render(){
    return <div className="save-post"> 
      <ClickAwayListener onClickAway={this.props.onCloseSaveModal}>
        <div className="post-info">
          <div className="field">       
            <TextField 
              InputProps={{startAdornment: (<InputAdornment position="start"><Comment/></InputAdornment>),}}
              onKeyPress={this.changeDescription} className="input" multiline rowsMax={4} rows={1} placeholder="Description"
            />
          </div>
          
          <LocationAutocomplete onSelectLocation ={this.changeLocation}/>
          
          { this.checkSavingProcess() }
          
          {this.state.savingStarted ? null : 
            <Button onClick={this.uploadPost} className="save-btn bg-green" color="primary" variant="contained" disabled={this.state.isSaving}>Save</Button>
          }
        </div>
      </ClickAwayListener>
    </div>
  }

  uploadPost = async (e) => { 
    
    this.setState({ savingStarted: true });
    
    this.props.postAddPost(
      this.props.photo.current.toDataURL(),
      this.state.description,
      this.state.customGeolocation,
      this.props.user._id
    );
  }

  checkSavingProcess = () => {

    if (this.state.savingStarted && this.props.isSaving) {
      return <LoadingSpinner size={30}/>
    }

    if(this.state.savingStarted && !this.props.isSaving) {
      return <Redirect to={`/profile/${this.props.user.nickname}`}/>
    }

    return;
  }

  changeLocation = (location) => {
    this.setState({ customGeolocation: location });
  }

  changeDescription = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
    }
    this.setState({ description: e.target.value });
  }
}

export default connect(
  state => ({
    successMessage: state.post.successMessage,
    ownPosts: state.post.ownPosts,
    isSaving: state.post.isSaving
  }),
  dispatch => ({
    postOwnPosts: (user) => dispatch(postOwnPosts(user)),
    postAddPost: (image, description, geolocation, author) => dispatch(postAddPost(image, description, geolocation, author))
    })
)(SavePost)
