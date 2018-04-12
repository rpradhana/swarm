import { Router } from 'express'

const router = Router()

// Dependencies
const moment = require('moment')
const _ = require('lodash')

const Project = require('../models/project')
const Class = require('../models/class')
const Attempt = require('../models/attempt')

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
              rand = Math.random(classes[c1].trainingData.length)
              a = classes[c1].trainingData[rand]
              rand = Math.random(classes[c2].trainingData.length)
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
          req: req.body,
          project: project,
          action: action,
          classes: classes,
          a: classes[c1].trainingData[0],
          b: classes[c2].trainingData[0],
          c1: c1,
          c2: c2
        })

      }).sort({ _id: -1 })

    }
  }).sort({ projectId: 1 })

})

// POST new attempt
router.post('/postAttempt', (req, res, next) => {

  Project.findOne({ _id: req.body.projectId }, '', (error, project) => {
    if (error) {
      console.error(error)
    } else {

      let criteria = [],
      data,
      foundFeature = null

      // class of a specific project
      criteria.push({ projectId: req.body.projectId })
      criteria.push({ class: '' })

      // find all class
      Class.find({ projectId: req.body.projectId }, '', (error, classes) => {

        // find related feature
        classes.forEach((c, ii) => {
          if (c.features) {
            c.features.forEach((f, ii) => {
              foundFeature = (req.body.feature === f) ? f : null
            })
          } else {
            foundFeature = null
          }
        })

        console.log('Found feature = ' + foundFeature)

        // update related feature
        if (foundFeature === null) {
          console.log(req.body.c1)

          let crit = []
          crit.push({ projectId: req.body.projectId })
          crit.push({ class: req.body.c1 })
          crit = crit.length > 0 ? { $and: crit } : {}

          console.log('c1 id ' + classes[req.body.c1]._id)
          console.log('c2 id ' + classes[req.body.c2]._id)

          Class.findOneAndUpdate(
            { _id: classes[req.body.c1]._id },
            {
              class: 'FEATURE',
              feature: [
                {
                  feature: 'A',
                  values: [
                    { v: 2 }
                  ]
                }
              ]
            },
            { upsert: true },
            (error, doc) => {
              console.log(doc)
            }
          )

          console.log(classes)

          // // UPDATE C2
          // Class.findOneAndUpdate(
          //   { $and: [
          //       { projectId: req.body.projectId },
          //       { class: project.classes[req.body.c1] }
          //     ]
          //   },
          //   {
          //     $push: {'Class.$.class' : 'TEST'}
          //   },
          //   { upsert: true }
          // )

          // // UPDATE C2
          // Class.findOne(
          //   { $and: [
          //       { projectId: req.body.projectId },
          //       { class: project.classes[req.body.c2] }
          //     ]
          //   },
          //   '',
          //   (error, classes) => {
          //     // Class.findById(_id, (e, data) => {
          //     // //   var t = data.classes.id(_id1)
          //     // //   t.class = 'YAY'
          //     // //   data.save()
          //     // //   console.log(data)
          //     // })
          //   }
          // )

          // Class.update(
          //   { $and: [
          //       { projectId: req.body.projectId },
          //       { class: project.classes[req.body.c1] }
          //     ]
          //   },
          //   {
          //     $set: {

          //     }
          //   },
          //   {
          //     upsert: true
          //   }
          // )

          // Class.findOne(
          //   { $and: [
          //       { projectId: req.body.projectId },
          //       { class: project.classes[req.body.c1] }
          //     ]
          //   },
          //   '',
          //   (error, classes) => {
          //     // classes.set('useFindAndModify', false)
          //     // var feature = {
          //     //   "feature": "A",
          //     //   "values": [
          //     //     { "v": 1 }
          //     //   ]
          //     // }

          //     // classes.features = [{
          //     //   "feature": req.body.feature,
          //     //   "values": [
          //     //     { "v": 1 }
          //     //   ]
          //     // }]
          //     // // classes.insert(
          //     // //   { 'index': 1 }
          //     // // )
          //     // classes.save()

          //     // classes.update({},
          //     //   {
          //     //     $set: { "feature": req.body.feature }
          //     //   },
          //     //   { upsert: true }
          //     // )

          //     console.log(classes)
          //   }
          // )


        } else {
          // UPDATE ONE
          // UPDATE ALL
        }

      })

      // project.classes.forEach((c) => {
      //   console.log(project.classes)
      // })

      // criteria = criteria.length > 0 ? { $and: criteria } : {}
      // // Get related classes as classes[]
      // Class.find(criteria, '', (error, classes) => {

      //   classes.forEach((c, ii) => {
      //     // console.log(c._id)
      //   })

      // })
      res.send(project)
    }
  })

    // Project.findOne({ _id: req.body.projectId }, '', (error, project) => {

    //   let criteria = [],
    //       data = {}

    //   // class of a specific project
    //   criteria.push({ projectId: req.body.projectId })

    //   project.classes.forEach((c) => {

    //     // class from client === class in server
    //     if (req.body.feature === c) {
    //       criteria.push({ class: req.body.feature })
    //       console.log(req.body.feature)
    //     }

    //     // class from client doesn't exist
    //     else {

    //     }
    //   })
    //   // criteria.push({ class: 'a' })

    //   criteria = criteria.length > 0 ? { $and: criteria } : {}


    //   // Get related classes as classes[]
    //   Class.find(criteria, '', (error, classes) => {

    //     data = classes
    //     res.send(data)

    //   })

    // })

    // find Project as project
    // foreach classes
    // if features




  // Get the project as project
  // Project.findOne({ _id: req.body.projectId }, '', (error, project) => {
  //   if (error) {
  //     console.error(error)
  //   } else {



  //     // Get related classes as classes[]
  //     Class.find({ projectId: req.body.projectId }, '', (error, classes) => {


  //       classes.forEach((c, ii) => {
  //         data = c

  //         console.log(c)

  //         c.update(
  //           { _id: c._id },
  //           {
  //             $set:
  //             {
  //               features: [
  //                 { feature: 'a', values: true }
  //               ]
  //             }
  //           }
  //         )
  //       })
  //     })

  //     Class.find(
  //       { projectId: req.body.projectId }, '',
  //       (error, c) => {
  //     })

  //     res.send(data)
  //   }
  // })

  // const newUser = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  //   paypal: req.body.paypal,
  //   type: req.body.type
  // })

  // newUser.save((error) => {
  //   if (error) {
  //     console.log(error)
  //   } else res.send({
  //     success: true,
  //     message: 'User saved successfully!'
  //   })
  // })
})

export default router
