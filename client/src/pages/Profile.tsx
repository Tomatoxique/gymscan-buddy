import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, LogOut, User, Settings, Trophy, Target } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary/80">
            <ArrowLeft className="h-5 w-5" />
            <span>Retour</span>
          </Link>
          <h1 className="text-lg font-semibold">Mon Profil</h1>
          <div className="w-20"></div> {/* Spacer for center alignment */}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {user?.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{user?.username}</h2>
                <p className="text-sm text-muted-foreground">Membre GymBuddy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-4 pb-4 text-center">
              <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-lg font-bold">12</p>
              <p className="text-xs text-muted-foreground">Objectifs</p>
            </CardContent>
          </Card>
          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-4 pb-4 text-center">
              <Trophy className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-lg font-bold">8</p>
              <p className="text-xs text-muted-foreground">Trophées</p>
            </CardContent>
          </Card>
          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-4 pb-4 text-center">
              <div className="h-6 w-6 mx-auto mb-2 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">5</span>
              </div>
              <p className="text-lg font-bold">15</p>
              <p className="text-xs text-muted-foreground">Séances</p>
            </CardContent>
          </Card>
        </div>

        {/* Menu Options */}
        <div className="space-y-3">
          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <Link to="/settings" className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
                <Settings className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Paramètres</p>
                  <p className="text-sm text-muted-foreground">Notifications, préférences</p>
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <Link to="/progression" className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
                <Trophy className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Mes Progressions</p>
                  <p className="text-sm text-muted-foreground">Historique et statistiques</p>
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <Link to="/trophees" className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
                <Target className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Mes Trophées</p>
                  <p className="text-sm text-muted-foreground">Récompenses débloquées</p>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Logout Button */}
        <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <Button 
              onClick={handleLogout}
              variant="destructive" 
              className="w-full flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Se déconnecter
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}