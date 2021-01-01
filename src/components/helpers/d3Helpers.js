import * as d3 from 'd3';
import data from './data.json';
import {} from '../Visualisation'

/* export const update = ({ data }) => {
  var edges = [];
  data.edges.forEach(function (e) {
    var sourceNode = data.nodes.filter(function (n) {
        return n.id === e.source;
      })[0],
      targetNode = data.nodes.filter(function (n) {
        return n.id === e.target;
      })[0];

    edges.push({
      source: sourceNode,
      target: targetNode,
      value: e.Value,
    });
  });

  return edges;
};

export const createSimulation = ({ data }) => {
  var nodes = data.nodes;
  var links = update({ data });

  for (var i = 0; i < nodes.length; i++) {
    nodes[i].collapsing = 0;
    nodes[i].collapsed = false;
  }

  return d3
    .forceSimulation(nodes)
    .force(
      'link',
      d3.forceLink(links).id((d) => d.id)
    )
    .force('charge', d3.forceManyBody().strength(-1150))
    .force('x', d3.forceX())
    .force('y', d3.forceY());
};

export const drawSvG = (svg, simulation, { data }) => {
  var nodes = data.nodes;
  var links = update({ data });

  for (var i = 0; i < nodes.length; i++) {
    nodes[i].collapsing = 0;
    nodes[i].collapsed = false;
  }

  // links
  const link = svg
    .selectAll('.link')
    .data(links)
    .join('line')
    .attr('class', 'link')
    .attr('stroke', 'black')
    .attr('fill', 'black')
    .call(drag(simulation));

  // nodes
  const node = svg
    .selectAll('.node')
    .data(nodes)
    .join('circle')
    .attr('class', 'node')
    .attr('r', 32)
    .call(drag(simulation))
    .on('click', click);

  const label = svg
    .append('g')
    .attr('class', 'labels')
    .selectAll('text')
    .data(nodes)
    .enter()
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .style('fill', 'white')
    .style('font', '2vh serif')
    .text((d) => {
      return d.name;
    })
    .call(drag(simulation));

  // This part updates the visualisation based on the current state
  // of where the nodes and links are.
  simulation.on('tick', () => {
    link
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y);

    node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

    // Update label positions
    label
      .attr('x', (d) => {
        return d.x;
      })
      .attr('y', (d) => {
        return d.y;
      });
  });

  return svg.node();
}; */

export const drag = (node) => {
  const dragstarted = (event, d) => {
    if (!event.active) node.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  };

  const dragged = (event, d) => {
    d.fx = event.x;
    d.fy = event.y;
  };

  const dragended = (event, d) => {
    if (!event.active) node.alphaTarget(0);
  };

  return d3
    .drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
};

export const zoom = (node) =>
  d3.zoom().on('zoom', () => {
    node.attr('transform', (event) => event.transform);
  });

/* export const click = (d, event) => {
  if (!event.defaultPrevented) {
    console.log('clicked: ' + event.name + " id: " + event.id);
    var inc = d.collapsed ? -1 : 1;
    console.log('collapsed: ' + inc);

    recurse(event);

    function recurse(sourceNode) {
      //check if link is from this node, and if so, collapse
      update().forEach(function (l) {
        if (l.source.id === sourceNode.id) {
          l.target.collapsing += inc;
          console.log('l target collapsing: ' + l.target.collapsing);

          recurse(l.target);
        }
      });
    }
    d.collapsed = !d.collapsed;
  }
}; */
