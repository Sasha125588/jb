import { defineConfig } from '@playwright/test'

const baseURL = 'http://127.0.0.1:3100'

export default defineConfig({
  testDir: './e2e/instant',
  outputDir: './test-results/instant',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report/instant', open: 'never' }]],
  use: {
    baseURL,
    channel: 'chrome',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'bun run build:instant && bun run start:instant',
    url: baseURL,
    reuseExistingServer: process.env.INSTANT_REUSE_SERVER === '1',
    timeout: 300_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
})
