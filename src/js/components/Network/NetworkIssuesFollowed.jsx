import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import IssueActions from "../../actions/IssueActions";
import IssueFollowToggleSquare from "../Issues/IssueFollowToggleSquare";
import IssueStore from "../../stores/IssueStore";
import { renderLog } from "../../utils/logging";


export default class NetworkIssuesFollowed extends Component {
  static propTypes = {
    children: PropTypes.object,
    history: PropTypes.object
  };

  constructor (props) {
    super(props);
    this.state = {
      edit_mode: false,
      issues_followed: []
    };
  }

  componentDidMount () {
    IssueActions.issuesRetrieve();
    this.issueStoreListener = IssueStore.addListener(this._onIssueStoreChange.bind(this));
  }

  componentWillUnmount () {
    this.issueStoreListener.remove();
  }

  _onIssueStoreChange () {
    this.setState({
      issues_followed: IssueStore.getIssuesVoterIsFollowing(),
    });
  }

  getCurrentRoute () {
    var current_route = "/issues_followed";
    return current_route;
  }

  toggleEditMode () {
    this.setState({edit_mode: !this.state.edit_mode});
  }

  onKeyDownEditMode (event) {
    let enterAndSpaceKeyCodes = [13, 32];
    let scope = this;
    if (enterAndSpaceKeyCodes.includes(event.keyCode)) {
      scope.setState({edit_mode: !this.state.edit_mode});
    }
  }

  render () {
    renderLog(__filename);
    let issue_list = [];
    if (this.state.issues_followed) {
      issue_list = this.state.issues_followed;
    }

    const ISSUES_TO_SHOW = 6;

    let is_following = true;
    let issue_count = 0;
    const issue_list_for_display = issue_list.map((issue) => {
      issue_count++;
      if (issue_count > ISSUES_TO_SHOW) {
        return null;
      } else {
        return <IssueFollowToggleSquare
          key={issue.issue_we_vote_id}
          issue_we_vote_id={issue.issue_we_vote_id}
          issue_name={issue.issue_name}
          issue_description={issue.issue_description}
          issue_image_url={issue.issue_image_url}
          edit_mode={this.state.edit_mode}
          is_following={is_following}
          grid="col-sm-6"
          read_only />;
      }
    });

    return <div className="opinions-followed__container">
      <section className="card">
        <div className="card-main">
          <h1 className="h4">Issues You Are Following</h1>
          <div className="network-issues-list voter-guide-list card">
            <div className="card-child__list-group clearfix">
              { issue_list_for_display }
            </div>
            <div>
            {
              this.state.issues_followed.length > 0 ?
              <span><Link to="/issues_followed">See All</Link></span> :
              <span>You are not following any issues yet.</span>
            }
            </div>
          </div>
          <br />
        </div>
      </section>
    </div>;
  }
}
