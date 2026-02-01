import { MongoClient } from 'mongodb';

const MONGO_URI = "mongodb+srv://mihwardigital_db_user:SPXczxaDk9J7aJur@erp.insjobb.mongodb.net/";

async function findDatabase() {
    console.log('🔗 Connecting to MongoDB Atlas...');
    const client = new MongoClient(MONGO_URI);
    
    try {
        await client.connect();
        console.log('✅ Connected successfully!\n');
        
        // Get list of all databases
        const adminDb = client.db().admin();
        const dbList = await adminDb.listDatabases();
        
        console.log('📋 All Databases found:');
        console.log('='.repeat(50));
        
        dbList.databases.forEach(db => {
            console.log(`📁 ${db.name} (Size: ${(db.sizeOnDisk/1024/1024).toFixed(2)} MB)`);
        });
        
        console.log('\n🔍 Checking each database for collections...');
        console.log('='.repeat(50));
        
        // Check each database for collections
        for (const dbInfo of dbList.databases) {
            const db = client.db(dbInfo.name);
            const collections = await db.listCollections().toArray();
            
            if (collections.length > 0) {
                console.log(`\n📁 Database: ${dbInfo.name}`);
                console.log(`   📊 Collections: ${collections.length}`);
                collections.forEach(col => {
                    console.log(`      • ${col.name}`);
                });
            }
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await client.close();
        console.log('\n🔒 Connection closed.');
        process.exit(0);
    }
}

findDatabase();