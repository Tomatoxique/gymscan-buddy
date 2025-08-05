import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ValidationInput } from "@/components/ValidationInput";
import { Dumbbell, Lock, User, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Link, useSearch, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";

// Schémas de validation
const usernameSchema = z.string()
  .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
  .max(20, "Le nom d'utilisateur ne peut pas dépasser 20 caractères")
  .regex(/^[a-zA-Z0-9_]+$/, "Le nom d'utilisateur ne peut contenir que des lettres, chiffres et _");

const passwordSchema = z.string()
  .min(8, "Le mot de passe doit contenir au moins 8 caractères")
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre");

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  
  // États pour les formulaires
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ username: "", password: "", confirmPassword: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const searchParams = new URLSearchParams(useSearch());
  const defaultTab = searchParams.get("tab") === "register" ? "register" : "login";

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  // Validation en temps réel
  const validateField = (field: string, value: string) => {
    try {
      if (field === 'username') {
        usernameSchema.parse(value);
        return { isValid: true, message: "Nom d'utilisateur valide" };
      } else if (field === 'password') {
        passwordSchema.parse(value);
        return { isValid: true, message: "Mot de passe sécurisé" };
      } else if (field === 'confirmPassword') {
        if (value === registerForm.password) {
          return { isValid: true, message: "Les mots de passe correspondent" };
        } else {
          return { isValid: false, message: "Les mots de passe ne correspondent pas" };
        }
      }
    } catch (error: any) {
      return { isValid: false, message: error.errors[0].message };
    }
    return { isValid: false, message: "" };
  };

  const handleFieldBlur = (field: string) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.field) {
          setFieldErrors({ [data.field]: data.error });
        } else {
          setError(data.error);
        }
        return;
      }

      login(data.user, data.token);
      setLocation('/');
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    if (registerForm.password !== registerForm.confirmPassword) {
      setFieldErrors({ confirmPassword: "Les mots de passe ne correspondent pas" });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: registerForm.username,
          password: registerForm.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.field) {
          setFieldErrors({ [data.field]: data.error });
        } else {
          setError(data.error);
        }
        return;
      }

      login(data.user, data.token);
      setLocation('/');
    } catch (err) {
      setError('Erreur lors de la création du compte. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

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
            Transforme tes entraînements dès aujourd'hui
          </p>
        </div>

        {/* Affichage des erreurs globales */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="register">Inscription</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Bon retour !</CardTitle>
                <CardDescription>
                  Connecte-toi pour continuer ton parcours fitness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <ValidationInput
                    id="login-username"
                    label="Nom d'utilisateur"
                    value={loginForm.username}
                    onChange={(value) => setLoginForm(prev => ({ ...prev, username: value }))}
                    onBlur={() => handleFieldBlur('username')}
                    validation={
                      fieldErrors.username 
                        ? { isValid: false, message: fieldErrors.username, isDirty: true }
                        : undefined
                    }
                    icon={<User className="h-4 w-4" />}
                    placeholder="tonusername"
                  />
                  
                  <div className="relative">
                    <ValidationInput
                      id="login-password"
                      label="Mot de passe"
                      type={showPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={(value) => setLoginForm(prev => ({ ...prev, password: value }))}
                      onBlur={() => handleFieldBlur('password')}
                      validation={
                        fieldErrors.password 
                          ? { isValid: false, message: fieldErrors.password, isDirty: true }
                          : undefined
                      }
                      icon={<Lock className="h-4 w-4" />}
                      placeholder="••••••••"
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-8 h-11 px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gym-gradient gym-shadow"
                    disabled={loading}
                  >
                    {loading ? "Connexion..." : "Se connecter"}
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    Pas encore de compte ?{" "}
                    <button 
                      type="button"
                      className="text-primary hover:underline"
                      onClick={() => setActiveTab("register")}
                    >
                      Inscris-toi
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <Card className="gym-shadow border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Rejoins-nous !</CardTitle>
                <CardDescription>
                  Crée ton compte et commence ta transformation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <ValidationInput
                    id="register-username"
                    label="Nom d'utilisateur"
                    value={registerForm.username}
                    onChange={(value) => setRegisterForm(prev => ({ ...prev, username: value }))}
                    onBlur={() => handleFieldBlur('username')}
                    validation={
                      touchedFields.username 
                        ? validateField('username', registerForm.username)
                        : fieldErrors.username
                        ? { isValid: false, message: fieldErrors.username, isDirty: true }
                        : undefined
                    }
                    icon={<User className="h-4 w-4" />}
                    placeholder="tonusername"
                  />

                  <div className="relative">
                    <ValidationInput
                      id="register-password"
                      label="Mot de passe"
                      type={showPassword ? "text" : "password"}
                      value={registerForm.password}
                      onChange={(value) => setRegisterForm(prev => ({ ...prev, password: value }))}
                      onBlur={() => handleFieldBlur('password')}
                      validation={
                        touchedFields.password 
                          ? validateField('password', registerForm.password)
                          : fieldErrors.password
                          ? { isValid: false, message: fieldErrors.password, isDirty: true }
                          : undefined
                      }
                      icon={<Lock className="h-4 w-4" />}
                      placeholder="••••••••"
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-8 h-11 px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>

                  <div className="relative">
                    <ValidationInput
                      id="confirm-password"
                      label="Confirmer le mot de passe"
                      type={showConfirmPassword ? "text" : "password"}
                      value={registerForm.confirmPassword}
                      onChange={(value) => setRegisterForm(prev => ({ ...prev, confirmPassword: value }))}
                      onBlur={() => handleFieldBlur('confirmPassword')}
                      validation={
                        touchedFields.confirmPassword 
                          ? validateField('confirmPassword', registerForm.confirmPassword)
                          : fieldErrors.confirmPassword
                          ? { isValid: false, message: fieldErrors.confirmPassword, isDirty: true }
                          : undefined
                      }
                      icon={<Lock className="h-4 w-4" />}
                      placeholder="••••••••"
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-8 h-11 px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gym-gradient gym-shadow"
                    disabled={loading}
                  >
                    {loading ? "Création..." : "Créer mon compte"}
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    Déjà un compte ?{" "}
                    <button 
                      type="button"
                      className="text-primary hover:underline"
                      onClick={() => setActiveTab("login")}
                    >
                      Connecte-toi
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;