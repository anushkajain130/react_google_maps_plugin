# Google Maps Interactive Marker App

This React-based project renders a Google Map with interactive markers. Each marker displays an info window with city and state information when clicked, using the Google Maps JavaScript API and Geocoding API.

## Features
- Displays a Google Map centered on the USA.
- Plots markers based on provided geographical coordinates.
- Fetches and displays city and state information for each marker using reverse geocoding.

---

## Setup and Installation Steps

### Prerequisites
- Node.js and npm installed on your system.
- A Google Cloud Platform (GCP) account to obtain the necessary API key.

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/anushkajain130/react_google_maps_plugin
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   Run the following command in the project directory:
   ```bash
   npm install
   ```

3. **Set Up Your Google Cloud API Key**:
   - Create or log into your GCP account.
   - Enable the following APIs:
     - Maps JavaScript API
     - Geocoding API
   - Generate an API key in the Google Cloud Console.
   - Add this API key to your environment or directly in the `App.js` file:
     ```javascript
     const API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";
     ```

4. **Start the Development Server**:
   Run the following command:
   ```bash
   npm start
   ```
   This will start the application and open it in your default browser at `http://localhost:3000`.

---

## How to Run the Project
1. Navigate to the project folder in your terminal.
2. Start the development server with:
   ```bash
   npm start
   ```
3. Open the application in your browser at `http://localhost:3000`.

---

## Required API Keys or Configuration

- **Google Maps JavaScript API**: For rendering the map and adding markers.
- **Google Maps Geocoding API**: For reverse geocoding to fetch city and state information.

### Adding the API Key
Replace the `API_KEY` placeholder in `App.js` with your actual API key:
```javascript
const API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";
```

### API Key Restrictions (Recommended)
To enhance security, restrict the API key to your domain or IP:
- Go to the **Google Cloud Console**.
- Edit the API key settings.
- Under **Application Restrictions**, choose "HTTP referrers" and add your local development URL (e.g., `http://localhost:3000`).

---

## Project Structure
```
.
├── public/
├── src/
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
├── README.md
└── ...
```

---

## Troubleshooting
- Ensure the required APIs are enabled in the Google Cloud Console.
- Verify that the API key has no restrictions blocking your usage.
- Check the browser console for errors, such as invalid API key or quota issues.

---

## License
This project is licensed under the MIT License. Feel free to modify and distribute it as needed.

