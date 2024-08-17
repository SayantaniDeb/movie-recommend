# Movie Recommend App

Welcome to the Movie Recommend App! This application allows users to input their feelings or thoughts, and in return, it suggests the perfect movie recommendation based on their input.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About the Project

The Movie Recommend App is a simple yet powerful tool that provides movie suggestions based on user input. Users can type in how they are feeling or what’s on their mind, and the app will respond with a movie recommendation that matches their mood or thoughts.

### Features

- **User Input**: Type in your thoughts or feelings.
- **AI-Powered Recommendations**: Get a movie suggestion based on your input.
- **Interactive UI**: A clean and intuitive user interface for easy interaction.
- **QuickBlox AI Integration**: Utilizes QuickBlox AI to generate responses.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: QuickBlox API for AI-based movie recommendations
- **Deployment**: Local server or cloud-based deployment

## Getting Started

To get a local copy up and running on your own server, follow these simple steps.

### Prerequisites

- Node.js (v14.x or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/SayantaniDeb/movie-recommend.git
   cd movie-recommend
   ```

2. **Install dependencies**

   Using npm:
   ```bash
   npm install
   ```

   Using yarn:
   ```bash
   yarn install
   ```

### Running the App

1. **Set up environment variables**

   Create a `.env` file in the root directory and add the following:

   ```plaintext
   REACT_APP_APPLICATION_ID=your_quickblox_application_id
   REACT_APP_AUTH_KEY=your_quickblox_auth_key
   REACT_APP_AUTH_SECRET=your_quickblox_auth_secret
   REACT_APP_ACCOUNT_KEY=your_quickblox_account_key
   REACT_APP_LOGIN=your_quickblox_login
   REACT_APP_PASSWORD=your_quickblox_password
   REACT_APP_SMART_CHAT_ASSISTANT_ID=your_quickblox_smart_chat_assistant_id
   ```

   Replace the placeholder values with your actual QuickBlox credentials.

2. **Start the development server**

   Using npm:
   ```bash
   npm start
   ```

   Using yarn:
   ```bash
   yarn start
   ```

   This will start the app on `http://localhost:3000`.

### Running the App on Your Server

If you wish to deploy the app to your own server:

1. **Build the app**

   Using npm:
   ```bash
   npm run build
   ```

   Using yarn:
   ```bash
   yarn build
   ```

   This will generate a `build` folder containing the production build of your app.

2. **Deploy the build**

   You can deploy the contents of the `build` folder to any static site hosting service, or serve it through a web server like Nginx, Apache, or a Node.js server.

## Environment Variables

The app relies on several environment variables to function correctly. These should be set in a `.env` file at the root of the project:

- `REACT_APP_APPLICATION_ID`: Your QuickBlox Application ID
- `REACT_APP_AUTH_KEY`: Your QuickBlox Auth Key
- `REACT_APP_AUTH_SECRET`: Your QuickBlox Auth Secret
- `REACT_APP_ACCOUNT_KEY`: Your QuickBlox Account Key
- `REACT_APP_LOGIN`: Your QuickBlox login username
- `REACT_APP_PASSWORD`: Your QuickBlox login password
- `REACT_APP_SMART_CHAT_ASSISTANT_ID`: Your QuickBlox Smart Chat Assistant ID

## Usage

Once the server is up and running, you can access the app via `http://localhost:3000` (or your server’s IP/domain if deployed). Input your thoughts or feelings, and the app will return a movie recommendation based on your input.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/your-feature`)
3. Commit your Changes (`git commit -m 'Add some feature'`)
4. Push to the Branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Sayantani Deb - [sayantani.1001@gmail.com](mailto:your-email@example.com)

Project Link: [https://github.com/SayantaniDeb/movie-recommend](https://github.com/SayantaniDeb/movie-recommend)

