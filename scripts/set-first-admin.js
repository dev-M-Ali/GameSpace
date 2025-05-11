// Script to set the first user as an admin
const { MongoClient } = require('mongodb');

// Connection URI from your configuration
const uri = "mongodb+srv://GameSpaceDev:GameSpaceDev1234@gamespacecluster.79wzx7g.mongodb.net/GameSpaceDB";
const dbName = "GameSpaceDB";

// Minimal connection options
const options = {
  serverSelectionTimeoutMS: 5000
};

async function setFirstAdmin() {
  console.log('Starting first admin setup...');
  
  let client;
  try {
    // Connect to the MongoDB server
    client = new MongoClient(uri, options);
    await client.connect();
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Get database reference
    const db = client.db(dbName);
    
    // Find the first user in the collection
    const firstUser = await db.collection("Users").findOne({}, { sort: { _id: 1 } });
    
    if (!firstUser) {
      console.log('❌ No users found in the database. Please create a user first.');
      return false;
    }
    
    console.log(`Found first user: ${firstUser.email}`);
    
    // Update the user to have admin privileges
    const updateResult = await db.collection("Users").updateOne(
      { _id: firstUser._id },
      { $set: { isAdmin: true } }
    );
    
    if (updateResult.modifiedCount === 1) {
      console.log(`✅ Successfully set ${firstUser.email} as admin!`);
      return true;
    } else if (updateResult.matchedCount === 1 && updateResult.modifiedCount === 0) {
      console.log(`ℹ️ User ${firstUser.email} is already an admin.`);
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
setFirstAdmin()
  .then(success => {
    if (success) {
      console.log('\nFirst admin setup completed successfully!');
    } else {
      console.log('\nFirst admin setup failed!');
    }
    process.exit(0);
  })
  .catch(err => {
    console.error('Unexpected error during setup:', err);
    process.exit(1);
  }); 