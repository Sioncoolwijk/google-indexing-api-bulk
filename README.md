# Google Indexing API Bulk Tool

This script helps you index your website's pages in bulk using Google's Indexing API, without having to manually request each URL for submission in the Search Console interface.

## Prerequisites

- Node.js - [Download and install](https://nodejs.org/en/download/)
- Google Search Console access for your website
- Google Cloud Platform project with Indexing API enabled

## Setup

1. Set up access to the Indexing API in Google Cloud Platform by following the instructions at:
   https://developers.google.com/search/apis/indexing-api/v3/prereqs

2. Once you have access to Indexing API, download your service account JSON file containing your credentials and save it as `service_account.json` in the project root.

## Verify Site Ownership

In this step, you'll verify that you have control over your web property.

1. Find your service account email address in:
   - The `client_email` field in the JSON private key file
   - The Service account ID column of the Service Accounts view in the Developer Console
   - Format: `my-service-account@test-project-42.google.com.iam.gserviceaccount.com`

2. Go to [Google Webmaster Central](https://www.google.com/webmasters/verification/home)
3. Click your verified property
4. Scroll down and click 'Add an owner'
5. Add your service account email address as an owner to the property

## Usage

### 1. Add your sitemap.xml file

Place your website's sitemap.xml file in the project root directory. This file contains all the URLs you want to index.

### 2. Extract URLs from sitemap

Run the extract-sitemap script to pull all URLs from your sitemap into a urls.txt file:

```bash
node extract-sitemap.js
```

This will create or update the urls.txt file with all URLs from your sitemap.

### 3. Submit URLs for indexing

Run the main script to submit URLs for indexing:

```bash
node index.js
```

The script will read the urls.txt file and submit them to Google's Indexing API in batches.

**Note:** Google imposes the following quotas:
- 100 URLs per request batch
- 200 URLs per day (unless you have higher tier access)

## Troubleshooting

- Make sure your service_account.json file is correctly formatted and contains valid credentials
- Verify that your service account has been added as an owner to your Search Console property
- Check that your sitemap.xml is properly formatted and contains the URLs you want to index

## License

ISC
