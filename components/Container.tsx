import { cn } from "@/lib/utils";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("px-3 md:px-10", className)}>{children}</div>
  );
};

export default Container;
