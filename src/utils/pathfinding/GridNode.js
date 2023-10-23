class GridNode {
    constructor(x, y, weight) {
        this.x = x
        this.y = y
        this.weight = weight

        this.f = 0
        this.g = 0
        this.h = 0
        this.visited = false
        this.closed = false
        this.parent = null
    }

    getCost = function (fromNeighbor) {
        // Take diagonal weight into consideration.
        if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
            return this.weight * 1.41421
        }
        return this.weight
    }

    isWall = function () {
        return this.weight === 0
    }

    clean = function () {
        this.f = 0
        this.g = 0
        this.h = 0
        this.visited = false
        this.closed = false
        this.parent = null
    }
}

export default GridNode