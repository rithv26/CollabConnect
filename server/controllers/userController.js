const User = require('../models/User');

// Initialize empty user with auth0id
const addUser = async (req, res) => {
  try {
    const { auth0Id } = req.body;

    // Check if user already exists
    let user = await User.findOne({ auth0Id });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    user = await User.create({ auth0Id });
    res.status(201).json({ message: 'User created successfully', user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by Auth0 ID
const getUserByAuth0Id = async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.params.auth0Id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user by Auth0 ID
const updateUserByAuth0Id = async (req, res) => {
  try {
    const { auth0Id } = req.params;
    const updateData = req.body;

    // Find the user by auth0Id and update their information
    const user = await User.findOneAndUpdate({ auth0Id }, updateData, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Define a standard distance in miles
const STANDARD_DISTANCE = 50;
const searchUsersByLocation = async (req, res) => {
  try {
    const { latitude, longitude, isHacker, isDeveloper, isResearcher, remote } = req.query;

    if (!remote && (!latitude || !longitude || latitude === 'null' || longitude === 'null')) {
      console.log('Returning early with empty array due to missing location.');
      return res.json([]);
    }
    
    // Convert latitude and longitude to numbers
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    // Construct the query
    let query = (!remote) ? {
      location: {
        $geoWithin: {
          $centerSphere: [[lon, lat], STANDARD_DISTANCE / 3963.2] // Convert miles to radians
        }
      }
    } : {};

    // Apply role filters
    if (!isHacker) query.isHacker = false;
    if (!isDeveloper) query.isDeveloper = false;
    if (!isResearcher) query.isResearcher = false;

    const users = await User.find(query);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all remote users with optional filters
const searchRemoteUsers = async (req, res) => {
  try {
    const { isHacker, isDeveloper, isResearcher } = req.query;

    // Construct the query
    let query = {};

    // Apply role filters
    if (isHacker) query.isHacker = isHacker === 'true';
    if (isDeveloper) query.isDeveloper = isDeveloper === 'true';
    if (isResearcher) query.isResearcher = isResearcher === 'true';

    const users = await User.find(query);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUserLocations = async (req, res) => {
  try {
    const users = await User.find({ profileCompleted: true }, 'location.coordinates');
    const locations = users.map(user => {
      const [longitude, latitude] = user.location.coordinates;
      return { latitude, longitude };
    });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addUser,
  getUserByAuth0Id,
  updateUserByAuth0Id,
  searchUsersByLocation,
  searchRemoteUsers,
  getAllUserLocations,
};