import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { authValidate } from './../../actions/auth';
import { updateProfile, getProfile } from './../../actions/profile';

import { Grid, Avatar, FormControl, Input, InputLabel, Button } from '@material-ui/core';

import { FormError } from '../../shared/components/form-error/FormError';

export class EditProfile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      avatar: null,
      fullName: this.props.user.fullName,
      nickname: this.props.user.nickname,
      website: this.props.user.website,
      bio: this.props.user.bio,
      fullNameValid: true,
      nicknameValid: true,
      websiteValid: true,
      bioValid: true,
      formErrors: { fullName: '', nickname: '', website: '', bio: '' },
      saveDone: false,
      cancel: false
    }
  }
  render() {

    if (this.state.cancel) {
      return <Redirect to={`/profile/${this.props.user.nickname}`} />

    }
    if (this.state.saveDone) {
      return <Redirect to={`/profile/${this.state.nickname}`} />
    }

    if (this.props.user.nickname === this.props.match.params.nickname) {
      return (
        <Grid className="edit-profile" container alignItems={"center"} justify={"center"} direction={"column"}>
          <Grid className="avatar-nickname" container spacing={16} alignItems={"center"} justify={"center"} direction={"row"}>
            <Grid item>
              <Avatar
                alt={"user avatar"}
                src={this.state.avatar || this.props.user.avatar}
                className="user-avatar"
              />
            </Grid>
            <Grid item  >
              <div className="nickname">{this.props.user.nickname}</div>
              <label htmlFor="file-input"><div className="change-photo">Change avatar</div></label>
              <input className="file-input" name="file-input" id="file-input" type="file" accept="image/*" onChange={this.fileChangedHandler} />
            </Grid>
          </Grid>
          <form onSubmit={this.onSubmit}>
            <Grid className="form" container alignItems={"center"} justify={"center"}>
              <FormControl  margin="normal" fullWidth>
                <InputLabel htmlFor="inp-name">Full name</InputLabel>
                <Input required
                  id="inp-name"
                  type="text"
                  name="fullName"
                  value={this.state.fullName}
                  onBlur={this.onBlur}
                  onChange={this.onChange}
                />
              </FormControl>
              <FormError formErrors={this.state.formErrors.fullName} />
              <FormControl fullWidth>
                <InputLabel htmlFor="inp-nickname">Nickname</InputLabel>
                <Input required
                  id="inp-nickname"
                  type="text"
                  name="nickname"
                  value={this.state.nickname}
                  onBlur={this.onBlur}
                  onChange={this.onChange}
                />
              </FormControl>
              <FormError formErrors={this.state.formErrors.nickname} />
              <FormControl fullWidth>
                <InputLabel htmlFor="inp-website">Website</InputLabel>
                <Input required
                  id="inp-Website"
                  type="text"
                  name="website"
                  value={this.state.website}
                  onBlur={this.onBlur}
                  onChange={this.onChange}
                />
              </FormControl>
              <FormError formErrors={this.state.formErrors.website} />
              <FormControl fullWidth>
                <InputLabel htmlFor="inp-bio">Bio</InputLabel>
                <Input required
                  id="inp-bio"
                  type="text"
                  name="bio"
                  value={this.state.bio}
                  onBlur={this.onBlur}
                  onChange={this.onChange}
                />
              </FormControl>
              <FormError formErrors={this.state.formErrors.bio} />
              <Grid container spacing={8} alignItems={"center"} justify={"center"} direction={"row"}>
                <Grid item>
                  <Button
                    className="submit-btn"
                    onClick={this.onSubmit}
                    color="primary"
                    variant="contained"
                    disabled={!this.validateForm()}
                  >
                    Save
</Button>
                </Grid>
                <Grid item>
                  <Button color="primary" onClick={this.cancel}>
                    Cancel
</Button>
                </Grid>
              </Grid>
              <Grid className="password-btn" container alignItems={"flex-start"} justify={"flex-start"}>
                <Grid item>
                  <Button variant="contained" color="primary">
                    Change password
                  </Button>
                </Grid>
              </Grid>

              
            </Grid>
          </form>
        </Grid>
      );
    }
    return <Redirect to="/" />
  }

  onProfileSave = () => {
    this.setState({ saveDone: true });
    this.props.authValidate();
  }
  onProfileSaveError = () => {
    let fieldValidationErrors = this.state.formErrors;
    fieldValidationErrors.nickname = this.props.errorMessage;
    this.setState({ formErrors: fieldValidationErrors });
  }
  fileChangedHandler = (e) => {
    if (e.target.files[0]) {
      this.getDataURL(e.target.files[0]);
    }
  }
  getDataURL = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        avatar: e.target.result,
      });
    };
    reader.readAsDataURL(file);
  }
  onSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      let { fullName, nickname, website, bio, avatar } = this.state;
      this.props.updateProfile(this.props.user._id, fullName, nickname, website, bio, avatar, this.onProfileSave, this.onProfileSaveError);
    }
  }
  onBlur = (e) => {
    this.validateField(e.target.name, e.target.value);
  };
  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let fullNameValid = this.state.fullNameValid;
    let nicknameValid = this.state.nicknameValid;
    let websiteValid = this.state.websiteValid;
    let bioValid = this.state.bioValid;
    switch (fieldName) {
      case 'fullName':
        fullNameValid = value.length <= 50;
        fieldValidationErrors.fullName = fullNameValid ? '' : 'FullName must be at most 50 symbol';
        break;
      case 'nickname':
        nicknameValid = value.length <= 50 && value.length > 0;
        fieldValidationErrors.nickname = nicknameValid ? '' : `Nickname must be at most 50 symbol and not empty`;
        break;
      case 'website':
        websiteValid = value.length <= 70;
        fieldValidationErrors.website = websiteValid ? '' : 'Website must be at most 70 symbol';
        break;
      case 'bio':
        bioValid = value.length <= 100;
        fieldValidationErrors.bio = bioValid ? '' : 'Bio must be at most 100 symbol';
        break;
      default:
        break;
    };
    this.setState({ formErrors: fieldValidationErrors, fullNameValid, nicknameValid, websiteValid, bioValid });
  };
  onChange = (e) => {
    this.setState(
      { [e.target.name]: e.target.value }
    );
  }
  cancel = (e) => {
    this.setState({ cancel: true });
  }
  validateForm = () => {
    return this.state.fullNameValid && this.state.nicknameValid && this.state.websiteValid && this.state.bioValid;
  }
}
export default connect(
  state => ({
    user: state.auth.user,
    errorMessage: state.users.errorMessage,
    isAuthorized: state.auth.isAuthorized
  }),
  dispatch => ({
    authValidate: () => dispatch(authValidate()),
    getProfile: (nickname, onSuccessCallback, onErrorCallback) => dispatch(getProfile(nickname, onSuccessCallback, onErrorCallback)),
    updateProfile: (_id, fullName, newNickname, website, bio, avatar, callback, onErrorCallback) =>
      dispatch(updateProfile(_id, fullName, newNickname, website, bio, avatar, callback, onErrorCallback))
  })
)(EditProfile)
