"use client";

import Button, { ButtonProps } from "./button/Button";

interface MailToButtonProps extends ButtonProps {
  email: string;
  subject: string;
  body: string;
  children: React.ReactNode;
}

const MailToButton = ({
  email,
  subject,
  body,
  children,
  ...props
}: MailToButtonProps) => {
  const openMailClient = () => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    const link = document.createElement("a");
    link.setAttribute("href", mailtoLink);
    link.click();
  };

  return (
    <Button
      variant="primary"
      onClick={openMailClient}
      className="flex items-center gap-x-2"
      {...props}
    >
      {children}
    </Button>
  );
};

export default MailToButton;
