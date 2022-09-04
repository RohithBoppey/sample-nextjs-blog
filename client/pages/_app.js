import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

function MyApp({ Component, pageProps }) {

  const client = new ApolloClient({
		uri: "http://localhost:1337/graphql",
		cache: new InMemoryCache(),
	});

	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	);
}

export default MyApp;
