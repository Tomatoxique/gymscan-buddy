import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dumbbell, ArrowLeft, Mail, Phone, MapPin, Send } from "lucide-react";
import { Link } from "wouter";

const Contact = () => {
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

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Contactez-nous</h2>
          <p className="text-muted-foreground">Une question ? Une suggestion ? Nous sommes là pour vous aider !</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Envoyez-nous un message</CardTitle>
              <CardDescription>
                Remplissez le formulaire et nous vous répondrons dans les plus brefs délais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" placeholder="John" data-testid="input-firstName" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" placeholder="Doe" data-testid="input-lastName" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john.doe@example.com" 
                  data-testid="input-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input 
                  id="subject" 
                  placeholder="De quoi souhaitez-vous parler ?" 
                  data-testid="input-subject"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Votre message..."
                  rows={4}
                  data-testid="textarea-message"
                />
              </div>

              <Button className="w-full gym-gradient gym-shadow" data-testid="button-send-message">
                <Send className="h-4 w-4 mr-2" />
                Envoyer le message
              </Button>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">support@gymbuddy.fr</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Réponse sous 24h en moyenne
                </p>
              </CardContent>
            </Card>

            <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Téléphone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">+33 1 23 45 67 89</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Lundi à Vendredi, 9h-18h
                </p>
              </CardContent>
            </Card>

            <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Adresse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  123 Rue du Fitness<br />
                  75001 Paris<br />
                  France
                </p>
              </CardContent>
            </Card>

            {/* FAQ Quick Links */}
            <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Questions fréquentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Comment puis-je réinitialiser mon mot de passe ?</p>
                  <p className="text-muted-foreground">
                    Utilisez le lien "Mot de passe oublié" sur la page de connexion.
                  </p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Comment scanner un QR code ?</p>
                  <p className="text-muted-foreground">
                    Rendez-vous dans la section Scanner et pointez votre caméra vers le code.
                  </p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Puis-je supprimer mon compte ?</p>
                  <p className="text-muted-foreground">
                    Oui, contactez-nous pour supprimer définitivement votre compte.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;