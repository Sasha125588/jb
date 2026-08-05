import { instant } from '@next/playwright'
import { expect, test } from '@playwright/test'

test.describe('login instant navigation', () => {
  test('includes the login form in the static document', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, javaScriptEnabled: false })
    const page = await context.newPage()

    try {
      await page.goto('/en/login')
      await expect(page.getByTestId('login-shell')).toBeVisible()
    } finally {
      await context.close()
    }
  })

  test('serves the login form on an initial load', async ({ page, baseURL }) => {
    await instant(
      page,
      async () => {
        await page.goto('/en/login')
        await expect(page.getByTestId('login-shell')).toBeVisible()
      },
      { baseURL }
    )
  })

  test('commits the login form on a client navigation', async ({ page }) => {
    await page.goto('/en')

    const loginLink = page.getByTestId('header-login-link')
    await expect(loginLink).toBeVisible()

    await instant(page, async () => {
      await loginLink.click()
      await page.waitForURL((url) => url.pathname === '/en/login')
      await expect(page.getByTestId('login-shell')).toBeVisible()
    })
  })
})

test.describe('catalog instant navigation', () => {
  test('includes the catalog shell in the static document', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, javaScriptEnabled: false })
    const page = await context.newPage()

    try {
      await page.goto('/en')
      await expect(
        page.getByTestId('catalog-views').filter({ visible: true }).first()
      ).toBeVisible()
      await expect(
        page.getByTestId('catalog-skeleton').filter({ visible: true }).first()
      ).toBeVisible()

      await page.setViewportSize({ width: 390, height: 844 })
      await expect(
        page.getByTestId('catalog-views').filter({ visible: true }).first()
      ).toBeVisible()
      await expect(
        page.getByTestId('catalog-skeleton').filter({ visible: true }).first()
      ).toBeVisible()
    } finally {
      await context.close()
    }
  })

  test('serves the catalog skeleton on an initial load', async ({ page, baseURL }) => {
    await instant(
      page,
      async () => {
        await page.goto('/en')
        await expect(page.getByTestId('catalog-skeleton')).toBeVisible()
        await expect(page.getByTestId('catalog-content')).toHaveCount(0)
      },
      { baseURL }
    )
  })

  test('commits the catalog skeleton on a client navigation', async ({ page }) => {
    await page.goto('/en/checkout')

    const homeLink = page.getByTestId('home-link')
    await expect(homeLink).toBeVisible()

    await instant(page, async () => {
      await homeLink.click()
      await page.waitForURL((url) => url.pathname === '/en')
      await expect(page.getByTestId('catalog-skeleton')).toBeVisible()
      await expect(page.getByTestId('catalog-content')).toHaveCount(0)
    })

    await expect(page.getByTestId('catalog-content')).toBeVisible()
  })
})
