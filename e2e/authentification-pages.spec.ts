import { test, expect } from '@playwright/test'

test('should navigate to the sign up page', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await expect(page).toHaveURL('http://localhost:3000/auth/login')
  await expect(page).toHaveTitle(/Connexion/)

  await page.click("text=S'inscrire")
  await expect(page).toHaveTitle(/Inscription/)
})
