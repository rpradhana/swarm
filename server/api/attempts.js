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

function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[i] = arr[i];
  return rv;
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

// Fetch all attempts by user
router.get('/attemptsBy/:userId', (req, res) => {
  const userId = req.params.userId
  Attempt.find({ userId: userId }, '', (error, attempts) => {
    Project.find({}, '', (error, projects) => {
      if (error) {
        console.error(error)
      } else {

        var attemptCounter = 0
        var projectList = []
        var dateList = []
        var taskCountList = []
        var isDistinctProject
        var isDistinctTime
        var totalEarnings = 0

        attempts.forEach((a, index) => {
          if (a.timestamp) {
            attemptCounter++
            isDistinctProject = (!_.includes(projectList, a.projectId))
            isDistinctTime = (!_.includes(dateList, moment(a.timestamp).format('l')))
            if (isDistinctProject && isDistinctTime) {
              projectList.push(a.projectId)
              dateList.push(a.timestamp)
              taskCountList.push(attemptCounter)
              attemptCounter = 0
            }
          }
        })
        console.log(dateList, ' : ' ,projectList, ' : ' ,taskCountList)

        var rows = []
        projectList.forEach((item, index) => {

          var earnings = (taskCountList[index] * _.find(projects, { 'id': item }).incentive)
          rows.push({
            date: moment(dateList[index]).format('l'),
            title: _.find(projects, { 'id': item }).title,
            type: _.find(projects, { 'id': item }).type,
            tasks: taskCountList[index],
            earnings: earnings,
            attempts: 5
          })

          totalEarnings += earnings
        })
        console.log(rows)
        res.send({
          attempts: attempts,
          rows: rows,
          totalEarnings: totalEarnings
        })

      }
    })
  }).sort({ timestamp: 1 })
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
      found = 0,
      row,
      highestCount = 0,
      foundAttempts = [],
      attemptCounts = []

  Project.findOne({ _id: projectId }, '', (error, project) => {
    Class.find({ projectId: projectId }, '', (error, classes) => {
      Feature.find({ projectId: projectId }, '', (error, features) => {
        Attempt.find({ projectId: projectId }, '', (error, attempts) => {

          if (found) {action = 0}
          else if (features.length === 0) {action = 1}
          else if (features.length < Math.ceil(Math.log2(classes.length))) {action = 2}
          else if (features.length >= Math.ceil(Math.log2(classes.length))) {action = 3}

          console.log('\nclasses = ', project.classes)
          console.log('classes count = ', classes.length)
          console.log('\nfeatures = ', features)
          console.log('features count = ', features.length)
          console.log('\naction = ', action)

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

                var classAttempts = _.map(attempts, (ca) => {
                  foundAttempts.push(ca.classAId)
                  foundAttempts.push(ca.classBId)
                })

                // Initialize attemptCounts with 0
                classes.some((c, ii) => {
                  attemptCounts[ii] = 0
                })

                foundAttempts.some((fa, ii) => {
                  classes.some((c, jj) => {
                    if (JSON.stringify(fa) === JSON.stringify(c._id)) {
                      // console.log(fa, ' : ', c._id)
                      attemptCounts[jj]++
                    }
                  })
                })

                console.log('\nattempts = ', foundAttempts)
                console.log('attempt counts = ', attemptCounts)

                // iterate classes and pick 2 classes
                classes.some((c, ii) => {
                  // next loop will assign c2 with next class that has empty/lowest feature
                  if (c1 && !c2 && c2 !== c1 && attemptCounts[ii] <= Math.min(...attemptCounts)) {
                    c2 = ii
                  }
                  // first loop will assign c1 with class that has empty/lowest feature
                  if (!c1 && attemptCounts[ii] <= Math.min(...attemptCounts)) {
                    c1 = ii
                    console.log()
                  }
                })
              } else {
                // TODO: optimize
              }
              break
            }

            // feature count is reaches minimum required
            case (3): {

              // default
              var classAttempts = _.map(attempts, (ca) => {
                foundAttempts.push(ca.classAId)
                foundAttempts.push(ca.classBId)
              })

              classes.some((c, ii) => {
                attemptCounts[ii] = 0
              })

              foundAttempts.some((fa, ii) => {
                classes.some((c, jj) => {
                  if (JSON.stringify(fa) === JSON.stringify(c._id)) {
                    // console.log(fa, ' : ', c._id)
                    attemptCounts[jj]++
                  }
                })
              })
              console.log('attempt counts = ', attemptCounts)

              // iterate classes and pick 2 classes
              classes.some((c, ii) => {
                // next loop will assign c2 with next class that has empty/lowest feature
                if (c1 && !c2 && c2 !== c1 && attemptCounts[ii] <= Math.min(...attemptCounts)) {
                  c2 = ii
                }
                // first loop will assign c1 with class that has empty/lowest feature
                if (!c1 && attemptCounts[ii] <= Math.min(...attemptCounts)) {
                  c1 = ii
                  console.log()
                }
              })


              // TODO: test empties

              // foundFeatures.some((f, ii) => {
              //   classes.some((c, jj) => {
              //     // if empty
              //     if (!c.features[ii]) {
              //     // TEST
              //     }
              //   })
              // })

              // // test feature matrix
              // // build feature row
              // classes.some((c, ii) => {
              //   console.log(c)
              //   c.some((f, jj) => {
              //     matrix[ii][jj] = f.values[0] // values are sorted by occurence
              //   })
              // })

              // for (row of matrix) for (e of row) matrixRows.push(e)

              // matrixRows.some((r, ii) => {
              //   matrixRows.some((r2, jj) => {
              //     if (ii !== jj && _.isEqual(rows[ii], rows[jj])) {
              //       c1 = ii
              //       c2 = jj
              //     }
              //   })
              // })

              // Default: random
              // c1 = Math.floor(Math.random() * classes.length)
              // do {
              //     c2 = Math.floor(Math.random() * classes.length);
              // } while (c2 === c1);

              break
            }
          }

          rand = getRandomInt(classes[c1].trainingData.length)
          console.log('random #a = ' + rand)
          a = classes[c1].trainingData[rand]
          rand = getRandomInt(classes[c2].trainingData.length)
          console.log('random #b = ' + rand)
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

        }).sort({ _id: 1 })
      }).sort({ occurence: 1 }) // descending by occurence
    }).sort({ _id: 1 })
  }).sort({ _id: 1 })
})

/**
 * POST New Attempt
 */
router.post('/postAttempt', (req, res, next) => {

  Project.findOne({ _id: req.body.projectId }, '', (errorP, project) => {
    Class.find({ projectId: req.body.projectId }, '', (errorC, classes) => {
      Feature.find({ projectId: req.body.projectId }, '', (errorF, features) => {

        // Update project
        if (project) {

          // add contributor if it's his first attempt
          Attempt.findOne(
            { $and: [
                { projectId: project._id },
                { userId: req.body.userId }
              ]
            },
            '',
            (error, attempt) => {
            if (error) {
              console.log('contributor : ', project.contributor)
              project.contributor += 1
              project.save()
            }
          })

          project.attempts += 1
          // project.expense += project.incentive // calculate on the fly, don't store
          console.log('attempts = ', project.attempts)
          project.save()
        } else {
          console.error(errorP)
        }

        // New feature?
        var isNew = true
        console.log('Feature length = ', features.length)
        if (features.length > 0) {
          features.forEach((f) => {
            console.log(req.body.feature, ' : ', f.feature)
            if (req.body.feature === f.feature) {
              isNew = false
            }
          })
        }
        console.log('isNew = ', isNew)

        // New feature => new feature new attempt
        if (isNew) {
          let newFeature = new Feature ({
            feature: req.body.feature,
            projectId: project._id,
            highestAccuracy: 1,
            occurence: 1,
            values: [req.body.a, req.body.b]
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
                userId: req.body.userId,
                timestamp: moment()
              })
              newAttempt.save()
              console.log('adding new feature ...')
              console.log(newFeature)
            })
        }

        // Existing feature => update + new attempt
        else if (!isNew) {
          Feature.findOne(
            { $and: [
                { projectId: project._id },
                { feature: req.body.feature }
              ]
            },
            '',
            (error, f) => {
              // Update Feature collection
              if (f) {

                // Add values into feature values
                if (!_.includes(f.values, req.body.a)) {
                  f.values.push(req.body.a)
                }
                if (!_.includes(f.values, req.body.b)) {
                  f.values.push(req.body.b)
                }

                f.occurence += 1
                console.log(f.feature, ' occurence = ', f.occurence)
                f.save()

                // Save new Attempt
                let newAttempt = new Attempt ({
                  projectId: req.body.projectId,
                  classAId: classes[req.body.c1]._id,
                  classBId: classes[req.body.c2]._id,
                  featureId: f._id,
                  valueA: req.body.a,
                  valueB: req.body.b,
                  userId: req.body.userId,
                  timestamp: moment()
                })
                newAttempt.save()
              } else {
                console.log(error)
              }
            }
          )
        }

      })
    })
    res.send(project)
  })

})

export default router
