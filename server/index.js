import express from "express"; // Import Express framework
import sequelize from "./db/init.js"; // Import Sequelize for database initialization
import cors from "cors"; // Import Cors for handling Cross-Origin Resource Sharing

import todoRouter from "./routes/todo.routes.js"; // Import todoRouter for handling todo-related routes

// Create an instance of Express application
const app = express();

// Middleware setup
app.use(express.json()); // Parse incoming request bodies in JSON format
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Mount todoRouter for handling todo-related routes
app.use(todoRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    let statusCode = err.statusCode || 500; // Set status code from error or default to 500
    let message = err.message || "Internal server error"; // Set error message from error or default to "Internal server error"

    // Send error response in JSON format
    return res.status(statusCode).json({
        success: false, // Indicate failure
        errorMessage: message, // Error message
        statusCode, // Status code
    });
});

// Function to start the server
async function start() {
    try {
        // Sync Sequelize with the database
        await sequelize.sync();
        console.log("Connected to the database."); 
        
        // Start the server and listen on port 5000
        app.listen(5000, () => {
            console.log("Server live at port 5000"); 
        });
    } catch (error) {
        console.log(error); // Log any errors that occur during server startup
    }
}

// Call the start function to start the server
start();