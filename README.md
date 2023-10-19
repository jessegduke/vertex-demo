# Ask Vertex Search
This is a simple prototype for demonstration purposed and not for Production use

Idea originated from work by [koverholt](https://github.com/koverholt/).

## Overview

This Hugo based template that provides a framework to leverage out of the box Vertex Search or more complicated, custom widget interactions.

## Tested environments

- Hugo+extended v0.106
- MacOS, 13.6
- Firebase CLI version 12.5.4 (if you choose Firebase hosting)


## Running a local development Environment
Steps to create site and run dev instance
1. Create a [Vertex Search App(s)](https://cloud.google.com/generative-ai-app-builder/docs/try-enterprise-search#create_a_search_app_for_website_data) and Data Store repositories/agents
    - This is developed to suport only Select authorization type = "Public Access"
    - Details are out of scope for this effort.  However see below in the [Utils](#utilities) section for some assistance if needed.
1. Update web application according to [Common Configurations and Adjustments](#common-configurations-and-adjustments) listed below.
1. Change Directories into your GIT_PROJECT_HOME (eg. `cd $(git rev-parse --show-toplevel)`).
1. Start Hugo instance for development with `hugo serve -s web --disableFastRender --debug --watch`.
1. Assuming port is not currently in use, accesss the application at [localhost:1313](http://localhost:1313).

## Common Configurations and Adjustments.
1. Update the Global JavaScript variables in [web/static/js/vertex-widget-globals.js](web/static/js/vertex-widget-globals.js).
1. For Basic Widget Searches, update the `configId` in both [./web/content/ask-vertex-basic/index.md](./web/content/ask-vertex-basic/index.md) and [./web/content/ask-vertex-basic2/index.md](./web/content/ask-vertex-basic2/index.md)
1. For Advanced GCS Search with custom Vertex Search Widget, it is *REQUIRED* to update [vertex-widget.js](./web/static/js/vertex-widget.js).
    - Review `createLink` function. This template takes a basic approach to transforming the links from GCS Document names and transforming into proper hyper links for `href`inputs.
    - Review `createTitle` function.  Like the process to create HyperLinks to Relevant documents, this template takes a basic approach to "Relevant Documentation" titles. Adjust as needed to create the visual experience based upon your src content.
    - This demo framework support HTML and PDF references.
1. Update "Example Questions" by review and updates of the [ask_crawler](./web/layouts/partials/ask_crawler.html).
1. Update the Heading navigation to your preferences. Adjust [header.html](./web/themes/ask-vertex/layouts/partials/header.html).
1. Update the Footer details to your preferences. Adjust [footer.html](./web/themes/ask-vertex/layouts/partials/footer.html).
1. Want more control on look and feel?  Like all Hugo based projects, anything in the [web/layouts/](./web/layouts/) directory will override the theme details of the layout.

## Firebase Deployment
Sets to deploy to Firebase
1. Build web site with hugo: `hugo -v -s ./web -d public --debug -D`
1. Enable Firebase APIs and project. (out of scope for this effort)
1. Configure deploy targets in `.firebaserc` and `firebase.json`
1. Authenticate: `firebase login` or `firebase login:use ${EMAIL}`
1. Set Firebase project `firebase use ${PROJECT_ID}`
1. Deploy site to Firebase Hosting: `firebase deploy --project ${PROJECT_ID}`

## Opportunities for improvements

- Lot of CSS opportunities for improvement, but thanks to [Bard](https://bard.google.com/chat), it works (more or less)

## Utilities

### Web Crawler
- If you wish to leverage more 'Advanced' features of Vertex Search with GCS Integration but you do not own the domain, you can leverage the provided [Scrapy Crawler](https://scrapy.org/).  Review the details in the provided [README.md](./utils/crawler/README.md)