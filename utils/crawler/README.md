# Utility to download web site contents for GCS Unstructured data search.

## Getting started

### Requirements

- Tested under the following conditions:
    - Python 3.9.6; pip version 23.2.1
    - MacOS (22.6.0 Darwin Kernel Version 22.6.0)

### Activate virtual environment

1. Make desired modifications for the `allowed_domains` and `start_urls` in [site.py](crawler/spiders/site.py).  Review other configs (e.g., `custom_settings`) and adjust as desired.
1. Change target directory `cd ${GIT_PROJECT_ROOT}/utils/crawler`
1. Set Python environment with
    - Create virtual environment with `python3 -m venv venv`
    - Activate new environment with `source venv/bin/activate`
1. Install dependencies with `pip install -r requirements.txt`
1. Run the crawler with `scrapy crawl site --loglevel INFO` ( *NOTE:* this will take some time based upon how much content is needed to crawl and download)
1. Review content in [gcs_content](./gcs_content/) and upload to GCS bucket as a Data Source for your Vertex Search App
