import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || 'dumpy'

if (!uri) {
  // we won't throw here so dev build doesn't crash; callers should handle missing URI
  console.warn('MONGODB_URI not set: MongoDB calls will fail until you set the environment variable')
}

let cachedClient: MongoClient | null = null

async function getClient(): Promise<MongoClient> {
  if (!uri) throw new Error('MONGODB_URI not set')
  if (cachedClient) return cachedClient
  const client = new MongoClient(uri)
  await client.connect()
  cachedClient = client
  return client
}

export async function getHackathonsFromDb(): Promise<any[]> {
  try {
    const client = await getClient()
    const db = client.db(dbName)
    const coll = db.collection('hackathons')
    // fetch latest 200 by default, adapt as needed
    const docs = await coll.find({}).sort({ startDate: 1 }).limit(200).toArray()
    return docs
  } catch (err) {
    console.error('getHackathonsFromDb error:', err)
    return []
  }
}

export async function closeClient(): Promise<void> {
  if (cachedClient) {
    await cachedClient.close()
    cachedClient = null
  }
}
