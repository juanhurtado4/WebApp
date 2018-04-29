import React, { Component } from "react";
import PropTypes from "prop-types";
import FriendInvitationProcessedDisplayForList from "./FriendInvitationProcessedDisplayForList";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { renderLog } from "../../utils/logging";

export default class FriendInvitationProcessedList extends Component {

  static propTypes = {
    friendList: PropTypes.array,
    invitationsSentByMe: PropTypes.bool
  };

  constructor (props) {
    super(props);
    this.state = {
      friend_invitations_list: this.props.friendList
    };
  }

  componentDidMount () {
    this.setState({
      friend_invitations_list: this.props.friendList
    });
  }

  componentWillReceiveProps (nextProps){
    this.setState({
      friend_invitations_list: nextProps.friendList
    });
  }

  render () {
    renderLog(__filename);
    if (this.state.friend_invitations_list === undefined) {
      return null;
    }

    let counter = 0;
    const friend_list = this.state.friend_invitations_list.map( (friend) => {
      counter++;
      if (this.props.invitationsSentByMe) {
        return <FriendInvitationProcessedDisplayForList key={counter} {...friend}
                                                        invitationsSentByMe={this.props.invitationsSentByMe} />;
      } else {
        return <FriendInvitationProcessedDisplayForList key={counter} {...friend} />;
      }
    });

    return <div className="guidelist card-child__list-group">
        <ReactCSSTransitionGroup transitionName="org-ignore" transitionEnterTimeout={2000} transitionLeaveTimeout={2000}>
          {friend_list}
        </ReactCSSTransitionGroup>
      </div>;
  }
}
