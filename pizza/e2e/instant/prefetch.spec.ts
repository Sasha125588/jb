import { expect, test } from '@playwright/test'

test('anonymous catalog does not prefetch protected routes', async ({ page }) => {
  await page.goto('/en')
  await page.waitForLoadState('networkidle')

  const protectedRouteRequests = await page.evaluate(() => {
    return performance
      .getEntriesByType('resource')
      .map((entry) => new URL(entry.name).pathname)
      .filter((pathname) => pathname === '/en/history' || pathname === '/en/profile')
  })

  expect(protectedRouteRequests).toEqual([])
})
