"use client";
// import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { LineChart, CartesianGrid, XAxis, YAxis, Line } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
} from "../../components/ui/chart";

import { Card } from "../../components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Nav from "../../layout/nav";

const DashboardHome = () => {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetch("/public/mock.json")
      .then((res) => res.json())
      .then((data) => setInterviews(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const chartData = [
    { month: "January", Interview: 186, Closed: 80 },
    { month: "February", Interview: 305, Closed: 200 },
    { month: "March", Interview: 237, Closed: 120 },
    { month: "April", Interview: 73, Closed: 190 },
    { month: "May", Interview: 209, Closed: 130 },
    { month: "June", Interview: 214, Closed: 140 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
      icon: TrendingDown,
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
      icon: TrendingUp,
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full p-8 flex flex-col gap-6">
      <Nav />
      <div className="flex w-full gap-4">
        <Card className="flex-1 p-3 border-none shadow-xs shadow-[#220901]/50">
          <span className="text-5xl md:text-4xl sm:3xl min-[300]:2xl  font-bold">
            10
          </span>
          <span>Upcoming Interviews</span>
        </Card>
        <Card className="flex-1 p-3 border-none shadow-xs shadow-[#220901]/50">
          <span className="text-5xl md:text-4xl sm:3xl min-[300]:2xl  font-bold">
            7
          </span>
          <span>Pending Interviews</span>
        </Card>
        <Card className="flex-1 p-3 border-none shadow-xs shadow-[#220901]/50">
          <span className="text-5xl md:text-4xl sm:3xl min-[300]:2xl  font-bold">
            15
          </span>
          <span>Closed Interviews</span>
        </Card>
      </div>
      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="flex-1 h-full">
          <Table className="border border-wine rounded-lg px-4">
            <TableHeader>
              <TableRow className="py-5 px-4 text-lg">
                <TableHead className="w-[100px]">Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interviews.map((interview) => (
                <TableRow className="py-6 px-5">
                  <TableCell className="font-medium">
                    {interview.title}{" "}
                  </TableCell>
                  <TableCell className="font-medium">
                    {interview.status}{" "}
                  </TableCell>
                  <TableCell className="">{interview.dateCreated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Card className=" flex-1 ">
          <ChartContainer config={chartConfig} className="">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip />
              <ChartLegend />
              <Line type="monotone" dataKey="Closed" stroke="#220901" />
              <Line type="monotone" dataKey="Interview" stroke="#edc2bf" />
            </LineChart>
          </ChartContainer>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
