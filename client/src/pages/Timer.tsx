import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer as TimerIcon, Dumbbell, ArrowLeft, Play, Pause, RotateCcw, Plus, Minus } from "lucide-react";
import { Link } from "wouter";

const Timer = () => {
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [restTime, setRestTime] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      // Notification sonore ou visuelle
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setSeconds(restTime);
    setIsActive(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const secs = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const adjustRestTime = (adjustment: number) => {
    const newTime = Math.max(15, Math.min(300, restTime + adjustment));
    setRestTime(newTime);
    if (!isActive) {
      setSeconds(newTime);
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

      {/* Timer Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4">
              <TimerIcon className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Minuteur de repos</h2>
            <p className="text-muted-foreground">
              Optimise tes temps de récupération entre les séries
            </p>
          </div>

          <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm mb-6">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className={`text-6xl font-mono font-bold mb-4 ${
                  seconds <= 10 ? 'text-red-500' : 'text-primary'
                }`}>
                  {formatTime(seconds)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Temps de repos restant
                </div>
              </div>

              <div className="flex justify-center gap-4 mb-6">
                <Button
                  onClick={toggle}
                  className="gym-gradient gym-shadow"
                  size="lg"
                >
                  {isActive ? (
                    <>
                      <Pause className="h-5 w-5 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5 mr-2" />
                      Start
                    </>
                  )}
                </Button>
                <Button
                  onClick={reset}
                  variant="outline"
                  size="lg"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Reset
                </Button>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Temps de repos</p>
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      onClick={() => adjustRestTime(-15)}
                      variant="outline"
                      size="sm"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-semibold w-16 text-center">
                      {formatTime(restTime)}
                    </span>
                    <Button
                      onClick={() => adjustRestTime(15)}
                      variant="outline"
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Repos court</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => {
                    setRestTime(60);
                    setSeconds(60);
                    setIsActive(false);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  1 min
                </Button>
              </CardContent>
            </Card>

            <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Repos long</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => {
                    setRestTime(180);
                    setSeconds(180);
                    setIsActive(false);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  3 min
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;