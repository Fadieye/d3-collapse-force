import React, { useState, useEffect } from 'react';
import { Visualisation } from './components/Visualisation';

const App = () => {
  const [dataTest, setData] = useState({ nodes: [], edges: [] });

  const setNodesEdges = (result) => {
    setData({
      nodes: result.nodes,
      edges: result.edges,
    });
  };

  useEffect(() => {
    if (dataTest.nodes.length === 0) {
      fetch('http://localhost:8080/fe_graph/miserable')
        .then((res) => res.json())
        .then((res) => setNodesEdges(res))
        .catch(() => setData({ hasErrors: true }));
    }
    console.log(dataTest);
  });

  if (dataTest.nodes.length === 0) {
    return <h2>Data not loaded</h2>;
  } else {
    return (
      <div className="app">
        <h2>Force</h2>
        <Visualisation data={dataTest} />
      </div>
    );
  }
};

export default App;
