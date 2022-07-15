import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { ApolloProvider } from "@apollo/client";
import { client } from "./config/apollo";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <ApolloProvider client={client}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ApolloProvider>
    </Auth0Provider>
  );
}

export default App;
