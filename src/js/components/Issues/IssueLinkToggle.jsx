import React, { Component } from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import IssueActions from "../../actions/IssueActions";
import IssueImageDisplay from "../../components/Issues/IssueImageDisplay";
import { renderLog } from "../../utils/logging";

export default class IssueLinkToggle extends Component {
  static propTypes = {
    issue: PropTypes.object.isRequired,
    organization_we_vote_id: PropTypes.string.isRequired,
    is_linked: PropTypes.bool.isRequired,
    edit_mode: PropTypes.bool,
  };

  constructor (props) {
    super(props);
    this.state = {
      is_linked: false,
    };

    this.onIssueLink = this.onIssueLink.bind(this);
    this.onIssueUnlink = this.onIssueUnlink.bind(this);
  }

  componentDidMount () {
    let is_linked = false;
    if (this.props.is_linked) {
      is_linked = this.props.is_linked;
    }
    this.setState({
      is_linked: is_linked,
    });
  }

  componentWillUnMount () {

  }

  onIssueLink () {
    IssueActions.issueLinkForOrganization(this.props.organization_we_vote_id, this.props.issue.issue_we_vote_id);
  }

  onIssueUnlink () {
    IssueActions.issueUnLinkForOrganization(this.props.organization_we_vote_id, this.props.issue.issue_we_vote_id);
  }

  render () {
    renderLog(__filename);
    return this.state.is_linked ?
      <div className="u-flex u-items-center u-justify-between card-main intro-modal__text-dark">
        <div className="col-3 col-sm-2 settingsIssues__image">
          <IssueImageDisplay issue={this.props.issue}
                             issueImageSize="LARGE"
                             showPlaceholderImage
                             turnOffIssueFade/>
        </div>
          <span className="col-6 col-sm-8 intro-modal__span">
            <h4 className="card-main__candidate-name intro-modal__white-space">{this.props.issue.issue_name}</h4>
            <p className="intro-modal__small intro-modal__ellipsis intro-modal__hide-sm settingsIssues__description">{this.props.issue.issue_description}</p>
          </span>
        <div className="col-3 col-sm-2">
          <Button bsStyle="warning" bsSize="small" onClick={this.onIssueUnlink}>
            <span>Unlink</span>
          </Button>
        </div>
      </div> :
      <div className="u-flex u-items-center u-justify-between card-main intro-modal__text-dark">
        <div className="col-3 col-sm-2 settingsIssues__image">
          <IssueImageDisplay issue={this.props.issue}
                             issueImageSize="LARGE"
                             showPlaceholderImage
                             turnOffIssueFade/>
        </div>
        <span className="col-6 col-sm-8 intro-modal__span">
          <h4 className="card-main__candidate-name intro-modal__white-space">{this.props.issue.issue_name}</h4>
          <p className="intro-modal__small intro-modal__ellipsis intro-modal__hide-sm settingsIssues__description">{this.props.issue.issue_description}</p>
        </span>
        <div className="col-3 col-sm-2">
          <Button bsStyle="info" bsSize="small" onClick={this.onIssueLink}>
            <span>Link</span>
          </Button>
        </div>
      </div>;
  }
}
