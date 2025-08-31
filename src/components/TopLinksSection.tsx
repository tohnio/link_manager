import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, ExternalLink, Crown, Play, Tv } from "lucide-react";
import { Link, Series } from "@/types";

interface TopLinksSectionProps {
  links: Link[];
  series: Series[];
  onVisit: (id: string) => void;
  onVisitSeries: (id: string) => void;
}

export function TopLinksSection({ links, series, onVisit, onVisitSeries }: TopLinksSectionProps) {
  const topLinks = links
    .filter(link => link.clickCount > 0)
    .sort((a, b) => b.clickCount - a.clickCount)
    .slice(0, 2);

  const topSeries = series
    .filter(s => s.clickCount > 0)
    .sort((a, b) => b.clickCount - a.clickCount)
    .slice(0, 2);

  const hasTopContent = topLinks.length > 0 || topSeries.length > 0;

  if (!hasTopContent) {
    return (
      <Card className="p-6 bg-gradient-secondary border-border/50">
        <div className="text-center">
          <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Mais Acessados</h3>
          <p className="text-muted-foreground">
            Suas séries e links mais acessados aparecerão aqui
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-secondary border-border/50">
      <div className="flex items-center gap-2 mb-6">
        <Crown className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Mais Acessados</h3>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Séries Recentes */}
        {topSeries.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tv className="h-4 w-4 text-primary" />
              <h4 className="font-medium">Séries Mais Assistidas</h4>
            </div>
            <div className="space-y-2">
              {topSeries.map((s, index) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors group"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-primary text-primary-foreground font-bold text-xs">
                      {index + 1}
                    </div>
                    {s.poster && (
                      <img 
                        src={s.poster} 
                        alt="" 
                        className="w-6 h-8 rounded object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {s.title}
                      </h5>
                      <p className="text-xs text-muted-foreground">
                        T{s.currentSeason} • Ep. {s.currentEpisode} • {s.clickCount} views
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onVisitSeries(s.id);
                      window.open(s.url, '_blank');
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Play className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links Mais Acessados */}
        {topLinks.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h4 className="font-medium">Links Populares</h4>
            </div>
            <div className="space-y-2">
              {topLinks.map((link, index) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors group"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-primary text-primary-foreground font-bold text-xs">
                      {index + 1}
                    </div>
                    {link.favicon && (
                      <img 
                        src={link.favicon} 
                        alt="" 
                        className="w-4 h-4 rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {link.title}
                      </h5>
                      <p className="text-xs text-muted-foreground truncate">
                        {new URL(link.url).hostname}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {link.clickCount}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        onVisit(link.id);
                        window.open(link.url, '_blank');
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}