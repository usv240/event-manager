require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Event = require('../models/event');

const events = [
  {
    category: "Hiking & Trekking",
    title: "Sunrise Hike at Mountain Peak",
    host: "Adventure Club",
    start: new Date("2025-03-10T06:00"),
    end: new Date("2025-03-10T10:00"),
    details: "A breathtaking morning hike to witness the sunrise.",
    image: "/images/hiking-logo.jpg"
  },
  {
    category: "Hiking & Trekking",
    title: "Weekend Trek to the Forest Falls",
    host: "Nature Explorers",
    start: new Date("2025-04-15T07:00"),
    end: new Date("2025-04-15T12:00"),
    details: "A weekend getaway trekking to the Forest Falls.",
    image: "/images/weekendtrek.jpg"
  },
  {
    category: "Hiking & Trekking",
    title: "Family Nature Walk",
    host: "Outdoor Fun Club",
    start: new Date("2025-04-20T08:00"),
    end: new Date("2025-04-20T10:00"),
    details: "A relaxing nature walk perfect for families with kids.",
    image: "/images/familynaturewalk.jpg"
  },
  {
    category: "Water Sports",
    title: "Kayak Adventure in the River",
    host: "Outdoor Club",
    start: new Date("2025-03-15T09:00"),
    end: new Date("2025-03-15T11:00"),
    details: "Paddle through scenic river routes, perfect for beginners.",
    image: "/images/kayak-image.jpg"
  },
  {
    category: "Water Sports",
    title: "Surfing Lessons at Sunset Beach",
    host: "Wave Riders",
    start: new Date("2025-03-22T10:00"),
    end: new Date("2025-03-22T12:00"),
    details: "Learn how to surf with professional instructors at Sunset Beach.",
    image: "/images/surfing.jpg"
  },
  {
    category: "Water Sports",
    title: "Swimming Challenge: 1 Mile Open Water Swim",
    host: "Swim Masters Club",
    start: new Date("2025-03-28T07:30"),
    end: new Date("2025-03-28T09:00"),
    details: "A competitive 1-mile open water swim for all skill levels.",
    image: "/images/swimming.png"
  },
  {
    category: "Running Events",
    title: "5k Charity Run for Cancer Research",
    host: "City Runners",
    start: new Date("2025-03-12T07:00"),
    end: new Date("2025-03-12T09:00"),
    details: "A charity run event to raise awareness.",
    image: "/images/charityrun.png"
  },
  {
    category: "Running Events",
    title: "Trail Run: 10k Adventure Race",
    host: "Trail Warriors",
    start: new Date("2025-03-18T06:30"),
    end: new Date("2025-03-18T09:30"),
    details: "A challenging 10k trail run.",
    image: "/images/trailrun.png"
  },
  {
    category: "Running Events",
    title: "Half Marathon: Coastal Run",
    host: "Marathoners Club",
    start: new Date("2025-03-28T06:00"),
    end: new Date("2025-03-28T10:00"),
    details: "A scenic coastal half-marathon.",
    image: "/images/marathon.png"
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    await Event.deleteMany({});
    await Event.insertMany(events);
    console.log("🌱 Seeded database with events");
    mongoose.connection.close();
  })
  .catch(err => console.error("Error seeding database:", err));
