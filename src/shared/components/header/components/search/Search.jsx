import React, { Component } from "react";
import { Input } from "@material-ui/core";
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import httpServise from "../../../../../api/http-service";
import { host, port } from "../../../../../const/node-server-config";

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    }
  }

  componentDidMount() {
    httpServise.post(`${host}:${port}/search`).then(res => {
      this.setState({ users: res.data.users });
    });
  }
  
  render() {
    return (
      <div>
        {this.state.users === null ? (
          <Input placeholder="Search" onChange={this.onChange} />
        ) : (
            <div className="search">
              <Input placeholder="Search" onChange={this.onChange} />
              <Scrollbars autoHeight>
              {this.state.users.map( (item, id) => (
              <Link to={`/profile/${item.nickname}`} className="item" ref={(el) => {this._item = el}} key = {id}>
                <img src={`${item.avatar}`} className="avatar" alt="avatar"/> 
                <span className="nickname" ref={(el) => {this._nickname = el}}>{item.nickname}</span>
              </Link>
              ))}
              </Scrollbars>
            </div>
        )}
      </div>
    );
  }

  onChange = e => {
    let filter = e.target.value.toUpperCase();
    //ref does not fit
    let items = document.getElementsByClassName("item")
    let nickname = document.querySelectorAll('.nickname')
    for (let i = 0; i < items.length; i++) {
      if (nickname[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
        items[i].style.display = "block";
      } else {
        items[i].style.display = "none";
      }
      if(filter === ''){
        items[i].style.display = "none";
      }
    }
  };
}
