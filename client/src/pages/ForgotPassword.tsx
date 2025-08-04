import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dumbbell, Mail, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 gym-gradient opacity-5"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 text-2xl font-bold">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl gym-shadow">
              <Dumbbell className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="gym-text-gradient">GymBuddy</span>
          </Link>
          <p className="text-muted-foreground mt-2">
            Récupération de mot de passe
          </p>
        </div>

        <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Mot de passe oublié ?</CardTitle>
            <CardDescription>
              Saisir ton email pour recevoir un lien de réinitialisation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="ton@email.com"
                  className="pl-10"
                  data-testid="input-email"
                />
              </div>
            </div>

            <Button className="w-full gym-gradient gym-shadow" data-testid="button-reset-password">
              Envoyer le lien
            </Button>

            <div className="text-center space-y-2">
              <div className="text-sm text-muted-foreground">
                Tu te souviens de ton mot de passe ?{" "}
                <Link to="/auth" className="text-primary hover:underline">
                  Retour à la connexion
                </Link>
              </div>
              
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour à l'accueil
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;