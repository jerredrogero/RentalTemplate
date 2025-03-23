const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

async function verifyCredentials() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect('mongodb://admin:PASSWORD@localhost:27017/movinin?authSource=admin&appName=movinin');
    console.log('Connected to MongoDB');

    // Define User schema
    const userSchema = new mongoose.Schema({
      email: String,
      password: String,
      fullName: String,
      type: String,
      active: Boolean,
      verified: Boolean
    });

    // Create model
    const User = mongoose.model('User', userSchema);

    // Check admin user
    const email = 'jrogero578@gmail.com';
    const password = 'Admin';
    
    console.log(`Checking user with email: ${email}`);
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('User not found');
      return;
    }
    
    console.log('User found:');
    console.log(`- Email: ${user.email}`);
    console.log(`- Type: ${user.type}`);
    console.log(`- Active: ${user.active}`);
    console.log(`- Verified: ${user.verified}`);
    
    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(`Password match: ${passwordMatch}`);
    
    // List all users in the database
    console.log('\nAll users in database:');
    const allUsers = await User.find({});
    allUsers.forEach(u => {
      console.log(`- ${u.email} (${u.type})`);
    });
    
  } catch (err) {
    console.error('Error verifying credentials:', err);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

verifyCredentials(); 