import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Dumbbell, ArrowLeft, Star, Award, Target, Zap } from "lucide-react";
import { Link } from "wouter";

const Trophees = () => {
  const trophies = [
    {
      icon: Trophy,
      title: "Premier pas",
      description: "Complète ton premier entraînement",
      progress: 100,
      unlocked: true,
      points: 50
    },
    {
      icon: Target,
      title: "Précision parfaite",
      description: "Scanne 10 QR codes sans erreur",
      progress: 80,
      unlocked: false,
      points: 100
    },
    {
      icon: Zap,
      title: "Régularité",
      description: "Entraîne-toi 7 jours consécutifs",
      progress: 42,
      unlocked: false,
      points: 200
    },
    {
      icon: Award,
      title: "Champion du mois",
      description: "Termine dans le top 10 mensuel",
      progress: 25,
      unlocked: false,
      points: 500
    },
    {
      icon: Star,
      title: "Étoile montante",
      description: "Atteins 1000 points au total",
      progress: 65,
      unlocked: false,
      points: 300
    },
    {
      icon: Dumbbell,
      title: "Maître des poids",
      description: "Améliore ton PR sur 5 exercices",
      progress: 60,
      unlocked: false,
      points: 400
    }
  ];

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

      {/* Trophees Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4">
            <Trophy className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Tes trophées</h2>
          <p className="text-muted-foreground">
            Débloques des récompenses en atteignant tes objectifs
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">1,650</div>
              <div className="text-sm text-muted-foreground">Points totaux</div>
            </CardContent>
          </Card>
          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500 mb-1">1</div>
              <div className="text-sm text-muted-foreground">Trophées</div>
            </CardContent>
          </Card>
          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-500 mb-1">5</div>
              <div className="text-sm text-muted-foreground">En cours</div>
            </CardContent>
          </Card>
          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500 mb-1">#12</div>
              <div className="text-sm text-muted-foreground">Classement</div>
            </CardContent>
          </Card>
        </div>

        {/* Trophies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trophies.map((trophy, index) => (
            <Card 
              key={index} 
              className={`gym-shadow border-0 bg-card/50 backdrop-blur-sm transition-all duration-300 ${
                trophy.unlocked 
                  ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/50' 
                  : 'hover:gym-glow'
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                    trophy.unlocked ? 'bg-yellow-500' : 'bg-muted'
                  }`}>
                    <trophy.icon className={`h-6 w-6 ${
                      trophy.unlocked ? 'text-white' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <Badge variant={trophy.unlocked ? "default" : "secondary"}>
                    {trophy.points} pts
                  </Badge>
                </div>
                <CardTitle className={`text-lg ${
                  trophy.unlocked ? 'text-yellow-600' : ''
                }`}>
                  {trophy.title}
                  {trophy.unlocked && <Trophy className="inline h-4 w-4 ml-2 text-yellow-500" />}
                </CardTitle>
                <CardDescription>
                  {trophy.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression</span>
                    <span>{trophy.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        trophy.unlocked 
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                          : 'bg-primary'
                      }`}
                      style={{ width: `${trophy.progress}%` }}
                    ></div>
                  </div>
                  {trophy.unlocked && (
                    <div className="text-center pt-2">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Débloqué !
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm max-w-md mx-auto">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Continue à t'entraîner !</h3>
              <p className="text-muted-foreground mb-4">
                Plus tu t'entraînes, plus tu débloques de trophées et gagnes de points.
              </p>
              <Button className="gym-gradient gym-shadow" asChild>
                <Link to="/scanner">
                  Commencer une séance
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Trophees;