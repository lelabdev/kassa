/**
 * Tests for PouchDB initialization and basic operations
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { initializeDatabase, clearDatabase, DB_NAME } from './database';
import type { ClientDoc } from '$lib/types/database';

describe('PouchDB Database', () => {
	let db: PouchDB.Database;

	beforeEach(async () => {
		// Initialize fresh database for each test
		db = await initializeDatabase();
	});

	afterEach(async () => {
		// Clean up after each test
		try {
			await clearDatabase();
		} catch {
			// Already destroyed
		}
	});

	it('should initialize database successfully', async () => {
		expect(db).toBeDefined();
		expect(db.name).toBe(DB_NAME);
	});

	it('should create and retrieve a client document', async () => {
		const clientData: ClientDoc = {
			id: 'client-1',
			name: 'John Doe',
			email: 'john@example.com',
			phone: '123456789',
			type: 'client',
			createdAt: Date.now(),
			updatedAt: Date.now()
		};

		// Create document
		const result = await db.put({ _id: clientData.id, ...clientData });
		expect(result.ok).toBe(true);

		// Retrieve document
		const retrieved = await db.get<ClientDoc>(clientData.id);
		expect(retrieved.id).toBe(clientData.id);
		expect(retrieved.name).toBe(clientData.name);
		expect(retrieved.email).toBe(clientData.email);
		expect(retrieved.type).toBe('client');
	});

	it('should persist data across database instances', async () => {
		const clientData: ClientDoc = {
			id: 'persistent-client',
			name: 'Jane Smith',
			type: 'client',
			createdAt: Date.now(),
			updatedAt: Date.now()
		};

		// Save to first instance
		await db.put({ _id: clientData.id, ...clientData });

		// Simulate closing and reopening (new instance)
		const newDb = await initializeDatabase();
		const retrieved = await newDb.get<ClientDoc>(clientData.id);

		expect(retrieved.name).toBe(clientData.name);
		expect(retrieved.type).toBe('client');

		await newDb.close();
	});

	it('should create indexes for efficient querying', async () => {
		const indexes = await db.getIndexes();
		expect(indexes).toBeDefined();
		expect(indexes.indexes.length).toBeGreaterThan(0);

		// At minimum, the default index should exist
		expect(indexes.indexes.length).toBeGreaterThanOrEqual(1);
	});

	it('should query documents by type using mango query', async () => {
		// Create multiple documents
		const client1: ClientDoc = {
			id: 'client-1',
			name: 'Client 1',
			type: 'client',
			createdAt: Date.now(),
			updatedAt: Date.now()
		};

		const client2: ClientDoc = {
			id: 'client-2',
			name: 'Client 2',
			type: 'client',
			createdAt: Date.now(),
			updatedAt: Date.now()
		};

		await db.put({ _id: client1.id, ...client1 });
		await db.put({ _id: client2.id, ...client2 });

		// Query by type
		const result = await db.find({
			selector: { type: 'client' }
		});

		expect(result.docs).toHaveLength(2);
		expect(result.docs[0]).toHaveProperty('name');
	});

	it('should handle document updates with revisions', async () => {
		const clientData: ClientDoc = {
			id: 'update-test',
			name: 'Original Name',
			type: 'client',
			createdAt: Date.now(),
			updatedAt: Date.now()
		};

		// Create
		const createResult = await db.put({ _id: clientData.id, ...clientData });
		expect(createResult.ok).toBe(true);

		// Update
		const doc = await db.get<ClientDoc>(clientData.id);
		const updated = { ...doc, name: 'Updated Name' };
		const updateResult = await db.put(updated);
		expect(updateResult.ok).toBe(true);
		expect(updateResult.rev).not.toBe(createResult.rev);

		// Verify update
		const retrieved = await db.get<ClientDoc>(clientData.id);
		expect(retrieved.name).toBe('Updated Name');
	});

	it('should handle document deletion', async () => {
		const clientData: ClientDoc = {
			id: 'delete-test',
			name: 'To Delete',
			type: 'client',
			createdAt: Date.now(),
			updatedAt: Date.now()
		};

		// Create
		await db.put({ _id: clientData.id, ...clientData });

		// Delete
		const doc = await db.get<ClientDoc>(clientData.id);
		const result = await db.remove(doc);
		expect(result.ok).toBe(true);

		// Verify deletion
		try {
			await db.get<ClientDoc>(clientData.id);
			expect.fail('Document should have been deleted');
		} catch (error) {
			const err = error as { status?: number };
			expect(err.status).toBe(404);
		}
	});
});
