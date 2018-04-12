import { Router } from 'express'

const router = Router()

// Dependencies
const moment = require('moment')
const _ = require('lodash')

const Project = require('../models/project')
const Class = require('../models/class')
const Attempt = require('../models/attempt')

// Fetch all attempts
router.get('/attempts', (req, res) => {
  Attempts.find({}, '', (error, attempts) => {
    if (error) {
      console.error(error)
    } else res.send({
      attempts: attempts
    })
  }).sort({ _id: -1 })
})

// Fetch and attempt a project
router.get('/attempt/:projectId', (req, res) => {
  const projectId = req.params.projectId

  const INEFFICIENCY_TRESHOLD = 15

  let data = 0
  let action = 0,
      featureCount = 0,
      rand = 0,
      iteration = 0,
      c1 = 0,
      c2 = 0,
      a,
      b,
      foundFeatures = [],
      matrix = [[]],
      matrixRows = []

  // Get the project as project
  Project.findOne({ _id: projectId }, '', (error, project) => {
    if (error) {
      console.error(error)
    } else {

      // Get related classes as classes[]
      Class.find({ projectId: projectId }, '', (error, classes) => {

        // Check feature count
        classes.some((c, ii) => {
          if (c.features) {

            c.features.some((f, jj) => {
              if (!_.includes(foundFeatures, f)) {
                foundFeatures.push(f)
              }
            })
          }
        })

        featureCount = foundFeatures.length

        // Iterate over classes
        classes.some((c, index) => {

          if (featureCount === 0) {action = 1}
          else if (featureCount < Math.ceil(Math.log2(c.length))) {action = 2}
          else if (featureCount >= Math.ceil(Math.log2(c.length))) {action = 3}

          switch(action) {

            // feature matrix is empty
            // get class 1 & 2
            case (1): {
              c1 = 0
              c2 = 1
              a = classes[c1].trainingData[rand]
              b = classes[c2].trainingData[rand]
              break
            }

            // feature count < minimum log2(classes)
            // optimize loop
            case (2): {
              if (iteration < INEFFICIENCY_TRESHOLD) {

                // iterate classes and pick 2 classes
                classes.some((c, jj) => {
                  // first loop will assign c1 with class that has empty/lowest feature
                  if (!c1 && c.features.length < featureCount) {
                    c1 = jj
                  }
                  // next loop will assign c2 with next class that has empty/lowest feature
                  if (c1 && c1 === jj && !c2 && c.features.length < featureCount) {
                    c2 = jj
                  }
                })
              } else {
                // OPTIMIZE!
              }
              break
            }

            // feature count is reaches minimum required
            case (3): {
              // test empties
              foundFeatures.some((f, ii) => {
                classes.some((c, jj) => {
                  // if empty
                  if (!c.features[ii]) {
                  // TEST
                  }
                })
              })

              // test feature matrix
              // build feature row
              classes.some((c, ii) => {
                c.some((f, jj) => {
                  matrix[ii][jj] = f.values[0] // values are sorted by occurence
                })
              })

              for (row of matrix) for (e of row) matrixRows.push(e)

              matrixRows.some((r, ii) => {
                matrixRows.some((r2, jj) => {
                  if (ii !== jj && _.isEqual(rows[ii], rows[jj])) {
                    c1 = ii
                    c2 = jj
                  }
                })
              })

              // Default: random
              do {
                  c1 = Math.floor(Math.random() * c.length);
              } while (c1 === c2);

              break
            }
          }
        })

        console.log('c1 = ' + c1 + ', c2 = ' + c2)

        res.send({
          action: action,
          classes: classes,
          a: classes[c1].trainingData[0],
          b: classes[c2].trainingData[0]
        })

      }).sort({ _id: -1 })

    }
  }).sort({ projectId: 1 })

})

export default router
