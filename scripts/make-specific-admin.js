// Script to set a specific user as an admin
const { MongoClient } = require('mongodb');

// Connection URI from your configuration
const uri = "mongodb+srv://GameSpaceDev:GameSpaceDev1234@gamespacecluster.79wzx7g.mongodb.net/GameSpaceDB";
const dbName = "GameSpaceDB";
const adminEmail = "shais@example.com";

// Minimal connection options
const options = {
  serverSelectionTimeoutMS: 5000
};

async function setSpecificAdmin() {
  console.log(`Starting admin setup for ${adminEmail}...`);
  
  let client;
  try {
    // Connect to the MongoDB server
    client = new MongoClient(uri, options);
    await client.connect();
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Get database reference
    const db = client.db(dbName);
    
    // Find the user by email
    const user = await db.collection("Users").findOne({ email: adminEmail });
    
    if (!user) {
      console.log(`❌ User with email ${adminEmail} not found. Creating user first...`);
      
      // Create user with admin privileges
      const bcrypt = require('bcrypt');
      const hashedPassword = await bcrypt.hash("admin123", 10); // Default password
      
      const result = await db.collection("Users").insertOne({
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true,
        createdAt: new Date()
      });
      
      if (result.insertedId) {
        console.log(`✅ Successfully created admin user ${adminEmail}`);
        return true;
      } else {
        console.log('❌ Failed to create admin user.');
        return false;
      }
    }
    
    // Update the user to have admin privileges
    const updateResult = await db.collection("Users").updateOne(
      { email: adminEmail },
      { $set: { isAdmin: true } }
    );
    
    if (updateResult.modifiedCount === 1) {
      console.log(`✅ Successfully set ${adminEmail} as admin!`);
      return true;
    } else if (updateResult.matchedCount === 1 && updateResult.modifiedCount === 0) {
      console.log(`ℹ️ User ${adminEmail} is already an admin.`);
      return true;
    } else {
      console.log('❌ Failed to update user as admin.');
      return false;
    }
  } catch (error) {
    console.error('❌ Error connecting to MongoDB or setting admin:', error);
    return false;
  } finally {
    // Close the connection
    if (client) {
      await client.close();
      console.log('Connection closed.');
    }
  }
}

// Run the script
setSpecificAdmin()
  .then(success => {
    if (success) {
      console.log('\nAdmin setup completed successfully!');
    } else {
      console.log('\nAdmin setup failed!');
    }
    process.exit(0);
  })
  .catch(err => {
    console.error('Unexpected error during setup:', err);
    process.exit(1);
  }); 