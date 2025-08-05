import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { forwardRef } from "react";

interface ValidationInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  validation?: {
    isValid: boolean;
    message: string;
    isDirty: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
}

export const ValidationInput = forwardRef<HTMLInputElement, ValidationInputProps>(
  ({ id, label, type = "text", placeholder, value, onChange, onBlur, validation, icon, className }, ref) => {
    const getValidationColor = () => {
      if (!validation || !validation.isDirty) return "";
      return validation.isValid ? "border-green-500 focus:border-green-500" : "border-red-500 focus:border-red-500";
    };

    const getValidationIcon = () => {
      if (!validation || !validation.isDirty) return null;
      if (validation.isValid) {
        return <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />;
      } else {
        return <XCircle className="absolute right-3 top-3 h-4 w-4 text-red-500" />;
      }
    };

    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-3 h-4 w-4 text-muted-foreground">
              {icon}
            </div>
          )}
          <Input
            ref={ref}
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className={`${icon ? 'pl-10' : ''} ${validation?.isDirty ? 'pr-10' : ''} ${getValidationColor()} ${className}`}
          />
          {getValidationIcon()}
        </div>
        {validation && validation.isDirty && (
          <p className={`text-sm flex items-center gap-1 ${validation.isValid ? 'text-green-600' : 'text-red-600'}`}>
            {validation.isValid ? (
              <CheckCircle className="h-3 w-3" />
            ) : (
              <AlertCircle className="h-3 w-3" />
            )}
            {validation.message}
          </p>
        )}
      </div>
    );
  }
);

ValidationInput.displayName = "ValidationInput";