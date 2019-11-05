<h1 align="center">
  MeetApp - A meetup scheduler app
</h1>

## About the app

MeetApp is a backend, frontend and mobile project to organize and subscribe to meetups. <br/>
This project is part of the certification assignment from Rocketseat GoStack Bootcamp. :rocket:

## Getting Started

- <a href="#gear-backend-using-nodejs-with-express">Backend</a>
- <a href="#computer-frontend-using-reactjs">Frontend</a>
- <a href="#iphone-mobile-using-react-native">Mobile</a>

## :gear: Backend using NodeJS with Express

In order to run start the Rest API project, please follow the instructions below:

### 1. Database configuration

This project requires database connection to Postgres and Redis, please make sure to have both databases properly working. <br />

As recommendation, you can install Docker containers for Postgres and Redis databases. <br />
If you don't have Docker installed, please follow the instructions [here](https://docs.docker.com/install/).

- Sample command line to install Postgres database as container:

```js
docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11
```

- Sample command line to install Redis database as container:

```js
docker run --name redismeetapp -p 6379:6379 -d -t redis:alpine
```

Once you install both containers, you can check the status with the command:

```js
docker ps
```

Once your Postgres database is running, please connect to the database client (e.g. PostBird, Postico) and create a new database for the application (e.g. Meetapp).

### 2. Installing dependencies and setting environment variables

After cloning this project in your machine, open your terminal/cmd, navigate to the backend directory using `cd backend` and run the command `yarn`. <br />

This should install all required dependencies. <br />

After all dependencies are installed, please create a file named `.env` in the folder to create the environment variables for the project. <br />
You can use the file `.env.example` as reference to fill all required fields. <br />

### 3. Database Migrations & Seeds

In order to create all database tables for the application, you can run the command:

```js
yarn sequelize db:migrate
```

This should create all database structure required to run the application. <br />

You can also generate seeds to test the application with a few sample users:

```js
yarn sequelize db:seed:all
```

The command above creates 3 randomly generated users ready to start using the application. <br />
**Note: All users are generated with the default password set to 123456**

### 4. Starting the application

If you performed all the steps above, the application should start correctly after running the command:

```js
yarn dev
```

Also, in order to start the mailing service, please run the command:

```js
yarn queue
```

## :computer: Frontend using ReactJS

Before starting the application, please make sure that your Rest API server is running.

### 1. Installating dependencies and setting environment variables

Navigate to the frontend directory using your terminal/cmd with `cd frontend`. <br />

Run the command `yarn` to install all the required dependencies. <br />

Create the file .env.development pointing to the IP address and port where the API server is running. You can use the file .env.example as reference.

### 2. Starting the application

You can start the frontend application by running the following command below:

```js
yarn start
```

This should automatically open your web browser and start the server under the address `localhost:3000`.

## :iphone: Mobile using React Native

Before starting the application, please make sure that your Rest API server is running.

**Note: The React Native App was created only for Android**

### 1. Installing dependencies and setting environment variables

Before starting, navigate to the `mobile` subdirectory using `cd mobile`. <br />

The React Native app uses Reactotron and Axios as dependencies and therefore, it's required to create the file `.env` pointing to the IP address of the REST API server. <br />

You can use the file `.env.example` as reference to create your own `.env` file <br />

Run the command `yarn` to install all the required dependencies. <br />

### 2. Configuring Connection between backend and mobile

Start your Android emulator or plug your Android device to your computer and make sure Developer mode is enabled. <br />

After starting and connecting your Android device to your local machine it's required to set reverse connection between backend and mobile in order for the mobile app to retrieve and display the image from backend server correctly. You can find a sample command below:

```js
adb reverse tcp:3333 tcp:3333
```

Note: If you're on Windows and your backend is running under the default port `3333`, there's a script created that automatically runs the command above and compiles the Android app (mentioned on step #3). You can use this script by running `yarn android`.

### 3. Compiling and starting your Android App

You can compile the app by running the command:

```js
react-native run-android
```

Wait the App to compile and be installed to your mobile device and it should automatically open the app. <br />

Once the App is compiled and installed, you can relaunch the app if needed using:

```js
react-native start --reset-cache
```

<br />
