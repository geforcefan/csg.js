const flatten = require('../../utils/flatten')

const { geom3 } = require('../../geometry')

const fromFakePolygons = require('./fromFakePolygons')
const to3DWalls = require('./to3DWalls')
const subtractGeom3 = require('./subtractGeom3')

/*
 * Return a new 2D geometry representing space in the first geometry but
 * not in the subsequent geometries. None of the given geometries are modified.
 * @param {...geom2} geometries - list of geometries
 * @returns {geom2} new 2D geometry
 */
const subtract = (...geometries) => {
  geometries = flatten(geometries)
  const newgeometries = geometries.map((geometry) => to3DWalls({ z0: -1, z1: 1 }, geometry))

  let newgeom3 = subtractGeom3(newgeometries)

  return fromFakePolygons(geom3.toPolygons(newgeom3))
}

module.exports = subtract
