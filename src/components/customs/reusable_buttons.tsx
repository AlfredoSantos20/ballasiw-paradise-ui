import { type ReactNode } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ReusableButtonsProps = Omit<ButtonProps, "children"> & {
  label: ReactNode;
  href?: string;
  gradient?: boolean;
};

const gradientClasses =
  "border border-[#ffe3bd]/45 bg-[linear-gradient(135deg,#f97316,#fb923c,#fdba74)] bg-[length:220%_220%] text-[#fff8ea] shadow-[0_0_0_1px_rgba(255,227,189,0.35),0_0_20px_rgba(246,168,79,0.55),0_14px_30px_rgba(237,150,64,0.5)] hover:translate-y-[-2px] hover:bg-[linear-gradient(135deg,#f97316,#fb923c,#fdba74)] hover:bg-[position:100%_0%] hover:brightness-110 hover:text-[#fff8ea] hover:shadow-[0_0_0_1px_rgba(255,227,189,0.45),0_0_30px_rgba(255,190,106,0.7),0_18px_38px_rgba(237,150,64,0.6)]";

export const ReusableButtons = ({
  label,
  href,
  gradient = true,
  className,
  variant = "default",
  ...props
}: ReusableButtonsProps) => {
  const buttonClassName = cn(gradient ? gradientClasses : "", className);
  const resolvedVariant = gradient ? "ghost" : variant;

  if (href) {
    return (
      <Button asChild variant={resolvedVariant} className={buttonClassName} {...props}>
        <a href={href}>{label}</a>
      </Button>
    );
  }

  return (
    <Button variant={resolvedVariant} className={buttonClassName} {...props}>
      {label}
    </Button>
  );
};
