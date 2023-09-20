import GameInstructions from "@/app/components/game/GameInstructions";
import { render, screen } from "@testing-library/react";

describe("GameInstructions", () => {
  it("should have 'Game Instructions' header text", () => {
    render(<GameInstructions />); // ARRANGE
    const myHeader = screen.getByText(/Game Instructions/i); // ACT
    expect(myHeader).toBeTruthy; // ASSERT
  });
});
