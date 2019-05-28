export default {
  group: 'Grids',
  features: [
    {
      title: [
        ['Hexagonal', 'grid'],
        ['Hexagonal', 'shape']
      ],
      script: function (Gridy) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, false, Shape.Hexagonal, 3)

        return { grid, showCircles: true, showCoordinates: true, showTiles: true }
      }
    },
    {
      title: [
        ['Hexagonal', 'grid'],
        ['Hexagonal', 'shape'],
        ['Point', 'top']
      ],
      script: function (Gridy) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Hexagonal, 3)

        return { grid, showCoordinates: true, showTiles: true }
      }
    },
    {
      title: [
        ['Hexagonal', 'grid'],
        ['Triangular', 'shape']
      ],
      script: function (Gridy) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, false, Shape.Triangular, 4)

        return { grid, showCoordinates: true, showTiles: true }
      }
    },
    {
      title: [
        ['Hexagonal', 'grid'],
        ['Triangular', 'shape'],
        ['Point', 'top']
      ],
      script: function (Gridy) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Triangular, 4)

        return { grid, showCoordinates: true, showTiles: true }
      }
    },
    {
      title: [
        ['Hexagonal', 'grid'],
        ['Even', 'shape']
      ],
      script: function (Gridy) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, false, Shape.Even, 4, 4)

        return { grid, showCoordinates: true, showTiles: true }
      }
    },
    {
      title: [
        ['Hexagonal', 'grid'],
        ['Even', 'shape']
      ],
      script: function (Gridy) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Even, 4, 4)

        return { grid, showCoordinates: true, showTiles: true }
      }
    },
    {
      title: [
        ['Hexagonal', 'grid'],
        ['Odd', 'shape']
      ],
      script: function (Gridy) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, false, Shape.Odd, 4, 4)

        return { grid, showCoordinates: true, showTiles: true }
      }
    },
    {
      title: [
        ['Hexagonal', 'grid'],
        ['Odd', 'shape']
      ],
      script: function (Gridy) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Odd, 4, 4)

        return { grid, showCoordinates: true, showTiles: true }
      }
    },
    {
      title: [
        ['Hexagonal', 'grid'],
        ['Rhombus', 'shape']
      ],
      script: function (Gridy) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(60, false, Shape.Rhombus, 4, 4)

        return { grid, showCoordinates: true, showTiles: true }
      }
    },
    // {
    //   title: [
    //     ['Hexagonal', 'grid'],
    //     ['Rhombus', 'shape']
    //   ],
    //   script: function (Gridy) {
    //     const { Shape, HexagonalGrid, rotate, normalize } = Gridy
    //
    //     const grid = new HexagonalGrid(60, true, Shape.Rhombus, 4, 4)
    //
    //     rotate(grid)
    //     normalize(grid)
    //
    //     new Diagram(svg, grid)
    //       .axes()
    //       .mousePoint()
    //   }
    // },
    //     {
    //       title: [
    //         ['Hexagonal', 'grid'],
    //         ['Rhombus', 'shape']
    //       ],
    //       script: function (Gridy) {
    //         const { Shape, HexagonalGrid, rotate, normalize } = Gridy
    //
    //         const grid = new HexagonalGrid(60, true, Shape.Rhombus, 4, 4)
    //
    //         rotate(grid)
    //         grid.toPoint = HexagonalGrid.CUBE_TO_TWO_AXIS_XY
    //         grid.toTile = HexagonalGrid.TWO_AXIS_TO_CUBE_XY
    //         normalize(grid)
    //
    //         new Diagram(svg, grid)
    //           .axes()
    //           .mousePoint()
    //       }
    //     },
    //     {
    //       title: [
    //         ['Hexagonal', 'grid'],
    //         ['Rhombus', 'shape']
    //       ],
    //       script: function (Gridy) {
    //         const { Shape, HexagonalGrid, rotate, normalize } = Gridy
    //
    //         const grid = new HexagonalGrid(60, false, Shape.Rhombus, 4, 4)
    //
    //         rotate(grid, -1)
    //         grid.toPoint = HexagonalGrid.CUBE_TO_TWO_AXIS_YZ
    //         grid.toTile = HexagonalGrid.TWO_AXIS_TO_CUBE_YZ
    //         normalize(grid)
    //
    //         new Diagram(svg, grid)
    //           .axes()
    //           .mousePoint()
    //       }
    //     },
    //     {
    //       title: [
    //         ['Hexagonal', 'grid'],
    //         ['Rhombus', 'shape']
    //       ],
    //       script: function (Gridy) {
    //         const { Shape, HexagonalGrid, rotate, normalize } = Gridy
    //
    //         const grid = new HexagonalGrid(60, false, Shape.Rhombus, 4, 4)
    //
    //         rotate(grid, -1)
    //         normalize(grid)
    //
    //         new Diagram(svg, grid)
    //           .coordinates()
    //           .tiles()
    //       }
    //     },
    //     {
    //       title: [
    //         ['Hexagonal', 'grid'],
    //         ['Rhombus', 'shape'],
    //         ['Point', 'top']
    //       ],
    //       script: function (Gridy) {
    //         const { Shape, HexagonalGrid } = Gridy
    //
    //         const grid = new HexagonalGrid(70, true, Shape.Rhombus, 3, 3)
    //
    //         new Diagram(svg, grid)
    //           .coordinates()
    //           .tiles()
    //       }
    //     },
    {
      title: [
        ['Brick', 'grid'],
        ['Hexagonal', 'shape']
      ],
      script: function (Gridy) {
        const { Shape, BrickGrid } = Gridy

        const grid = new BrickGrid(50, false, Shape.Hexagonal, 4)

        return { grid, showCoordinates: true, showTiles: true }
      }
    },
    {
      title: [
        ['Rectangular', 'grid']
      ],
      script: function (Gridy) {
        const { Shape, RectangularGrid } = Gridy

        const grid = new RectangularGrid(60, false, Shape.Rhombus, 4, 4)

        return { grid, showCircles: true, showTiles: true }
      }
    },
    {
      title: [
        ['Rectangular', 'grid'],
        ['Point', 'top']
      ],
      script: function (Gridy) {
        const { Shape, RectangularGrid } = Gridy

        const grid = new RectangularGrid(60, true, Shape.Rhombus, 4, 3)

        return { grid, showTiles: true }
      }
    },
    {
      title: [
        ['Triangular', 'grid']
      ],
      script: function (Gridy) {
        const { Shape, TriangularGrid } = Gridy

        const grid = new TriangularGrid(60, false, Shape.Triangular, 5)

        return { grid, showTiles: true, showCenters: true, showCoordinates: true }
      }

    },
    {
      title: [
        ['Triangular', 'grid']
      ],
      script: function (Gridy) {
        const { Shape, TriangularGrid, axes } = Gridy

        const grid = new TriangularGrid(30, false, Shape.Hexagonal, 5)

        const highlight = axes(grid.tiles, 1)

        return { grid, showTiles: true, showCenters: true, highlight }
      }
    },
    {
      title: [
        ['Triangular', 'grid', ['Rhombus', 'shape']]
      ],
      script: function (Gridy) {
        const { Shape, TriangularGrid } = Gridy

        const grid = new TriangularGrid(60, false, Shape.Rhombus, 3, 5)

        return { grid, showTiles: true, showCircle: true, showCoordinates: true }
      }
    },
    {
      title: [
        ['Radial', 'grid']
      ],
      script: function (Gridy) {
        const { Shape, RadialGrid } = Gridy

        const grid = new RadialGrid(40, false, Shape.Even, 12, 4)

        return { grid, showTiles: true, showCircle: true }
      }
    }
  ]
}
