import GridNode from './GridNode'

class Graph {
    constructor(grid) {
        this.nodes = []
        this.grid = []
        for (let y = 0; y < grid.length; y++) {
            this.grid[y] = []

            for (let x = 0; x < grid[y].length; x++) {
                let node = new GridNode(x, y, grid[y][x])
                this.grid[y][x] = node
                this.nodes.push(node)
            }
        }
        this.init()
    }

    init = function () {
        this.dirtyNodes = []
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].clean()
        }
    }

    // cleanDirty = function () {
    //     for (let i = 0; i < this.dirtyNodes.length; i++) {
    //         this.dirtyNodes[i].clean()
    //     }
    //     this.dirtyNodes = []
    // }

    markDirty = function (node) {
        this.dirtyNodes.push(node)
    }

    neighbors = function (node) {
        let ret = []
        let x = node.x
        let y = node.y
        let grid = this.grid

        // North
        if (grid[y - 1] && grid[y - 1][x]) {
            ret.push(grid[y - 1][x])
        }

        // South
        if (grid[y + 1] && grid[y + 1][x]) {
            ret.push(grid[y + 1][x])
        }

        // West
        if (grid[y] && grid[y][x - 1]) {
            ret.push(grid[y][x - 1])
        }

        // East
        if (grid[y] && grid[y][x + 1]) {
            ret.push(grid[y][x + 1])
        }

        // Northwest
        if (grid[y - 1] && grid[y - 1][x - 1]) {
            ret.push(grid[y - 1][x - 1])
        }

        // Southwest
        if (grid[y + 1] && grid[y + 1][x - 1]) {
            ret.push(grid[y + 1][x - 1])
        }

        // Northeast
        if (grid[y - 1] && grid[y - 1][x + 1]) {
            ret.push(grid[y - 1][x + 1])
        }

        // Southeast
        if (grid[y + 1] && grid[y + 1][x + 1]) {
            ret.push(grid[y + 1][x + 1])
        }

        return ret
    }
}

export default Graph