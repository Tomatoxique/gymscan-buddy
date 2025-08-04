import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Dumbbell, ArrowLeft, Plus, Clock, Target } from "lucide-react";
import { Link } from "wouter";

const Planner = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Dumbbell className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold gym-text-gradient">GymBuddy</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Planner Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4">
            <Calendar className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Planificateur d'entraînement</h2>
          <p className="text-muted-foreground">
            Organise tes séances et crée des programmes personnalisés
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Nouveau programme</CardTitle>
                <Plus className="h-5 w-5 text-primary" />
              </div>
              <CardDescription>
                Crée un programme d'entraînement personnalisé
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full gym-gradient gym-shadow">
                Créer un programme
              </Button>
            </CardContent>
          </Card>

          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Programme Push/Pull/Legs</CardTitle>
                <Badge variant="secondary">3 jours</Badge>
              </div>
              <CardDescription>
                Programme complet pour débutants
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                45-60 min par séance
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="h-4 w-4" />
                Développement musculaire
              </div>
              <Button variant="outline" className="w-full">
                Voir le programme
              </Button>
            </CardContent>
          </Card>

          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Full Body</CardTitle>
                <Badge variant="secondary">3 jours</Badge>
              </div>
              <CardDescription>
                Entraînement complet du corps
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                30-45 min par séance
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="h-4 w-4" />
                Force générale
              </div>
              <Button variant="outline" className="w-full">
                Voir le programme
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Calendrier de la semaine</h3>
          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-7 gap-4 text-center">
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, index) => (
                  <div key={index} className="space-y-2">
                    <div className="font-semibold text-sm">{day}</div>
                    <div className={`h-16 rounded-lg border-2 border-dashed ${
                      index === 1 || index === 3 || index === 5 
                        ? 'border-primary bg-primary/10' 
                        : 'border-muted-foreground/25'
                    } flex items-center justify-center`}>
                      {index === 1 && <span className="text-xs text-primary font-medium">Push</span>}
                      {index === 3 && <span className="text-xs text-primary font-medium">Pull</span>}
                      {index === 5 && <span className="text-xs text-primary font-medium">Legs</span>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Planner;