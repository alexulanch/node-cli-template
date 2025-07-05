#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Reads the 'name' field from the project's package.json.
 * This function is internal and used when the CLI is run directly.
 * @returns {string} The package name, or 'unknown-package' if not found or an error occurs.
 */
function getPackageNameFromPackageJson(): string {
  try {
    const packageJsonPath = resolve(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    return packageJson.name || 'unknown-package';
  } catch {
    return 'unknown-package';
  }
}

/**
 * Main function for a generic CLI.
 * This function contains the core logic that can be executed both directly
 * as a CLI command and imported for testing purposes.
 * @param {string} [packageName]
 * @returns {string}
 */
export function runCli(packageName?: string): string {
  const finalPackageName = packageName || getPackageNameFromPackageJson();
  const message = `${finalPackageName} CLI is working!`;
  return message;
}

/* v8 ignore next 2 */
if (import.meta.url === `file://${process.argv[1]}`) {
  runCli();
}
