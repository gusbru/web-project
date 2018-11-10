import React, {Component} from 'react';

import Layout from '../../componentes/Layout';
import Login from '../../componentes/Login';

class Home extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Login />
        </Layout>
      </div>
    )
  }
};

export default Home;