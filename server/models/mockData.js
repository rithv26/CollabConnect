const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

const IndiaCP = [
  {
    auth0Id: "7ffba2c7-8c45-4e30-8b34-3e2c8454a77f",
    name: "John Doe",
    email: "john.doe@gmail.com",
    description: "Passionate about cybersecurity.",
    profileCompleted: true,
    isHacker: true,
    timezone: "IST",
    location: {
      type: "Point",
      coordinates: [77.225, 28.64],
    },
    previousHackathons: ["Cybersecurity Capture the Flag"],
    devpostProfile: "https://devpost.com/johndoe",
  },
  {
    auth0Id: "bd7a1d74-1e55-4d47-a654-5e94b2e4a88f",
    name: "Jane Smith",
    email: "jane.smith@yahoo.com",
    description: "AI enthusiast and researcher.",
    profileCompleted: true,
    isResearcher: true,
    timezone: "IST",
    location: {
      type: "Point",
      coordinates: [77.215, 28.63],
    },
    researchProfile: "https://researchersprofile.com/users/JaneSmith",
  },
  {
    auth0Id: "d4f1d6f7-6a57-4977-a989-f9b7d6e3c0f4",
    name: "Alice Johnson",
    email: "alice.johnson@outlook.com",
    description: "Love coding and developing new applications.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "IST",
    location: {
      type: "Point",
      coordinates: [77.235, 28.645],
    },
    githubUsername: "alicejohnson",
  },
  {
    auth0Id: "a0e5e3a9-7f77-4f38-b878-2a5764e54512",
    name: "Bob Brown",
    email: "bob.brown@gmail.com",
    description: "Experienced researcher in machine learning.",
    profileCompleted: true,
    isResearcher: true,
    timezone: "IST",
    location: {
      type: "Point",
      coordinates: [77.22, 28.635],
    },
    researchProfile: "https://researchersprofile.com/users/BobBrown",
  },
  {
    auth0Id: "e6e1c7d3-3a4e-4f31-a5ef-5a1f1e0b7a2c",
    name: "Charlie Davis",
    email: "charlie.davis@outlook.com",
    description: "Developer with a passion for open-source projects.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "IST",
    location: {
      type: "Point",
      coordinates: [77.23, 28.65],
    },
    githubUsername: "charliedavis",
  },
  {
    auth0Id: "c1d3b7e4-5d2e-4e7b-8d9a-3e2b2e4d7a6b",
    name: "David Evans",
    email: "david.evans@yahoo.com",
    description: "Cybersecurity expert with years of experience.",
    profileCompleted: true,
    isHacker: true,
    timezone: "IST",
    location: {
      type: "Point",
      coordinates: [77.24, 28.655],
    },
    previousHackathons: ["Cybersecurity Capture the Flag"],
    devpostProfile: "https://devpost.com/davidevans",
  },
  {
    auth0Id: "f6e1c7d3-4a5d-4f31-a5bf-6a2f2e0b7d3c",
    name: "Eva Green",
    email: "eva.green@gmail.com",
    description: "Researcher in AI and ML.",
    profileCompleted: true,
    isResearcher: true,
    timezone: "IST",
    location: {
      type: "Point",
      coordinates: [77.25, 28.66],
    },
    researchProfile: "https://researchersprofile.com/users/EvaGreen",
  },
  {
    auth0Id: "b1e7d6f3-6b7a-4977-a999-f8b8d7e3c0e6",
    name: "Fiona Hill",
    email: "fiona.hill@outlook.com",
    description: "Developer focusing on front-end technologies.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "IST",
    location: {
      type: "Point",
      coordinates: [77.245, 28.665],
    },
    githubUsername: "fionahill",
  },
  {
    auth0Id: "d1f1e3f7-5b6e-4e9b-8d2a-3b2e4e4d7a7b",
    name: "George Ivory",
    email: "george.ivory@yahoo.com",
    description: "Researcher focused on social sciences.",
    profileCompleted: true,
    isResearcher: true,
    timezone: "IST",
    location: {
      type: "Point",
      coordinates: [77.255, 28.67],
    },
    researchProfile: "https://researchersprofile.com/users/GeorgeIvory",
  },
  {
    auth0Id: "g1f7d8e3-5c7e-4d9b-9d2a-4b2e5e5d8b7c",
    name: "Hannah Jones",
    email: "hannah.jones@gmail.com",
    description: "Ethical hacker and cybersecurity consultant.",
    profileCompleted: true,
    isHacker: true,
    timezone: "IST",
    location: {
      type: "Point",
      coordinates: [77.26, 28.675],
    },
    previousHackathons: ["Global Hackathon 2023"],
    devpostProfile: "https://devpost.com/hannahjones",
  },
];

const IndiaGlobe = [
  {
    auth0Id: "b7a1f7d6-5e3c-4a1d-a1e5-f8a2e3d5b4c1",
    name: "Isha Kapoor",
    email: "isha.kapoor@gmail.com",
    description: "Front-end developer with a love for UI/UX design.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "IST",
    location: {
      type: "Point",
      coordinates: [72.8777, 19.076], // Mumbai
    },
    githubUsername: "ishakapoor",
  },
  {
    auth0Id: "c8e2f4d7-6a3f-4b1a-9d5e-e2f4a1b5d7c9",
    name: "Jatin Mehta",
    email: "jatin.mehta@yahoo.com",
    description: "Python developer and data scientist.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "IST",
    location: {
      type: "Point",
      coordinates: [80.2707, 13.0827], // Chennai
    },
    githubUsername: "jatinmehta",
  },
  {
    auth0Id: "a2f4d6e1-5c3a-4f7d-b5e1-f9b8d7c3e0f2",
    name: "Kavita Nair",
    email: "kavita.nair@outlook.com",
    description: "Full-stack developer passionate about blockchain.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "IST",
    location: {
      type: "Point",
      coordinates: [77.5946, 12.9716], // Bangalore
    },
    githubUsername: "kavitanair",
  },
  {
    auth0Id: "f8a1e5c7-9b3d-4a5e-a1d3-f2e4c5d6a7b8",
    name: "Lakshmi Rao",
    email: "lakshmi.rao@gmail.com",
    description: "Ethical hacker and security analyst.",
    profileCompleted: true,
    isHacker: true,
    timezone: "IST",
    location: {
      type: "Point",
      coordinates: [72.5714, 23.0225], // Ahmedabad
    },
    previousHackathons: ["India Cyber Security Hackathon 2023"],
    devpostProfile: "https://devpost.com/lakshmirao",
  },
  {
    auth0Id: "b1e3f7d6-8c5a-4f2e-a7d4-f9a6d7b8e0c1",
    name: "Manoj Sharma",
    email: "manoj.sharma@yahoo.com",
    description: "Passionate hacker and cybersecurity enthusiast.",
    profileCompleted: true,
    isHacker: true,
    timezone: "IST",
    location: {
      type: "Point",
      coordinates: [88.3639, 22.5726], // Kolkata
    },
    previousHackathons: ["National Cyber Challenge 2023"],
    devpostProfile: "https://devpost.com/manojsharma",
  },
  {
    auth0Id: "d7f6e1c8-4a3b-5d7a-a1e9-c5d4e2f3b0a1",
    name: "Nisha Verma",
    email: "nisha.verma@outlook.com",
    description: "Hackathon enthusiast and competitive coder.",
    profileCompleted: true,
    isHacker: true,
    timezone: "IST",
    location: {
      type: "Point",
      coordinates: [76.7794, 30.7333], // Chandigarh
    },
    previousHackathons: ["Chandigarh Hack Fest 2022"],
    devpostProfile: "https://devpost.com/nishaverma",
  },
  {
    auth0Id: "e1f3c5d4-7b5a-4a6f-e8d7-f1b2c3d4e5a6",
    name: "Omkar Desai",
    email: "omkar.desai@gmail.com",
    description: "Security researcher and ethical hacker.",
    profileCompleted: true,
    isHacker: true,
    timezone: "IST",
    location: {
      type: "Point",
      coordinates: [73.8567, 18.5204], // Pune
    },
    previousHackathons: ["Pune Security Summit 2023"],
    devpostProfile: "https://devpost.com/omkardesai",
  },
  {
    auth0Id: "f2e3d4c5-9a7b-6c4e-b5d8-a1f6e7c8b9d0",
    name: "Pooja Iyer",
    email: "pooja.iyer@gmail.com",
    description: "Cybersecurity consultant with expertise in network security.",
    profileCompleted: true,
    isHacker: true,
    timezone: "IST",
    location: {
      type: "Point",
      coordinates: [75.8577, 26.9124], // Jaipur
    },
    previousHackathons: ["Jaipur Cyber Expo 2023"],
    devpostProfile: "https://devpost.com/poojaiyer",
  },
  {
    auth0Id: "c5d4e2f3-8a1b-4c7d-b9e0-f6a1e2d3c4b5",
    name: "Qureshi Khan",
    email: "qureshi.khan@outlook.com",
    description: "Ethical hacker specializing in web application security.",
    profileCompleted: true,
    isHacker: true,
    timezone: "IST",
    location: {
      type: "Point",
      coordinates: [74.7973, 34.0837], // Srinagar
    },
    previousHackathons: ["Kashmir Cyber Meet 2023"],
    devpostProfile: "https://devpost.com/qureshikhan",
  },
  {
    auth0Id: "a8d5f4c3-1b2e-5c4d-a6f7-b9e1c0d3e2f5",
    name: "Riya Sen",
    email: "riya.sen@gmail.com",
    description: "Researcher in bioinformatics and data analysis.",
    profileCompleted: true,
    isResearcher: true,
    timezone: "IST",
    location: {
      type: "Point",
      coordinates: [80.9462, 26.8467], // Lucknow
    },
    researchProfile: "https://researchersprofile.com/users/RiyaSen",
  },
];

const USAGlobe = [
  {
    auth0Id: "f7d8a1c2-3b4e-5f6d-7a8b-9c0d1e2f3g4h",
    name: "Alice Thompson",
    email: "alice.thompson@gmail.com",
    description: "Full-stack developer passionate about JavaScript.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "PST",
    location: {
      type: "Point",
      coordinates: [-122.4194, 37.7749], // San Francisco
    },
    githubUsername: "alicethompson",
  },
  {
    auth0Id: "b2c3d4e5-6f7a-8b9c-0d1e-2f3g4h5i6j7k",
    name: "Brian Matthews",
    email: "brian.matthews@yahoo.com",
    description: "AI researcher and machine learning enthusiast.",
    profileCompleted: true,
    isResearcher: true,
    timezone: "CST",
    location: {
      type: "Point",
      coordinates: [-87.6298, 41.8781], // Chicago
    },
    researchProfile: "https://researchersprofile.com/users/BrianMatthews",
  },
  {
    auth0Id: "e4f5g6h7-8i9j-0k1l-2m3n-4o5p6q7r8s9t",
    name: "Catherine Bell",
    email: "catherine.bell@outlook.com",
    description: "Cybersecurity expert with a focus on network security.",
    profileCompleted: true,
    isHacker: true,
    timezone: "EST",
    location: {
      type: "Point",
      coordinates: [-74.006, 40.7128], // New York City
    },
    previousHackathons: ["NYC Cyber Challenge 2023"],
    devpostProfile: "https://devpost.com/catherinebell",
  },
  {
    auth0Id: "h5i6j7k8-9l0m-1n2o-3p4q-5r6s7t8u9v0w",
    name: "David Lee",
    email: "david.lee@gmail.com",
    description: "Back-end developer specializing in Python and Django.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "EST",
    location: {
      type: "Point",
      coordinates: [-77.0369, 38.9072], // Washington, D.C.
    },
    githubUsername: "davidlee",
  },
  {
    auth0Id: "j7k8l9m0-1n2o-3p4q-5r6s-7t8u9v0w1x2y",
    name: "Emily Johnson",
    email: "emily.johnson@yahoo.com",
    description: "Data scientist with a focus on healthcare analytics.",
    profileCompleted: true,
    isResearcher: true,
    timezone: "MST",
    location: {
      type: "Point",
      coordinates: [-105.2705, 40.015], // Boulder
    },
    researchProfile: "https://researchersprofile.com/users/EmilyJohnson",
  },
  {
    auth0Id: "n0o1p2q3-4r5s-6t7u-8v9w-0x1y2z3a4b5c",
    name: "Franklin Hayes",
    email: "franklin.hayes@outlook.com",
    description: "Ethical hacker and cybersecurity consultant.",
    profileCompleted: true,
    isHacker: true,
    timezone: "PST",
    location: {
      type: "Point",
      coordinates: [-118.2437, 34.0522], // Los Angeles
    },
    previousHackathons: ["LA Hack Fest 2023"],
    devpostProfile: "https://devpost.com/franklinhayes",
  },
  {
    auth0Id: "q3r4s5t6-7u8v-9w0x-1y2z-3a4b5c6d7e8f",
    name: "Grace Miller",
    email: "grace.miller@gmail.com",
    description: "Machine learning engineer with a passion for AI.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "CST",
    location: {
      type: "Point",
      coordinates: [-95.3698, 29.7604], // Houston
    },
    githubUsername: "gracemiller",
  },
  {
    auth0Id: "s5t6u7v8-9w0x-1y2z-3a4b-5c6d7e8f9g0h",
    name: "Henry Cooper",
    email: "henry.cooper@yahoo.com",
    description: "Software developer interested in open-source projects.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "PST",
    location: {
      type: "Point",
      coordinates: [-122.6765, 45.5122], // Portland
    },
    githubUsername: "henrycooper",
  },
  {
    auth0Id: "u8v9w0x1-2y3z-4a5b-6c7d-8e9f0g1h2i3j",
    name: "Isabella Garcia",
    email: "isabella.garcia@outlook.com",
    description: "Security researcher focusing on IoT devices.",
    profileCompleted: true,
    isHacker: true,
    timezone: "CST",
    location: {
      type: "Point",
      coordinates: [-90.1994, 38.627], // St. Louis
    },
    previousHackathons: ["Midwest Hackathon 2023"],
    devpostProfile: "https://devpost.com/isabellagarcia",
  },
  {
    auth0Id: "w0x1y2z3-4a5b-6c7d-8e9f-0g1h2i3j4k5l",
    name: "Jack Wilson",
    email: "jack.wilson@gmail.com",
    description: "Front-end developer with expertise in React.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "MST",
    location: {
      type: "Point",
      coordinates: [-111.891, 40.7608], // Salt Lake City
    },
    githubUsername: "jackwilson",
  },
  {
    auth0Id: "y2z3a4b5-6c7d-8e9f-0g1h-2i3j4k5l6m7n",
    name: "Karen Moore",
    email: "karen.moore@yahoo.com",
    description: "Researcher in cognitive neuroscience.",
    profileCompleted: true,
    isResearcher: true,
    timezone: "EST",
    location: {
      type: "Point",
      coordinates: [-75.1652, 39.9526], // Philadelphia
    },
    researchProfile: "https://researchersprofile.com/users/KarenMoore",
  },
  {
    auth0Id: "c7d8e9f0-1g2h-3i4j-5k6l-7m8n9o0p1q2r",
    name: "Liam Martinez",
    email: "liam.martinez@gmail.com",
    description: "Ethical hacker and penetration tester.",
    profileCompleted: true,
    isHacker: true,
    timezone: "EST",
    location: {
      type: "Point",
      coordinates: [-80.1918, 25.7617], // Miami
    },
    previousHackathons: ["Miami Cyber Con 2023"],
    devpostProfile: "https://devpost.com/liammartinez",
  },
  {
    auth0Id: "e9f0g1h2-3i4j-5k6l-7m8n-9o0p1q2r3s4t",
    name: "Megan Harris",
    email: "megan.harris@outlook.com",
    description: "Cloud computing specialist with AWS expertise.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "CST",
    location: {
      type: "Point",
      coordinates: [-96.7969, 32.7767], // Dallas
    },
    githubUsername: "meganharris",
  },
  {
    auth0Id: "j4k5l6m7-8n9o-0p1q-2r3s-4t5u6v7w8x9y",
    name: "Olivia Adams",
    email: "olivia.adams@gmail.com",
    description: "Neuroscientist researching brain-computer interfaces.",
    profileCompleted: true,
    isResearcher: true,
    timezone: "MST",
    location: {
      type: "Point",
      coordinates: [-104.9903, 39.7392], // Denver
    },
    researchProfile: "https://researchersprofile.com/users/OliviaAdams",
  },
  {
    auth0Id: "l6m7n8o9-0p1q-2r3s-4t5u-6v7w8x9y0z1a",
    name: "Paul Collins",
    email: "paul.collins@outlook.com",
    description: "Developer specializing in cloud solutions.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "CST",
    location: {
      type: "Point",
      coordinates: [-93.265, 44.9778], // Minneapolis
    },
    githubUsername: "paulcollins",
  },
  {
    auth0Id: "n8o9p0q1-2r3s-4t5u-6v7w-8x9y0z1a2b3c",
    name: "Quinn Taylor",
    email: "quinn.taylor@yahoo.com",
    description: "Ethical hacker with expertise in application security.",
    profileCompleted: true,
    isHacker: true,
    timezone: "PST",
    location: {
      type: "Point",
      coordinates: [-122.3321, 47.6062], // Seattle
    },
    previousHackathons: ["Seattle Tech Con 2023"],
    devpostProfile: "https://devpost.com/quinntaylor",
  },
  {
    auth0Id: "p0q1r2s3-4t5u-6v7w-8x9y-0z1a2b3c4d5e",
    name: "Rebecca Edwards",
    email: "rebecca.edwards@gmail.com",
    description: "Researcher in environmental sciences.",
    profileCompleted: true,
    isResearcher: true,
    timezone: "CST",
    location: {
      type: "Point",
      coordinates: [-89.4012, 43.0731], // Madison
    },
    researchProfile: "https://researchersprofile.com/users/RebeccaEdwards",
  },
  {
    auth0Id: "r2s3t4u5-6v7w-8x9y-0z1a-2b3c4d5e6f7g",
    name: "Samuel Lee",
    email: "samuel.lee@outlook.com",
    description: "Back-end developer with experience in cloud platforms.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "EST",
    location: {
      type: "Point",
      coordinates: [-71.0589, 42.3601], // Boston
    },
    githubUsername: "samuellee",
  },
  {
    auth0Id: "t4u5v6w7-8x9y-0z1a-2b3c-4d5e6f7g8h9i",
    name: "Tina Roberts",
    email: "tina.roberts@yahoo.com",
    description: "Security analyst and ethical hacker.",
    profileCompleted: true,
    isHacker: true,
    timezone: "CST",
    location: {
      type: "Point",
      coordinates: [-86.7816, 36.1627], // Nashville
    },
    previousHackathons: ["Nashville Tech Meetup 2023"],
    devpostProfile: "https://devpost.com/tinaroberts",
  },
];

const AustraliaGlobe = [
  {
    auth0Id: "a1b2c3d4-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    name: "Ava Harris",
    email: "ava.harris@gmail.com",
    description: "Front-end developer with a passion for UX/UI design.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "AEST",
    location: {
      type: "Point",
      coordinates: [151.2093, -33.8688] // Sydney
    },
    githubUsername: "avaharris"
  },
  {
    auth0Id: "b3c4d5e6-7f8g-9h0i-1j2k-3l4m5n6o7p8q",
    name: "Benjamin Evans",
    email: "benjamin.evans@yahoo.com",
    description: "Researcher in renewable energy technologies.",
    profileCompleted: true,
    isResearcher: true,
    timezone: "ACST",
    location: {
      type: "Point",
      coordinates: [138.6007, -34.9285] // Adelaide
    },
    researchProfile: "https://researchersprofile.com/users/BenjaminEvans"
  },
  {
    auth0Id: "d5e6f7g8-9h0i-1j2k-3l4m-5n6o7p8q9r0s",
    name: "Charlotte Wood",
    email: "charlotte.wood@outlook.com",
    description: "Ethical hacker focused on web application security.",
    profileCompleted: true,
    isHacker: true,
    timezone: "AEST",
    location: {
      type: "Point",
      coordinates: [153.0281, -27.4679] // Brisbane
    },
    previousHackathons: ["Brisbane Cyber Challenge 2023"],
    devpostProfile: "https://devpost.com/charlottewood"
  },
  {
    auth0Id: "f7g8h9i0-1j2k-3l4m-5n6o-7p8q9r0s1t2u",
    name: "Daniel Scott",
    email: "daniel.scott@gmail.com",
    description: "Machine learning engineer with a focus on AI ethics.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "AEDT",
    location: {
      type: "Point",
      coordinates: [144.9631, -37.8136] // Melbourne
    },
    githubUsername: "danielscott"
  },
  {
    auth0Id: "h9i0j1k2-3l4m-5n6o-7p8q-9r0s1t2u3v4w",
    name: "Emily Brown",
    email: "emily.brown@yahoo.com",
    description: "Cybersecurity analyst specializing in threat detection.",
    profileCompleted: true,
    isHacker: true,
    timezone: "AWST",
    location: {
      type: "Point",
      coordinates: [115.8575, -31.9505] // Perth
    },
    previousHackathons: ["Perth Security Meetup 2023"],
    devpostProfile: "https://devpost.com/emilybrown"
  },
  {
    auth0Id: "j1k2l3m4-5n6o-7p8q-9r0s-1t2u3v4w5x6y",
    name: "Felix Lee",
    email: "felix.lee@outlook.com",
    description: "Researcher in marine biology and environmental science.",
    profileCompleted: true,
    isResearcher: true,
    timezone: "AEST",
    location: {
      type: "Point",
      coordinates: [145.7753, -16.9230] // Cairns
    },
    researchProfile: "https://researchersprofile.com/users/FelixLee"
  },
  {
    auth0Id: "l3m4n5o6-7p8q-9r0s-1t2u-3v4w5x6y7z8a",
    name: "Grace Wilson",
    email: "grace.wilson@gmail.com",
    description: "Back-end developer with expertise in cloud computing.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "AEDT",
    location: {
      type: "Point",
      coordinates: [150.8928, -34.4278] // Wollongong
    },
    githubUsername: "gracewilson"
  },
  {
    auth0Id: "n5o6p7q8-9r0s-1t2u-3v4w-5x6y7z8a9b0c",
    name: "Henry Green",
    email: "henry.green@yahoo.com",
    description: "Hacker with a focus on blockchain security.",
    profileCompleted: true,
    isHacker: true,
    timezone: "ACST",
    location: {
      type: "Point",
      coordinates: [130.8456, -12.4634] // Darwin
    },
    previousHackathons: ["Darwin Tech Fest 2023"],
    devpostProfile: "https://devpost.com/henrygreen"
  },
  {
    auth0Id: "p7q8r9s0-1t2u-3v4w-5x6y-7z8a9b0c1d2e",
    name: "Isla Martin",
    email: "isla.martin@gmail.com",
    description: "AI researcher working on autonomous systems.",
    profileCompleted: true,
    isResearcher: true,
    timezone: "AEDT",
    location: {
      type: "Point",
      coordinates: [149.1300, -35.2809] // Canberra
    },
    researchProfile: "https://researchersprofile.com/users/IslaMartin"
  },
  {
    auth0Id: "r9s0t1u2-3v4w-5x6y-7z8a-9b0c1d2e3f4g",
    name: "Jack Turner",
    email: "jack.turner@outlook.com",
    description: "Full-stack developer passionate about scalable web apps.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "AEST",
    location: {
      type: "Point",
      coordinates: [147.3230, -42.8821] // Hobart
    },
    githubUsername: "jackturner"
  }
];

const AfricaGlobe = [
  {
    auth0Id: "x1y2z3a4-5b6c-7d8e-9f0g-1h2i3j4k5l6m",
    name: "Amina Mohammed",
    email: "amina.mohammed@gmail.com",
    description: "Developer specializing in mobile applications.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "EAT",
    location: {
      type: "Point",
      coordinates: [36.8219, -1.2921] // Nairobi
    },
    githubUsername: "aminamohammed"
  },
  {
    auth0Id: "b3c4d5e6-7f8g-9h0i-1j2k-3l4m5n6o7p8qs",
    name: "Bakary Traore",
    email: "bakary.traore@yahoo.com",
    description: "Researcher in renewable energy systems.",
    profileCompleted: true,
    isResearcher: true,
    timezone: "GMT",
    location: {
      type: "Point",
      coordinates: [-0.1850, 5.6037] // Accra
    },
    researchProfile: "https://researchersprofile.com/users/BakaryTraore"
  },
  {
    auth0Id: "c7d8e9f0-1h2i-3j4k-5l6m-7n8o9p0q1r2s",
    name: "Chinwe Okafor",
    email: "chinwe.okafor@outlook.com",
    description: "Ethical hacker focused on network security.",
    profileCompleted: true,
    isHacker: true,
    timezone: "WAT",
    location: {
      type: "Point",
      coordinates: [3.3792, 6.5244] // Lagos
    },
    previousHackathons: ["Lagos Security Fest 2023"],
    devpostProfile: "https://devpost.com/chinweokafor"
  },
  {
    auth0Id: "e9f0g1h2-3j4k-5l6m-7n8o-9p0q1r2s3t4u",
    name: "David Mbeki",
    email: "david.mbeki@gmail.com",
    description: "Machine learning engineer with a focus on agriculture.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "SAST",
    location: {
      type: "Point",
      coordinates: [28.0473, -26.2041] // Johannesburg
    },
    githubUsername: "davidmbeki"
  },
  {
    auth0Id: "g1h2i3j4-5k6l-7m8n-9o0p-1q2r3s4t5u6v",
    name: "Fatima Said",
    email: "fatima.said@yahoo.com",
    description: "Researcher in climate change and sustainability.",
    profileCompleted: true,
    isResearcher: true,
    timezone: "EAT",
    location: {
      type: "Point",
      coordinates: [31.0461, -29.8587] // Durban
    },
    researchProfile: "https://researchersprofile.com/users/FatimaSaid"
  },
  {
    auth0Id: "i3j4k5l6-7m8n-9o0p-1q2r-3s4t5u6v7w8x",
    name: "John Mkandawire",
    email: "john.mkandawire@outlook.com",
    description: "Back-end developer with expertise in cloud services.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "CAT",
    location: {
      type: "Point",
      coordinates: [33.7875, -13.9626] // Lilongwe
    },
    githubUsername: "johnmkandawire"
  },
  {
    auth0Id: "k5l6m7n8-9o0p-1q2r-3s4t-5u6v7w8x9y0z",
    name: "Lina Gebremariam",
    email: "lina.gebremariam@gmail.com",
    description: "Hacker focused on web application security.",
    profileCompleted: true,
    isHacker: true,
    timezone: "EAT",
    location: {
      type: "Point",
      coordinates: [38.7468, 9.0054] // Addis Ababa
    },
    previousHackathons: ["Addis Ababa Hackathon 2023"],
    devpostProfile: "https://devpost.com/linagebremariam"
  },
  {
    auth0Id: "m7n8o9p0-1q2r-3s4t-5u6v-7w8x9y0z1a2b",
    name: "Mohamed Salah",
    email: "mohamed.salah@yahoo.com",
    description: "AI researcher working on language processing.",
    profileCompleted: true,
    isResearcher: true,
    timezone: "EET",
    location: {
      type: "Point",
      coordinates: [31.2357, 30.0444] // Cairo
    },
    researchProfile: "https://researchersprofile.com/users/MohamedSalah"
  },
  {
    auth0Id: "o9p0q1r2-3s4t-5u6v-7w8x-9y0z1a2b3c4d",
    name: "Nia Tshabalala",
    email: "nia.tshabalala@gmail.com",
    description: "Full-stack developer passionate about fintech.",
    profileCompleted: true,
    isDeveloper: true,
    timezone: "SAST",
    location: {
      type: "Point",
      coordinates: [25.7479, -28.2293] // Bloemfontein
    },
    githubUsername: "niatshabalala"
  },
  {
    auth0Id: "q1r2s3t4-5u6v-7w8x-9y0z-1a2b3c4d5e6f",
    name: "Sara Mwana",
    email: "sara.mwana@outlook.com",
    description: "Hacker specializing in social engineering techniques.",
    profileCompleted: true,
    isHacker: true,
    timezone: "CAT",
    location: {
      type: "Point",
      coordinates: [30.9873, -17.8292] // Harare
    },
    previousHackathons: ["Harare Cyber Expo 2023"],
    devpostProfile: "https://devpost.com/saramwana"
  }
];

const insertUsers = async (users) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await User.insertMany(users);
    console.log("Users inserted successfully");
  } catch (error) {
    console.error("Error inserting users:", error);
  } finally {
    mongoose.connection.close();
  }
};

// insertUsers(AfricaGlobe);

const viewUsers = (users) => {
  for (let i = 0; i < users.length; i++) {
    const [longitude, latitude] = users[i].location.coordinates;
    console.log(`${latitude.toFixed(5)},${longitude.toFixed(5)},`);
  }
};

viewUsers(USAGlobe);
