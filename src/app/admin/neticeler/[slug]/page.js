"use client";
import { useRouter } from "next/navigation";
import { NavbarSimple } from "../../NavbarList";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Input,
  Spinner,
  Typography,
  navbar,
} from "@material-tailwind/react";
import { Divider } from "@mui/material";

export async function generateStaticParams() {
  // Diese Funktion sollte die benötigten Parameter zurückgeben,
  // die für die statische Generierung der Seiten benötigt werden.
  // In diesem Fall benötigen wir möglicherweise die Liste aller "slug" Parameter,
  // die von der API oder Datenbank abgerufen werden könnten.

  // Hier ein Beispiel, wie du die "slug" Parameter generieren könntest:
  const slugs = []; // Array für alle "slug" Parameter

  // Annahme: Du holst die "slug" Parameter aus einer API oder Datenbank
  // Hier ein fiktives Beispiel, wie du sie abrufen könntest:
  // const response = await fetch('API_ENDPOINT');
  // const data = await response.json();

  // Hier fügst du die "slug" Parameter dem Array hinzu:
  // data.forEach(item => slugs.push(item.slug));

  // Dummy-Daten für das Beispiel:
  slugs.push("example-slug-1");
  slugs.push("example-slug-2");

  // Die Funktion gibt ein Objekt mit einem Array von Parametern zurück
  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    // fallback: false bedeutet, dass Seiten, die nicht in den Pfaden definiert sind,
    // einen 404-Fehler zurückgeben werden. Wenn du ein anderes Verhalten wünschst,
    // kannst du fallback: true oder 'blocking' verwenden.
    fallback: false,
  };
}

const Page = ({ params }) => {
  const [day, setDay] = useState();
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState([]);
  const router = useRouter();
  const [quote, setQuote] = useState("");
  const [inputLoading, setInputLoading] = useState(false);
  const [hata, setHata] = useState(false);

  const [author, setAuthor] = useState("");
  let data = JSON.stringify({
    quote: quote,
    author: author,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://"+ process.env.BASE_URL +":8080/day/quote/" + params.slug,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    data: data,
  };

  const getDayById = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://"+ process.env.BASE_URL +":8080/day/" + params.slug,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        setDay(response.data);
        console.log("data.")
        console.log(response)
        setGrades(Object.entries(response.data.grades));
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
  };

  const handleChange = (e, k) => {
    setInputLoading(true)
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://"+ process.env.BASE_URL +":8080/day/" + params.slug + "/" + e + "/" + k,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        setHata(true)
        console.log(error);
      }).finally(()=>{
        setInputLoading(false)
      });
  };
  useEffect(() => {
    getDayById();
  }, []);
  if (loading) {
    return <Spinner />;
  }

  console.log(grades);
  return (
    <>
      <NavbarSimple />
      {day.active ? (
        <div className="">
          {" "}
          <Typography className=" text-green-400 text-center mt-5">
            Aktif
          </Typography>
          {
            inputLoading ? <Spinner className=" fixed"/> : ""
          }
          {
            hata ?       <Alert color="red">Hata Olustu.</Alert>: ""

          }
        </div>
      ) : (
        <div className="flex ml-auto">
          <Typography className=" text-red-400 text-center mt-5 ml-auto mr-auto">
            Aktif degil
          </Typography>
          <Button
            className="flex mt-auto"
            color="green"
            loading={loading}
            onClick={() => {
              let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "http://"+ process.env.BASE_URL +":8080/day/active/" + params.slug,
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              };
              setLoading(true)
              axios
                .request(config)
                .then((response) => {
                  console.log(JSON.stringify(response.data));
                })
                .catch((error) => {
                  console.log(error);
                }).finally(()=>{
                  getDayById()
                  setLoading(false)
                });
            }}
          >
            Aktifleştir
          </Button>{" "}
        </div>
      )}
      <Divider />
      <div className=" ml-20 mt-9 ">
        Bugünkü Söz
        <div className="flex flex-row">
          <Input placeholder="Söz" onChange={(e) => setQuote(e.target.value)} />
          <Input
            placeholder="Kimden"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Button
            onClick={() =>
              axios
                .request(config)
                .then((response) => {
                  getDayById();
                  console.log(JSON.stringify(response.data));
                })
                .catch((error) => {
                  console.log(error);
                })
            }
          >
            Kayit et
          </Button>
          <div></div>
        </div>
        <Typography>{day.quote}</Typography>
        <Typography>{day.author}</Typography>
        <Typography className=" text-2xl font-bold">
          Neticeler ({day.date})
        </Typography>
        <div>
          {grades.map((a, k) => {
            return (
              <div key={a} className=" grid grid-cols-9">
                <Typography key={k}>{a[0].split(".")[2]}</Typography>
                <Input
                  key={k}
                  id={a[0]}
                  defaultValue={a[1]}
                  onBlur={(e) =>
                    handleChange(a[0].split(".")[0], e.target.value)
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Page;
