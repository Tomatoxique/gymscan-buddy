import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { QrCode, Dumbbell, ArrowLeft, Play, X, Camera, Target, CheckCircle, AlertCircle } from "lucide-react";
import { Link, useSearch } from "wouter";

const Scanner = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const searchParams = new URLSearchParams(useSearch());
  
  useEffect(() => {
    if (searchParams.get("demo") === "true") {
      setShowDemo(true);
      // Nettoyer l'URL sans paramètres
      window.history.replaceState({}, '', '/scanner');
    }
  }, [searchParams]);
  
  // Empêcher le scroll de l'arrière-plan quand la modal est ouverte
  useEffect(() => {
    if (showDemo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Nettoyer à la fermeture du composant
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showDemo]);

  // Demander l'autorisation d'accès à la caméra
  const requestCameraPermission = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment' // Caméra arrière préférée, sinon frontale
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setHasPermission(true);
        setIsScanning(true);
        
        // Simuler la détection QR après 3 secondes
        setTimeout(() => {
          setScannedData("MACHINE_001_CHEST_PRESS");
          setIsScanning(false);
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || "Impossible d'accéder à la caméra");
      setHasPermission(false);
    }
  };

  // Arrêter la caméra
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
    setHasPermission(null);
    setScannedData(null);
  };

  // Nettoyer à la fermeture du composant
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleStartScan = () => {
    if (hasPermission) {
      // Si on a déjà la permission, recommencer le scan
      setScannedData(null);
      setIsScanning(true);
      setTimeout(() => {
        setScannedData("MACHINE_001_CHEST_PRESS");
        setIsScanning(false);
      }, 3000);
    } else {
      // Demander la permission
      requestCameraPermission();
    }
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
        <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 p-4 pt-4 overflow-y-auto">
          <Card className="w-full max-w-md gym-shadow my-4">
            <CardHeader className="pb-4 pt-6">
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
              {/* Video démonstration */}
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                <video 
                  className="w-full h-full object-cover rounded-lg" 
                  autoPlay 
                  loop 
                  muted
                  playsInline
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                  {/* Fallback pour navigateurs ne supportant pas les vidéos */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="text-center z-10">
                      <Play className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Vidéo explicative</h3>
                      <p className="text-sm text-muted-foreground">
                        Comment scanner efficacement les QR codes des équipements
                      </p>
                    </div>
                  </div>
                </video>
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

              <div className="flex justify-center">
                <Button 
                  onClick={() => {
                    setShowDemo(false);
                  }} 
                  className="w-full gym-gradient gym-shadow"
                  size="lg"
                >
                  Commencer le scan
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
              {/* Messages d'erreur */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Zone de scan */}
              <div className="aspect-square bg-black rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center relative overflow-hidden">
                {hasPermission && isScanning && !scannedData ? (
                  <video 
                    ref={videoRef}
                    className="w-full h-full object-cover rounded-lg"
                    autoPlay
                    playsInline
                    muted
                  />
                ) : null}
                
                <div className={`text-center ${hasPermission && isScanning && !scannedData ? 'absolute inset-0 bg-black/30 flex items-center justify-center' : ''}`}>
                  {scannedData ? (
                    <div className="space-y-4">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                      <div>
                        <h3 className="font-semibold text-green-600">Scan réussi !</h3>
                        <p className="text-sm text-muted-foreground">Machine détectée : {scannedData}</p>
                      </div>
                    </div>
                  ) : isScanning ? (
                    <div className="space-y-4 text-white">
                      <div className="animate-pulse">
                        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Recherche QR code...</h3>
                        <p className="text-sm text-gray-300">Positionnez le QR code dans le cadre</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <QrCode className="h-16 w-16 text-muted-foreground mx-auto" />
                      <div>
                        <h3 className="font-semibold">Prêt à scanner</h3>
                        <p className="text-sm text-muted-foreground">
                          {hasPermission === false 
                            ? "Permission caméra refusée - Réessayez" 
                            : "Appuie sur le bouton pour accéder à la caméra"
                          }
                        </p>
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
                      stopCamera();
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