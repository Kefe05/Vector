import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";

type Mock = {
  id: number;
  title: string;
  status: "Open" | "Closed" | "In Progress" | "Pending";
  dateCreated: string;
};

const Interview = () => {
  const [interviews, setInterviews] = useState<Mock[]>([
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
      id: 6,
      title: "Data Scientist Interview",
      status: "Pending",
      dateCreated: "2025-02-20",
    },
    {
      id: 7,
      title: "Data Analyst Screening",
      status: "Closed",
      dateCreated: "2025-02-20",
    },
    {
      id: 8,
      title: "Python Developer Screening",
      status: "Closed",
      dateCreated: "2025-02-20",
    },
  ]);

  // Form Schema
  const formSchema = z.object({
    title: z
      .string()
      .min(2, { message: "Title must be at least 2 characters." }),
    status: z.enum(["Open", "Closed", "In Progress", "Pending"]),
    dateCreated: z.string().min(1, { message: "Date is required." }),
  });

  // Initialize useForm
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", status: "Open", dateCreated: "" },
  });

  // Handle Form Submission
  const onSubmit = (data: Mock) => {
    setInterviews([...interviews, { ...data, id: interviews.length + 1 }]);
    form.reset();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Interview Table */}
      <div className="w-full sm:w-[80%] px-3">
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
              <TableRow key={interview.id} className="py-6 px-5">
                <TableCell className="font-medium">{interview.title}</TableCell>
                <TableCell className="font-medium">
                  {interview.status}
                </TableCell>
                <TableCell>{interview.dateCreated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Create New Interview Dialog */}
      <AlertDialog>
        <AlertDialogTrigger>
          <Button className="bg-wine text-white w-fit ml-3">
            New Interview
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-wine border-none text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Create New Interview</AlertDialogTitle>
          </AlertDialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Interview Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter interview title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Interview Date */}
              <FormField
                control={form.control}
                name="dateCreated"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Interview Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="Open">Open</SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                          <SelectItem value="In Progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Interview;
