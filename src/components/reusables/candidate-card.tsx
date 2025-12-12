import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Card, CardContent } from "../ui/card";
import { MoreHorizontal, Star } from "lucide-react";
import { cn } from "../../lib/utils";

export interface Candidate {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  stage: "applied" | "screened" | "technical" | "interview" | "hired" | "rejected";
  matchScore?: number;
  skills?: string[];
  submittedAt: string;
  scheduledTime?: string;
  status?: "pending" | "completed" | "scheduled";
  priority?: "high" | "medium" | "low";
}

interface CandidateCardProps {
  candidate: Candidate;
  onAction?: (action: string, candidate: Candidate) => void;
  className?: string;
}

const stageConfig = {
  applied: { color: "bg-blue-50 text-blue-700 border-blue-200", label: "Applied" },
  screened: { color: "bg-yellow-50 text-yellow-700 border-yellow-200", label: "Screened" },
  technical: { color: "bg-purple-50 text-purple-700 border-purple-200", label: "Technical" },
  interview: { color: "bg-green-50 text-green-700 border-green-200", label: "Interview" },
  hired: { color: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Hired" },
  rejected: { color: "bg-red-50 text-red-700 border-red-200", label: "Rejected" },
};

export function CandidateCard({ candidate, onAction, className }: CandidateCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={candidate.avatar} />
              <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">
                {getInitials(candidate.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">{candidate.name}</h3>
              <p className="text-xs text-gray-500">{candidate.role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {candidate.priority === "high" && <Star className="w-4 h-4 text-yellow-500" />}
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Badge 
            variant="outline" 
            className={cn("text-xs", stageConfig[candidate.stage].color)}
          >
            {stageConfig[candidate.stage].label}
          </Badge>
          
          {candidate.matchScore && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">AI Match Score</span>
              <span className="font-medium text-blue-600">{candidate.matchScore}%</span>
            </div>
          )}
          
          <div className="text-xs text-gray-500">
            {candidate.stage === "applied" && `Applied ${formatTime(candidate.submittedAt)}`}
            {candidate.stage === "screened" && candidate.matchScore && `Match ${candidate.matchScore}%`}
            {candidate.stage === "technical" && candidate.scheduledTime && `Scheduled: ${formatTime(candidate.scheduledTime)}`}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          {candidate.stage === "applied" && (
            <span className="text-xs text-gray-500">Resume Only</span>
          )}
          {candidate.stage === "screened" && (
            <div className="flex space-x-1">
              {candidate.skills?.slice(0, 2).map((skill, i) => (
                <Badge key={i} variant="secondary" className="text-xs px-2 py-0.5">
                  {skill}
                </Badge>
              ))}
            </div>
          )}
          {candidate.stage === "technical" && (
            <span className="text-xs text-orange-600">Take-home Test</span>
          )}
          
          <div className="flex space-x-1">
            {candidate.stage === "screened" && (
              <Button 
                size="sm" 
                className="text-xs h-6 px-2"
                onClick={() => onAction?.('review', candidate)}
              >
                HR
              </Button>
            )}
            {candidate.stage === "technical" && (
              <Button 
                size="sm" 
                className="text-xs h-6 px-2"
                onClick={() => onAction?.('review', candidate)}
              >
                Review
              </Button>
            )}
            {candidate.stage === "applied" && (
              <Button 
                size="sm" 
                variant="outline" 
                className="text-xs h-6 px-2"
                onClick={() => onAction?.('remind', candidate)}
              >
                Remind
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}