import React, { useState } from "react";
import InputTextLabel from "@/Components/InputTextLabel";
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";
import { CircleX, ImageIcon, MenuSquare } from "lucide-react";
import InputError from "@/Components/InputError";
import Spinner from "@/Components/Spinner";

const Create = () => {
  const { data, setData, post, processing, errors, reset, progress } =
    useForm({
      name: "",
    });

  function handleSubmit(e) {
    e.preventDefault();
    post(route("admin.kategori-produk.store"), {
      forceFormData: true,
      onSuccess: () => reset("name"),
      preserveScroll: true,
    });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mt-6 p-4 bg-gray-50 border rounded-lg lg:w-4/5"
      >
        <InputTextLabel
          variant={"wajib"}
          labelFor="name"
          labelText="Nama Kategori Produk"
          error={errors && errors.name ? errors.name : ""}
          inputId="name"
          inputProps={{
            value: data.name,
            name: "name",
            type: "text",
            placeholder: "Masukkan Nama Kategori",
            onChange: (e) => {
              setData({
                ...data,
                name: e.target.value,
              });
            },
          }}
        >
          <MenuSquare className="size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
        </InputTextLabel>

        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant={"outline"}
            size={"lg"}
            className="border-black"
            onClick={() => reset("name")}
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={processing}
            variant={"default"}
            size={"lg"}
            className="text-white bg-black"
          >
            {processing ? <Spinner /> : <span>Simpan</span>}
          </Button>
        </div>
      </form>
    </>
  );
};

export default Create;
