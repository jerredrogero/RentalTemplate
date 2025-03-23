// Script to create a fresh admin user with a very simple password
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

async function createNewAdmin() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect('mongodb://admin:PASSWORD@localhost:27017/movinin?authSource=admin&appName=movinin');
    console.log('Connected to MongoDB');

    // Define User schema
    const userSchema = new mongoose.Schema({});

    // Create model using existing collection
    const User = mongoose.model('User', userSchema, 'User');

    // Simple admin credentials
    const email = 'admin@example.com';
    const password = '123456';
    
    console.log(`Creating new admin user: ${email}`);
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('Admin already exists, updating...');
      
      // Generate new password hash
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      
      // Update user
      await User.updateOne(
        { _id: existingAdmin._id },
        {
          $set: {
            password: passwordHash,
            type: 'ADMIN',
            active: true,
            verified: true,
            blacklisted: false
          }
        }
      );
      console.log('Admin updated with new password');
    } else {
      // Create new admin
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      
      const newAdmin = new User({
        email,
        password: passwordHash,
        fullName: 'Admin',
        type: 'ADMIN',
        active: true,
        verified: true,
        blacklisted: false,
        language: 'en'
      });
      
      await newAdmin.save();
      console.log('New admin created');
    }
    
    console.log('\nLogin with:');
    console.log('Email:', email);
    console.log('Password:', password);
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

createNewAdmin(); 