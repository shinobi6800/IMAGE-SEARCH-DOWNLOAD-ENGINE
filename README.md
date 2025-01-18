# Node.js Image Downloader Using Custom Google Cloud Search Engine

This Node.js application leverages a custom **Google Cloud search engine** to download images based on user-defined search queries. The app connects to the Google Custom Search API, performs a search for images, and downloads the relevant images to a specified local directory. It is designed to be efficient, easy to use, and flexible, allowing users to quickly gather images related to any topic.

## Features

- **Search Integration**: Utilizes Google Cloud's Custom Search Engine (CSE) to fetch image search results based on keywords.
- **Image Download**: Automatically downloads images from search results and saves them in a specified folder.
- **Configurable Search Parameters**: Customize the number of results and image file formats to download.
- **Error Handling**: Manages issues with API limits, invalid responses, and network errors.
- **Logging and Monitoring**: Tracks the number of images successfully downloaded and logs potential issues for easier debugging.

## Requirements

- A **Google Cloud account** with an active **Custom Search Engine (CSE)** and **API key**.
- **Node.js** installed on your machine.
- The following Node.js dependencies:
  - `axios` for HTTP requests to the Google API.
  - `fs` for file system management.
  - `request-promise-native` or `node-fetch` for image downloading.
  - `path` for handling file paths.

## Setup

1. **Install Dependencies**  
   Run the following command to install the required dependencies:
   ```bash
   npm install
