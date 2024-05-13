import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    CardHeader,
  } from "@material-tailwind/react";
import { NeticeTable } from "./NeticeTable";
   
  export default function Dershane({name, color, TABLE_ROWS}) {
    return (
            <NeticeTable TABLE_ROWS={TABLE_ROWS} color={color} name={name}/>

    );
  }