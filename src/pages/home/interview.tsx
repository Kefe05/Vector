import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useState, useEffect } from "react";
import Nav from "../../layout/nav";
import dayjs from "dayjs";
import { Button } from "../../components/ui/button";

const Interview = () => {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetch("/public/mock.json")
      .then((res) => res.json())
      .then((data) => setInterviews(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

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
