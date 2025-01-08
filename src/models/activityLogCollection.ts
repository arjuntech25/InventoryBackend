import { getDB } from '../db/connection'

const activityLogSchema = {
    validator : {
        $jsonSchema: {
            bsonType: 'object',
            required: ['Id', 'CollectionName', 'KeyValue','FieldName','OldValue','NewValue','CreatedOn','CreatedBy','ModifiedOn','ModifiedBy'],
            properties: {
                Id: { bsonType: 'string',uniqueItems: true },
                CollectionName: { bsonType: 'string' },
                KeyValue: { bsonType: 'string' },
                FieldName: { bsonType: 'string' },
                OldValue: { bsonType: 'string' },
                NewValue: { bsonType: 'string' },
                CreatedOn: { bsonType: 'date' },
                CreatedBy: { bsonType: 'string' },
                ModifiedOn: { bsonType: 'date' },
                ModifiedBy: { bsonType: 'string' }
            }
        }
    },
    validationLevel: 'strict',
    validationAction: 'error'
};

const activityLogCollection = async() => {
    const db = getDB();
    await db.createCollection('ActivityLog',activityLogSchema);
    await db.collection('ActivityLog').createIndex({ Id: 1 }, {unique: true });

    return db.collection('ActivityLog');
};




/* const activityLogCollection = async () => {
    const db = getDB();
  
    try {
      // Check if the collection already exists
      const collections = await db.listCollections({ name: 'ActivityLog' }).toArray();
      if (collections.length === 0) {
        // Create the collection if it doesn't exist
        await db.createCollection('ActivityLog', activityLogSchema);
      }
  
      // Ensure the unique index on Id exists
      await db.collection('ActivityLog').createIndex({ Id: 1 }, { unique: true });
  
      // Return the collection instance
      return db.collection('ActivityLog');
    } catch (error) {
      console.error('Error setting up ActivityLog collection:', error);
      throw error; // Re-throw the error to handle it upstream
    }
  }; */
  
  export default activityLogCollection;