import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dumbbell, 
  QrCode, 
  TrendingUp, 
  Calendar, 
  Users, 
  Trophy,
  Activity,
  Timer,
  Target,
  Zap
} from "lucide-react";
import { Link } from "wouter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
              <Dumbbell className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold gym-text-gradient">GymBuddy</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/scanner" className="text-muted-foreground hover:text-foreground transition-colors">
              Scanner
            </Link>
            <Link to="/progression" className="text-muted-foreground hover:text-foreground transition-colors">
              Progression
            </Link>
            <Link to="/timer" className="text-muted-foreground hover:text-foreground transition-colors">
              Timer
            </Link>
            <Link to="/planner" className="text-muted-foreground hover:text-foreground transition-colors">
              Planner
            </Link>
            <Link to="/trophees" className="text-muted-foreground hover:text-foreground transition-colors">
              Trophées
            </Link>
            <Link to="/social" className="text-muted-foreground hover:text-foreground transition-colors">
              Social
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link to="/auth">Connexion</Link>
            </Button>
            <Button className="gym-gradient gym-shadow" asChild>
              <Link to="/auth?tab=register">Inscription</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 gym-gradient opacity-5"></div>
        <div className="container mx-auto text-center relative z-10">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Zap className="h-4 w-4 mr-2" />
            Nouvelle génération de suivi fitness
          </Badge>
          
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Révolutionne ton
            <span className="gym-text-gradient block">entraînement</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Scanne, entraîne-toi, progresse. L'application qui transforme chaque séance 
            en performance mesurable avec la technologie QR Code intégrée.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="gym-gradient gym-shadow text-lg px-8 py-6" asChild>
              <Link to="/auth?tab=login">
                <QrCode className="mr-2 h-5 w-5" />
                Commencer maintenant
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link to="/scanner?demo=true">
                Voir la démo
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: "Machines", value: "500+", icon: Dumbbell },
              { label: "Utilisateurs", value: "10K+", icon: Users },
              { label: "Séances", value: "50K+", icon: Activity },
              { label: "Records", value: "100K+", icon: Trophy }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Fonctionnalités puissantes</h3>
            <p className="text-xl text-muted-foreground">
              Tout ce dont tu as besoin pour optimiser tes performances
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: QrCode,
                title: "Scan QR Code",
                description: "Scanne instantanément les machines et accède aux exercices",
                color: "text-primary",
                link: "/scanner"
              },
              {
                icon: TrendingUp,
                title: "Suivi progression",
                description: "Visualise tes performances avec des graphiques détaillés",
                color: "text-red-500",
                link: "/progression"
              },
              {
                icon: Timer,
                title: "Temps de repos",
                description: "Optimise tes temps de repos avec des minuteurs intelligents",
                color: "text-primary",
                link: "/timer"
              },
              {
                icon: Calendar,
                title: "Planification",
                description: "Crée des programmes personnalisés et organise tes séances",
                color: "text-red-500",
                link: "/planner"
              },
              {
                icon: Trophy,
                title: "Récompenses",
                description: "Gagne des points et débloquer des récompenses exclusives",
                color: "text-red-500",
                link: "/trophees"
              },
              {
                icon: Users,
                title: "Social & Défis",
                description: "Partage tes performances et relève des défis avec la communauté",
                color: "text-accent",
                link: "/social"
              }
            ].map((feature, index) => (
              <Link key={index} to={feature.link}>
                <Card className="gym-shadow hover:gym-glow transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm cursor-pointer">
                  <CardHeader>
                    <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gym-gradient relative">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-4">
            Prêt à transformer tes entraînements ?
          </h3>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Rejoins la communauté GymBuddy et découvre une nouvelle façon de t'entraîner.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
            <Link to="/auth">
              <Target className="mr-2 h-5 w-5" />
              Commencer gratuitement
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border bg-card/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Dumbbell className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">GymBuddy</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Confidentialité
              </Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Conditions
              </Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 GymBuddy. Tous droits réservés. Conçu pour les passionnés de fitness.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
