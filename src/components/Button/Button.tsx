import React, { forwardRef } from "react";
import "./Button.scss";

export type ButtonVariant = "primary" | "secondary" | "danger" | "muted";
export type ButtonSize = "sm" | "md";

export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "secondary",
      size = "md",
      fullWidth = false,
      children,
      className = "",
      type = "button",
      ...rest
    },
    ref,
  ) => {
    const classes = [
      "button",
      `button_${variant}`,
      `button_${size}`,
      fullWidth ? "button_full-width" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} type={type} className={classes} {...rest}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default React.memo(Button);
