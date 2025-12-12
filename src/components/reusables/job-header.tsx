import { Button } from "../ui/button";
import{ Badge} from "../ui/badge"
import { Filter, Plus } from "lucide-react";

interface JobHeaderProps {
  jobTitle: string;
  status: "active" | "closed" | "draft";
  location?: string;
  type?: "remote" | "onsite" | "hybrid";
  onAddCandidate?: () => void;
  onFilterToggle?: () => void;
}

const statusConfig = {
  active: { color: "bg-green-100 text-green-800", label: "Active" },
  closed: { color: "bg-gray-100 text-gray-800", label: "Closed" },
  draft: { color: "bg-yellow-100 text-yellow-800", label: "Draft" },
};

export function JobHeader({ 
  jobTitle, 
  status, 
  location = "San Francisco", 
  type = "remote",
  onAddCandidate,
  onFilterToggle 
}: JobHeaderProps) {
  return (
	<div className="bg-white border-b border-gray-200 px-6 py-4">
	  <div className="flex items-center justify-between">
		<div className="flex items-center space-x-4">
		  <div>
			<div className="flex items-center space-x-3">
			  <h1 className="text-2xl font-bold text-gray-900">{jobTitle}</h1>
			  <Badge 
				className={statusConfig[status].color}
				variant="secondary"
			  >
				{statusConfig[status].label}
			  </Badge>
			</div>
			<div className="flex items-center space-x-2 mt-1">
			  <span className="text-sm text-gray-500">Pipeline view</span>
			  <span className="text-gray-300">•</span>
			  <span className="text-sm text-gray-500">{location}</span>
			  <span className="text-gray-300">•</span>
			  <span className="text-sm text-gray-500 capitalize">{type}</span>
			</div>
		  </div>
		</div>
		
		<div className="flex items-center space-x-3">
		  <Button 
			variant="outline" 
			size="sm"
			onClick={onFilterToggle}
			className="flex items-center space-x-2"
		  >
			<Filter className="w-4 h-4" />
			<span>Filters</span>
		  </Button>
		  <Button 
			size="sm"
			onClick={onAddCandidate}
			className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
		  >
			<Plus className="w-4 h-4" />
			<span>Add Candidate</span>
		  </Button>
		</div>
	  </div>
	</div>
  );
}