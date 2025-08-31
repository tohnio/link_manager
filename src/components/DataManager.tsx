import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Download, Upload, MoreVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link, Series } from "@/types";

interface DataManagerProps {
  links: Link[];
  series: Series[];
  setLinks: (links: Link[]) => void;
  setSeries: (series: Series[]) => void;
}

export const DataManager = ({ links, series, setLinks, setSeries }: DataManagerProps) => {
  const [importing, setImporting] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportData = () => {
    const data = {
      links,
      series,
      exportDate: new Date().toISOString(),
      version: "1.0"
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `linkmanager-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Dados exportados!",
      description: "O arquivo de backup foi baixado com sucesso."
    });
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      toast({
        title: "Erro no arquivo",
        description: "Por favor, selecione um arquivo JSON válido.",
        variant: "destructive"
      });
      return;
    }

    setImporting(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);

        // Validar estrutura básica
        if (!data.links || !data.series || !Array.isArray(data.links) || !Array.isArray(data.series)) {
          throw new Error("Estrutura de dados inválida");
        }

        // Validar e limpar dados dos links
        const validLinks = data.links.filter((link: Partial<Link>) =>
          link.id && link.title && link.url && link.category
        ).map((link: Partial<Link>) => ({
          id: link.id!,
          title: link.title!,
          url: link.url!,
          category: link.category!,
          clickCount: Number(link.clickCount) || 0,
          createdAt: link.createdAt ? new Date(link.createdAt) : new Date(),
          favicon: link.favicon
        }));

        // Validar e limpar dados das séries
        const validSeries = data.series.filter((series: Partial<Series>) =>
          series.id && series.title && series.url
        ).map((series: Partial<Series>) => ({
          id: series.id!,
          title: series.title!,
          url: series.url!,
          currentSeason: Number(series.currentSeason) || 1,
          currentEpisode: Number(series.currentEpisode) || 1,
          totalSeasons: series.totalSeasons ? Number(series.totalSeasons) : undefined,
          totalEpisodes: series.totalEpisodes ? Number(series.totalEpisodes) : undefined,
          clickCount: Number(series.clickCount) || 0,
          lastWatched: series.lastWatched ? new Date(series.lastWatched) : new Date(),
          poster: series.poster
        }));

        setLinks(validLinks);
        setSeries(validSeries);

        toast({
          title: "Dados importados!",
          description: `${validLinks.length} links e ${validSeries.length} séries foram importados.`
        });

      } catch (error) {
        console.error('Erro ao importar:', error);
        toast({
          title: "Erro na importação",
          description: "Não foi possível importar os dados. Verifique se o arquivo está correto.",
          variant: "destructive"
        });
      } finally {
        setImporting(false);
        event.target.value = '';
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Exportar dados
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
            <Upload className="h-4 w-4 mr-2" />
            {importing ? "Importando..." : "Importar dados"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileImport}
        className="hidden"
        disabled={importing}
      />
    </>
  );
};
