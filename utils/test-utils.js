import { Provider } from "react-redux";
import store from "../app/store";
import { render } from "@testing-library/react";

function reduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

const reduxRender = (ui, options) =>
  render(ui, { wrapper: reduxProvider, ...options });

export * from "@testing-library/react";

export * from "@testing-library/jest-dom";

export { reduxRender as render };
