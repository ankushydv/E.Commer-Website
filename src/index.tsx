import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  // useQuery,
  // useMutation,
  // useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const client = new QueryClient()

ReactDOM.render(
  <QueryClientProvider  client={client}>
    <App />
  </QueryClientProvider>,
  document.getElementById("root")
);
