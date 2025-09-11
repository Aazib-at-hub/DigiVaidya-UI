import { ReactNode } from "react";

export default function Placeholder({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl rounded-xl border bg-card p-8 shadow-sm">
        <h1 className="heading-serif text-2xl font-semibold text-primary mb-2">
          {title}
        </h1>
        <p className="text-muted-foreground">
          This section is coming next. Continue prompting to fill in this page.
        </p>
        {children}
      </div>
    </div>
  );
}
