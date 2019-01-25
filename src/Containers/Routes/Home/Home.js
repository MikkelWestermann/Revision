import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import NotSignedIn from '../../../Components/NotSignedIn/NotSignedIn';

import GroupCard from '../../../Components/GroupCard/GroupCard';

import { getCardGroups, getAdds } from '../../../actions';

import './Home.css'

const mapStateToProps = state => {
  return {
    isSignedIn: state.account.isSignedIn,
    username: state.account.username,
    email: state.account.email,
    id: state.account.id,
    isPendingGroup: state.cardGroup.isPending,
    groups: state.cardGroup.groups,
    isPendingAdds: state.groupAdds.isPending,
    adds: state.groupAdds.adds,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetCardGroups: id => dispatch(getCardGroups(id)),
    handleGetAdds: id => dispatch(getAdds(id)),
  }
}

class Home extends Component {
  componentDidMount() {
    if (this.props.groups.length === 0) {
      this.props.handleGetCardGroups(this.props.id);
    }
    if (this.props.adds.length === 0) {
      this.props.handleGetAdds(this.props.id);
    }
  }
  render() {
    return (
      <div>
        {
          this.props.isSignedIn
          ?
        <div>
          <h1 className='routeHeader'>Hi, {this.props.username}</h1>
          <h1>Your Groups</h1>
          <div className='groupDisplay'>
            {
              this.props.isPendingGroup
              ?
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', color: '#fafaff'}}>
                  <CircularProgress color="secondary" />
                  <h2>Loading...</h2>
                </div>
              :
              <div>
                {
                  this.props.groups.length > 0
                  ?
                  <div className='groupDisplayList'>
                    {
                      this.props.groups.map(group => {
                        return (
                          <GroupCard
                            key={group.id}
                            id={group.id}
                            title={group.title}
                            userId={group.user_id}
                            tags={group.tags}
                            username={group.username}
                            user={this.props.username}
                          />
                        )
                      })
                    }
                  </div>
                  :
                  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fafaff'}}>
                    <h1>You don't have any groups yet...</h1>
                    <p>You can make your own groups:</p>
                    <Button variant="contained" color="secondary" size='large'>
                      Your Groups
                    </Button>
                  </div>
                }
              </div>
            }
          </div>
          <Button variant="outlined" color="primary" size='large' style={{marginBottom: '100px'}}>
            View All
          </Button>
          <h1>Your Adds</h1>
          <div className='groupDisplay'>
            {
              this.props.isPendingAdds
              ?
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', color: '#fafaff'}}>
                  <CircularProgress color="secondary" />
                  <h2>Loading...</h2>
                </div>
              :
              <div>
                {
                  this.props.adds.length > 0
                  ?
                  <div className='groupDisplayList'>
                    {
                      this.props.adds.map(add => {
                        return (
                          <GroupCard
                            key={add.id}
                            id={add.id}
                            title={add.title}
                            userId={add.user_id}
                            tags={add.tags}
                            username={add.username}
                            user={this.props.username}
                          />
                        )
                      })
                    }
                  </div>
                  :
                  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fafaff'}}>
                    <h1>You don't have any adds yet...</h1>
                    <p>You can add groups to your adds:</p>
                    <Button variant="contained" color="secondary" size='large'>
                      Search
                    </Button>
                  </div>
                }
              </div>
            }
          </div>
          <Button variant="outlined" color="primary" size='large' style={{marginBottom: '100px'}}>
            View All
          </Button>
        </div>
        :
        <NotSignedIn />
      }
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
