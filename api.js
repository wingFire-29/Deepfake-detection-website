// API URLs
const API_BASE_URL = 'http://127.0.0.1:8000/api';
const MEDIA_URL = `${API_BASE_URL}/media/`;

// Default fetch options
const defaultOptions = {
    headers: {
        'Accept': 'application/json'
    },
    mode: 'cors',
    // Remove credentials for now as they can cause CORS issues
    // credentials: 'include',
};

// Function to fetch all media items
async function fetchMediaItems() {
    try {
        console.log('Fetching media items from:', MEDIA_URL);
        const response = await fetch(MEDIA_URL, defaultOptions);
        if (!response.ok) {
            console.error('API response error:', await response.text());
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        return data.results || [];
    } catch (error) {
        console.error('Error fetching media items:', error);
        return [];
    }
}

// Function to fetch a specific media item by ID
async function fetchMediaItem(id) {
    try {
        const response = await fetch(`${MEDIA_URL}${id}/`, defaultOptions);
        if (!response.ok) {
            console.error('API response error:', await response.text());
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching media item ${id}:`, error);
        return null;
    }
}

// Function to upload a new media item
async function uploadMedia(formData) {
    try {
        const options = {
            ...defaultOptions,
            method: 'POST',
            body: formData,
            headers: {} // No Content-Type header for FormData
        };
        
        console.log('Uploading media to:', MEDIA_URL);
        console.log('Form data contains:', Array.from(formData.keys()));
        
        const response = await fetch(MEDIA_URL, options);
        
        if (!response.ok) {
            const responseText = await response.text();
            console.error('Upload error response:', responseText);
            
            try {
                const errorData = JSON.parse(responseText);
                throw new Error(JSON.stringify(errorData));
            } catch (parseError) {
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${responseText}`);
            }
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error uploading media:', error);
        throw error;
    }
}

// Function to manually trigger analysis for a media item
async function analyzeMedia(id) {
    try {
        const options = {
            ...defaultOptions,
            method: 'POST'
        };
        
        const response = await fetch(`${MEDIA_URL}${id}/analyze/`, options);
        
        if (!response.ok) {
            console.error('API response error:', await response.text());
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error(`Error analyzing media item ${id}:`, error);
        throw error;
    }
}

// Export the functions
window.api = {
    fetchMediaItems,
    fetchMediaItem,
    uploadMedia,
    analyzeMedia
}; 