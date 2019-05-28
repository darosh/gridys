export default {
  group: 'Search',
  features: [
    {
      title: [
        ['Search', 'path']
      ],
      script: function (Gridy) {
        const { Shape, HexagonalGrid, HexagonalTile, Search } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 4, 4)

        const search = new Search(
          new HexagonalTile(),
          Infinity,
          8,
          undefined,
          grid.tiles
        )

        const path = search.path(grid.tile(3, 3))

        return { grid, showTiles: true, path, showCoordinates: true }
      }
    },
    {
      title: [
        ['Obstacles', 'path']
      ],
      script: function (Gridy) {
        const { Shape, HexagonalGrid, HexagonalTile, Search } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 4, 4)

        const blocked = [
          grid.tile(1, 0),
          grid.tile(2, 1),
          grid.tile(1, 3),
          grid.tile(2, 2)
        ]

        const search = new Search(
          new HexagonalTile(),
          Infinity,
          8,
          blocked,
          grid.tiles
        )

        const path = search.path(grid.tile(3, 3))

        return { grid, showTiles: true, path, showCoordinates: true, highlight: blocked }
      }
    },
    {
      title: [
        ['Obstacles', 'path']
      ],
      script: function (Gridy) {
        const { Shape, RectangularGrid, RectangularTile, Search } = Gridy

        const grid = new RectangularGrid(40, true, Shape.Rhombus, 5, 5)

        const blocked = [
          grid.tile(1, 0),
          grid.tile(2, 1),
          grid.tile(1, 3),
          grid.tile(2, 2)
        ]

        const search = new Search(
          new RectangularTile(),
          Infinity,
          8,
          blocked,
          grid.tiles
        )

        const path = search.path(grid.tile(4, 0))

        return { grid, path, showCoordinates: true, highlight: blocked }
      }
    },
    {
      title: [
        ['Maze', 'demo']
      ],
      class: 'wide',
      width: 456 * 2 + 16 * 2,
      script: function (Gridy) {
        const { Shape, HexagonalGrid, HexagonalTile, Search, circle } = Gridy

        const grid = new HexagonalGrid(32, true, Shape.Hexagonal, 14)

        const center = new HexagonalTile()
        let t = []
        const highlight = []
          .concat(((t = circle(center, 1)).splice(5, 1), t))
          .concat(((t = circle(center, 3)).splice(2, 1), t))
          .concat(((t = circle(center, 5)).splice(18, 1), t))
          .concat(((t = circle(center, 7)).splice(33, 1), t))
          .concat(((t = circle(center, 9)).splice(7, 1), t))
          .concat(((t = circle(center, 11)).splice(22, 1), t))

        const search = new Search(
          center,
          Infinity,
          100,
          highlight,
          grid.tiles
        )

        const path = search.path(grid.tile(-12, 0))

        return { grid, highlight, path, width: 456 * 2 }
      }
    },
    {
      title: [
        ['Search maze', 'demo']
      ],
      script: function (Gridy) {
        const { Shape, RectangularGrid, RectangularTile, Search } = Gridy

        const size = 24

        const grid = new RectangularGrid(14, false, Shape.Rhombus, size, size)

        const blocked = []

        for (let i = 0; i < size * size / 2; i++) {
          blocked.push(new RectangularTile(
            Math.floor(Math.random() * size + 1),
            Math.floor(Math.random() * (size - 1))
          ))
        }

        const search = new Search(
          new RectangularTile(),
          Infinity,
          100,
          blocked,
          grid.tiles
        )

        const max = Math.max.apply(null, grid.tiles.map(t => search.cost[t.key] || -1))

        const end = grid.tiles.find(t => search.cost[t.key] === max)

        const path = search.path(end)

        return { grid, highlight: blocked, search, path, highlightDark: true }
      }
    },
    {
      title: [
        ['Connect path', 'demo']
      ],
      script: function (Gridy) {
        const { Shape, RectangularGrid, RectangularTile, Search, Position } = Gridy

        const size = 7

        const grid = new RectangularGrid(28, false, Shape.Rhombus, size, size)

        const highlight = []

        highlight.push(new Position(0, 0))
        highlight.push(new Position(size - 1, size - 1))

        grid.tiles.forEach((t, i) => {
          if (!(t.x & t.y % 3)) {
            highlight.push(t)
          }
        })

        const search = new Search(
          new RectangularTile(),
          Infinity,
          100,
          undefined,
          highlight
        )

        const path = search.path(grid.tile(size - 1, size - 1))

        return { grid, highlight, search, path }
      }
    },
    {
      title: [
        ['Connect edges', 'demo']
      ],
      script: function (Gridy) {
        const { Shape, HexagonalGrid, Search } = Gridy

        const size = 11

        const grid = new HexagonalGrid(24, true, Shape.Rhombus, size, size)

        const starts = []
        const ends = []

        for (let i = 0; i < size; i++) {
          starts.push(grid.tile(0, i))
          ends.push(grid.tile(size - 1, i))
        }

        const highlight = grid.tiles.filter((s, i) => !((s.x - s.y) % 3) || !((i + s.x) % 7))

        const search = new Search(
          starts,
          Infinity,
          100,
          highlight,
          grid.tiles
        )

        const path = search.path(ends)

        return { grid, highlight, highlightDark: true, search, values: search.cost, path }
      }
    },
    {
      title: [
        ['Connections', 'demo']
      ],
      script: function (Gridy) {
        const { Shape, HexagonalGrid, connections } = Gridy

        const size = 11

        const grid = new HexagonalGrid(24, true, Shape.Rhombus, size, size)

        const highlight = grid.tiles.filter((s, i) => ((s.x - s.y) % 3) || !((i + s.x) % 8))

        const lines = connections(highlight).filter((l) => l.length === 5)

        return { grid, lines, highlight }
      }
    },
    {
      title: [
        ['Connections', 'demo']
      ],
      script: function (Gridy) {
        const { Shape, RectangularGrid, Rectangular8Tile, connections } = Gridy

        const size = 11

        const grid = new RectangularGrid(24, false, Shape.Rhombus, size, size, Rectangular8Tile)

        const highlight = grid.tiles.filter((s, i) => ((s.x - s.y) % 3) || !((i + s.x) % 8))

        const lines = connections(highlight).filter((l) => l.length === 5)

        return { grid, lines, highlight }
      }
    },
    {
      title: [
        ['Connections', 'demo']
      ],
      script: function (Gridy) {
        const { Shape, TriangularGrid, connections } = Gridy

        const size = 11

        const grid = new TriangularGrid(24, false, Shape.Triangular, size, size)

        const highlight = grid.tiles.filter((s, i) => [13, 50, 98].indexOf(i) === -1)

        const lines = connections(highlight).filter((l) => l.length <= 7 && l.length >= 3)

        return { grid, lines, highlight }

      }
    },
    {
      title: [
        ['Border', 'demo']
      ],
      script: function (Gridy) {
        const { Shape, TriangularGrid, border } = Gridy

        const size = 11

        const grid = new TriangularGrid(24, false, Shape.Triangular, size, size)

        const highlight = border(grid.tiles)

        return { grid, highlight }
      }
    },
    {
      title: [
        ['Outline', 'demo']
      ],
      script: function (Gridy) {
        const { Shape, HexagonalGrid, outline } = Gridy

        const size = 3

        const grid = new HexagonalGrid(48, false, Shape.Hexagonal, size, size)

        const highlight = outline(grid.tiles)
        grid.tiles = grid.tiles.concat(highlight)

        return { grid, highlight }
      }
    },
    {
      title: [
        ['Outline', 'demo']
      ],
      script: function (Gridy) {
        const { Shape, TriangularGrid, outline } = Gridy

        const size = 3

        const grid = new TriangularGrid(48, false, Shape.Triangular, size, size)

        const highlight = outline(grid.tiles)
        grid.tiles = grid.tiles.concat(highlight)

        return { grid, highlight }
      }
    }
  ]
}
