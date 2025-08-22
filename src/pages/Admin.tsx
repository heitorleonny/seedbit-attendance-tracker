import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Download, 
  Filter, 
  TrendingUp, 
  Users, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle 
} from "lucide-react";
import Header from "@/components/Layout/Header";

// Mock data - substituir por dados reais do backend
const mockData = {
  absences: [
    {
      id: 1,
      name: "Ana Silva",
      area: "Projetos",
      eventType: "Reunião Geral",
      eventDate: "2024-01-15",
      justification: "Consulta médica de emergência",
      isJustified: true,
      createdAt: "2024-01-15T10:30:00"
    },
    {
      id: 2,
      name: "João Santos",
      area: "Negócios",
      eventType: "Treinamento",
      eventDate: "2024-01-20",
      justification: "Prova na universidade",
      isJustified: true,
      createdAt: "2024-01-20T14:15:00"
    },
    {
      id: 3,
      name: "Maria Costa",
      area: "Institucional", 
      eventType: "Reunião de Área",
      eventDate: "2024-01-25",
      justification: "Esqueci do horário",
      isJustified: false,
      createdAt: "2024-01-25T16:45:00"
    }
  ],
  stats: {
    totalAbsences: 15,
    justifiedAbsences: 12,
    unjustifiedAbsences: 3,
    justificationRate: 80
  }
};

const Admin = () => {
  const [filter, setFilter] = useState({
    area: "todas",
    eventType: "todos",
    justified: "todos"
  });

  const areas = ["todas", "Institucional", "Negócios", "Operações", "Projetos"];
  const eventTypes = ["todos", "Reunião Geral", "Processo Eleitoral", "Treinamento", "Reunião de Área", "Imersão", "Evento MEJ", "Outro"];

  const filteredAbsences = mockData.absences.filter(absence => {
    return (
      (filter.area === "todas" || absence.area === filter.area) &&
      (filter.eventType === "todos" || absence.eventType === filter.eventType) &&
      (filter.justified === "todos" || 
       (filter.justified === "sim" && absence.isJustified) ||
       (filter.justified === "nao" && !absence.isJustified))
    );
  });

  const handleExportData = () => {
    // Simular exportação para CSV
    console.log("Exportando dados...");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Painel Administrativo</h1>
            <p className="text-muted-foreground">Gerencie e monitore as faltas da Seed a Bit</p>
          </div>
          <Button 
            onClick={handleExportData}
            className="bg-gradient-secondary text-secondary-foreground hover:opacity-90 shadow-elegant"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar Dados
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card hover:shadow-elegant transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Faltas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.stats.totalAbsences}</div>
              <p className="text-xs text-muted-foreground">
                +2 desde o mês passado
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faltas Justificadas</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{mockData.stats.justifiedAbsences}</div>
              <p className="text-xs text-muted-foreground">
                {mockData.stats.justificationRate}% do total
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faltas Não Justificadas</CardTitle>
              <XCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{mockData.stats.unjustifiedAbsences}</div>
              <p className="text-xs text-muted-foreground">
                {100 - mockData.stats.justificationRate}% do total
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Justificação</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.stats.justificationRate}%</div>
              <p className="text-xs text-muted-foreground">
                Meta: 90%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Lista */}
        <Tabs defaultValue="absences" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="absences">Lista de Faltas</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="absences" className="space-y-6">
            {/* Filtros */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Área</label>
                    <Select value={filter.area} onValueChange={(value) => setFilter(prev => ({...prev, area: value}))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {areas.map(area => (
                          <SelectItem key={area} value={area}>
                            {area === "todas" ? "Todas as áreas" : area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Tipo de Evento</label>
                    <Select value={filter.eventType} onValueChange={(value) => setFilter(prev => ({...prev, eventType: value}))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            {type === "todos" ? "Todos os tipos" : type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Status</label>
                    <Select value={filter.justified} onValueChange={(value) => setFilter(prev => ({...prev, justified: value}))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="sim">Justificadas</SelectItem>
                        <SelectItem value="nao">Não Justificadas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Faltas */}
            <div className="space-y-4">
              {filteredAbsences.map((absence) => (
                <Card key={absence.id} className="shadow-card hover:shadow-elegant transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{absence.name}</h3>
                          <Badge variant={absence.isJustified ? "default" : "destructive"} className="text-xs">
                            {absence.isJustified ? "Justificada" : "Não Justificada"}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {absence.area}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {absence.eventType} - {new Date(absence.eventDate).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        
                        <p className="text-sm bg-muted p-3 rounded-md">
                          <strong>Justificativa:</strong> {absence.justification}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredAbsences.length === 0 && (
                <Card className="shadow-card">
                  <CardContent className="text-center py-12">
                    <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nenhuma falta encontrada</h3>
                    <p className="text-muted-foreground">Tente ajustar os filtros para ver mais resultados.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Relatórios Detalhados
                </CardTitle>
                <CardDescription>
                  Análises e estatísticas das faltas por período, área e tipo de evento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Relatórios em Desenvolvimento</h3>
                  <p className="text-muted-foreground mb-4">
                    Esta seção conterá gráficos e análises detalhadas das faltas.
                  </p>
                  <Button variant="outline">
                    Ver Prévia dos Gráficos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;