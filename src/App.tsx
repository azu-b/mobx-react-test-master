import * as React from 'react';
import "./configureMobx";
import { AppStateContextProvider, AppState } from './AppState';
import { parseArrayBinTree } from './TreeNode';
import Header from './Header';
import Body from './Body';

import './App.scss';

const appState = new AppState();

const App = () => {
  console.log(parseArrayBinTree(["a", ["b", ["b1"], ["b2", ["b21"], ["b22"]]], ["c", ["c1", ["c11", ["c111"]], ["c12", null, ["c121"]]], ["c2", null, ["c21"]]]]));

  return (
    <AppStateContextProvider value={appState}>
      <div className="App">
        <Header />
        <Body />
      </div>
    </AppStateContextProvider>
  );
}


export default App;
