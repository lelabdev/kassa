/**
 * PouchDB initialization and configuration for Kassa
 * Handles database setup, indexes, and cleanup
 */

import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import type { AnyDoc } from '$lib/types/database';

// Add the find plugin for Mango queries
PouchDB.plugin(PouchDBFind);

/**
 * Database name - uses 'kassa' in browser (stored in IndexedDB)
 */
const DB_NAME = 'kassa';

/**
 * Initialize and configure PouchDB instance
 * Creates indexes for efficient querying by document type
 */
async function initializeDatabase(): Promise<PouchDB.Database<AnyDoc>> {
	// Create or open the database
	const db = new PouchDB<AnyDoc>(DB_NAME);

	// Create indexes for efficient querying
	// Index by document type (for filtering clients, products, orders)
	await db.createIndex({
		index: {
			fields: ['type']
		}
	});

	// Index by document type and creation date
	await db.createIndex({
		index: {
			fields: ['type', 'createdAt']
		}
	});

	// Index by clientId (for finding orders by client)
	await db.createIndex({
		index: {
			fields: ['clientId']
		}
	});

	// Index by status (for finding orders by status)
	await db.createIndex({
		index: {
			fields: ['status']
		}
	});

	return db;
}

/**
 * Singleton instance of the database
 * Initialized once and reused throughout the app
 */
let dbInstance: PouchDB.Database<AnyDoc> | null = null;

/**
 * Get or initialize the database instance
 * Ensures only one database connection is used
 * @returns The PouchDB database instance
 */
async function getDatabase(): Promise<PouchDB.Database<AnyDoc>> {
	if (!dbInstance) {
		dbInstance = await initializeDatabase();
	}
	return dbInstance;
}

/**
 * Close the database connection
 * Should be called during app shutdown or cleanup
 */
async function closeDatabase(): Promise<void> {
	if (dbInstance) {
		await dbInstance.close();
		dbInstance = null;
	}
}

/**
 * Clear all data from the database
 * WARNING: This is destructive and should only be used for testing/development
 */
async function clearDatabase(): Promise<void> {
	const db = await getDatabase();
	await db.destroy();
	dbInstance = null;
}

export { getDatabase, closeDatabase, clearDatabase, initializeDatabase, DB_NAME };
