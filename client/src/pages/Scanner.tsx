import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Dumbbell, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const Scanner = () => {
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

      {/* Scanner Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4">
                <QrCode className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Scanner QR Code</CardTitle>
              <CardDescription>
                Scanne le QR code sur l'équipement pour commencer ton entraînement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="aspect-square bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Positionne le QR code dans le cadre
                  </p>
                </div>
              </div>
              
              <Button className="w-full gym-gradient gym-shadow" data-testid="button-start-scan">
                Démarrer le scan
              </Button>
              
              <div className="text-center text-sm text-muted-foreground">
                <p>Assure-toi que le QR code est bien visible</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Scanner;