import React from 'react';

import Aux from '../../hoc/Auxiliar';
import Header from '../../componentes/Header';

const layout = (props) => (
  <Aux>
    <Header />
    <main>
      {props.children}
    </main>
  </Aux>
);

export default layout;