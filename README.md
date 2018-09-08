# Node API Boilerplate

## Technologies

- Nodejs
- Express
- Jest
- Mongodb
- Jsonwebtoken


## API Endpoints

| Endpoint                                         | Functionality                          |
| ------------------------------------------------ | ---------------------------------------|
| GET /users                                       | Fetch all available users              |
| POST /users/                                     | Register a user                        |
| POST /users/login                                | Login a user                           |
| GET /users/\<user>                               | Fetch the details of a user            |
| PUT /users/                                      | Update the details of a user           |
| DELETE /users/                                   | Delete the details of a user           |



# Running the application locally
1. Clone this repository

    `git clone https://github.com/LakunleD/nodejs-boilerplate.git`

2. Install dependencies

    `cd nodejs-boilerplate`

    `npm install`

3. Set your environment variables in your `.bashrc` file. The three environment variables are `MONGO_URL`, `PORT` and `JWT_SECRET`.

    Please note that `MONGO_URL` is the connection url for MongoDB, `PORT` is the port the api would be running on while `JWT_SECRET` is the secret key for jsonwebtoken.
    

4. Start your MongoDB server

    `mongod`

5. Test the application

    `npm test`

6. Start the application

    `npm start`    



