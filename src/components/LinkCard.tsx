import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Trash2, TrendingUp } from "lucide-react";
import { Link } from "@/types";

interface LinkCardProps {
  link: Link;
  onDelete: (id: string) => void;
  onVisit: (id: string) => void;
}

export function LinkCard({ link, onDelete, onVisit }: LinkCardProps) {
  const handleVisit = () => {
    onVisit(link.id);
    window.open(link.url, '_blank');
  };

  return (
    <Card className="p-4 hover:shadow-glow transition-all duration-300 bg-gradient-secondary border-border/50 group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          {link.favicon && (
            <img 
              src={link.favicon} 
              alt="" 
              className="w-5 h-5 rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {link.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {new URL(link.url).hostname}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(link.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {link.category}
          </Badge>
          {link.clickCount > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              {link.clickCount}
            </div>
          )}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleVisit}
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}