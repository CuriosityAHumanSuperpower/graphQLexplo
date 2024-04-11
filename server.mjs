import express from "express" 
import { createHandler } from "graphql-http/lib/use/express"; 
import { buildSchema } from "graphql"

// Initialize a GraphQL schema

var schema = buildSchema(`
    type Query { 
        hello : String
    }
`)

// Root resolver

var root = { 
    hello : () => 'Hello word !'
}

// Create an express server with a GraphQL endpoint
var app = express();

app.use('/graphql', createHandler({
    schema,  // Must be provided
    rootValue: root,
    graphiql: true,  // Enable GraphiQL when server endpoint is accessed in browser
  }));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
