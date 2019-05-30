export default {
  group: 'Selection',
  features: [
    {
      title: [
        ['Array', 'selection']
      ],
      script: function (Gridy) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 4, 4)

        const highlight = [
          grid.tile(0, 0),
          grid.tile(3, 0),
          grid.tile(3, 1),
          grid.tile(3, 2),
          grid.tile(3, 3),
          grid.tile(1, 3),
          grid.tile(1, 2),
          grid.tile(1, 1)
        ]

        return { grid, showTiles: true, showCoordinates: true, highlight }
      }
    },
    {
      title: [
        ['Array', 'selection']
      ],
      script: function (Gridy) {
        const { Shape, RectangularGrid } = Gridy

        const grid = new RectangularGrid(60, false, Shape.Rhombus, 4, 4)

        const highlight = [
          grid.tile(0, 0),
          grid.tile(3, 0),
          grid.tile(3, 1),
          grid.tile(1, 1)
        ]

        return { grid, showTiles: true, showCoordinates: true, highlight }
      }
    },
    {
      title: [
        ['Region', 'selection']
      ],
      script: function (Gridy) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 4, 4)

        const highlight = HexagonalGrid.REGION(0, 2, -5, 0, 0, 3)

        return { grid, showTiles: true, showCoordinates: true, highlight }
      }
    }
  ]
}
