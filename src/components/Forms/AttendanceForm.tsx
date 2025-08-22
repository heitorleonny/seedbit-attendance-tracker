import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { CalendarX, FileText, Users, MapPin } from "lucide-react";

const AttendanceForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    eventType: "",
    eventDate: "",
    justification: "",
    isJustified: ""
  });
  const { toast } = useToast();

  const areas = [
    "Institucional",
    "Negócios", 
    "Operações",
    "Projetos"
  ];

  const eventTypes = [
    "Reunião Geral",
    "Processo Eleitoral", 
    "Treinamento",
    "Reunião de Área",
    "Imersão",
    "Evento MEJ",
    "Outro"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name || !formData.area || !formData.eventType || !formData.eventDate || !formData.justification || !formData.isJustified) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    // Simular envio (aqui conectaria com o backend)
    console.log("Dados da falta:", formData);
    
    toast({
      title: "Falta registrada!",
      description: "Sua justificativa foi enviada com sucesso.",
      className: "bg-success text-success-foreground"
    });

    // Reset form
    setFormData({
      name: "",
      area: "",
      eventType: "",
      eventDate: "",
      justification: "",
      isJustified: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <CalendarX className="w-8 h-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold">Registrar Falta</CardTitle>
        <CardDescription>
          Preencha o formulário para justificar sua ausência em um evento oficial da Seed a Bit
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Nome Completo
            </Label>
            <Input
              id="name"
              placeholder="Digite seu nome completo"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="transition-all duration-200 focus:shadow-elegant"
            />
          </div>

          {/* Área */}
          <div className="space-y-2">
            <Label htmlFor="area" className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Área
            </Label>
            <Select value={formData.area} onValueChange={(value) => handleInputChange("area", value)}>
              <SelectTrigger className="transition-all duration-200 focus:shadow-elegant">
                <SelectValue placeholder="Selecione sua área" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo de Evento */}
          <div className="space-y-2">
            <Label htmlFor="eventType" className="text-sm font-medium flex items-center gap-2">
              <CalendarX className="w-4 h-4" />
              Tipo de Evento
            </Label>
            <Select value={formData.eventType} onValueChange={(value) => handleInputChange("eventType", value)}>
              <SelectTrigger className="transition-all duration-200 focus:shadow-elegant">
                <SelectValue placeholder="Selecione o tipo de evento" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Data do Evento */}
          <div className="space-y-2">
            <Label htmlFor="eventDate" className="text-sm font-medium">
              Data do Evento
            </Label>
            <Input
              id="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={(e) => handleInputChange("eventDate", e.target.value)}
              className="transition-all duration-200 focus:shadow-elegant"
            />
          </div>

          {/* Justificativa */}
          <div className="space-y-2">
            <Label htmlFor="justification" className="text-sm font-medium flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Justificativa
            </Label>
            <Textarea
              id="justification"
              placeholder="Descreva detalhadamente o motivo da sua ausência..."
              value={formData.justification}
              onChange={(e) => handleInputChange("justification", e.target.value)}
              className="min-h-[120px] transition-all duration-200 focus:shadow-elegant resize-none"
            />
          </div>

          {/* Falta Justificada */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Esta falta deve ser considerada justificada?</Label>
            <RadioGroup 
              value={formData.isJustified} 
              onValueChange={(value) => handleInputChange("isJustified", value)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="justified-yes" />
                <Label htmlFor="justified-yes" className="text-sm">
                  Sim - Motivo válido conforme regulamento
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="justified-no" />
                <Label htmlFor="justified-no" className="text-sm">
                  Não - Assumo que é falta não justificada
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>

        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant transition-all duration-200 hover:shadow-lg"
            size="lg"
          >
            Enviar Justificativa
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AttendanceForm;