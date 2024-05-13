"use client";
import React, { useEffect, useState } from "react";
import requireAuth from "../requireAuth";
import { Navbar, Typography } from "@material-tailwind/react";
import { NavbarSimple } from "../NavbarList";
import { TalebeList } from "../talebeler/TalebeList";
import { NeticeList } from "../talebeler/NeticeList";
import { Neticelist } from "./NeticelerList";
import axios from "axios";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  
  const [days, setDays] = useState([]);
  const router = useRouter();
  function getAllNetices() {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
     url: "http://"+ process.env.BASE_URL +":8080/day",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
  
    axios
      .request(config)
      .then((response) => {
        setDays(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        router.push("/admin/login");
        console.log(error);
      });
  }
  
  useEffect(() => {

    getAllNetices();
  }, []);
  const neticeler = [
    {
      id: "2",
      active: true,
      date: "10.05.2024",
      grades: {
        "Enes Ilkbay": 100,
        "Emre Erce": 100,
      },
    },
    {
      id: "3",
      active: true,
      date: "11.05.2024",
      grades: {
        "Enes Ilkbay": 100,
        "Emre Erce": 100,
      },
    },
    {
      id: "4",
      active: true,
      date: "12.05.2024",
      grades: {
        "Enes Ilkbay": 100,
        "Emre Erce": 100,
      },
    },
  ];
  return (
    <>
      <NavbarSimple />
      <Typography className="mb-4 ml-48 font-bold mt-10">Neticeler</Typography>

      <div className=" flex mx-48">
        <Neticelist neticeler={days} getAllNetices={getAllNetices}/>
      </div>
    </>
  );
};

export default requireAuth(Dashboard);

