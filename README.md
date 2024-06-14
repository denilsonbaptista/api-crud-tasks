# Understanding a Node.js concept

Putting into practice with Node.js the fundamentals about HTTP such as Requests, Responses, Headers, status code and the different types of parameters.

## Run Locally

To run this code locally, you need to have Node.js installed on your machine. In compliance with this requirement, you will have to execute the following commands on your terminal:

Install the local dependencies of the project:

```bash
npm install
```

To run the project locally, simply run the command below:

```bash
npm run dev
```

This will automatically run a service at the following address:

```bash
http://localhost:3000/
```

With the service already running to import the csv file already some predefined tasks execute the following command:

```bash
node src/streams/import-csv.js
```

This command will create all the file data in the database.

observations:

- I left an http file with the routes of this application, if you use it, you will need to have installed in your vscode the [REST client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension.
- To stop all services, just use the CTRL+C keys, which is the default terminal to kill processes.

## Contact

If you want to contact with me you can reach me at [Linkedin](https://www.linkedin.com/in/denilsonbaptista/).
