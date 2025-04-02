import Loader from "../icons/Loader";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  className?: string;
}

const Button = (props: ButtonProps) => {
  const {
    children,
    variant = "primary",
    size = "md",
    isLoading = false,
    icon,
    iconPosition = "left",
    fullWidth = false,
    className,
    disabled,
    ...rest
  } = props;

  return (
    <button
      className={`btn-base ${`btn-${variant}`} ${`btn-${size}`} ${
        fullWidth ? "w-full" : ""
      } ${className || ""}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && icon && iconPosition === "left" && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {!isLoading && icon && iconPosition === "right" && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default Button;
