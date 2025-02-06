import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Github, Book, Code, MessagesSquare, ExternalLink } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
            Nova Dynamics
          </a>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/docs">
            <a className="text-sm font-medium flex items-center gap-2">
              <Book className="w-4 h-4" />
              Documentation
            </a>
          </Link>
          <Link href="/examples">
            <a className="text-sm font-medium flex items-center gap-2">
              <Code className="w-4 h-4" />
              Examples
            </a>
          </Link>
          <Link href="/community">
            <a className="text-sm font-medium flex items-center gap-2">
              <MessagesSquare className="w-4 h-4" />
              Community
            </a>
          </Link>
          <a 
            href="https://nova-dynamics.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Enterprise
          </a>
          <Button variant="outline" size="sm">
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
        </nav>
      </div>
    </header>
  );
}