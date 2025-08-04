import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Dumbbell, ArrowLeft, Play, X, Camera, Target, CheckCircle } from "lucide-react";
import { Link, useSearch } from "wouter";

const Scanner = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const searchParams = new URLSearchParams(useSearch());
  
  useEffect(() => {
    if (searchParams.get("demo") === "true") {
      setShowDemo(true);
    }
  }, [searchParams]);

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulation d'un scan QR code
    setTimeout(() => {
      setScannedData("MACHINE_001_BENCH_PRESS");
      setIsScanning(false);
    }, 2000);
  };

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

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl gym-shadow">
            <CardHeader className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-4"
                onClick={() => setShowDemo(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4">
                  <Play className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Démonstration Scanner QR</CardTitle>
                <CardDescription>
                  Apprends comment utiliser le scanner pour maximiser tes entraînements
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Video Placeholder */}
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
                <div className="text-center z-10">
                  <Play className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Vidéo explicative</h3>
                  <p className="text-sm text-muted-foreground">
                    Comment scanner efficacement les QR codes des équipements
                  </p>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Étapes pour un scan réussi
                </h4>
                <div className="space-y-3">
                  {[
                    "Trouve le QR code sur l'équipement (généralement collé sur la machine)",
                    "Ouvre l'appareil photo en appuyant sur 'Commencer le scan'",
                    "Centre le QR code dans le cadre jusqu'à ce qu'il soit reconnu",
                    "Attends la confirmation et accède aux informations de l'équipement"
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Badge variant="secondary" className="shrink-0 w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                        {index + 1}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => setShowDemo(false)} 
                  className="flex-1 gym-gradient gym-shadow"
                >
                  Commencer le scan
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowDemo(false)}
                  className="flex-1"
                >
                  Fermer la démo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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
                  {scannedData ? (
                    <div className="space-y-4">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                      <div>
                        <h3 className="font-semibold text-green-600">Scan réussi !</h3>
                        <p className="text-sm text-muted-foreground">Machine détectée : {scannedData}</p>
                      </div>
                    </div>
                  ) : isScanning ? (
                    <div className="space-y-4">
                      <div className="animate-pulse">
                        <Camera className="h-16 w-16 text-primary mx-auto" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Scan en cours...</h3>
                        <p className="text-sm text-muted-foreground">Centre le QR code dans le cadre</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <QrCode className="h-16 w-16 text-muted-foreground mx-auto" />
                      <div>
                        <h3 className="font-semibold">Prêt à scanner</h3>
                        <p className="text-sm text-muted-foreground">Appuie sur le bouton pour commencer</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {scannedData ? (
                <div className="space-y-3">
                  <Button className="w-full gym-gradient gym-shadow" size="lg" asChild>
                    <Link to="/progression">
                      Commencer l'entraînement
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="lg"
                    onClick={() => {
                      setScannedData(null);
                      setIsScanning(false);
                    }}
                  >
                    Scanner un autre QR code
                  </Button>
                </div>
              ) : (
                <Button 
                  className="w-full gym-gradient gym-shadow" 
                  size="lg"
                  onClick={handleStartScan}
                  disabled={isScanning}
                >
                  {isScanning ? "Scan en cours..." : "Commencer le scan"}
                </Button>
              )}

              <div className="space-y-2">
                <div className="text-center text-sm text-muted-foreground">
                  Assure-toi que le QR code est bien visible et éclairé
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setShowDemo(true)}
                >
                  Voir la démonstration
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Scanner;