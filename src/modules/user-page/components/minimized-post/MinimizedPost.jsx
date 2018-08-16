import React , { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Favorite, ChatBubble } from '@material-ui/icons';


export class UserImage extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render () {
    return (
      <div className="user-image">
        <div className="photo-wrapper">
          <img alt="user-img" src={this.props.img} />
          <Grid className="photo-info" onClick={this.handleOpen} container alignItems="center" alignContent="center">
             <Grid container item alignItems="center" direction="row" justify="center"  alignContent="center">
               <Favorite/> <em > {this.props.likes} </em> 
               <ChatBubble/>  <em > {this.props.comments} </em> 
             </Grid>
          </Grid>           
        </div>
      </div>
    )
  }
  handleOpen = () =>{
    this.props.onOpenPost(this.props.id)
  }
}

export default UserImage;


