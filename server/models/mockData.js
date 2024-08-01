const mongoose = require('mongoose');
const User = require('../models/User'); 
require('dotenv').config();

const IndiaCP = [
    {
      "auth0Id": "7ffba2c7-8c45-4e30-8b34-3e2c8454a77f",
      "name": "John Doe",
      "email": "john.doe@gmail.com",
      "description": "Passionate about cybersecurity.",
      "profileCompleted": true,
      "isHacker": true,
      "timezone": "IST",
      "location": {
        "type": "Point",
        "coordinates": [77.2250, 28.6400]
      },
      "previousHackathons": ["Cybersecurity Capture the Flag"],
      "devpostProfile": "https://devpost.com/johndoe"
    },
    {
      "auth0Id": "bd7a1d74-1e55-4d47-a654-5e94b2e4a88f",
      "name": "Jane Smith",
      "email": "jane.smith@yahoo.com",
      "description": "AI enthusiast and researcher.",
      "profileCompleted": true,
      "isResearcher": true,
      "timezone": "IST",
      "location": {
        "type": "Point",
        "coordinates": [77.2150, 28.6300]
      },
      "researchProfile": "https://researchersprofile.com/users/JaneSmith"
    },
    {
      "auth0Id": "d4f1d6f7-6a57-4977-a989-f9b7d6e3c0f4",
      "name": "Alice Johnson",
      "email": "alice.johnson@outlook.com",
      "description": "Love coding and developing new applications.",
      "profileCompleted": true,
      "isDeveloper": true,
      "timezone": "IST",
      "location": {
        "type": "Point",
        "coordinates": [77.2350, 28.6450]
      },
      "githubUsername": "alicejohnson"
    },
    {
      "auth0Id": "a0e5e3a9-7f77-4f38-b878-2a5764e54512",
      "name": "Bob Brown",
      "email": "bob.brown@gmail.com",
      "description": "Experienced researcher in machine learning.",
      "profileCompleted": true,
      "isResearcher": true,
      "timezone": "IST",
      "location": {
        "type": "Point",
        "coordinates": [77.2200, 28.6350]
      },
      "researchProfile": "https://researchersprofile.com/users/BobBrown"
    },
    {
      "auth0Id": "e6e1c7d3-3a4e-4f31-a5ef-5a1f1e0b7a2c",
      "name": "Charlie Davis",
      "email": "charlie.davis@outlook.com",
      "description": "Developer with a passion for open-source projects.",
      "profileCompleted": true,
      "isDeveloper": true,
      "timezone": "IST",
      "location": {
        "type": "Point",
        "coordinates": [77.2300, 28.6500]
      },
      "githubUsername": "charliedavis"
    },
    {
      "auth0Id": "c1d3b7e4-5d2e-4e7b-8d9a-3e2b2e4d7a6b",
      "name": "David Evans",
      "email": "david.evans@yahoo.com",
      "description": "Cybersecurity expert with years of experience.",
      "profileCompleted": true,
      "isHacker": true,
      "timezone": "IST",
      "location": {
        "type": "Point",
        "coordinates": [77.2400, 28.6550]
      },
      "previousHackathons": ["Cybersecurity Capture the Flag"],
      "devpostProfile": "https://devpost.com/davidevans"
    },
    {
      "auth0Id": "f6e1c7d3-4a5d-4f31-a5bf-6a2f2e0b7d3c",
      "name": "Eva Green",
      "email": "eva.green@gmail.com",
      "description": "Researcher in AI and ML.",
      "profileCompleted": true,
      "isResearcher": true,
      "timezone": "IST",
      "location": {
        "type": "Point",
        "coordinates": [77.2500, 28.6600]
      },
      "researchProfile": "https://researchersprofile.com/users/EvaGreen"
    },
    {
      "auth0Id": "b1e7d6f3-6b7a-4977-a999-f8b8d7e3c0e6",
      "name": "Fiona Hill",
      "email": "fiona.hill@outlook.com",
      "description": "Developer focusing on front-end technologies.",
      "profileCompleted": true,
      "isDeveloper": true,
      "timezone": "IST",
      "location": {
        "type": "Point",
        "coordinates": [77.2450, 28.6650]
      },
      "githubUsername": "fionahill"
    },
    {
      "auth0Id": "d1f1e3f7-5b6e-4e9b-8d2a-3b2e4e4d7a7b",
      "name": "George Ivory",
      "email": "george.ivory@yahoo.com",
      "description": "Researcher focused on social sciences.",
      "profileCompleted": true,
      "isResearcher": true,
      "timezone": "IST",
      "location": {
        "type": "Point",
        "coordinates": [77.2550, 28.6700]
      },
      "researchProfile": "https://researchersprofile.com/users/GeorgeIvory"
    },
    {
      "auth0Id": "g1f7d8e3-5c7e-4d9b-9d2a-4b2e5e5d8b7c",
      "name": "Hannah Jones",
      "email": "hannah.jones@gmail.com",
      "description": "Ethical hacker and cybersecurity consultant.",
      "profileCompleted": true,
      "isHacker": true,
      "timezone": "IST",
      "location": {
        "type": "Point",
        "coordinates": [77.2600, 28.6750]
      },
      "previousHackathons": ["Global Hackathon 2023"],
      "devpostProfile": "https://devpost.com/hannahjones"
    }
]

const insertUsers = async (users) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await User.insertMany(users);
    console.log('Users inserted successfully');
  } catch (error) {
    console.error('Error inserting users:', error);
  } finally {
    mongoose.connection.close();
  }
};

// insertUsers(IndiaCP);

const viewUsers = (users) => {
  for (let i = 0; i < users.length; i++) {
    const [longitude, latitude] = users[i].location.coordinates;
    console.log(`${latitude.toFixed(5)},${longitude.toFixed(5)},`);
  }
};

viewUsers(IndiaCP);
