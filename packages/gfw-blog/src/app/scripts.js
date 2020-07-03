import React from 'react';
import { Head} from 'frontity';

import tracking from './tracking';

const AppScripts = () => (
  <Head>
    <script
      src={tracking}
      type="text/javascript"
      async
    />
  </Head>
);

export default AppScripts;
