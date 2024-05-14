const express = require('express')
const app = express()

app.use(express.json())

// TODO: Add Functionality for multiple users rightnow its for single user right now
// TODO: Add functionality for database(remove in memory operations)
let user1 = {
  fname: "Tanay",
  lname: "Dubey",
  gender: "Male",
  age: 24,
  kidneys: [
    {
      kidneyPos: "Left",
      isHealthy: false,
    },
    {
      kidneyPos: "Right",
      isHealthy: false,
    },
  ],
};

app.get('/patient-info', (req, res) => {
    res.json(user1)
})

app.get('/kidney-info', (req, res) => {
    const patientName = user1.fname + " " + user1.lname
    let Kidneys = user1.kidneys.length;
    let healthy = 0;
    for(let i=0;i<user1.kidneys.length;i++) {
        if(user1.kidneys[i].isHealthy) healthy++;
    }
    let unHealthy = Kidneys-healthy
    res.json({
        patientName:patientName,
        totalKidney:Kidneys,
        healthyKidneys:healthy,
        unhealthyKidneys:unHealthy
    })
})

app.post('/add-new-kidney', (req, res) => {
    let kidney = {
        kidneyPos:"Left",
        isHealthy:req.body.isHealthy
    }
    if(user1.kidneys.length==0) {
        user1.kidneys.push(kidney)
        res.status(200).json({
          msg: "Kidney Added Successfully",
        });
    } else if (user1.kidneys.length==1) {
        if(user1.kidneys[0].kidneyPos=='Left') {
            kidney.kidneyPos = "Right"
            user1.kidneys.push(kidney);
        } else {
            user1.kidneys.push(kidney);
        }
        res.status(200).json({
          msg: "Kidney Added Successfully",
        });
    } else {
      res.status(413).json({
        msg: "Patient already has 2 kidneys",
      });
    }
})


app.put('/treating-a-kidney', (req, res) => {
    const position = req.query.pos

    if(user1.kidneys[0].kidneyPos==position) {
        user1.kidneys[0].isHealthy = true
    } else {
        user1.kidneys[1].isHealthy = true;
    }
    res.json(user1)
})

app.delete('/removing-unHealthy-kidney', (req, res) => {
    for(let i=0;i<user1.kidneys.length;i++) {
        if(user1.kidneys[i].isHealthy==false) {
            if(i==0) {
                user1.kidneys.shift();
                i--;
            } else {
                user1.kidneys.pop();
            }
        }
    }
    res.json(user1)
})

app.listen(3004)