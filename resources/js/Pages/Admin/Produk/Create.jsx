import React, { useState } from "react";
import InputTextLabel from "@/Components/InputTextLabel";
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";
import { MenuSquareIcon, ImageIcon, CircleX } from "lucide-react";
import SelectOptionCustom from "@/Components/SelectOptionCustom";
import Spinner from "@/Components/Spinner";
import InputError from "@/Components/InputError";

const Create = ({ kategoris }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    produk_ketegori_id: "",
    name: "",
    deskripsion: "",
    price: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData({
        ...data,
        image: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    reset();
    setPreviewImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("admin.produk.store"), {
      forceFormData: true,
      onSuccess: () => reset(),
      preserveScroll: true,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mt-6 p-4 bg-gray-50 border rounded-lg lg:w-4/5"
    >
      <InputTextLabel
        labelFor="name"
        labelText="Nama produk"
        error={errors && errors.name ? errors.name : ""}
        inputId="name"
        inputProps={{
          value: data.name,
          name: "name",
          type: "text",
          placeholder: "Masukkan nama produk",
          onChange: (e) => {
            setData({
              ...data,
              name: e.target.value,
            });
          },
        }}
      >
        <MenuSquareIcon className="size-5 text-gray-600 absolute z-10 top-2.5 left-2.5" />
      </InputTextLabel>

      <SelectOptionCustom
        optionName="Pilih Kategori Produk"
        htmlFor="produk_ketegori_id"
        labelName="Kategori Produk"
        optionMap={(kategoris || []).map((item, index) => (
          <option value={item.id} key={index}>
            {item.name}
          </option>
        ))}
        errors={errors.produk_ketegori_id}
        selectOptionProps={{
          name: "produk_ketegori_id",
          value: data.produk_ketegori_id,
          onChange: (e) => {
            setData({
              ...data,
              produk_ketegori_id: e.target.value,
            });
          },
        }}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <InputTextLabel
        labelFor="deskripsion"
        labelText="Deskripsi produk"
        variant={"wajib"}
        error={errors && errors.deskripsion ? errors.deskripsion : ""}
        inputId="deskripsion"
        inputProps={{
          value: data.deskripsion,
          name: "deskripsion",
          type: "text",
          placeholder: "Masukkan sub nama kategori produk",
          onChange: (e) => {
            setData({
              ...data,
              deskripsion: e.target.value,
            });
          },
        }}
      >
        <MenuSquareIcon className="size-5 text-gray-600 absolute z-10 top-2.5 left-2.5" />
      </InputTextLabel>

      <InputTextLabel
        labelFor="price"
        labelText="Harga"
        variant="wajib"
        error={errors && errors.price ? errors.price : ""}
        inputId="price"
        inputProps={{
          value: data.price !== "" && !isNaN(data.price) ? parseInt(data.price).toLocaleString("id-ID") : "",
          name: "price",
          type: "text",
          placeholder: "Masukkan harga produk",
          onChange: (e) => {
            const value = e.target.value.replace(/\D/g, "");
            setData({ ...data, price: value });
          },
        }}
      >
        <span className="size-5 text-gray-600 absolute z-10 top-2 left-2.5">Rp</span>
      </InputTextLabel>

      <div className="flex gap-4 w-full">
        <div
          className={`flex flex-col gap-2 mt-2 ${data.image ? "w-1/2" : "w-full"}`}
        >
          <span className="text-sm">
            Foto <span className="text-red-500">*</span>
          </span>
          <label
            htmlFor="image"
            className="flex items-center cursor-pointer gap-2 hover:bg-slate-100 transform duration-300 flex-col justify-center p-16 bg-white border border-dashed rounded-lg border-gray-500"
          >
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImageChange}
            />
            <>
              <ImageIcon className="size-16 text-gray-400" />
              <span className="text-gray-400 font-medium">
                Upload Gambar (JPG, PNG, atau GIF)
              </span>
            </>
          </label>
        </div>

        {data.image && (
          <>
            <div className="flex flex-col gap-2 mt-2 w-1/2">
              <span className="text-sm">Preview File</span>
              <div className="flex items-center rounded-xl justify-between p-2 border bg-white">
                <div className="flex items-center gap-3 rounded-xl">
                  {previewImage && (
                    <img
                      className="size-24 object-cover rounded-xl"
                      src={previewImage}
                      alt=""
                    />
                  )}
                  <div className="flex flex-col">
                    <p>{data.image.name}</p>
                    <p>{data.image.size} bytes</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPreviewImage(null);
                    setData({
                      ...data,
                      image: null,
                    });
                    const fileInput = document.getElementById(
                      "image"
                    );
                    if (fileInput) {
                      fileInput.value = "";
                    }
                  }}
                >
                  <CircleX className="size-6 text-red-500" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <InputError message={errors.image} />

      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          onClick={handleReset}
          variant="outline"
          size="lg"
          className="border-black"
        >
          Reset
        </Button>
        <Button
          type="submit"
          disabled={processing}
          variant="default"
          size="lg"
        >
          {processing ? <Spinner /> : <span>Simpan</span>}
        </Button>
      </div>
    </form>
  );
};

export default Create;
