import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { useState } from "react";

const DeleteDataPermanent = ({ id, paramLink }) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <AlertDialog open={showModal} onOpenChange={setShowModal}>
            <AlertDialogTrigger asChild>
                <button
                    onClick={() => setShowModal(true)}
                    className="text-xs bg-red-100 px-4 py-2 rounded-md text-red-500 border border-red-500 hover:bg-red-200 hover:text-gray-white hover:border-gray-400"
                >
                    Hapus
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Apakah anda yakin ingin menghapus?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Tindakan ini tidak bisa dibatalkan. Ini akan hapus data
                        Anda secara permanen dan hapus akun Anda data dari
                        server kami.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant={"cancel"}>Cancel</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Link
                            preserveState
                            className="bg-blue-500 px-4 py-2.5 rounded-md text-white border-gray-400 hover:bg-blue-600 hover:text-gray-white hover:border-gray-400"
                            type="button"
                            method="get"
                            href={route(paramLink, id)}
                        >
                            Hapus Permanen
                        </Link>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteDataPermanent;
