import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Typography,
  Input,
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function Neticelist({ neticeler, getAllNetices }) {
  console.log(neticeler);
  const router = useRouter();
  const [name, setName] = useState();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  let data = JSON.stringify({
    date: name,
  });

  const addNetice = () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
     url: "http://"+ process.env.BASE_URL +":8080/day",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: data,
    };
    setLoading(true);
    axios
      .request(config)
      .then((response) => {
        getAllNetices();
        setDialogOpen(false);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Card className="w-full flex mx-auto mt-5">
      <Button
        variant="gradient"
        className=" w-60 ml-auto"
        onClick={() => setDialogOpen(true)}
      >
        Netice Ekle
      </Button>
      <Dialog open={isDialogOpen} handler={() => setDialogOpen(false)}>
        <DialogHeader>Netice Ekle</DialogHeader>
        <DialogBody>
          <Input label="Isim" onChange={(e) => setName(e.target.value)} />
        </DialogBody>
        <DialogFooter>
          <Button variant="outlined" className="mr-4">
            Kapat
          </Button>
          <Button onClick={() => addNetice()}>Ekle</Button>
        </DialogFooter>
      </Dialog>
      <List>
        {neticeler.map((e) => {
          return (
            <ListItem ripple={false} className="py-1 pr-1 pl-4" key={e}>
              <div onClick={() => router.push("/admin/neticeler/" + e.id)}>
                {e.active ? (
                  <Typography className=" text-green-600 font-bold">
                    {e.date}
                  </Typography>
                ) : (
                  <Typography className=" text-blue-gray-800 font-thin">
                    {e.date}
                  </Typography>
                )}
              </div>
              <ListItemSuffix>
                <IconButton
                  variant="text"
                  color="blue-gray"
                  onClick={() => {
                    let config = {
                      method: "delete",
                      maxBodyLength: Infinity,
                     url: "http://"+ process.env.BASE_URL +":8080/day/" + e.id,
                      headers: {
                        "Content-Type": "application/json",
                        Authorization:
                          "Bearer " + localStorage.getItem("token"),
                      },
                    };
                    axios
                      .request(config)
                      .then((response) => {
                        getAllNetices()
                        console.log(JSON.stringify(response.data));
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }}
                >
                  <TrashIcon />
                </IconButton>
              </ListItemSuffix>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
}
