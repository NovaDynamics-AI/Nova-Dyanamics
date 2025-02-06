import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const items = [
    {
      title: "Getting Started",
      items: [
        { title: "Introduction", href: "/docs" },
        { title: "Installation", href: "/docs/installation" },
      ],
    },
    {
      title: "Core Concepts",
      items: [
        { title: "Plugin System", href: "/docs/plugins" },
        { title: "LLM Providers", href: "/docs/providers" },
      ],
    },
  ];

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Documentation</h2>
          <ScrollArea className="h-[calc(100vh-10rem)] px-2">
            <div className="space-y-1">
              {items.map((section, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="px-4 text-sm font-medium text-muted-foreground pt-4">
                    {section.title}
                  </h3>
                  {section.items.map((item, j) => (
                    <Link key={j} href={item.href}>
                      <a className="block px-4 py-2 text-sm hover:bg-accent rounded-md">
                        {item.title}
                      </a>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
