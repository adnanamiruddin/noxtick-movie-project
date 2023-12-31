# NoxTick Movie

NoxTick Movie is a web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This application aims to facilitate users in booking movie tickets, top up balance, withdraw balance, and canceling tickets.

The application has been deployed and can be accessed through the following URL: [https://noxtick-movie.vercel.app/](https://noxtick-movie.vercel.app/)

## Features

- Movie Ticket Booking: Users can select movies they want to watch and book tickets according to the available schedules.
- Balance Top up: Users can add balance to their account through the provided payment methods.
- Balance Withdrawal: Users can withdraw balance from their account.
- Ticket Cancellation: Users can cancel previously purchased tickets.

## Installation

1. Make sure you have Node.js and MongoDB Compass installed on your system.
2. Clone this repository to your local directory.

```bash
git clone https://github.com/adnanamiruddin/noxtick-movie-project.git
```

3. Navigate to the project directory.

```bash
cd noxtick-movie-project
```

4. Navigate to the server directory.

```bash
cd server
```

5. Install the server dependencies.

```bash
yarn
```

6. Navigate to the client directory.

```bash
cd ../client
```

7. Install the client dependencies.

```bash
yarn
```

8. Go back to the main directory.

```bash
cd ..
```

9. Copy the all of `.env.example` file (in server and client) and rename it to `.env`. Then, fill in the required configurations such as the MongoDB database connection.
10. Run the server and client concurrently. First, the server side.

```bash
cd server
npm start
```

11. The server will run on `http://localhost:${PORT}` Then create new terminal and go to client side.

```bash
cd client
yarn dev
```

12. The application will run on `http://localhost:5173` or around that port.

## Usage

1. Open the application in your browser using the URL `http://localhost:5173` or around that port or the deployed URL above.
2. Sign up for a new account or log in with an existing one.
3. Explore the available movies and select a movie you want to watch.
4. Choose an available schedule, the number of tickets, and desired seats.
5. After selecting the tickets, proceed to the payment process.
6. For balance top-up, select the top-up option from the user menu and follow the provided instructions.
7. For balance withdrawal, select the withdrawal option from the user menu and follow the provided instructions.
8. For ticket cancellation, select the my tickets option from the user menu and follow the provided instructions.

## Contribution

If you would like to contribute to this project, please follow these steps:

1. Fork this repository.
2. Create a new feature branch.

```bash
git checkout -b new-feature
```

3. Make changes in the branch.
4. Commit your changes.

```bash
git add .
git commit -m "feat: Add new feature"
```

5. Push the branch to your forked repository.

```bash
git push origin new-feature
```

6. Create a new pull request.

## License

(C) 2023 Adnan Amiuddin. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
