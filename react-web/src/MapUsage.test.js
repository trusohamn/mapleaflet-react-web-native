import { render, screen, fireEvent } from "@testing-library/react";
import MapUsage from "./MapUsage";

test("does not break on click", () => {
  render(<MapUsage />);
  const map = screen.getByTestId("mapl");
  fireEvent.click(map);
});
