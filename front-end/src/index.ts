import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    formatError: (error) => {
        console.error('GraphQL Error:', error);
        return error;
    }
});

const PORT = process.env.PORT || 4000;

server.listen(PORT).then(({ url }) => {
    console.log(`🚀 GraphQL server ready at ${url}`);
    console.log(`📊 GraphQL Playground available at ${url}`);
    console.log(`🔍 Introspection enabled`);
}); 