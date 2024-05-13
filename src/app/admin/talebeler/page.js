"use client";
import React, { use, useEffect, useState } from "react";
import { NavbarSimple } from "../NavbarList";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { TalebeList } from "./TalebeList";
import { NeticeList } from "./NeticeList";
import axios from "axios";
import { useRouter } from "next/navigation";

const Talebeler = () => {
  const [open, setOpen] = useState(true);
  const [openAddTalebe, setOpenTalebe] = useState();
  const [name, setName] = useState("");
  const [groupName, setGroup] = useState("");

  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter()
  useEffect(() => {
    getAllTalebes();
  }, []);

  function getAllTalebes() {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
     url: "http://"+ process.env.BASE_URL +":8080/student",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    setLoading(true);
    axios
      .request(config)
      .then((response) => {
        setStudentList(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        if (error.response.status == 401) {
          router.push("/admin/login");
        }
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const addTalebe = () => {
    let data = JSON.stringify({
      name: name,
      groupName: groupName,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
     url: "http://"+ process.env.BASE_URL +":8080/student",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setOpenTalebe(false);
        getAllTalebes()
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <NavbarSimple />

      <Dialog open={openAddTalebe}>
        <DialogHeader>Talebe Ekle</DialogHeader>
        <DialogBody>
          <Input onChange={(e) => setName(e.target.value)} label="Isim" />
          <div className="mt-5">
            <Select label="Dershane Seçiniz" onChange={(e) => setGroup(e)}>
              <Option value="Dershane 1">Dershane 1</Option>
              <Option value="Dershane 2">Dershane 2</Option>
              <Option value="Dershane 3">Dershane 3</Option>
              <Option value="Mescid">Mescid</Option>
            </Select>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="outlined"
            onClick={() => setOpenTalebe(false)}
            className="mr-4"
          >
            Iptal
          </Button>

          <Button onClick={() => addTalebe()}>Kayit et</Button>
        </DialogFooter>
      </Dialog>
      <div className="mx-10 mt-7">
        <div className=" flex flex-row">
          <Typography>Talebeler</Typography>

          <Button
            variant="gradient"
            className="ml-auto mb-3"
            onClick={() => setOpenTalebe(true)}
          >
            Talebe ekle
          </Button>
        </div>

        <TalebeList studentList={studentList} getAllTalebes={getAllTalebes}/>
      </div>
    </>
  );
};

export default Talebeler;
