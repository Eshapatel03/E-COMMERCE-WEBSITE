const { MongoClient } = require('mongodb');

async function updateUsers() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('ecommerce');
    const users = database.collection('users');

    // Find all users without email field
    const cursor = users.find({ email: { $exists: false } });

    while (await cursor.hasNext()) {
      const user = await cursor.next();

      // For demo, set email as username@example.com
      const email = user.username + '@example.com';

      // Update user document with email field
      await users.updateOne(
        { _id: user._id },
        { $set: { email: email } }
      );

      console.log(`Updated user ${user.username} with email ${email}`);
    }

    console.log('User email update completed.');
  } catch (err) {
    console.error('Error updating users:', err);
  } finally {
    await client.close();
  }
}

updateUsers();
