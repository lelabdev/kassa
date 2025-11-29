# Types

TypeScript interfaces and types for Kassa business domain and data models.

## Guidelines

- **No `any`**: Always use proper types, never use `any`
- **Extend Carefully**: Use inheritance/extension appropriately
- **Documentation**: Add JSDoc comments for complex types
- **Separation**: Keep business types separate from database/PouchDB types
- **Export**: All types should be exported through `src/lib/index.ts`

## Type Categories

### Business Types (`business.ts`)

Core domain entities:

- `Client` - Customer/vendor entity
- `Product` - Product catalog item
- `Order` - Sales order/receipt
- `OrderItem` - Line item in an order
- `CalculatedMargin` - Financial calculations result

### Database Types (`database.ts`)

PouchDB document types extending business types:

- `ClientDoc` - PouchDB document for Client
- `ProductDoc` - PouchDB document for Product
- `OrderDoc` - PouchDB document for Order
- `AnyDoc` - Union type for all documents

## Example

```typescript
// types/business.ts
/**
 * Represents a customer/client in the system
 */
interface Client {
	/** Unique identifier */
	id: string;
	/** Client name or business name */
	name: string;
	/** Optional email address */
	email?: string;
	/** Optional phone number */
	phone?: string;
}

// types/database.ts
/**
 * PouchDB document for Client (extends Client with DB fields)
 */
interface ClientDoc extends Client {
	/** PouchDB document ID */
	_id?: string;
	/** PouchDB revision */
	_rev?: string;
	/** Document type discriminator */
	type: 'client';
	/** Creation timestamp */
	createdAt: number;
}
```
