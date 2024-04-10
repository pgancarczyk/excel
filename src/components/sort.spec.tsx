import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Sort } from "./sort";

// this is a sample, just to show that testing is set up in the project

describe("Sort", () => {
  it("renders the component with a correct symbol", () => {
    render(<Sort sorting={"asc"} />);
    const span = screen.getByText("↓");
    expect(span).toBeInTheDocument();
  });
});
