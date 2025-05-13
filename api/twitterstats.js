const express = require('express');
const { chromium } = require('playwright');

const app = express();

app.get('/api/twitter-stats', async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) return res.status(400).json({ error: 'Username required' });

    const userarray = username.trim().split(/[\s,]+/);
    const records = [];

    for (let uname of userarray) {
      const browser = await chromium.launch({ headless: true });
      const page = await browser.newPage();

      try {
        await page.goto(`https://twitter.com/${uname}`, {
          waitUntil: 'domcontentloaded',
          timeout: 30000
        });

        // Wait for the followers and following links to load
        await page.waitForSelector('a[href$="/verified_followers"]', { timeout: 15000 });
        await page.waitForSelector('a[href$="/following"]', { timeout: 15000 });

        // Extract Followers count
        const followers = await page.locator('a[href$="/verified_followers"] span').first().textContent();
        // Extract Following count
        const following = await page.locator('a[href$="/following"] span').first().textContent();

        records.push({
          username: uname,
          followers: followers?.trim() || '0',
          following: following?.trim() || '0'
        });

      } catch (err) {
        console.error(`Failed to scrape @${uname}:`, err.message);
        records.push({
          username: uname,
          followers: '0',
          following: '0'
        });
      } finally {
        await browser.close();
      }
    }

    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Twitter scraping failed' });
  }
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));
