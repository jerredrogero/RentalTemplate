const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

async function createAdmin() {
  try {
    await mongoose.connect('mongodb://admin:PASSWORD@localhost:27017/movinin?authSource=admin&appName=movinin');
    console.log('Connected to MongoDB');
    
    // Use a more complete schema to avoid null values
    const userSchema = new mongoose.Schema({
      email: { type: String, required: true },
      password: { type: String, required: true },
      fullName: { type: String, required: true },
      type: { type: String, required: true },
      active: { type: Boolean, required: true },
      verified: { type: Boolean, required: true },
      blacklisted: { type: Boolean, required: true },
      language: { type: String, required: true }
    });
    
    // Use a randomly generated collection name to avoid conflicts
    const User = mongoose.model('TempUser2', userSchema, 'User');
    
    // Original credentials from the documentation
    const email = 'admin@movinin.io';
    const password = 'M00vinin';
    
    // First check if an admin already exists
    const existingAdmin = await User.findOne({ email });
    
    if (existingAdmin) {
      console.log('Original admin user already exists, updating password...');
      
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      
      existingAdmin.password = passwordHash;
      existingAdmin.type = 'ADMIN';
      existingAdmin.active = true;
      existingAdmin.verified = true;
      await existingAdmin.save();
      
      console.log('Original admin password updated successfully');
    } else {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      
      const adminUser = new User({
        email,
        password: passwordHash,
        fullName: 'Admin',
        type: 'ADMIN',
        active: true,
        verified: true,
        blacklisted: false,
        language: 'en'
      });
      
      await adminUser.save();
      console.log('Original admin user created successfully');
    }
    
    console.log('\nLogin credentials:');
    console.log('Email:', email);
    console.log('Password:', password);
    
    // Print out all users
    const allUsers = await User.find({});
    console.log('\nAll users in database:');
    allUsers.forEach(user => {
      console.log(`- ${user.email || 'undefined'} (${user.type || 'undefined'})`);
    });
    
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Error with admin user:', err);
  }
}

createAdmin(); 