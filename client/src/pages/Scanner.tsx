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
      setIsScanning(true);
      
      // Essayer d'abord la caméra arrière, puis frontale
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment' // Caméra arrière préférée
          } 
        });
      } catch {
        // Si la caméra arrière échoue, utiliser la frontale
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'user'
          } 
        });
      }
      
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setHasPermission(true);
        
        // Attendre que la vidéo soit prête avant de commencer la détection
        videoRef.current.onloadedmetadata = () => {
          console.log("Vidéo prête, dimension:", videoRef.current?.videoWidth, "x", videoRef.current?.videoHeight);
        };
        
        // Simuler la détection QR après 4 secondes
        setTimeout(() => {
          if (streamRef.current) {
            setScannedData("MACHINE_001_CHEST_PRESS");
            setIsScanning(false);
          }
        }, 4000);
      }
    } catch (err: any) {
      console.error("Erreur caméra:", err);
      setError(err.name === 'NotAllowedError' 
        ? "Permission caméra refusée. Veuillez autoriser l'accès." 
        : "Impossible d'accéder à la caméra");
      setHasPermission(false);
      setIsScanning(false);
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
              {/* Simulation vidéo démonstration avec animation */}
              <div className="aspect-video bg-gradient-to-br from-gray-900 via-red-900/20 to-black rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/60"></div>
                
                {/* Animation de démonstration */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white space-y-6">
                  <div className="relative">
                    {/* Icône de sportif animé */}
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
                      <Dumbbell className="w-10 h-10 text-white" />
                    </div>
                    
                    {/* Téléphone qui se rapproche du QR code */}
                    <div className="absolute -top-2 -right-2 w-8 h-12 bg-gray-200 rounded transform rotate-12 animate-bounce">
                      <div className="w-full h-8 bg-black rounded-t flex items-center justify-center">
                        <QrCode className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center max-w-xs">
                    <h3 className="text-lg font-semibold mb-2">Démonstration Scanner</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      1. Approche ton téléphone du QR code<br/>
                      2. Centre-le dans le cadre<br/>
                      3. Attends la détection automatique
                    </p>
                  </div>
                  
                  {/* QR Code animé */}
                  <div className="w-16 h-16 bg-white rounded animate-pulse flex items-center justify-center">
                    <QrCode className="w-12 h-12 text-black" />
                  </div>
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
              <div className="aspect-square bg-black rounded-lg border-2 border-dashed border-primary/50 flex items-center justify-center relative overflow-hidden">
                {/* Flux vidéo de la caméra */}
                {hasPermission && isScanning && !scannedData && (
                  <video 
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                    muted
                  />
                )}
                
                {/* Overlay de scan avec cadre de détection */}
                {hasPermission && isScanning && !scannedData && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Cadre de détection QR */}
                    <div className="w-48 h-48 border-4 border-red-500 rounded-lg relative">
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-red-500"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-red-500"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-red-500"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-red-500"></div>
                      
                      {/* Ligne de scan animée */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-1 bg-red-500 opacity-75 animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Instructions en overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <p className="text-white text-sm bg-black/50 rounded px-3 py-2">
                        Centre le QR code dans le cadre rouge
                      </p>
                    </div>
                  </div>
                )}
                
                {/* États sans caméra */}
                {(!hasPermission || !isScanning || scannedData) && (
                  <div className="text-center">
                    {scannedData ? (
                      <div className="space-y-4">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                        <div>
                          <h3 className="font-semibold text-green-600">Scan réussi !</h3>
                          <p className="text-sm text-muted-foreground">Machine détectée : {scannedData}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <QrCode className="h-16 w-16 text-muted-foreground mx-auto" />
                        <div>
                          <h3 className="font-semibold">Scanner QR Code</h3>
                          <p className="text-sm text-muted-foreground">
                            {hasPermission === false 
                              ? "Permission caméra refusée - Réessayez" 
                              : "Appuie sur le bouton pour démarrer"
                            }
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
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