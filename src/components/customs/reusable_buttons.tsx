import { type ReactNode } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ReusableButtonsProps = Omit<ButtonProps, "children"> & {
  label: ReactNode;
  href?: string;
  gradient?: boolean;
};

const gradientClasses =
  "border border-[#f6e9d1]/35 bg-[linear-gradient(135deg,#f6b05d_0%,#f2a24a_26%,#1d8fca_64%,#0b2453_100%)] bg-[length:220%_220%] text-[#fff8ea] shadow-[0_0_0_1px_rgba(246,233,209,0.28),0_0_20px_rgba(29,143,202,0.45),0_14px_30px_rgba(11,36,83,0.5)] hover:translate-y-[-2px] hover:bg-[position:100%_0%] hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(246,233,209,0.35),0_0_28px_rgba(246,176,93,0.55),0_18px_36px_rgba(11,36,83,0.58)]";

export const ReusableButtons = ({
  label,
  href,
  gradient = true,
  className,
  variant = "default",
  ...props
}: ReusableButtonsProps) => {
  const buttonClassName = cn(gradient ? gradientClasses : "", className);

  if (href) {
    return (
      <Button asChild variant={variant} className={buttonClassName} {...props}>
        <a href={href}>{label}</a>
      </Button>
    );
  }

  return (
    <Button variant={variant} className={buttonClassName} {...props}>
      {label}
    </Button>
  );
};
