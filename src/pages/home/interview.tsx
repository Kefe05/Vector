import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useState } from "react";
import Nav from "../../layout/nav";
import dayjs from "dayjs";
import { Button } from "../../components/ui/button";

type Mock = {
  id: number;
  title: string;
  status: "Open" | "Closed" | "In Progress" | "Pending";
  dateCreated: string;
};

const Interview = () => {
  const [interviews] = useState<Mock[]>([
    {
      id: 1,
      title: "Frontend Developer Interview",
      status: "Open",
      dateCreated: "2025-03-10",
    },
    {
      id: 2,
      title: "Backend Engineer Screening",
      status: "Closed",
      dateCreated: "2025-02-28",
    },
    {
      id: 3,
      title: "UI/UX Designer Assessment",
      status: "In Progress",
      dateCreated: "2025-03-05",
    },
    {
      id: 4,
      title: "React.js Developer Round 1",
      status: "Open",
      dateCreated: "2025-03-12",
    },
    {
      id: 5,
      title: "Full Stack Developer Screening",
      status: "Closed",
      dateCreated: "2025-02-20",
    },
    {
      id: 5,
      title: "Data Scientist Interview",
      status: "Pending",
      dateCreated: "2025-02-20",
    },
    {
      id: 5,
      title: "Data Analyst Screening",
      status: "Closed",
      dateCreated: "2025-02-20",
    },
    {
      id: 5,
      title: "Python Developer Screening",
      status: "Closed",
      dateCreated: "2025-02-20",
    },
  ]);

  const date = dayjs("2019-01-25").format("DD/MM/YYYY");
  console.log(date);
  return (
    <div className="flex flex-col gap-6 ">
      <Nav />
      <div className="w-full  sm:w-[80%] px-3">
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
      <Button className="bg-wine text-white w-fit ml-3"> New Interview</Button>
    </div>
  );
};

export default Interview;
