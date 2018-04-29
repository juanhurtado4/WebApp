import React, { Component } from "react";
import PropTypes from "prop-types";
import ElectionStore from "../../stores/ElectionStore";
import { renderLog } from "../../utils/logging";
import SelectVoterGuidesSideBarLink from "./SelectVoterGuidesSideBarLink";
import VoterGuideStore from "../../stores/VoterGuideStore";
import VoterStore from "../../stores/VoterStore";


export default class SelectVoterGuidesSideBar extends Component {
  static propTypes = {
    editMode: PropTypes.string,
    onOwnPage: PropTypes.bool,
  };

  constructor (props) {
    super(props);
    this.state = {
      linked_organization_we_vote_id: "",
    };
  }

  componentDidMount () {
    this.voterGuideStoreListener = VoterGuideStore.addListener(this.onVoterGuideStoreChange.bind(this));
  }

  componentWillUnmount () {
    this.voterGuideStoreListener.remove();
  }

  onVoterGuideStoreChange () {
    let voter = VoterStore.getVoter();
    let linked_organization_we_vote_id = voter.linked_organization_we_vote_id;
    // console.log("SelectVoterGuidesSideBar onVoterGuideStoreChange linked_organization_we_vote_id: ", linked_organization_we_vote_id);
    if (linked_organization_we_vote_id && this.state.linked_organization_we_vote_id !== linked_organization_we_vote_id) {
      this.setState({ linked_organization_we_vote_id: linked_organization_we_vote_id });
    }
  }

  render () {
    renderLog(__filename);
    let voterGuidesOwnedByVoter = VoterGuideStore.getAllVoterGuidesOwnedByVoter();
    let voterGuideLinksHtml = <span />;
    if (voterGuidesOwnedByVoter) {
      voterGuideLinksHtml = voterGuidesOwnedByVoter.map((voter_guide, key) => {
        let displaySubtitles = true;
        if (voter_guide && voter_guide.we_vote_id) {
          return <div key={key}>
            <SelectVoterGuidesSideBarLink linkTo={this.props.onOwnPage ? "/vg/" + voter_guide.we_vote_id + "/settings/menu" : "/vg/" + voter_guide.we_vote_id + "/settings"}
                               label={ElectionStore.getElectionName(voter_guide.google_civic_election_id)}
                               subtitle={ElectionStore.getElectionDayText(voter_guide.google_civic_election_id)}
                               displaySubtitles={displaySubtitles}
                               />
          </div>;
        } else {
          return null;
        }
      });
    }
    return <div className="card">
      <div className="card-main">
        <div className="SettingsItem__summary__title">Your Voter Guides</div>
        <SelectVoterGuidesSideBarLink linkTo={"/voterguidegetstarted"}
                               label={"Create New Voter Guide"}
                               />

        {voterGuideLinksHtml}
      </div>
    </div>;
  }
}
