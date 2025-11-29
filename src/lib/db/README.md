# Database (DB)

PouchDB initialization and CRUD operations for Kassa.

## Guidelines

- **TDD**: All database operations must have tests before implementation
- **Error Handling**: Proper error handling for all DB operations
- **Type Safety**: Use TypeScript types for all documents
- **Singleton Pattern**: Database instance is a singleton
- **Mango Queries**: Use Mango queries for filtering and searching
- **Indexing**: Create indexes for efficient querying

## Structure

### `database.ts`
Database initialization and lifecycle:
- `initializeDatabase()` - Initialize PouchDB with indexes
- `getDatabase()` - Get singleton instance
- `closeDatabase()` - Close connection
- `clearDatabase()` - Destroy database (development only)

### `clients.ts` (Phase 2)
Client CRUD operations:
- `createClient(data): Promise<Client>`
- `getClients(): Promise<Client[]>`
- `updateClient(id, data): Promise<Client>`
- `deleteClient(id): Promise<void>`

### `orders.ts` (Phase 2)
Order CRUD operations:
- `createOrder(clientId, items): Promise<Order>`
- `getOrdersByClient(clientId): Promise<Order[]>`
- `updateOrder(id, data): Promise<Order>`
- `deleteOrder(id): Promise<void>`
- `getOrdersByStatus(status): Promise<Order[]>`

### `products.ts` (Phase 4)
Product CRUD operations:
- `createProduct(data): Promise<Product>`
- `getProducts(): Promise<Product[]>`
- `updateProduct(id, data): Promise<Product>`
- `deleteProduct(id): Promise<void>`

## Example CRUD Pattern

```typescript
// db/clients.ts
import { getDatabase } from './database';
import type { ClientDoc } from '$lib/types/database';

export async function createClient(name: string, email?: string): Promise<ClientDoc> {
  const db = await getDatabase();
  const client: ClientDoc = {
    id: crypto.randomUUID(),
    name,
    email,
    type: 'client',
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  const result = await db.put({ _id: client.id, ...client });
  return { ...client, _id: result.id, _rev: result.rev };
}
```

## Mango Query Examples

```typescript
// Query all clients
const clients = await db.find({ selector: { type: 'client' } });

// Query orders by status
const completed = await db.find({
  selector: { type: 'order', status: 'completed' },
  sort: [{ createdAt: 'desc' }]
});

// Query orders for a client
const clientOrders = await db.find({
  selector: { clientId: 'client-123' }
});
```
