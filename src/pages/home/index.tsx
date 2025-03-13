"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
// import dayjs from "dayjs";
import { TrendingDown, TrendingUp } from "lucide-react";
import { LineChart, CartesianGrid, XAxis, YAxis, Line } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
} from "../../components/ui/chart";

import { Card } from "../../components/ui/card";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Interview from "./interview";

export type Payment = {
  id: string;
  date: string;
  status: "pending" | "interviewed" | "not interviewed" | "failed";
  email: string;
};

const data: Payment[] = [
  {
    id: "m5gr84i9",
    date: "2019-01-25",
    status: "not interviewed",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    date: "2019-01-25",
    status: "interviewed",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    date: "2019-01-25",
    status: "pending",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    date: "2019-01-25",
    status: "interviewed",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    date: "2019-01-25",
    status: "interviewed",
    email: "carmella@example.com",
  },
];

const DashboardHome = () => {
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
      <div className="flex gap-4 min-[300px]:flex-col min-[1140px]:flex-row">
        <Card className="flex-1 border-none  ">
          <ChartContainer config={chartConfig} className="w-full h-full">
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
