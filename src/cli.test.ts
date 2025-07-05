import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { runCli } from './cli';
import { readFileSync } from 'node:fs';

vi.mock('node:fs', async (importOriginal) => {
  const actual = await importOriginal<typeof import('node:fs')>();
  return {
    ...actual,
    readFileSync: vi.fn(),
  };
});

describe('cli', () => {
  beforeEach(() => {});

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should work and return the correct message when a package name is explicitly provided', () => {
    const testPackageName = 'my-explicit-package';
    const result = runCli(testPackageName);

    expect(vi.mocked(readFileSync)).not.toHaveBeenCalled();
    expect(result).toBe(`${testPackageName} CLI is working!`);
  });

  it('should work and return the correct message when the package name is derived dynamically', () => {
    const dynamicPackageName = 'mocked-dynamic-package';
    vi.mocked(readFileSync).mockReturnValueOnce(
      JSON.stringify({ name: dynamicPackageName }),
    );

    const result = runCli();

    expect(vi.mocked(readFileSync)).toHaveBeenCalledTimes(1);
    expect(result).toBe(`${dynamicPackageName} CLI is working!`);
  });

  it('should handle errors gracefully when reading package.json dynamically', () => {
    vi.mocked(readFileSync).mockImplementationOnce(() => {
      throw new Error('Simulated file read error');
    });

    const result = runCli();

    expect(vi.mocked(readFileSync)).toHaveBeenCalledTimes(1);
    expect(result).toBe('unknown-package CLI is working!');
  });
});
