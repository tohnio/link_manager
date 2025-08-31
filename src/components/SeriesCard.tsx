import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Plus, Minus, ExternalLink, Trash2 } from "lucide-react";
import { Series } from "@/types";

interface SeriesCardProps {
  series: Series;
  onDelete: (id: string) => void;
  onUpdateEpisode: (id: string, season: number, episode: number) => void;
  onVisit: (id: string) => void;
}

export function SeriesCard({ series, onDelete, onUpdateEpisode, onVisit }: SeriesCardProps) {
  const handleVisit = () => {
    onVisit(series.id);
    window.open(series.url, '_blank');
  };

  const incrementEpisode = () => {
    onUpdateEpisode(series.id, series.currentSeason, series.currentEpisode + 1);
  };

  const decrementEpisode = () => {
    if (series.currentEpisode > 1) {
      onUpdateEpisode(series.id, series.currentSeason, series.currentEpisode - 1);
    }
  };

  const incrementSeason = () => {
    onUpdateEpisode(series.id, series.currentSeason + 1, 1);
  };

  const decrementSeason = () => {
    if (series.currentSeason > 1) {
      onUpdateEpisode(series.id, series.currentSeason - 1, 1);
    }
  };

  return (
    <Card className="p-4 hover:shadow-glow transition-all duration-300 bg-gradient-secondary border-border/50 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          {series.poster && (
            <img 
              src={series.poster} 
              alt={series.title}
              className="w-12 h-16 rounded object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {series.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              Temporada {series.currentSeason} • Episódio {series.currentEpisode}
            </p>
            <p className="text-xs text-muted-foreground">
              Assistido em {new Date(series.lastWatched).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(series.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Controles de Temporada */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={decrementSeason}
              disabled={series.currentSeason <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Badge variant="secondary" className="text-xs">
              T{series.currentSeason}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={incrementSeason}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          {/* Controles de Episódio */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={decrementEpisode}
              disabled={series.currentEpisode <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Badge variant="default" className="bg-gradient-primary">
              Ep. {series.currentEpisode}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={incrementEpisode}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleVisit}
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Play className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}