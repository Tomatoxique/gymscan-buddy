import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Dumbbell, ArrowLeft, Trophy, MessageCircle, Heart } from "lucide-react";
import { Link } from "wouter";

const Social = () => {
  const mockUsers = [
    { name: "Marie Dubois", workout: "Séance jambes", time: "Il y a 2h", likes: 12 },
    { name: "Thomas Martin", workout: "Développé couché", time: "Il y a 4h", likes: 8 },
    { name: "Sophie Leroy", workout: "Cardio HIIT", time: "Il y a 6h", likes: 15 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Dumbbell className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold gym-text-gradient">GymBuddy</h1>
          </div>
        </div>
      </header>

      {/* Social Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Communauté GymBuddy</h2>
          <p className="text-muted-foreground">Connecte-toi avec d'autres passionnés de fitness</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Community Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm text-center">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">10K+</div>
                <p className="text-sm text-muted-foreground">Membres</p>
              </CardContent>
            </Card>

            <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm text-center">
              <CardContent className="pt-6">
                <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">50K+</div>
                <p className="text-sm text-muted-foreground">Séances</p>
              </CardContent>
            </Card>

            <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm text-center">
              <CardContent className="pt-6">
                <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">100K+</div>
                <p className="text-sm text-muted-foreground">Likes</p>
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Activité récente</h3>
            
            {mockUsers.map((user, index) => (
              <Card key={index} className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{user.name}</h4>
                        <span className="text-sm text-muted-foreground">{user.time}</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        A terminé une séance: <span className="font-medium text-foreground">{user.workout}</span>
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Heart className="h-4 w-4 mr-1" />
                          {user.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Commenter
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Join Community CTA */}
          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm text-center">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rejoins la communauté</h3>
              <p className="text-muted-foreground mb-4">
                Partage tes progrès et motive les autres membres
              </p>
              <Button className="gym-gradient gym-shadow" data-testid="button-join-community">
                Créer mon profil
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Social;