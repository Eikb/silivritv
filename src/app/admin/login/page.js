"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function LoginPage() {
    const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://"+ process.env.BASE_URL +":8080/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response)
        localStorage.setItem("token", response.data.token)
        router.push("/admin/neticeler");
      })
      .catch((error) => {
        console.log(error);
      });

  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}
