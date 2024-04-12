//Packages 
import express from "express" 
import { createHandler } from "graphql-http/lib/use/express"; 
import { buildSchema } from "graphql"
import { ruruHTML } from "ruru/server"

// Initialize a GraphQL schema

/*
type Query ~ GET (REST)
type Mutation ~ PUT/POST/DELETE (REST)
*/
var schema = buildSchema(` 
    type Query { 
        user(id : Int!) : Person
        users(shark : String) : [Person]
    }
    type Person {
        id : Int
        name : String
        age : Int
        shark : String
    }
`)

// Root resolver

var getUser = ({id}) => {//return a single user
    return users.filter(user => user.id = id)[0]
} 
var retrieveUsers  = ({shark}) => {//return a list of users
    if (!!shark) return users.filter(user => user.shark = shark)
    return users
} 

var root = { 
    user : getUser, 
    users: retrieveUsers
}

// Sample users
var users = [
    {
      id: 1,
      name: 'Brian',
      age: '21',
      shark: 'Great White Shark'
    },
    {
      id: 2,
      name: 'Kim',
      age: '22',
      shark: 'Whale Shark'
    },
    {
      id: 3,
      name: 'Faith',
      age: '23',
      shark: 'Hammerhead Shark'
    },
    {
      id: 4,
      name: 'Joseph',
      age: '23',
      shark: 'Tiger Shark'
    },
    {
      id: 5,
      name: 'Joy',
      age: '25',
      shark: 'Hammerhead Shark'
    }
  ];

// Create an express server with a GraphQL endpoint
var app = express()

app.use('/graphql', createHandler({
    schema,  // Must be provided
    rootValue: root,
  }))

// Serve the GraphiQL IDE (Enable GraphiQL when server endpoint is accessed in browser)
app.get("/", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
  })

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'))
