/**
 * PouchDB Document types for Kassa
 * Extends business types with PouchDB-specific fields (_id, _rev)
 */

import type { Client, Product, Order } from './business';

/**
 * PouchDB document for Client
 * Extends the base Client interface with PouchDB fields
 */
interface ClientDoc extends Client {
	/** PouchDB document ID (required) */
	_id?: string;
	/** PouchDB revision marker (managed by PouchDB) */
	_rev?: string;
	/** Document type for querying (always 'client') */
	type: 'client';
	/** Timestamp when the client was created */
	createdAt: number;
	/** Timestamp when the client was last updated */
	updatedAt: number;
}

/**
 * PouchDB document for Product
 * Extends the base Product interface with PouchDB fields
 */
interface ProductDoc extends Product {
	/** PouchDB document ID (required) */
	_id?: string;
	/** PouchDB revision marker (managed by PouchDB) */
	_rev?: string;
	/** Document type for querying (always 'product') */
	type: 'product';
	/** Timestamp when the product was created */
	createdAt: number;
	/** Timestamp when the product was last updated */
	updatedAt: number;
}

/**
 * PouchDB document for Order
 * Extends the base Order interface with PouchDB fields
 */
interface OrderDoc extends Order {
	/** PouchDB document ID (required) */
	_id?: string;
	/** PouchDB revision marker (managed by PouchDB) */
	_rev?: string;
	/** Document type for querying (always 'order') */
	type: 'order';
	/** Timestamp when the order was completed/finalized */
	completedAt?: number;
	/** Timestamp when the order was last updated */
	updatedAt: number;
}

/**
 * Union type for all PouchDB documents
 * Useful for functions that work with any document type
 */
type AnyDoc = ClientDoc | ProductDoc | OrderDoc;

export type { ClientDoc, ProductDoc, OrderDoc, AnyDoc };
