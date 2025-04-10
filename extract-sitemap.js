const fs = require('fs');
const xml2js = require('xml2js');

// Function to extract URLs from sitemap.xml
async function extractUrlsFromSitemap() {
  try {
    // Read the sitemap.xml file
    const sitemapContent = fs.readFileSync('sitemap.xml', 'utf8');
    
    // Parse XML
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(sitemapContent);
    
    // Extract URLs based on sitemap format
    let urls = [];
    
    // Handle standard sitemap format
    if (result.urlset && result.urlset.url) {
      urls = result.urlset.url.map(urlObj => urlObj.loc[0]);
    } 
    // Handle sitemap index format
    else if (result.sitemapindex && result.sitemapindex.sitemap) {
      console.log('This appears to be a sitemap index file. Please process each individual sitemap separately.');
      urls = result.sitemapindex.sitemap.map(sitemapObj => sitemapObj.loc[0]);
    }
    
    // Write URLs to urls.txt
    if (urls.length > 0) {
      fs.writeFileSync('urls.txt', urls.join('\n'), 'utf8');
      console.log(`Successfully extracted ${urls.length} URLs from sitemap.xml to urls.txt`);
    } else {
      console.log('No URLs found in the sitemap.xml file.');
    }
    
  } catch (error) {
    console.error('Error processing sitemap:', error.message);
  }
}

// Run the extraction
extractUrlsFromSitemap(); 