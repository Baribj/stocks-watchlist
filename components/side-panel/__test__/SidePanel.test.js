import { render, screen } from "../../../utils/test-utils";

import SidePanel from "../SidePanel";

test("render footer design credits", () => {
  render(<SidePanel />);
  const designCreditsElement = screen.getByText(/Built by/i);
  expect(designCreditsElement).toBeInTheDocument();
});
