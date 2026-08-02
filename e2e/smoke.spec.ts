import { expect, test } from '@playwright/test'

test('renders onboarding, changes theme, and opens the users reference', async ({ page }) => {
  await page.route('**/users?**', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        users: [
          {
            id: 1,
            firstName: 'Ada',
            lastName: 'Lovelace',
            email: 'ada@example.com',
            image: 'https://example.com/ada.png',
            role: 'admin',
          },
        ],
        total: 1,
        skip: 0,
        limit: 10,
      }),
    })
  })

  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: /start with a clean baseline/i }),
  ).toBeVisible()
  await expect(page.getByRole('heading', { name: /your first hour with the template/i })).toBeVisible()
  await expect(page.getByText('Configure project identity')).toBeVisible()

  await page.getByRole('button', { name: 'Change color theme' }).click()
  await page.getByRole('menuitem', { name: 'Dark' }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  await expect
    .poll(() =>
      page.evaluate(() => window.localStorage.getItem('tanstack-router-boilerplate-theme')),
    )
    .toBe('dark')

  await page.getByRole('link', { name: 'Users example' }).click()
  await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible()
  await expect(page.getByText('Ada Lovelace')).toBeVisible()
})
