---
title: "Ask Basic Vertex"
date: 2023-10-11T10:16:09-04:00
draft: false
stylesheets:
    - name: search
bannerTitle: Basic Widget with Vertex Search of GCS content
bannerSubtitle: |
    Lets look at an out of the box experience would look like in GCP and Vertex.  We can update just the *configId* and immediately interact with a new Vertex App.
---

{{< rawhtml >}}
    <div style="display: flex; justify-content: center; align-items: center;">
        <div>
            <!-- Widget JavaScript bundle -->
            <script src="https://cloud.google.com/ai/gen-app-builder/client?hl=en_US"></script>
            <!-- Search widget element is not visible by default -->
            <!-- TODO: Update configId fro Integration panel-->
            <gen-search-widget
            configId="xxxxxxxxxxxxxxxxxxxx"
            triggerId="searchWidgetTrigger">
            </gen-search-widget>
            <!-- Element that opens the widget on click. -->
            <button type="button" id="searchWidgetTrigger" style="width: 120%;">
              Click to search with natural language
            </button>
        </div>
    </div>
{{< /rawhtml >}}