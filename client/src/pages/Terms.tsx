import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, ArrowLeft, FileText, Users, Shield, AlertTriangle } from "lucide-react";
import { Link } from "wouter";

const Terms = () => {
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

      {/* Terms Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4">
            <FileText className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Conditions d'utilisation</h2>
          <p className="text-muted-foreground">Dernière mise à jour : 4 janvier 2025</p>
        </div>

        <div className="space-y-8">
          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Acceptation des conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                En utilisant GymBuddy, vous acceptez d'être lié par ces conditions d'utilisation. 
                Si vous n'acceptez pas ces termes, veuillez ne pas utiliser notre service.
              </p>
              <p className="text-muted-foreground">
                Ces conditions s'appliquent à tous les utilisateurs de l'application GymBuddy, 
                y compris les utilisateurs gratuits et premium.
              </p>
            </CardContent>
          </Card>

          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Utilisation du service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                GymBuddy vous accorde une licence limitée, non-exclusive et non-transférable pour utiliser notre application à des fins personnelles.
              </p>
              <p className="text-muted-foreground font-semibold">Vous vous engagez à ne pas :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Utiliser le service à des fins illégales ou non autorisées</li>
                <li>Partager des contenus offensants ou inappropriés</li>
                <li>Tenter de contourner les mesures de sécurité</li>
                <li>Copier, modifier ou distribuer le contenu de l'application</li>
                <li>Utiliser des bots ou des scripts automatisés</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Compte utilisateur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Vous êtes responsable du maintien de la confidentialité de votre compte et de votre mot de passe.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Fournir des informations exactes lors de l'inscription</li>
                <li>Maintenir vos informations à jour</li>
                <li>Notifier immédiatement tout usage non autorisé de votre compte</li>
                <li>Utiliser un mot de passe sécurisé et unique</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Contenu utilisateur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Vous conservez la propriété du contenu que vous partagez sur GymBuddy, mais vous nous accordez 
                une licence pour l'utiliser dans le cadre du service.
              </p>
              <p className="text-muted-foreground">
                Nous nous réservons le droit de supprimer tout contenu qui viole nos conditions ou qui est 
                signalé comme inapproprié par la communauté.
              </p>
            </CardContent>
          </Card>

          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Limitation de responsabilité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                GymBuddy est fourni "en l'état" sans garantie d'aucune sorte. Nous ne garantissons pas que le service sera ininterrompu ou exempt d'erreurs.
              </p>
              <p className="text-muted-foreground">
                <strong>Important :</strong> Consultez toujours un professionnel de santé avant de commencer un programme d'exercice. 
                GymBuddy ne remplace pas les conseils médicaux professionnels.
              </p>
            </CardContent>
          </Card>

          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Modification des conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Nous nous réservons le droit de modifier ces conditions à tout moment. Les utilisateurs seront 
                informés des changements significatifs par email ou via l'application.
              </p>
              <p className="text-muted-foreground">
                L'utilisation continue du service après les modifications constitue votre acceptation des nouvelles conditions.
              </p>
            </CardContent>
          </Card>

          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Pour toute question concernant ces conditions d'utilisation :
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>Email : legal@gymbuddy.fr</p>
                <p>Adresse : 123 Rue du Fitness, 75001 Paris</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link to="/auth">Accepter et continuer</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Terms;