import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { Candidate, CandidateCard } from "./candidate-card";

interface PipelineStageProps {
  title: string;
  count: number;
  candidates: Candidate[];
  onAddCandidate?: () => void;
  onCandidateAction?: (action: string, candidate: Candidate) => void;
  className?: string;
  stage: "applied" | "screened" | "technical" | "interview" | "hired";
}

const stageColors = {
  applied: "border-blue-200 bg-blue-50/50",
  screened: "border-yellow-200 bg-yellow-50/50", 
  technical: "border-purple-200 bg-purple-50/50",
  interview: "border-green-200 bg-green-50/50",
  hired: "border-emerald-200 bg-emerald-50/50"
};

export function PipelineStage({ 
  title, 
  count, 
  candidates, 
  onAddCandidate, 
  onCandidateAction,
  className,
  stage
}: PipelineStageProps) {
  return (
	<div className={cn("flex-1 min-w-[280px]", className)}>
	  <Card className={cn("h-full", stageColors[stage])}>
		<CardHeader className="pb-4">
		  <div className="flex items-center justify-between">
			<div className="flex items-center space-x-2">
			  <h3 className="font-semibold text-gray-900">{title}</h3>
			  <Badge variant="secondary" className="bg-white text-gray-600">
				{count}
			  </Badge>
			</div>
			<Button 
			  variant="ghost" 
			  size="sm" 
			  onClick={onAddCandidate}
			  className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
			>
			  <Plus className="w-4 h-4" />
			</Button>
		  </div>
		</CardHeader>
		<CardContent className="space-y-3 pb-6">
		  {candidates.map((candidate) => (
			<CandidateCard 
			  key={candidate.id}
			  candidate={candidate}
			  onAction={onCandidateAction}
			  className="bg-white"
			/>
		  ))}
		  {candidates.length === 0 && (
			<div className="text-center py-8 text-gray-500 text-sm">
			  No candidates in this stage
			</div>
		  )}
		</CardContent>
	  </Card>
	</div>
  );
}