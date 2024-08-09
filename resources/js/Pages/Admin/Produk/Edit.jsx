import React, { useEffect, useState } from "react";
import InputTextLabelEdit from "@/Components/InputTextLabelEdit";
import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { router, useForm } from "@inertiajs/react";
import { Bed, Pen, PenBoxIcon } from "lucide-react";
import SelectOptionCustom from "@/Components/SelectOptionCustom";

const Edit = ({ product, kategoris }) => {
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const { data, setData, errors, processing } = useForm({
    produk_ketegori_id: product.produk_ketegori_id || "",
    deskripsion: product.deskripsion || "",
    price: product.price || "",
    name: product.name || "",
    image: product.image || "",

  });

  useEffect(() => {
    setData({
      produk_ketegori_id: product.produk_ketegori_id || "",
      deskripsion: product.deskripsion || "",
      price: product.price || "",
      name: product.name || "",
      image: product.image || "",
    });
  }, [product]);

  const submit = (e) => {
    e.preventDefault();
    router.post(
      route("admin.produk.update", product.id),
      {
        ...data,
        _method: "put",
        forceFormData: true,
      },
      {
        preserveScroll: true,
      }
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData({ ...data, image: file });
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setShowModal(true)} size="sm" className="hover:bg-orange-200 border-orange-500">
            <PenBoxIcon className="h-4 w-4 text-orange-500" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[340px] z-[120] sm:max-w-[600px] h-[67vh] md:h-[60vh] rounded-lg overflow-auto bg-white">
          <DialogHeader>
            <DialogTitle className="py-3 text-xl">Update Product</DialogTitle>
          </DialogHeader>

          <div className="bg-white mt-2">
            <form onSubmit={submit} encType="multipart/form-data">
              <div className="flex flex-col gap-4">
                <div className="mb-4 flex flex-col gap-2">
                  <div className="flex items-center w-full justify-center mt-2">
                    <div className="relative">
                      <img className="object-cover h-52 w-60 border-2 rounded-xl" src={previewImage || `${window.location.origin}/storage/${data.image}`} alt="product" />
                      <label htmlFor="foto" className="font-semibold text-sm">
                        <Pen className="absolute size-10 cursor-pointer text-white p-2 rounded-full bg-blue-500 -right-3 -bottom-3" />
                      </label>
                    </div>
                  </div>
                  <div className="items-center gap-2 hidden">
                    <input id="foto" type="file" className="w-full px-4 py-2" name="foto" onChange={handleFileChange} />
                  </div>
                  <span className="text-red-600">{errors.image}</span>
                </div>

                <SelectOptionCustom
                  optionName="Pilih Kategori Produk"
                  htmlFor="produk_ketegori_id"
                  labelName="Kategori Produk"
                  optionMap={kategoris.map((item, index) => {
                    return (
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    );
                  })}
                  errors={errors.produk_ketegori_id
                  }
                  selectOptionProps={{
                    name: "produk_ketegori_id",
                    value: data.produk_ketegori_id
                    ,
                    onChange: (e) => {
                      setData({
                        ...data,
                        produk_ketegori_id: e.target.value,
                      });
                    },
                  }}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <InputTextLabelEdit
                  labelFor="name"
                  variant="wajib"
                  labelText="Nama Produk"
                  inputId="name"
                  error={errors.name || ""}
                  inputProps={{
                    name: "name",
                    value: data.name,
                    type: "text",
                    placeholder: "Masukkan nama produk",
                    onChange: (e) => setData({ ...data, name: e.target.value })
                  }}
                >
                  <Bed className="size-5 text-gray-600 absolute z-10 top-2.5 left-2.5" />
                </InputTextLabelEdit>

                <InputTextLabelEdit
                  labelFor="deskripsion"
                  variant="wajib"
                  labelText="Deskripsi Produk"
                  inputId="deskripsion"
                  error={errors.deskripsion || ""}
                  inputProps={{
                    name: "deskripsion",
                    value: data.deskripsion,
                    type: "text",
                    placeholder: "Masukkan deskripsion produk",
                    onChange: (e) => setData({ ...data, deskripsion: e.target.value })
                  }}
                >
                  <Bed className="size-5 text-gray-600 absolute z-10 top-2.5 left-2.5" />
                </InputTextLabelEdit>

                <InputTextLabelEdit
                  labelFor="price"
                  labelText="Harga"
                  variant="wajib"
                  error={errors.price || ""}
                  inputId="price"
                  inputProps={{
                    value: data.price !== "" && !isNaN(data.price) ? parseInt(data.price).toLocaleString("id-ID") : "",
                    name: "price",
                    type: "text",
                    placeholder: "Masukkan harga",
                    onChange: (e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setData({ ...data, price: value });
                    },
                  }}
                >
                  <span className="size-5 text-gray-600 absolute z-10 top-2 left-2.5">Rp</span>
                </InputTextLabelEdit>
              </div>
              <div className="mt-8 w-full flex gap-4 items-center justify-end">
                <Button onClick={() => setShowModal(false)} className="w-1/2" disabled={processing} type="submit">Save</Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Edit;
