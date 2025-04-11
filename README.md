# Expedition Express
# my-vue-app

## Project Overview

Expedition Express is a comprehensive trip planning website designed to help users organize the perfect journey. The application provides tips, tools, and resources across several key travel planning areas:

- **Destination Selection**: Explore potential destinations with an integrated Google Maps API
- **Dining Options**: Learn how to find and select the best dining experiences for your trip
- **Activities Planning**: Discover popular activities for various destination types
- **Budget Management**: Use our interactive budget calculator to create a realistic travel budget
- **User Authentication**: Login to the site

## Technologies Used

- **Frontend**: -Vue.js
- **Front-end HTTP Server**: Vue CLI development server
- **APIs**: Maps API
- **Backend**: Express.js, SQL 
- **Development**: Node.js, npm, VS Code
- **Back-end HTTP Server**: Node.js

## Installation
  (Resource that could help with Vue install. Youtube video)
  ```
  https://www.youtube.com/watch?v=P4BmSvAry-c&ab_channel=Codeburst
  ```

To set up the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/laylaconnor/Expedition-Express
   ```

2. Navigate to the project directory:

3. Install dependencies:
   ```
   npm install
   ```
4. CD into backend folder to get the server running
    ```
   cd backend
   ```

## Running the Application Locally

Once you've installed the project, you can run it locally by following these steps:

1. Navigate to the project directory in your terminal/command prompt:

   ```
   example:
   
   cd [whatever the path is on your computer to the cloned repository]

   ```

2. Start the development server:

   ```
   npm run serve
   ```

3. The application will be available at:
   - Local: http://localhost:8080/
   - Network: http://your-ip-address:8080/

Here's what the terminal output should look like when you successfully start the server:

![image](https://github.com/user-attachments/assets/7f4282c5-4204-4d46-8ebe-85d2861a5b76)

Citation for the Use of AI
AI Used: ChatGPT (OpenAI), April 2025 version

Prompts Used:
"Can you help me fix my sign on feature for my website that allows users to sign on with their Google account and then log their account in a MySQL database? We are using Vue.js."
"Do I need to make the .env file part of the git ignore? Because it keeps saying I can’t commit it due to the client secret."

Functions, Components, Pages, etc. that were affected
Frontend (index.html):
Added a Google sign-in button and corresponding JavaScript (signInWithGoogle() function) to trigger OAuth login.

Backend (new server.js created):
Set up Express server with Passport.js and Google OAuth 2.0 strategy.
Created /auth/google, /auth/google/callback, and /api/user routes.
Handled user session via express-session.
Connected to a MySQL database to insert/fetch user info.

MySQL:
Suggested a users table schema with fields: id, google_id, name, and email.

Project Root:
.env file created to store sensitive Google OAuth credentials.
.gitignore updated to exclude .env.



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
