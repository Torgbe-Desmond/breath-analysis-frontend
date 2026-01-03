import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./features/store";
import { Provider } from "react-redux";
import { ThemeProviderWrapper } from "./ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProviderWrapper>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProviderWrapper>
  </BrowserRouter>
);
