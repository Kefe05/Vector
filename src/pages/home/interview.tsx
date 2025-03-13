import { DataTableDemo } from "./index";
import dayjs from "dayjs";
const Interview = () => {
  const date = dayjs("2019-01-25").format("DD/MM/YYYY");
  console.log(date);
  return (
    <div>
      <DataTableDemo />
    </div>
  );
};

export default Interview;
