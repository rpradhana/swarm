import { Router } from 'express'

const router = Router()

// Dependencies
const moment = require('moment')
const _ = require('lodash')

const Project = require('../models/project')
const Class = require('../models/class')
const Attempt = require('../models/attempt')
const Feature = require('../models/feature')

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Fetch all attempts
router.get('/attempt', (req, res) => {
  Attempts.find({}, '', (error, attempts) => {
    if (error) {
      console.error(error)
    } else res.send({
      attempts: attempts
    })
  }).sort({ _id: -1 })
})

/**
 * GET Attempt
 */
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
      matrixRows = [],
      found = 0

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

            if (found) {action = 0}
            else if (featureCount === 0) {action = 1}
            else if (featureCount < Math.ceil(Math.log2(c.length))) {action = 2}
            else if (featureCount >= Math.ceil(Math.log2(c.length))) {action = 3}

            (action > 0) ? console.log('act = ' + action) : ''

            switch(action) {

              // feature matrix is empty
              // get class 1 & 2
              case (1): {
                c1 = 0
                c2 = 1
                found = 1
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

        // console.log('c1 = ' + c1 + ', c2 = ' + c2)
        // res.send({
        //   req: req.body,
        //   project: project,
        //   action: action,
        //   classes: classes,
        //   a: classes[c1].trainingData[0],
        //   b: classes[c2].trainingData[0],
        //   c1: c1,
        //   c2: c2
        // })

        rand = getRandomInt(classes[c1].trainingData.length)
        console.log('#a = ' + rand)
        a = classes[c1].trainingData[rand]
        rand = getRandomInt(classes[c2].trainingData.length)
        console.log('#b = ' + rand)
        b = classes[c2].trainingData[rand]

        console.log('c1 = ' + c1 + ', c2 = ' + c2)
        res.send({
          req: req.body,
          project: project,
          action: action,
          classes: classes,
          a: a,
          b: b,
          c1: c1,
          c2: c2
        })

      }).sort({ _id: -1 })

    }
  }).sort({ projectId: 1 })

})

/**
 * POST New Attempt
 */
router.post('/postAttempt', (req, res, next) => {

  Project.findOne({ _id: req.body.projectId }, '', (error, project) => {
    Class.find({ projectId: req.body.projectId }, '', (error, classes) => {
      Feature.find({ projectId: req.body.projectId }, '', (error, features) => {

        console.log('Feature length = ', features.length)

        // first feature & first attempt
        if (features.length <= 0) {
          let firstFeature = new Feature ({
            feature: req.body.feature,
            projectId: project._id,
            accuracy: 1
          })
          firstFeature
            .save((e, f0) => {
              let firstAttempt = new Attempt ({
                projectId: req.body.projectId,
                classAId: classes[req.body.c1]._id,
                classBId: classes[req.body.c2]._id,
                featureId: f0._id,
                valueA: req.body.a,
                valueB: req.body.b,
                userId: req.body.userId
              })
              firstAttempt.save()
              console.log(firstFeature)
            })
        }

        else if (features.length > 0) {

          var isNew = true
          features.forEach((f) => {
            console.log(req.body.feature, ' : ', f.feature)
            if (req.body.feature === f.feature) {
              isNew = false
            }
          })
          console.log('isNew = ', isNew)

          console.log()

          // new feature?
          if (isNew) {
            let newFeature = new Feature ({
              feature: req.body.feature,
              projectId: project._id,
              accuracy: 1
            })
            newFeature
              .save((e, fnew) => {
                let newAttempt = new Attempt ({
                  projectId: req.body.projectId,
                  classAId: classes[req.body.c1]._id,
                  classBId: classes[req.body.c2]._id,
                  featureId: fnew._id,
                  valueA: req.body.a,
                  valueB: req.body.b,
                  userId: req.body.userId
                })
                newAttempt.save()
                console.log('adding new feature ...')
                console.log(newFeature)
              })
          }

          // feature already exist => new attempt
          else if (!isNew) {
            Feature.findOne(
              { $and: [
                  { projectId: project._id },
                  { feature: req.body.feature }
                ]
              },
              '',
              (error, f) => {
                let newAttempt = new Attempt ({
                  projectId: req.body.projectId,
                  classAId: classes[req.body.c1]._id,
                  classBId: classes[req.body.c2]._id,
                  featureId: f._id,
                  valueA: req.body.a,
                  valueB: req.body.b,
                  userId: req.body.userId
                })
                newAttempt.save()
              }
            )
          }
        }

        classes.forEach((c) => {
          features.forEach((f) => {

          })
        })

      })
    })
    res.send(project)
  })
})

export default router