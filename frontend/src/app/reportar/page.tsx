"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";

const ReportarPage = () => {
  const [postImage, setPostImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [successfull, setSuccessfull] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const description = formData.get("description");
    const platform = formData.get("platform");

    const response = await fetch("http://localhost:9000/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        platform,
        description,
        assets: [postImage],
        createdBy: "sebas",
      }),
    });

    if (response.ok) {
      setLoading(false);
      setSuccessfull(true);
      setError(false);
    } else {
      setLoading(false);
      setSuccessfull(false);
      setError(true);
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setPostImage(base64);
  };

  const renderForm = () => {
    return (
      <form className="max-w-sm mx-auto space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Descripcion
          </label>
          <input
            name="description"
            type="text"
            id="description"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="platform"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Plataforma
          </label>
          <select
            name="platform"
            id="platform"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Whatsapp</option>
            <option>Facebook</option>
            <option>Instagram</option>
            <option>Twitter / X</option>
            <option>Linkedin</option>
          </select>
        </div>

        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="user_avatar"
          >
            Evidencia
          </label>
          <input
            className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal leading-[2.15] text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
            id="formFileLg"
            name="assets"
            type="file"
            onChange={(e) => handleFileUpload(e)}
            accept=".jpeg, .png, .jpg"
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? <Loader2 size={24} /> : null}
          {loading ? "Cargando..." : "Reportar"}
        </Button>
      </form>
    );
  };

  const renderSucessfullHero = () => {
    return (
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">
              Haces del mundo
              <br className="hidden lg:inline-block" />
              un lugar mas seguro
            </h1>
            <p className="mb-8 leading-relaxed">
              Ahora, uno de nuestros empleados revisara tu reporte, una vez
              verificado tomaremos las acciones necesarias y publicaremos tu
              reporte. Gracias!
            </p>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <Image
              className="object-cover object-center rounded"
              alt="hero"
              src="/Okbro.svg"
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>
    );
  };

  const renderErrorComponent = () => {
    return (
      <div>
        <p>Algo salio mal</p>
      </div>
    );
  };

  const renderContent = () => {
    if (successfull && !error) {
      return renderSucessfullHero();
    }

    if (!successfull && error) {
      return renderErrorComponent();
    }

    return renderForm();
  };
  return <main>{renderContent()}</main>;
};

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export default ReportarPage;
