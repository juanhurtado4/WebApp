import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import BookmarkToggle from "../Bookmarks/BookmarkToggle";
import { historyPush } from "../../utils/cordovaUtils";
// import ItemActionBar from "../Widgets/ItemActionBar";
// import ItemPositionStatementActionBar from "../Widgets/ItemPositionStatementActionBar";
// import ItemSupportOpposeCounts from "../Widgets/ItemSupportOpposeCounts";
import ItemSupportOpposeRaccoon from "../Widgets/ItemSupportOpposeRaccoon";
// import ItemTinyOpinionsToFollow from "../VoterGuide/ItemTinyOpinionsToFollow";
import { renderLog } from "../../utils/logging";
import SupportStore from "../../stores/SupportStore";
import { capitalizeString } from "../../utils/textFormat";
import VoterGuideStore from "../../stores/VoterGuideStore";


export default class MeasureItemCompressed extends Component {
  static propTypes = {
    we_vote_id: PropTypes.string.isRequired,
    measure_subtitle: PropTypes.string,
    measure_text: PropTypes.string,
    position_list: PropTypes.array,
    kind_of_ballot_item: PropTypes.string.isRequired,
    ballot_item_display_name: PropTypes.string.isRequired,
    link_to_ballot_item_page: PropTypes.bool,
    measure_url: PropTypes.string,
    toggleMeasureModal: PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.state = {
      transitioning: false,
      showModal: false,
      maximum_organization_display: 4,
    };
  }

  componentDidMount () {
    this.voterGuideStoreListener = VoterGuideStore.addListener(this.onVoterGuideStoreChange.bind(this));
    this.onVoterGuideStoreChange();
    this.supportStoreListener = SupportStore.addListener(this.onSupportStoreChange.bind(this));
    this.setState({ supportProps: SupportStore.get(this.props.we_vote_id) });
  }

  componentWillUnmount () {
    this.voterGuideStoreListener.remove();
    this.supportStoreListener.remove();
  }

  onVoterGuideStoreChange () {
    // We just want to trigger a re-render
    this.setState({ transitioning: false });
    // console.log("onVoterGuideStoreChange");
  }

  onSupportStoreChange () {
    this.setState({
      supportProps: SupportStore.get(this.props.we_vote_id),
      transitioning: false,
    });
  }

  render () {
    renderLog(__filename);
    let { ballot_item_display_name, measure_subtitle, measure_text, we_vote_id } = this.props;
    let measure_we_vote_id = we_vote_id;
    measure_subtitle = capitalizeString(measure_subtitle);
    ballot_item_display_name = capitalizeString(ballot_item_display_name);

    // let measureGuidesList = VoterGuideStore.getVoterGuidesToFollowForBallotItemId(measure_we_vote_id);

    // let measure_for_modal = {
    //   ballot_item_display_name: ballot_item_display_name,
    //   voter_guides_to_follow_for_ballot_item_id: measureGuidesList,
    //   kind_of_ballot_item: this.props.kind_of_ballot_item,
    //   link_to_ballot_item_page: this.props.link_to_ballot_item_page,
    //   measure_subtitle: measure_subtitle,
    //   measure_text: this.props.measure_text,
    //   measure_url: this.props.measure_url,
    //   we_vote_id: measure_we_vote_id,
    //   position_list: this.props.position_list,
    // };

    let measureSupportStore = SupportStore.get(measure_we_vote_id);
    let organizationsToFollowSupport = VoterGuideStore.getVoterGuidesToFollowForBallotItemIdSupports(measure_we_vote_id);
    let organizationsToFollowOppose = VoterGuideStore.getVoterGuidesToFollowForBallotItemIdOpposes(measure_we_vote_id);

    return <div className="card-main measure-card">
      <a name={measure_we_vote_id} />
      <div className="card-main__content">
        <h2 className="card-main__display-name">
          { this.props.link_to_ballot_item_page ?
            <div className="card-main__ballot-name-group">
              <div className="card-main__ballot-name-item card-main__ballot-name">
                <Link to={"/measure/" + measure_we_vote_id}>
                  {ballot_item_display_name}
                </Link>
              </div>
              <div className="card-main__ballot-name-item">
                <Link to={"/measure/" + measure_we_vote_id}>
                  <span className="card-main__ballot-read-more-link hidden-xs">learn&nbsp;more</span>
                </Link>
              </div>
            </div> :
            ballot_item_display_name
          }
        </h2>
        <BookmarkToggle we_vote_id={measure_we_vote_id} type="MEASURE" />
        {/* Measure information */}
        <div className={ this.props.link_to_ballot_item_page ? "u-cursor--pointer" : null }
             onClick={ this.props.link_to_ballot_item_page ? () => historyPush("/measure/" + measure_we_vote_id) : null }>
          {measure_subtitle}
        </div>
        { measure_text ? <div className="measure_text">{measure_text}</div> : null }

        {/* Positions in Your Network and Possible Voter Guides to Follow */}
        <div className="u-flex u-flex-auto u-flex-row u-justify-between u-items-center u-min-50">
          <ItemSupportOpposeRaccoon ballotItemWeVoteId={measure_we_vote_id}
                                    ballot_item_display_name={ballot_item_display_name}
                                    maximumOrganizationDisplay={this.state.maximum_organization_display}
                                    organizationsToFollowSupport={organizationsToFollowSupport}
                                    organizationsToFollowOppose={organizationsToFollowOppose}
                                    supportProps={measureSupportStore}
                                    type="MEASURE" />
        </div>
      </div> {/* END .card-main__content */}
    </div>;
  }
}
