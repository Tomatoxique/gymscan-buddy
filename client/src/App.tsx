import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Scanner from "./pages/Scanner";
import Progression from "./pages/Progression";
import Social from "./pages/Social";
import Planner from "./pages/Planner";
import Timer from "./pages/Timer";
import Trophees from "./pages/Trophees";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = ({ component: Component }: { component: any }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Auth />;
  }
  
  return <Component />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/auth" component={Auth} />
        <Route path="/scanner" component={(props: any) => <ProtectedRoute component={Scanner} {...props} />} />
        <Route path="/progression" component={(props: any) => <ProtectedRoute component={Progression} {...props} />} />
        <Route path="/social" component={(props: any) => <ProtectedRoute component={Social} {...props} />} />
        <Route path="/planner" component={(props: any) => <ProtectedRoute component={Planner} {...props} />} />
        <Route path="/timer" component={(props: any) => <ProtectedRoute component={Timer} {...props} />} />
        <Route path="/trophees" component={(props: any) => <ProtectedRoute component={Trophees} {...props} />} />
        <Route path="/profile" component={(props: any) => <ProtectedRoute component={Profile} {...props} />} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/contact" component={Contact} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route component={NotFound} />
      </Switch>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
