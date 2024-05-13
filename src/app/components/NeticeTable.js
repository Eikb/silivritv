import {
  Card,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Divider } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ScrollTable from "react-auto-scroll-table";
import { animateScroll } from "react-scroll";

const TABLE_HEAD = ["Name", "Job"];



export function NeticeTable({ TABLE_ROWS, name, color }) {
  const tableRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState("down");

  const tbodyRows =   TABLE_ROWS.map(({ id, name, not }) => (
    <tr key={id} className="even:bg-gray-400">
      <td className="p-4">
        <Typography
          variant="small"
          color="blue-gray"
          className="text-sm"
        >
          {name}
        </Typography>
      </td>
      <td className="p-4">
        {not == 100 ? (
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal bg-green-500 text-sm rounded text-center"
          >
            {not}
          </Typography>
        ) : not < 100 && not > 80 ? (
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal bg-orange-500 text-sm rounded text-center"
          >
            {not}
          </Typography>
        ) : (
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal bg-red-500 text-sm rounded text-center"
          >
            {not}
          </Typography>
        )}
      </td>
    </tr>
  ))
  
  const tableContainerRef = useRef(null);


  let temp = 0;
  TABLE_ROWS.map(({ id, name, not }) => {
    temp = temp + not;
  });
  temp = temp / TABLE_ROWS.length;
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollDirection === 'down') {
        animateScroll.scrollMore(1, { containerId: 'tableContainer' });

        const table = tableContainerRef.current;
        if (table.scrollTop === table.scrollHeight - table.clientHeight) {
          setScrollDirection('up');
        }
      } else {
        animateScroll.scrollMore(-1, { containerId: 'tableContainer' });

        const table = tableContainerRef.current;
        if (table.scrollTop === 0) {
          setScrollDirection('down');
        }
      }
    }, 50);

    return () => clearInterval(scrollInterval);
  }, [scrollDirection]);



  return (
    <Card className="h-[70vh] w-full overflow-hidden rounded-lg">

      <CardHeader className={" bg-black text-white p-7 text-center "}>
        {name}
      </CardHeader>

      <div className="  overflow-hidden"  ref={tableContainerRef} id="tablecontainer" >
      <ScrollTable
      tbodyRows={tbodyRows}
      spacer={
        <div className=" w-full ">
          <Divider/>
          </div>
      }
      speed={1}
      thead={
        <tr>
        {TABLE_HEAD.map((head) => (
          <th
            key={head}
            className=" hidden"
          >
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal leading-none opacity-70"
            >
              Isim
            </Typography>
          </th>
        ))}
      </tr>
      }
      tableClassName="custom-table-class"
      containerClassName="custom-container-class"
    />
        <table className="w-full min-w-max table-auto text-left border-r-4">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gra0 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Isim
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ id, name, not }) => (
              <tr key={id} className="even:bg-gray-400">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="text-sm"
                  >
                    {name}
                  </Typography>
                </td>
                <td className="p-4">
                  {not == 100 ? (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal bg-green-500 text-sm rounded text-center"
                    >
                      {not}
                    </Typography>
                  ) : not < 100 && not > 80 ? (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal bg-orange-500 text-sm rounded text-center"
                    >
                      {not}
                    </Typography>
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal bg-red-500 text-sm rounded text-center"
                    >
                      {not}
                    </Typography>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {temp == 100 ? (
        <CardFooter className=" flex min-h-10 bg-green-400 border border-r-black">
          <Typography className="ml-auto mr-auto mt-auto mb-auto text-white font-bold text-3xl">
            {temp.toFixed(2)}
          </Typography>
        </CardFooter>
      ) : temp < 100 && temp > 80 ? (
        <CardFooter className=" flex min-h-10 bg-orange-400 border border-r-black">
          <Typography className="ml-auto mr-auto mt-auto mb-auto text-white font-bold text-3xl">
            {temp.toFixed(2)}
          </Typography>
        </CardFooter>
      ) : (
        <CardFooter className=" flex min-h-10 bg-red-400 border border-r-black">
          <Typography className="ml-auto mr-auto mt-auto mb-auto text-white font-bold text-3xl">
            {temp.toFixed(2)}
          </Typography>
        </CardFooter>
      )}
    </Card>
  );
}
