/**
 * Centralized configuration module for Kassa
 *
 * This module provides type-safe access to environment variables across
 * different build environments (development, preview, production).
 *
 * Browser-accessible variables are prefixed with PUBLIC_ and are safe to
 * embed in client-side code. Server-only variables are available only during
 * build time and server-side rendering.
 *
 * Usage:
 * ```ts
 * import { config } from '$lib/config';
 *
 * console.log(config.env);           // 'development' | 'preview' | 'production'
 * console.log(config.debug);         // boolean
 * console.log(config.db.name);       // string
 * console.log(config.api.baseUrl);   // string | undefined
 * ```
 */

type Environment = 'development' | 'preview' | 'production';

interface ApiConfig {
	baseUrl: string | undefined;
	timeout: number;
}

interface DbConfig {
	name: string;
	remoteUrl: string | undefined;
	debug: boolean;
}

interface PwaConfig {
	enabled: boolean;
	offlineEnabled: boolean;
}

interface FeatureFlags {
	analytics: boolean;
	productManagement: boolean;
	clientManagement: boolean;
}

interface Config {
	env: Environment;
	debug: boolean;
	appName: string;
	appVersion: string;
	api: ApiConfig;
	db: DbConfig;
	pwa: PwaConfig;
	features: FeatureFlags;
	isDevelopment: boolean;
	isPreview: boolean;
	isProduction: boolean;
}

/**
 * Parse environment variable as boolean
 * Treats 'true', '1', 'yes' (case-insensitive) as true, everything else as false
 */
function parseBoolean(value: string | undefined, defaultValue: boolean): boolean {
	if (value === undefined || value === '') {
		return defaultValue;
	}
	return ['true', '1', 'yes'].includes(value.toLowerCase());
}

/**
 * Parse environment variable as number
 * Returns default if value is not a valid number
 */
function parseNumber(value: string | undefined, defaultValue: number): number {
	if (value === undefined || value === '') {
		return defaultValue;
	}
	const num = Number(value);
	return Number.isNaN(num) ? defaultValue : num;
}

/**
 * Parse and validate environment variable as one of allowed values
 */
function parseEnum<T extends string>(
	value: string | undefined,
	allowedValues: readonly T[],
	defaultValue: T
): T {
	if (value === undefined || value === '') {
		return defaultValue;
	}
	if (allowedValues.includes(value as T)) {
		return value as T;
	}
	console.warn(
		`Invalid ${value}, expected one of: ${allowedValues.join(', ')}. Using default: ${defaultValue}`
	);
	return defaultValue;
}

/**
 * Build the configuration from environment variables
 */
function buildConfig(): Config {
	const env = parseEnum(
		import.meta.env.MODE as string,
		['development', 'preview', 'production'] as const,
		'development' as Environment
	);

	const debug = parseBoolean(
		import.meta.env.PUBLIC_DEBUG as string | undefined,
		env === 'development'
	);

	const apiTimeout = parseNumber(import.meta.env.PUBLIC_API_TIMEOUT as string | undefined, 30000);

	const dbName = (import.meta.env.PUBLIC_DB_NAME as string | undefined) || 'kassa';

	const pwsEnabled = parseBoolean(import.meta.env.PUBLIC_ENABLE_PWA as string | undefined, true);

	const offlineEnabled = parseBoolean(
		import.meta.env.PUBLIC_ENABLE_OFFLINE as string | undefined,
		true
	);

	const analyticsEnabled = parseBoolean(
		import.meta.env.PUBLIC_ENABLE_ANALYTICS as string | undefined,
		true
	);

	const productManagementEnabled = parseBoolean(
		import.meta.env.PUBLIC_ENABLE_PRODUCT_MANAGEMENT as string | undefined,
		true
	);

	const clientManagementEnabled = parseBoolean(
		import.meta.env.PUBLIC_ENABLE_CLIENT_MANAGEMENT as string | undefined,
		true
	);

	const config: Config = {
		env,
		debug,
		appName: (import.meta.env.PUBLIC_APP_NAME as string | undefined) || 'Kassa',
		appVersion: (import.meta.env.PUBLIC_APP_VERSION as string | undefined) || '1.0.0',
		api: {
			baseUrl: (import.meta.env.PUBLIC_API_BASE_URL as string | undefined) || undefined,
			timeout: apiTimeout
		},
		db: {
			name: dbName,
			remoteUrl: (import.meta.env.PUBLIC_REMOTE_DB_URL as string | undefined) || undefined,
			debug: parseBoolean(import.meta.env.PUBLIC_DB_DEBUG as string | undefined, false)
		},
		pwa: {
			enabled: pwsEnabled,
			offlineEnabled
		},
		features: {
			analytics: analyticsEnabled,
			productManagement: productManagementEnabled,
			clientManagement: clientManagementEnabled
		},
		isDevelopment: env === 'development',
		isPreview: env === 'preview',
		isProduction: env === 'production'
	};

	if (config.debug) {
		console.log('Kassa Config:', config);
	}

	return config;
}

/**
 * Global configuration instance
 * Built once at startup and reused throughout the application
 */
export const config: Config = buildConfig();

/**
 * Export individual config sections for convenience
 */
export const { env, debug, api, db, pwa, features } = config;
