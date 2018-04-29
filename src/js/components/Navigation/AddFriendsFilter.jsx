import React, { Component } from "react";
import PropTypes from "prop-types";
import { renderLog } from "../../utils/logging";

export default class AddFriendsFilter extends Component {
  static propTypes = {
    params: PropTypes.object,
    changeAddFriendsTypeFunction: PropTypes.func.isRequired,
    add_friends_type: PropTypes.string,
  };

  render () {
    renderLog(__filename);
    const { add_friends_type, changeAddFriendsTypeFunction } = this.props;
    let onKeyDown = function (event) {
      let enterAndSpaceKeyCodes = [13, 32];
      if (enterAndSpaceKeyCodes.includes(event.keyCode)) {
        changeAddFriendsTypeFunction(event);
      }
    };

    return <div className="btn-group u-stack--md">
      <span tabIndex="0"
            onKeyDown={onKeyDown}
            id="ADD_FRIENDS_BY_EMAIL"
            className={ add_friends_type === "ADD_FRIENDS_BY_EMAIL" ? "active btn btn-default" : "btn btn-default"}
            onClick={changeAddFriendsTypeFunction}>
        By Email
      </span>

      <span tabIndex="0"
            onKeyDown={onKeyDown}
            onClick={changeAddFriendsTypeFunction}
            id="ADD_FRIENDS_BY_TWITTER"
            className={ add_friends_type === "ADD_FRIENDS_BY_TWITTER" ? "active btn btn-default" : "btn btn-default"}>
        Twitter
      </span>

      <span tabIndex="0"
            onKeyDown={onKeyDown}
            onClick={changeAddFriendsTypeFunction}
            id="ADD_FRIENDS_BY_FACEBOOK"
            className={ add_friends_type === "ADD_FRIENDS_BY_FACEBOOK" ? "active btn btn-default" : "btn btn-default"}>
        Facebook
      </span>
    </div>;
  }
}
