"use client";
import Image from "next/image";
import { NeticeTable } from "./components/NeticeTable";
import { Divider } from "@mui/material";
import Dershane from "./components/Dershane";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import CountdownTimer from "./components/CountdownTimer";

export default function Home() {
  const [dershane1, setDershane1] = useState([]);
  const [dershane2, setDershane2] = useState([]);
  const [dershane3, setDershane3] = useState([]);
  const [mescid, setMescid] = useState([]);

  const [söz, setSöz] = useState("");
  const [author, setAuthor] = useState("");

  const dto = [
    {
      groupName: "Dershane 1",
      results: dershane1,
    },
    {
      groupName: "Dershane 2",
      results: dershane2,
    },
    {
      groupName: "Dershane 3",
      results: dershane3,
    },
    {
      groupName: "Mescid",
      results: mescid,
    },
  ];

  const calculateAverrage = () => {
    let dershane1Av = 0;
    let dershane2Av = 0;
    let dershane3Av = 0;
    let mescidAv = 0;

    dershane1.map((e) => {
      dershane1Av += e.not;
    });
    dershane1Av /= dershane1.length;

    console.log("Dershane 1: "  + dershane1Av)
    dershane2.map((e) => {
      dershane2Av += e.not;
    });
    dershane2Av /= dershane2.length;
    console.log("Dershane 2: "  + dershane2Av)

    dershane3.map((e) => {
      dershane3Av += e.not;
    });
    dershane3Av /= dershane3.length;
    console.log("Dershane 3: "  + dershane3Av)


    mescid.map((e) => {
      mescidAv += e.not;
    });
    mescidAv /= mescid.length;

    console.log("Dershane mescid: "  + mescidAv)

    return ((dershane1Av +dershane2Av + dershane3Av + mescidAv) / 4).toFixed(2)
  };

  useEffect(() => {
    let tempDershane1List = [];
    let tempDershane2List = [];
    let tempDershane3List = [];
    let tempMescid = [];
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://"+ process.env.SERVER_URL +":8080/day/active",
      
    };

    axios
      .request(config)
      .then((response) => {
        setSöz(response.data.quote);
        setAuthor(response.data.author);
        Object.entries(response.data.grades).map((name) => {
          let dershane = name[0].split(".")[1];
          let id = name[0].split(".")[0];
          let nameOfStudent = name[0].split(".")[2];
          let grade = name[1];

          if (dershane == "Dershane 1") {
            tempDershane1List.push({
              id: id,
              name: nameOfStudent,
              not: grade,
            });
          }
          if (dershane == "Dershane 2") {
            tempDershane2List.push({
              id: id,
              name: nameOfStudent,
              not: grade,
            });
          }
          if (dershane == "Dershane 3") {
            tempDershane3List.push({
              id: id,
              name: nameOfStudent,
              not: grade,
            });
          }
          if (dershane == "Mescid") {
            tempMescid.push({
              id: id,
              name: nameOfStudent,
              not: grade,
            });
          }

          setDershane1(tempDershane1List);
          setDershane2(tempDershane2List);
          setDershane3(tempDershane3List);
          setMescid(tempMescid);
        });

        dershane1.map((e) => {});

        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(dershane1);
  }, []);

  console.log(dershane1);
  return (
    <div className="absolute inset-0 m-0 h-full w-full rounded-none bg-gray-000 bg-cover bg-center mt-8">
      <div className=" grid grid-cols-4 flex flex-col ">
        {dto.map((e) => {
          return (
            <Dershane
            key={1}
              name={e.groupName}
              TABLE_ROWS={e.results}
              color="bg-red"
            />
          );
        })}
      </div>
      <div className=" grid grid-cols-4 mt-5 ml-5 ">
        <div>
          <Card
            shadow={false}
            className=" rounded-xl relative grid h-[11rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://m.media-amazon.com/images/I/71DfrDExbqL._AC_UF1000,1000_QL80_.jpg')] bg-cover bg-center"
            >
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative md:px-12">
              <Typography
                variant="h5"
                className="mb-6 font-medium leading-[1.5] text-gray-400"
              >
                Imtihana Kalan Süre
              </Typography>
              <Typography variant="h5" className="mb-4 text-white">
                <CountdownTimer />
              </Typography>
            </CardBody>
          </Card>
        </div>
        <div>
          <Card
            shadow={false}
            className=" rounded-xl relative grid h-[11rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://m.media-amazon.com/images/I/71DfrDExbqL._AC_UF1000,1000_QL80_.jpg')] bg-cover bg-center"
            >
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-14 px-6 md:px-12">
              <Typography
                variant="h2"
                color="white"
                className="mb-6 font-medium leading-[1.5]"
              >
                {söz}
              </Typography>
              <Typography variant="h5" className="mb-4 text-gray-400">
                {author}
              </Typography>
            </CardBody>
          </Card>
        </div>
        <div>
          <Card
            shadow={false}
            className=" rounded-xl relative grid h-[11rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-none bg-green-400 bg-cover bg-center"
            >
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-14 px-6 md:px-12">
              <Typography
                variant="h5"
                color="white"
                className="mb-6 font-medium leading-[1.5]"
              >
                Bugünkü Netice Ortalamasi
              </Typography>
              <Typography variant="h5" className="mb-4 text-gray-400">
                {calculateAverrage()}
              </Typography>
            </CardBody>
          </Card>
        </div>
        <div>
          <Card
            shadow={false}
            className=" rounded-xl relative grid h-[11rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-none bg-red-500 bg-cover bg-center"
            >
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-14 px-6 md:px-12">
              <Typography
                variant="h2"
                color="white"
                className="mb-6 font-medium leading-[1.5]"
              >
                Imtihan Netice Ortalama
              </Typography>
              <Typography variant="h5" className="mb-4 text-gray-400">
                97
              </Typography>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
