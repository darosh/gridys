export default {
  group: 'Paths',
  features: [
    {
      title: [
        ['Circle', 'path']
      ],
      script: function (Gridy) {
        const { Shape, HexagonalGrid, circle, HexagonalTile } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 4, 4)

        const path = circle(new HexagonalTile(1, -2, 1), 2)

        return { grid, showTiles: true, showCoordinates: true, highlight: path, path }
      }
    },
    {
      title: [
        ['Spiral', 'path']
      ],
      script: function (Gridy) {
        const { Shape, HexagonalGrid, spiral, HexagonalTile } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 4, 4)

        const path = spiral(new HexagonalTile(1, -2, 1), 2)

        return { grid, showTiles: true, showCoordinates: true, highlight: path, path }
      }
    },
    {
      title: [
        ['Spiral', 'path']
      ],
      script: function (Gridy) {
        const { Shape, BrickGrid, spiral, HexagonalTile } = Gridy

        const grid = new BrickGrid(40, true, Shape.Triangular, 9)

        const path = spiral(new HexagonalTile(1, -2, 1), 2)

        return { grid, highlight: path, path }
      }
    },
    {
      title: [
        ['Spiral', 'path']
      ],
      script: function (Gridy) {
        const { Shape, RectangularGrid, spiral, RectangularTile } = Gridy

        const grid = new RectangularGrid(40, false, Shape.Rhombus, 7, 7)

        const path = spiral(new RectangularTile(3, 3), 2)

        return { grid, highlight: path, path, showCoordinates: true }
      }
    },
    {
      title: [
        ['Cropped spiral', 'path']
      ],
      script: function (Gridy) {
        const { Shape, HexagonalGrid, spiral, HexagonalTile, intersect } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 4, 4)

        const path = spiral(new HexagonalTile(1, -2, 1), 2)

        const cropped = intersect(
          path,
          grid.tiles
        )

        return { grid, showTiles: true, highlight: cropped, path: cropped, showCoordinates: true }
      }
    },
    {
      title: [
        ['Line', 'path']
      ],
      script: function (Gridy) {
        const { Shape, HexagonalGrid, Integer3, Float3 } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 4, 4)

        const path = Float3.LINE(
          new Integer3(),
          new Integer3(3, -6, 3)
        )

        return { grid, showTiles: true, highlight: path, path, showCoordinates: true }
      }
    },
    {
      title: [
        ['Line', 'path']
      ],
      script: function (Gridy) {
        const { Shape, RectangularGrid, Position, Float2 } = Gridy

        const grid = new RectangularGrid(35, false, Shape.Rhombus, 6, 6)

        const path = Float2.LINE(
          new Position(),
          new Position(5, 5)
        )

        return { grid, highlight: path, path, showCoordinates: true }
      }
    }
  ]
}
