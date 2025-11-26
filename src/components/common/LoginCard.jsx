import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Apple, Mail } from "lucide-react";
import { User2Icon } from "lucide-react";

const LoginCard = () => {
  return (
    <div className="glass-card rounded-2xl p-8 w-full max-w-md space-y-6 animate-in fade-in duration-500">
      {/* Logo */}
      <div className="flex justify-center mb-2">
        <div className="w-20 h-20 rounded-2xl overflow-hidden ring-1 ring-border/50">
          <User2Icon className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Welcome to Axes</h1>
        <p className="text-sm text-muted-foreground">AI Managed Escrow Payments</p>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3">
        <Button variant="social" size="lg" className="w-full justify-start gap-3">
          <Apple className="w-5 h-5" />
          <span>Login with Apple</span>
        </Button>

        <Button variant="social" size="lg" className="w-full justify-start gap-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Login with Google</span>
        </Button>
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-xs text-muted-foreground block">
          Email
        </label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            placeholder="enter your email address..."
            className="glass-input h-12 pr-10"
          />
          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Email Login Button */}
      <Button variant="glass" size="lg" className="w-full">
        Login with email
      </Button>

      {/* SSO Option */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">or continue with SAML/SSO</p>
      </div>
    </div>
  );
};

export default LoginCard;
