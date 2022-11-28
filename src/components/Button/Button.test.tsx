import { fireEvent, render, screen } from "@testing-library/react";
import Button, { ButtonProps } from "./Button";

// Sut: System Under Test
const makeSut = (props: Partial<ButtonProps>) => {
  return render(<Button label="label" onClick={jest.fn()} {...props} />);
};

describe("<Button />", () => {
  test("Should render label correctly", () => {
    const { getByText } = makeSut({ label: "Click Me!" });

    expect(getByText(/Click Me!/)).toBeInTheDocument();
  });

  test("Should call onClick successfully", () => {
    const spy = jest.fn();
    const { getByText } = makeSut({ onClick: spy });

    fireEvent.click(getByText(/label/));

    expect(spy).toHaveBeenCalled();
  });

  test("Should switch button label on click", () => {
    const { getByText } = makeSut({ label: "Hide" });
    const button = screen.getByTestId("button")

    fireEvent.click(button)

    expect(getByText(/Hide/)).toBeInTheDocument();
  });
});
