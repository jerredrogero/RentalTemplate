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
    const User = mongoose.model('TempUser', userSchema, 'User');
    
    // First check if an admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@test.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists, updating password...');
      
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('admin123', salt);
      
      existingAdmin.password = passwordHash;
      await existingAdmin.save();
      
      console.log('Admin password updated successfully');
    } else {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('admin123', salt);
      
      const adminUser = new User({
        email: 'admin@test.com',
        password: passwordHash,
        fullName: 'Admin User',
        type: 'ADMIN',
        active: true,
        verified: true,
        blacklisted: false,
        language: 'en'
      });
      
      await adminUser.save();
      console.log('Admin user created successfully');
    }
    
    console.log('Email: admin@test.com');
    console.log('Password: admin123');
    
    // Print out all users
    const allUsers = await User.find({});
    console.log('\nAll users:');
    allUsers.forEach(user => {
      console.log(`- ${user.email} (${user.type})`);
    });
    
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Error creating admin user:', err);
  }
}

createAdmin(); 