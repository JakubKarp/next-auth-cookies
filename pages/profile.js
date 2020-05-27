import React, { Component } from 'react';
import { getUserProfile } from '../lib/auth';
import Layout from '../components/Layout';

export default class Profile extends Component {
  state = {
    user: null
  }

  componentDidMount() {
    getUserProfile().then( user => {
      this.setState({ user })
    })
  }


  render() {
    return (
      <Layout 
        title="Profile" 
        userData={this.state.user} 
        // {...this.props}
      >
      <pre>
        {JSON.stringify(this.state.user, null, 2)}
      </pre>
      </Layout>
    )
  }
}

// Profile.getInitialProps = authInitialProps()


