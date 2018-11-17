import React, {Component} from 'react';

import Layout from '../../componentes/Layout';
import Question from '../../componentes/Question';

class Home extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Question />
        </Layout>
      </div>
    )
  }
};

export default Home;