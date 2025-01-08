import { getDB } from '../db/connection'

const reportPreferenceSchema = {
    validator : {
        $jsonschema: {
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

const reportPreferenceCollection = async() => {
    const db = getDB();
    await db.createCollection('ReportPreference',reportPreferenceSchema);
    await db.collection('ReportPreference').createIndex({ Id: 1 }, {unique: true });

    return db.collection('ReportPreference');
};

  
  export default reportPreferenceCollection;