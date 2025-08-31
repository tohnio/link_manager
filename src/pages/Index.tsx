import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Link as LinkIcon, Tv, Filter } from "lucide-react";
import { LinkCard } from "@/components/LinkCard";
import { SeriesCard } from "@/components/SeriesCard";
import { AddLinkDialog } from "@/components/AddLinkDialog";
import { AddSeriesDialog } from "@/components/AddSeriesDialog";
import { TopLinksSection } from "@/components/TopLinksSection";
import { DataManager } from "@/components/DataManager";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Link, Series } from "@/types";
import { useToast } from "@/hooks/use-toast";

const defaultCategories = [
  "Trabalho", "Estudos", "Entretenimento", "Redes Sociais", 
  "Notícias", "Tecnologia", "Compras", "Outros"
];

const Index = () => {
  const [links, setLinks] = useLocalStorage<Link[]>('bookmarks-links', []);
  const [series, setSeries] = useLocalStorage<Series[]>('bookmarks-series', []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const { toast } = useToast();

  const categories = ["Todos", ...defaultCategories];

  const addLink = (newLink: Omit<Link, 'id' | 'clickCount' | 'createdAt'>) => {
    const link: Link = {
      ...newLink,
      id: Date.now().toString(),
      clickCount: 0,
      createdAt: new Date()
    };
    setLinks(prev => [link, ...prev]);
    toast({
      title: "Link adicionado!",
      description: `${link.title} foi adicionado aos seus favoritos.`
    });
  };

  const addSeries = (newSeries: Omit<Series, 'id' | 'lastWatched' | 'clickCount'>) => {
    const series: Series = {
      ...newSeries,
      id: Date.now().toString(),
      lastWatched: new Date(),
      clickCount: 0
    };
    setSeries(prev => [series, ...prev]);
    toast({
      title: "Série adicionada!",
      description: `${series.title} foi adicionada à sua lista.`
    });
  };

  const deleteLink = (id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
    toast({
      title: "Link removido",
      description: "O link foi removido dos seus favoritos."
    });
  };

  const deleteSeries = (id: string) => {
    setSeries(prev => prev.filter(series => series.id !== id));
    toast({
      title: "Série removida",
      description: "A série foi removida da sua lista."
    });
  };

  const visitLink = (id: string) => {
    setLinks(prev => prev.map(link => 
      link.id === id 
        ? { ...link, clickCount: link.clickCount + 1 }
        : link
    ));
  };

  const visitSeries = (id: string) => {
    setSeries(prev => prev.map(s => 
      s.id === id 
        ? { ...s, lastWatched: new Date(), clickCount: s.clickCount + 1 }
        : s
    ));
  };

  const updateSeriesEpisode = (id: string, season: number, episode: number) => {
    setSeries(prev => prev.map(s => 
      s.id === id 
        ? { ...s, currentSeason: season, currentEpisode: episode, lastWatched: new Date() }
        : s
    ));
    toast({
      title: "Progresso atualizado!",
      description: `Episódio ${episode} da temporada ${season} marcado.`
    });
  };

  const filteredLinks = links.filter(link => {
    const matchesSearch = link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         link.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || link.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredSeries = series.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <LinkIcon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  LinkManager
                </h1>
                <p className="text-sm text-muted-foreground">
                  Organize seus links e séries favoritas
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DataManager 
                links={links}
                series={series}
                setLinks={setLinks}
                setSeries={setSeries}
              />
              <AddSeriesDialog onAddSeries={addSeries} />
              <AddLinkDialog categories={defaultCategories} onAddLink={addLink} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar links e séries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-gradient-primary" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Top Content */}
        <div className="mb-8">
          <TopLinksSection links={links} series={series} onVisit={visitLink} onVisitSeries={visitSeries} />
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="series" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="series" className="flex items-center gap-2">
              <Tv className="h-4 w-4" />
              Séries ({filteredSeries.length})
            </TabsTrigger>
            <TabsTrigger value="links" className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              Links ({filteredLinks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="links" className="space-y-4">
            {filteredLinks.length === 0 ? (
              <Card className="p-12 text-center bg-gradient-secondary border-border/50">
                <LinkIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {searchTerm || selectedCategory !== "Todos" 
                    ? "Nenhum link encontrado" 
                    : "Adicione seu primeiro link"
                  }
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || selectedCategory !== "Todos"
                    ? "Tente ajustar os filtros de busca"
                    : "Organize seus sites favoritos em um só lugar"
                  }
                </p>
                {!searchTerm && selectedCategory === "Todos" && (
                  <AddLinkDialog categories={defaultCategories} onAddLink={addLink} />
                )}
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredLinks.map((link) => (
                  <LinkCard
                    key={link.id}
                    link={link}
                    onDelete={deleteLink}
                    onVisit={visitLink}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="series" className="space-y-4">
            {filteredSeries.length === 0 ? (
              <Card className="p-12 text-center bg-gradient-secondary border-border/50">
                <Tv className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {searchTerm 
                    ? "Nenhuma série encontrada" 
                    : "Adicione sua primeira série"
                  }
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm
                    ? "Tente ajustar a busca"
                    : "Acompanhe o progresso das suas séries favoritas"
                  }
                </p>
                {!searchTerm && (
                  <AddSeriesDialog onAddSeries={addSeries} />
                )}
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredSeries.map((s) => (
                  <SeriesCard
                    key={s.id}
                    series={s}
                    onDelete={deleteSeries}
                    onUpdateEpisode={updateSeriesEpisode}
                    onVisit={visitSeries}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;