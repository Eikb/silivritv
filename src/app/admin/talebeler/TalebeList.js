import {
  Card,
  Dialog,
  DialogBody,
  DialogHeader,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { use, useEffect, useState } from "react";
import { NeticeList } from "./NeticeList";
import axios from "axios";
import { useRouter } from "next/navigation";

const TABLE_HEAD = ["Isim", "Dershane", "Notlari"];

export function TalebeList({ studentList, getAllTalebes }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [student, setStudent] = useState({
    name: "",
    groupName: "",
    grades: [],
  });

  const router = useRouter();

  return (
    <>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {studentList.map(({ id, name, groupName, grades }, index) => (
              <tr key={name} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {groupName}
                  </Typography>
                </td>

                <td className="p-4 flex flex-row space-x-3">
                  <Typography
                    as="a"
                    href="#"
                    onClick={() => {
                      setStudent({
                        name: name,
                        groupName: groupName,
                        grades: grades,
                      });
                      setOpen(true);
                    }}
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Göster
                  </Typography>
                  <Typography
                    as="a"
                    href="#"
                    onClick={(e) => {
                      let config = {
                        method: "delete",
                        maxBodyLength: Infinity,
                       url: "http://"+ process.env.BASE_URL +":8080/student/"+ id,
                        headers: {
                          Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                      };

                      axios
                        .request(config)
                        .then((response) => {
                          getAllTalebes()
                          console.log(JSON.stringify(response.data));
                        })
                        .catch((error) => {
                            router.push("/admin/login")
                          console.log(error);
                        });
                    }}
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Sil
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Dialog open={open} handler={handleOpen} size="xs">
        <DialogHeader></DialogHeader>
        <DialogBody>
          <NeticeList grades={student.grades} />
        </DialogBody>
      </Dialog>
    </>
  );
}
