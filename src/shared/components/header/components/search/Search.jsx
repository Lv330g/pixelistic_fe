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

  render() {
    return (
      <div>
        {this.state.users === null ? (
          <div className="search">
            <Input placeholder="Search" onFocus={this.getUsers} />
          </div>
        ) : (
            <div className="search">
              <Input placeholder="Search" ref={(el) => {this._search = el}} onChange={this.onChange} onBlur={this.lostFocus} />
              <Scrollbars autoHeight>
              {this.state.users.map( (item, id) => (
              <Link to={`/profile/${item.nickname}`} className="search-item" ref={(el) => {this._item = el}} key = {id}>
                <img src={`${item.avatar}`} className="avatar" alt="avatar"/> 
                <span className="nickname">{item.nickname}</span>
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
    let items = document.getElementsByClassName("search-item");
    let nickname = document.getElementsByClassName('nickname');
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

  lostFocus = e => {
    e.target.value = "";
    setTimeout(() => {
      let items = document.getElementsByClassName("search-item");
      for (let i = 0; i < items.length; i++) {
        items[i].style.display = "none";
      }
    }, 300)
  }

  getUsers = () => {
    httpServise.post(`${host}:${port}/search`).then(res => {
      this.setState({ users: res.data.users });
    });
  }
}
