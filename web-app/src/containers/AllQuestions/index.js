import React, {Component} from 'react';
import request from 'superagent';

import Layout from '../../componentes/Layout';
import QuestionTitlePack from '../../componentes/QuestionTitlePack';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questionsInformations: [{}],  
    };
  }

  componentDidMount() {
    request
    .get('http://localhost:3005/api/questoes')
    .then(res => this.setState({questionsInformations: res.body}))
    .catch(err => console.log(err));
  };

  render() {
    const { questionsInformations } = this.state;

    return (
      <div>
        <Layout>
          <div>
          { 
            questionsInformations.forEach(question => {
              return <QuestionTitlePack enunciado={question.enunciado} />
            })
          }
          </div>
        </Layout>
      </div>
    )
  }
};

export default Home;