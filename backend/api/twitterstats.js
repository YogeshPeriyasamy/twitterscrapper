const express = require('express');
const { chromium } = require('playwright');
const cors = require('cors');
const app = express();

//allow access
app.use(cors({ origin: 'http://localhost:5173' }));

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
        
        //to scrappe it using only a tag and span tag with Followers and Following word
      await page.waitForSelector('a:has(span:has-text("Followers"))', { timeout: 20000 });
      await page.waitForSelector('a:has(span:has-text("Following"))', { timeout: 20000 });

      const followersHandle = await page.$('a:has(span:has-text("Followers")) span span');
      const followingHandle = await page.$('a:has(span:has-text("Following")) span span');

      const followers = await followersHandle?.innerText();
      const following = await followingHandle?.innerText();

      await browser.close();

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
      } 
    }

    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Twitter scraping failed' });
  }
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));
