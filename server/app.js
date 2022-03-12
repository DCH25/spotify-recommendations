const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require('./schema').schema;
const request = require('request');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const axios = require('axios');

const {
    GraphQLID,
    GraphALString,
    GraphQLList,
    GraphQLType,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLObjectType
} = require("graphql");

var cors = require("cors");
require("dotenv").config();

const cookie = require('cookie');
var cors = require("cors");

var app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}))
    .use(cors())
    .use(cookieParser())
    .use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {httpOnly: true, secure: true, sameSite: true}
}));

app.listen(3001, () => {
    console.log("server running at 3001");
});

// Hide credentials from public repository
let mdb_password = process.env.MDB_PASSWORD;
let db_name = process.env.DB_NAME;

app.get('/', (req, res) => {
    res.send('hi')
})

app.get('/api/client_info', (req, res) => {
    return res.status(200).json({
        id: process.env.CLIENT_ID,
        secret: process.env.CLIENT_SECRET
    })
})

function make_query_without_access_token(json) {
    return Object.keys(json).map((key) => {
        if (key === 'access_token') {
            return null;
        } else {
            return key + "=" + json[key];
        }
    }).join('&');
}

// // Get Recommendations 
app.get('/api/recommendations', (req, res) => {
    axios.get('https://api.spotify.com/v1/recommendations?' + make_query_without_access_token(req.query).substring(1), {
        headers: {
            Authorization: ('Bearer ' + req.query.access_token)
        }
    }).then((response) => {
        console.log(response.data);
        res.status(200).json(response.data)
    }).catch((error) => {
        console.log(error);
        res.status(500).end(error)
    })
})

// Get Playlist Info
app.get('/api/playlists/:id', (req, res) => {
    axios.get('https://api.spotify.com/v1/playlists/' + req.params.id, {
        headers: {
            Authorization: ('Bearer ' + req.query.access_token)
        }
    }).then((response) => {
        console.log(response.data);
        res.status(200).json(response.data)
    }).catch((error) => {
        console.log(error);
        res.status(500).end(error)
    })
})

// Get Users Playlists
app.get('/api/playlists', (req, res) => {
    axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
            Authorization: ('Bearer ' + req.query.access_token)
        }
    }).then((response) => {
        console.log(response);
        res.status(200).json(response.data.items)
    }).catch((error) => {
        console.log(error);
        res.status(500).end(error)
    })
})

// Get users top tracks
app.get('/api/top_tracks', (req, res) => {
    axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50', {
        headers: {
            Authorization: ('Bearer ' + req.query.access_token)
        }
    }).then((response) => {
        console.log(response);
        res.status(200).json(response.data.items)
    }).catch((error) => {
        console.log(error);
        res.status(500).end(error)
    })
})

// Get users top artists
app.get('/api/top_artists', (req, res) => {
    axios.get('https://api.spotify.com/v1/me/top/artists?limit=50', {
        headers: {
            Authorization: ('Bearer ' + req.query.access_token)
        }
    }).then((response) => {
        console.log(response);
        res.status(200).json(response.data.items)
    }).catch((error) => {
        console.log(error);
        res.status(500).end(error)
    })
})

// Get current user profile
app.get('/api/user', (req, res) => {
    axios.get('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: ('Bearer ' + req.query.access_token)
        }
    }).then((response) => {
        console.log(response);
        res.status(200).json(response.data)
    }).catch((error) => {
        console.log(error);
        res.status(500).end(error)
    })
})

// Connect to DB
mongoose
    .connect("mongodb+srv://bestestcscc09group:" + mdb_password + "@cluster0.ykdmy.mongodb.net/" + db_name + "?retryWrites=true&w=majority")
    .then(() => console.log("Connected to database..."))
    .catch(err => console.log(err));