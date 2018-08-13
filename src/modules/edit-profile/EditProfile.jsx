import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { updateProfile, getProfileForEdit } from './../../actions/profile';
import { Grid, Avatar, FormControl, Input, InputLabel, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
 export class EditProfile extends React.Component {
     constructor(props) {
        super(props)
        this.state = {
            userName: '',
            nickname: '',
            website: '',
            userBio: '',
            saveDone: false
        }
    }
     initializeValues = (profile) => {
        if (profile && profile.nickname) {
            this.setState({userName: profile.userName,
            nickname: profile.nickname,
            website: profile.website,
            userBio: profile.userBio});
        }
    }
     componentDidMount() {
        this.props.getProfileForEdit(this.props.match.params.nickname, this.initializeValues);
    }
     onSubmit = (e) => {
        e.preventDefault();
        let { userName, nickname, website, userBio } = this.state;
        this.props.updateProfile(this.props.match.params.nickname, userName, nickname, website, userBio);
        this.setState({ saveDone: true });
    }
     onChange = (e) => {
        this.setState(
            { [e.target.name]: e.target.value }
        );
    }
     cancel = (e) => {
        this.setState({ saveDone: true });
    }
     render() {
        if (this.state.saveDone) {
            return <Redirect to={'/profile/' + this.props.userprofile.nickname} />
        }
        if (this.props.userprofile && this.props.user && this.props.userprofile.nickname === this.props.user.nickname) {
            return (
                <Grid className="edit-profile" container alignItems={"center"} justify={"center"} direction={"column"}>
                    <Grid container spacing={16} alignItems={"center"} justify={"center"} direction={"row"}>
                        <Grid item>
                            <Avatar
                                alt="tamaraK"
                                src="https://image.flaticon.com/icons/svg/145/145859.svg"
                            />
                        </Grid>
                        <Grid item  >
                            <div className="nickname">{this.props.userprofile.nickname}</div>
                            <Link to="#"><div className="change-photo">Change photo</div></Link>
                        </Grid>
                    </Grid>
                    <form onSubmit={this.onSubmit}>
                        <Grid container alignItems={"center"} justify={"center"}>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="inp-name">Name</InputLabel>
                                <Input required
                                    id="inp-name"
                                    type="text"
                                    name="userName"
                                    value={this.state.userName}
                                    onChange={this.onChange}
                                />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="inp-nickname">Nickname</InputLabel>
                                <Input required
                                    id="inp-nickname"
                                    type="text"
                                    name="nickname"
                                    value={this.state.nickname}
                                    onChange={this.onChange}
                                />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="inp-website">Website</InputLabel>
                                <Input required
                                    id="inp-Website"
                                    type="text"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="inp-bio">Bio</InputLabel>
                                <Input required
                                    id="inp-bio"
                                    type="text"
                                    name="userBio"
                                    value={this.state.userBio}
                                    onChange={this.onChange}
                                />
                            </FormControl>
                            <Button
                                className="submit-btn"
                                type="submit"
                                color="primary"
                                variant="contained"
                            >
                                Save
                             </Button>
                            <Button color="primary" onClick={this.cancel}>
                                Cancel
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            );
        } else {
            return <div></div>
        }
    }
}
 export default connect(
    state => ({
      userprofile: state.profile.userprofile,
    }),
    dispatch => ({
        getProfileForEdit: (nickname, callback) => dispatch(getProfileForEdit(nickname, callback)),
        updateProfile: (nickname, userName, newNickname, website, userBio) =>
            dispatch(updateProfile(nickname, userName, newNickname, website, userBio))
    })
)(EditProfile)
