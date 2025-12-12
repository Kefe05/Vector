import { useState } from "react";
import { TrendingUp, Users, Target, Award } from "lucide-react";
import { MetricCard } from "../../components/reusables/metric-card";
import { JobHeader } from "../../components/reusables/job-header";
import { PipelineStage } from "../../components/reusables/pipeline-stage";
import { Candidate } from "../../components/reusables/candidate-card";

const DashboardHome = () => {
  // Sample candidate data matching the UI
  const [candidates] = useState<Candidate[]>([
    {
      id: "1",
      name: "Alex Morgan",
      role: "Sr. Designer",
      stage: "applied",
      submittedAt: "2024-01-14",
      priority: "high"
    },
    {
      id: "2",
      name: "Jordan Doe",
      role: "Developer", 
      stage: "applied",
      submittedAt: "2024-01-13",
      matchScore: 72
    },
    {
      id: "3",
      name: "Sarah Lee",
      role: "Designer",
      stage: "applied",
      submittedAt: "2024-01-12"
    },
    {
      id: "4",
      name: "James Miller",
      role: "Product Designer",
      stage: "screened",
      matchScore: 92,
      skills: ["Figma", "React"],
      submittedAt: "2024-01-10"
    },
    {
      id: "5",
      name: "Casey Key",
      role: "Product Manager",
      stage: "screened",
      matchScore: 65,
      skills: ["Strategy", "Analytics"],
      submittedAt: "2024-01-09"
    },
    {
      id: "6",
      name: "Sam Smith",
      role: "Frontend Dev",
      stage: "technical",
      scheduledTime: "2024-01-15T14:00:00Z",
      submittedAt: "2024-01-08"
    },
    {
      id: "7",
      name: "Lisa Wong",
      role: "UX Engineer",
      stage: "technical", 
      scheduledTime: "2024-01-16T14:00:00Z",
      submittedAt: "2024-01-07"
    }
  ]);

  // Group candidates by stage
  const candidatesByStage = {
    applied: candidates.filter(c => c.stage === "applied"),
    screened: candidates.filter(c => c.stage === "screened"), 
    technical: candidates.filter(c => c.stage === "technical"),
    interview: candidates.filter(c => c.stage === "interview"),
    hired: candidates.filter(c => c.stage === "hired")
  };

  const handleCandidateAction = (action: string, candidate: Candidate) => {
    console.log(`${action} action for`, candidate.name);
  };

  const handleAddCandidate = () => {
    console.log("Add candidate clicked");
  };

  const handleFilterToggle = () => {
    console.log("Filter toggle clicked");
  };

  // Calculate total metrics
  const totalApplicants = candidates.length;
  const shortlisted = candidatesByStage.screened.length + candidatesByStage.technical.length;
  const inProgress = candidatesByStage.technical.length;
  const hiresMade = candidatesByStage.hired.length;

  return (
    <div className="h-full bg-gray-50">
       <JobHeader 
        jobTitle="Senior Product Designer"
        status="active"
        location="San Francisco (Remote)"
        type="remote"
        onAddCandidate={handleAddCandidate}
        onFilterToggle={handleFilterToggle}
      />
      
      <div className="p-6 space-y-6">
        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Total Applicants"
            value={totalApplicants.toLocaleString()}
            trend={{ value: "+12%", isPositive: true }}
            icon={<Users className="w-5 h-5" />}
          />
          <MetricCard 
            title="Shortlisted"
            value={shortlisted}
            trend={{ value: "+5%", isPositive: true }}
            icon={<Target className="w-5 h-5" />}
          />
          <MetricCard 
            title="In Progress"
            value={inProgress}
            trend={{ value: "+2%", isPositive: true }}
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <MetricCard 
            title="Hires Made"
            value={`${hiresMade} this week`}
            icon={<Award className="w-5 h-5" />}
          />
        </div>

        {/* Pipeline Stages */}
        <div className="flex space-x-6 overflow-x-auto pb-6">
          <PipelineStage 
            title="Applied"
            count={candidatesByStage.applied.length}
            candidates={candidatesByStage.applied}
            stage="applied"
            onCandidateAction={handleCandidateAction}
            onAddCandidate={handleAddCandidate}
          />
          <PipelineStage 
            title="Screened"
            count={candidatesByStage.screened.length}
            candidates={candidatesByStage.screened}
            stage="screened"
            onCandidateAction={handleCandidateAction}
            onAddCandidate={handleAddCandidate}
          />
          <PipelineStage 
            title="Technical"
            count={candidatesByStage.technical.length}
            candidates={candidatesByStage.technical}
            stage="technical"
            onCandidateAction={handleCandidateAction}
            onAddCandidate={handleAddCandidate}
          />
          <PipelineStage 
            title="Interview"
            count={candidatesByStage.interview.length}
            candidates={candidatesByStage.interview}
            stage="interview"
            onCandidateAction={handleCandidateAction}
            onAddCandidate={handleAddCandidate}
          />
          <PipelineStage 
            title="Hired"
            count={candidatesByStage.hired.length}
            candidates={candidatesByStage.hired}
            stage="hired"
            onCandidateAction={handleCandidateAction}
            onAddCandidate={handleAddCandidate}
          />
        </div> 
      </div> 
    </div>
  );
};

export default DashboardHome;
