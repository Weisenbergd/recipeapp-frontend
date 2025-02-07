import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./routes/Main.tsx";
import SingleRecipe from "./routes/SingleRecipe.tsx";
import PostRecipe from "./routes/PostRecipe.tsx";
import Root from "./routes/Root.tsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Signup from "./routes/Signup.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { ModalContextProvider } from "./context/ModalContext.tsx";

const App = () => {
  const httpLink = createHttpLink({
    uri: "https://recipeapp-backend-production.up.railway.app",
    // uri: ["http://localhost:4000/"],
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        ...headers,
        authorization: token ? token : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getFiltered: {
              keyArgs: ["ingredientList"], // Ensures cache separation for different queries
              merge(existing = { recipes: [], totalCount: 0 }, incoming) {
                return {
                  ...incoming, // Keep totalCount from the latest fetch
                  recipes: [...existing.recipes, ...incoming.recipes], // Merge recipes properly
                };
              },
            },
          },
        },
      },
    }),
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Main />,
        },
        {
          path: "/about",
          element: <div>about</div>,
        },
        {
          path: "/new",
          element: <PostRecipe />,
        },
        {
          path: "/user",
          element: <p>user</p>,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: ":recipeId",
          element: <SingleRecipe />,
        },
      ],
    },
  ]);

  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <ModalContextProvider>
          <RouterProvider router={router} />
        </ModalContextProvider>
      </AuthContextProvider>
    </ApolloProvider>
  );
};
export default App;
