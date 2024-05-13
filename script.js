const express = require('express')
const app = express()

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
    const patientName = user1.fname + " " + user1.lname
    let healthyKidneys = 0;
    for(let i=0;i<user1.kidneys.length;i++) {
        if(user1.kidneys[i].isHealthy) healthyKidneys++;
    }
    res.json({
        patientName:patientName,
        healthyKidneys:healthyKidneys
    })

})

app.post('/add-new-kidney', (req, res) => {
    if(user1.kidneys.length<2) {
        console.log("Hello")
        // TODO: Add this Functionality
    } else {
        res.status(413).json({
            msg:"Patient already has 2 kidneys"
        })
    }
})


app.put('/treating-a-kidney', (req, res) => {
    // TODO: Add this functionality
})

app.delete('/removing-a-kidney', (req, res) => {
  // TODO: Add this functionality
})

app.listen(3004)