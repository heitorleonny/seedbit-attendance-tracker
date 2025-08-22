import Header from "@/components/Layout/Header";
import AttendanceForm from "@/components/Forms/AttendanceForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  BarChart3,
  ArrowRight
} from "lucide-react";

const Index = () => {
  // Mock stats para mostrar na home
  const stats = {
    totalMembers: 45,
    monthlyEvents: 12,
    justificationRate: 85
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-elegant">
            <Calendar className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Sistema de Gestão de Faltas
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Plataforma centralizada para registrar e acompanhar justificativas de faltas em eventos oficiais da Seed a Bit
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
            <Card className="shadow-card hover:shadow-elegant transition-shadow">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{stats.totalMembers}</div>
                <div className="text-sm text-muted-foreground">Membros Ativos</div>
              </CardContent>
            </Card>
            
            <Card className="shadow-card hover:shadow-elegant transition-shadow">
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <div className="text-2xl font-bold">{stats.monthlyEvents}</div>
                <div className="text-sm text-muted-foreground">Eventos/Mês</div>
              </CardContent>
            </Card>
            
            <Card className="shadow-card hover:shadow-elegant transition-shadow">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-success" />
                <div className="text-2xl font-bold">{stats.justificationRate}%</div>
                <div className="text-sm text-muted-foreground">Taxa Justificação</div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Access Button */}
          <div className="mb-12">
            <Link to="/admin">
              <Button 
                variant="outline" 
                className="border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-200"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Acesso Administrativo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Form */}
        <div className="flex justify-center">
          <AttendanceForm />
        </div>

        {/* Info Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto">
                <span className="text-primary-foreground font-bold">1</span>
              </div>
              <h3 className="font-semibold">Registre sua Falta</h3>
              <p className="text-sm text-muted-foreground">
                Preencha o formulário com os detalhes do evento que você faltou e sua justificativa.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mx-auto">
                <span className="text-secondary-foreground font-bold">2</span>
              </div>
              <h3 className="font-semibold">Análise Automática</h3>
              <p className="text-sm text-muted-foreground">
                O sistema registra e organiza automaticamente suas informações de forma centralizada.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">Acompanhamento</h3>
              <p className="text-sm text-muted-foreground">
                Diretores podem acompanhar relatórios e estatísticas no painel administrativo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
