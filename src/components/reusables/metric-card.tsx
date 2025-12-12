import { Card, CardContent } from "../ui/card";
import { cn } from "../../lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({ title, value, trend, icon, className }: MetricCardProps) {
  return (
    <Card className={cn("border-0 shadow-sm", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              {icon && <div className="text-gray-400">{icon}</div>}
              <p className="text-sm font-medium text-gray-600">{title}</p>
            </div>
            <div className="flex items-baseline space-x-3">
              <p className="text-3xl font-bold text-gray-900">{value}</p>
              {trend && (
                <div className={cn(
                  "flex items-center space-x-1 text-xs font-medium",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}>
                  <span>{trend.value}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}