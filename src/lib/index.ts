// place files you want to import through the `$lib` alias in this folder.

export type { Client, Product, OrderItem, Order, CalculatedMargin } from './types/business';
export type { ClientDoc, ProductDoc, OrderDoc, AnyDoc } from './types/database';
export {
	getDatabase,
	closeDatabase,
	clearDatabase,
	initializeDatabase,
	DB_NAME
} from './db/database';
export { config } from './config';
