import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tv } from "lucide-react";
import { Series } from "@/types";

interface AddSeriesDialogProps {
  onAddSeries: (series: Omit<Series, 'id' | 'lastWatched' | 'clickCount'>) => void;
}

export function AddSeriesDialog({ onAddSeries }: AddSeriesDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [currentSeason, setCurrentSeason] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    onAddSeries({
      title,
      url,
      currentSeason,
      currentEpisode
    });
    
    setTitle("");
    setUrl("");
    setCurrentSeason(1);
    setCurrentEpisode(1);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
          <Tv className="h-4 w-4 mr-2" />
          Adicionar Série
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Série</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="series-title">Título da Série</Label>
            <Input
              id="series-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nome da série"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="series-url">URL</Label>
            <Input
              id="series-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://streaming.com/serie"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="season">Temporada Atual</Label>
              <Input
                id="season"
                type="number"
                min="1"
                value={currentSeason}
                onChange={(e) => setCurrentSeason(Number(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="episode">Episódio Atual</Label>
              <Input
                id="episode"
                type="number"
                min="1"
                value={currentEpisode}
                onChange={(e) => setCurrentEpisode(Number(e.target.value))}
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Adicionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}