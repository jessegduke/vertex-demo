from pathlib import Path
from urllib.parse import urljoin, urlparse

from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from slugify import slugify


################################################################################
# The below settings will crawl and save HTML pages from the
# defined websites, only crawl pages within the
# approved domains
#
# Change the allowed_domains, start_urls, and allow rules to your liking.
#
################################################################################
CONTENT_DIR="gcs_content/"
TEXTRACT_EXTENSIONS = [".pdf"] # Includes other defaults

class CustomLinkExtractor(LinkExtractor):

    def __init__(self, *args, **kwargs):
        super(CustomLinkExtractor, self).__init__(*args, **kwargs)
        # Keep the default values in "deny_extensions" *except* for those types we want.
        self.deny_extensions = [ext for ext in self.deny_extensions if ext not in TEXTRACT_EXTENSIONS]


class GeneralSpider(CrawlSpider):
    name = "site"

    # List of the root domain(s) or subdomain(s) to filter
    allowed_domains = [
        "example.com",
    ]

    # List of the URL(s) that the crawler should start at
    start_urls = [
        "https://example.com/",
    ]

    # Rules to filter links by URL path/directory and follow links
    rules = (
        Rule(
            CustomLinkExtractor(),
            callback="parse_item",
            follow=True,
        ),
    )

    # Settings to delay and slow crawling to avoid rate limiting
    custom_settings = {
        "AUTOTHROTTLE_ENABLED": True,
        "AUTOTHROTTLE_START_DELAY": 3,
        "AUTOTHROTTLE_MAX_DELAY": 5,
        "AUTOTHROTTLE_TARGET_CONCURRENCY": 0.5,
        "MEDIA_ALLOW_REDIRECTS": True,
    }


    # Save each HTML page that is crawled in the local /html directory
    def parse_item(self, response):

        slug = slugify(urljoin(response.url, urlparse(response.url).path),
                       replacements=[["/", "-slash-"]], lowercase = False)

        self.logger.info(slug)
        if response.url.endswith(".pdf"):
            self.parse_raw_content(response,slug)

        elif response.url.endswith(".mobi"):
            pass

        elif response.url.endswith(".epub"):
            pass

        else:
            self.parse_default_content(response,slug)


    def parse_default_content(self,response,slug):
        slug = slug.replace("-slash-slash-", "#$$")
        slug = slug.replace("-slash-", "$")
        slug = slug.replace("-slash", "$")
        self.logger.debug(f"------DEFAULT--------> {slug}")

        global CONTENT_DIR
        filename = CONTENT_DIR+slug+".html"

        Path(filename).write_bytes(response.body)
        self.logger.info(f"Saved Default file {filename}")

    def parse_raw_content(self,response,slug):
        slug = slug.replace("-slash-slash-", "#$$")
        slug = slug.replace("-slash-", "$")
        slug = slug.replace("-slash", "$")
        self.logger.info(f"------RAW SLUG--------> {slug}")

        global CONTENT_DIR
        filename = CONTENT_DIR+slug+".pdf"

        with open(filename, 'wb') as f:
            f.write(response.body)
        self.logger.info(f"Saved RAW file {filename}")

