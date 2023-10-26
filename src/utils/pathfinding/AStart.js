/* eslint-disable init-declarations */
import BinaryHeap from './BinaryHeap'
import Graph from './Graph'
import jsonGrid from '../../assets/grid.json'
import GridNode from './GridNode'
import { posToGrid } from '../GridUtil'

function pathTo(node) {
    let curr = node
    let path = []
    while (curr.parent) {
        path.unshift(curr)
        curr = curr.parent
    }
    return path
}

class AStar {
    constructor() {
        this.grid = jsonGrid.grid
        this.graph = new Graph(jsonGrid.grid)
    }

    isOutside = (pos = {}) => {
        const { x, y } = pos
        return x < 0 || y < 0 || y >= this.grid.length || x >= this.grid[0]?.length
    }

    // start = [x, y], end = [x, y]
    search = function (startPos, endPos) {
        const start = posToGrid(startPos)
        const end = posToGrid(endPos)
        if (this.isOutside(start) || this.isOutside(end)) return []

        this.graph.init()
        // this.graph.cleanDirty()

        let binaryHeap = new BinaryHeap(node => node.f)

        let startNode = new GridNode(start.x, start.y, this.grid[start.y][start.x])
        let endNode = new GridNode(end.x, end.y, this.grid[end.y][end.x])

        let closestNode = startNode // set the start node to be the closest

        startNode.h = this.heuristic(startNode, endNode)

        this.graph.markDirty(startNode)

        binaryHeap.push(startNode)

        while (binaryHeap.size() > 0) {
            // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
            let currentNode = binaryHeap.pop()

            // End case -- result has been found, return the traced path.
            if (currentNode === endNode) {
                return pathTo(currentNode)
            }

            // Normal case -- move currentNode from open to closed, process each of its neighbors.
            currentNode.closed = true

            // Find all neighbors for the current node.
            let neighbors = this.graph.neighbors(currentNode)

            for (let i = 0; i < neighbors.length; ++i) {
                let neighbor = neighbors[i]

                if (neighbor.closed || neighbor.isWall()) {
                    // Not a valid node to process, skip to next neighbor.
                    continue
                }

                // The g score is the shortest distance from start to current node.
                // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
                let gScore = currentNode.g + neighbor.getCost(currentNode)
                let beenVisited = neighbor.visited

                if (!beenVisited || gScore < neighbor.g) {
                    // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                    neighbor.visited = true
                    neighbor.parent = currentNode
                    neighbor.h = neighbor.h || this.heuristic(neighbor, endNode)
                    neighbor.g = gScore
                    neighbor.f = neighbor.g + neighbor.h
                    this.graph.markDirty(neighbor)

                    // If the neighbour is closer than the current closestNode or if it's equally close but has
                    // a cheaper path than the current closest node then it becomes the closest node
                    if (neighbor.h < closestNode.h || (neighbor.h === closestNode.h && neighbor.g < closestNode.g)) {
                        closestNode = neighbor
                    }

                    if (!beenVisited) {
                        // Pushing to heap will put it in proper place based on the 'f' value.
                        binaryHeap.push(neighbor)
                    } else {
                        // Already seen the node, but since it has been rescored we need to reorder it in the heap
                        binaryHeap.rescoreElement(neighbor)
                    }
                }
            }
        }

        return pathTo(closestNode)
    }

    // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
    heuristic = function (pos0, pos1) {
        const D = 1
        const D2 = Math.sqrt(2)
        let d1 = Math.abs(pos1.x - pos0.x)
        let d2 = Math.abs(pos1.y - pos0.y)
        return (D * (d1 + d2)) + ((D2 - (2 * D)) * Math.min(d1, d2))
    }
}

let aStar = new AStar()

export default aStar