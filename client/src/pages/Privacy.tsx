import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, ArrowLeft, Shield, Eye, Lock, Database } from "lucide-react";
import { Link } from "wouter";

const Privacy = () => {
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

      {/* Privacy Policy Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Politique de confidentialité</h2>
          <p className="text-muted-foreground">Dernière mise à jour : 4 janvier 2025</p>
        </div>

        <div className="space-y-8">
          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Collecte des données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Chez GymBuddy, nous collectons uniquement les données nécessaires pour améliorer votre expérience de fitness :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Informations de profil (nom, email, objectifs fitness)</li>
                <li>Données d'entraînement (exercices, poids, répétitions)</li>
                <li>Données de progression (statistiques, records personnels)</li>
                <li>Données d'utilisation de l'application (anonymisées)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Utilisation des données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Vos données sont utilisées exclusivement pour :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Personnaliser votre expérience d'entraînement</li>
                <li>Suivre vos progrès et statistiques</li>
                <li>Améliorer nos services et fonctionnalités</li>
                <li>Vous envoyer des notifications importantes</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Protection des données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Nous prenons la sécurité de vos données très au sérieux :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Chiffrement des données en transit et au repos</li>
                <li>Accès limité aux données par notre équipe</li>
                <li>Audits de sécurité réguliers</li>
                <li>Conformité RGPD et autres réglementations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Vos droits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Vous avez le droit de :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Consulter vos données personnelles</li>
                <li>Corriger ou modifier vos informations</li>
                <li>Supprimer votre compte et vos données</li>
                <li>Exporter vos données dans un format portable</li>
                <li>Vous opposer au traitement de vos données</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Pour toute question concernant cette politique de confidentialité, contactez-nous :
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>Email : privacy@gymbuddy.fr</p>
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

export default Privacy;