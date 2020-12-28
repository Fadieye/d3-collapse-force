import React, { useState, useEffect } from 'react'
import { Visualisation } from './components/Visualisation'
import data from './data/miserable.json'

const App = () => {

  useEffect(() => {
    var edges = []
    data.edges.forEach(function (e) {
      var sourceNode = data.nodes.filter(function (n) {
          return n.id === e.source
        })[0],
        targetNode = data.nodes.filter(function (n) {
          return n.id === e.target
        })[0]

      edges.push({
        source: sourceNode,
        target: targetNode,
        value: e.Value,
      })
    })


    console.log('rendered in App')
  })

  return (
    <div className="app">
      <h2>Force</h2>
      <Visualisation data = {data} />
    </div>
  )
}

export default App
