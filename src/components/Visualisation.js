import { useEffect, useRef } from 'react';
import {
  select,
  forceCenter,
  forceSimulation,
  forceLink,
  forceManyBody,
  forceX,
  forceY,
} from 'd3';
import { drag } from './helpers/d3Helpers';
import { drawSvG } from './helpers/d3Helpers';

export const Visualisation = ({ data }) => {
  const vizContainer = useRef();
  const width = 2048;
  const height = 1024;

  const getEdges = () => {
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
        show: false,
      });
    });

    console.log(edges);

    return edges;
  };

  const getNodes = () => {
    var nodes = [];

    data.nodes.forEach(function (e) {
      nodes.push({
        id: e.id,
        name: e.name,
        show: false,
      });
    });

    console.log(nodes);
    return nodes;
  };

  var edgesTest = getEdges();

  useEffect(() => {
    if (vizContainer.current) {
      const svg = select(vizContainer.current);
      var nodes = data.nodes;
      var links = edgesTest;

      console.log(nodes);

      const simulation = forceSimulation(nodes)
        .force(
          'link',
          forceLink(links).id((d) => d.id)
        )
        .force('charge', forceManyBody().strength(-1150))
        .force('x', forceX())
        .force('y', forceY());

      const drawSvG = () => {
        // links
        const link = svg
          .selectAll('.link')
          .data(links.filter((link) => link.show))
          .join('line')
          .attr('class', 'link')
          .attr('stroke', 'black')
          .attr('fill', 'black')
          .call(drag(simulation));

        // nodes
        const node = svg
          .selectAll('.node')
          .data(nodes.filter((node) => node.show))
          .join('circle')
          .attr('class', 'node')
          .attr('r', 32)
          .call(drag(simulation))
          .on('click', click);

        const label = svg // labels
          .selectAll('.label')
          .data(nodes.filter((node) => node.show))
          .join('text')
          .attr('class', 'label')
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'central')
          .attr('font-size', 15)
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
      };

      function click(d, event) {
        if (!event.defaultPrevented) {
          recurse(event);

          function recurse(sourceNode) {
            //check if link is from this node, and if so, collapse
            links.forEach(function (l) {
              if (l.source.id === sourceNode.id) {
                console.log('Link to: ' + l.target.name);
                l.show = true;

                nodes.forEach(function (n){
                  if(l.target.id === n.id) {
                    n.show = true;
                  }
                }) 

 
              }
            });
          }
          console.log(links);
          drawSvG();
        }
      }

      // centering workaround
      svg.attr('viewBox', [-width / 2, -height / 2, width, height]);

      /*const simulation = createSimulation({ data })*/
      svg.call((svg) => drawSvG());
    }
  }, [width, height, data]);

  return <svg ref={vizContainer} />;
};
