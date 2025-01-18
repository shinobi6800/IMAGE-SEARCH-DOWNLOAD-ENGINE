require('dotenv').config(); 
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const downloadImage = async (url, savePath) => {
    const writer = fs.createWriteStream(savePath);

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
};

// Function to search for images using Google Custom Search API and download them meh
const searchAndDownloadImages = async (query, totalImages, saveDir, apiKey, searchEngineId) => {
    const perPage = 10; // Google Custom Search returns up to 10 results per request
    let downloadedImages = 0;

    try {
        while (downloadedImages < totalImages) {
            const start = downloadedImages + 1; // Set pagination start index (1-based index)....:)
            const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${searchEngineId}&key=${apiKey}&searchType=image&num=${perPage}&start=${start}`;

            const { data } = await axios.get(searchUrl);
            console.log('API Response:', data); // Log the API response for debugging cuz im stupid

            if (!data.items || data.items.length === 0) {
                console.error('No more images found.');
                break;
            }

            const images = data.items;

            for (let i = 0; i < images.length && downloadedImages < totalImages; i++) {
                const imgUrl = images[i].link;
                const fileName = `image${downloadedImages + 1}.jpg`;
                const filePath = path.resolve(saveDir, fileName);

                console.log(`Downloading image ${downloadedImages + 1}: ${imgUrl}`);
                await downloadImage(imgUrl, filePath);
                downloadedImages++;
            }

            if (images.length < perPage) {
                break;
            }
        }

        console.log(`Downloaded ${downloadedImages} images to ${saveDir}`);
    } catch (error) {
        console.error('Error downloading images:', error.message);
    }
};


const query = 'Anime Wallpapers'; 
const numImages =50; 
const saveDir = './Ampesi 2'; 
const apiKey = process.env.API_KEY; 
const searchEngineId = process.env.SEARCH_ENGINE_ID; 


if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir, { recursive: true });
}

searchAndDownloadImages(query, numImages, saveDir, apiKey, searchEngineId);
