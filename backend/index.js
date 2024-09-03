const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require('dotenv')
const mongoose = require('./mongoose/config')
const queries = require('./queries')
const { getAllRecipes } = require('./queries')
const User = require('./mongoose/userSchema')

///////////////////////////
// Data initialization
///////////////////////////

// Load environment variables from .env file
dotenv.config()

// Read the MongoDB connection string from environment variable
const mongoConnectionString = process.env.MONGO_CONNECTION_STRING

// Prepare in-memory variables
let tags = []
let db

// Initialize tags from JSON file
function loadTags() {
    tags = require('./data/tags.json')
    console.log(tags.length + ' tags loaded from file')
}

///////////////////////////
// Server setup
///////////////////////////

// Initialize MongoDB connection
async function initMongoose() {
    try {
        // console.log("\nMongo connection string (as read from .env file):\n" + mongoConnectionString + "\n")
        // console.error("### PLEASE REMEMBER TO DELETE THE .env FILE BEFORE SUBMITTING YOUR CODE ###\n")
        console.log("Connecting to MongoDB...")
        db = await mongoose(mongoConnectionString)
        console.log('MongoDB connected\n')
    } catch (err) {
        console.error('Error connecting to database:', err)
    }
}

// Wrap everything in an async function, so we can use await to wait for the MongoDB connection
(async () => {

    // Connect to MongoDB
    await initMongoose()

    // Load the tags from the JSON file
    await loadTags()

    // Create the Express app
    const app = express()
    app.use(bodyParser.json())

    // Serve static files from the frontend/dist directory
    app.use(express.static(path.join(__dirname, '../frontend/dist')))

    ///////////////////////////
    // CRUD operations
    ///////////////////////////

    // Read Tags
    app.get('/api/tags', (req, res) => {
        console.log('GET /api/tags')
        res.json(tags)
    })

    // Read Recipes
    app.get('/api/recipes', async (req, res) => {
        try {
            const recipes = await getAllRecipes();
            res.json(recipes); 
            console.log('GET /api/recipes');
        } catch (error) {
            console.error("Failed to retrieve recipes:", error);
            res.status(500).send("Failed to retrieve recipes due to internal server error.");
        }
    });

    // //Login opetation in progress
    // app.post('/api/login', async (req, res) => {
    //     try{
    //         const {email, password} = req.body;
    //         const user = await User({email, password});
    //         if(user){
    //             res.status(200).send('Login successful');
    //         }
    //     } catch (error) {
    //         res.status(401).send('Login failed');
            
    //     }
    // });

    // app.post('/api/register', async (req, res) => {
    //     try{
    //         const {email, password} = req.body;
    //         const user = await User.findOne({email});
    //         if (!user || !(await user.comparePassword(password))) {
    //             return res.status(401).send('Authentication failed');
    //         }
    //         res.send("User logged in successfully");
    //     } catch (error) {
    //         res.status(500).send(error);
    //     }
    // });

    // Create a recipe
    app.post('/api/recipes', async (req, res) => {
        console.log('POST /api/recipes')
        const {title, ingredients, description, tags} = req.body
        const recipe = { 'title': title, 'ingredients': ingredients, 'description': description, 'tags': tags};
        const success = await queries.createRecipe(recipe)
        if (!success) {
            console.log('> Recipe not created')
            res.status(404).send({id: recipe._id});
        } else {
            console.log('> Recipe created')
            res.status(201).json()
        }
    })

    // Edit a recipe
    app.put('/api/recipes/:id', async (req, res) => {
        const {id} = req.params
        console.log('PUT /api/recipes/' + id)
        const {title, ingredients, description, tags} = req.body
        const recipe = { 'id': id, 'title': title, 'ingredients': ingredients, 'description': description, 'tags': tags};
        const success = await queries.updateRecipe(id, recipe)
        if (!success) {
            console.log('> Recipe not found')
            res.status(404).send('Recipe not found')
        } else {
            console.log('> Recipe updated')
            res.status(200).send('Recipe updated')
        }
    })

    // Delete a recipe
    app.delete('/api/recipes/:id', async (req, res) => {
        const {id} = req.params
        console.log('DELETE /api/recipes/' + id)
        const success = await queries.deleteRecipe(id)
        if (!success) {
            console.log('> Recipe not found')
            res.status(404).send('Recipe not found')
        } else {
            console.log('> Recipe deleted')
            res.status(200).send('Recipe deleted')
        }
    })

    ///////////////////////////
    // Start the server
    ///////////////////////////

    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000\n')
    })

})()
