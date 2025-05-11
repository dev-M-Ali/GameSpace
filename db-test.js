// Test script to verify MongoDB connection
const { MongoClient } = require('mongodb');

// Simplified connection URI
const uri = "mongodb+srv://GameSpaceDev:GameSpaceDev1234@gamespacecluster.79wzx7g.mongodb.net/GameSpaceDB";
const dbName = "GameSpaceDB";

// Minimal connection options
const options = {
  serverSelectionTimeoutMS: 5000
};

async function testConnection() {
  console.log('Attempting to connect to MongoDB...');
  
  let client;
  try {
    // Connect to the MongoDB server
    client = new MongoClient(uri, options);
    await client.connect();
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Verify database access
    const db = client.db(dbName);
    console.log(`✅ Successfully accessed the "${dbName}" database!`);
    
    // List all collections in the database
    const collections = await db.listCollections().toArray();
    console.log('Collections in the database:');
    if (collections.length === 0) {
      console.log('   No collections found. Database may be empty.');
    } else {
      collections.forEach(collection => {
        console.log(`   - ${collection.name}`);
      });
    }
    
    // Check if Users collection exists and count documents
    const usersCollection = db.collection("Users");
    const userCount = await usersCollection.countDocuments();
    console.log(`Users collection has ${userCount} document(s)`);
    
    if (userCount > 0) {
      // Show sample user (without password)
      const sampleUser = await usersCollection.findOne({}, { projection: { password: 0 } });
      console.log('Sample user:', sampleUser);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    return false;
  } finally {
    // Close the connection
    if (client) {
      await client.close();
      console.log('Connection closed.');
    }
  }
}

// Run the test
testConnection()
  .then(success => {
    if (success) {
      console.log('\nDatabase connection test completed successfully!');
    } else {
      console.log('\nDatabase connection test failed!');
    }
  })
  .catch(err => {
    console.error('Unexpected error during test:', err);
  }); 