import { expect, test } from '@playwright/test'

test('renders the starter and the users reference route', async ({ page }) => {
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
  await expect(page.getByRole('heading', { name: /build features/i })).toBeVisible()

  await page.getByRole('link', { name: /users example/i }).click()
  await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible()
  await expect(page.getByText('Ada Lovelace')).toBeVisible()
})
