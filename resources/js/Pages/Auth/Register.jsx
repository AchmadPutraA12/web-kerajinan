import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        nama_lengkap: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [confirmationShowPassword, setconfirmationShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('register.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Register" />
            <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
                <form onSubmit={submit}>
                    <div>
                        <Label variant="wajib" htmlFor="name">
                            Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            placeholder="Masukkan Nama Yang ingin didaftarkan"
                            className="mt-1 block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition duration-200"
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2 text-red-600" />
                    </div>

                    <div>
                        <Label variant="wajib" htmlFor="nama_lengkap">
                            Nama Lengkap
                        </Label>
                        <Input
                            id="nama_lengkap"
                            type="text"
                            name="nama_lengkap"
                            value={data.nama_lengkap}
                            placeholder="Masukkan Nama Lengkap Yang akan Di daftarkan"
                            className="mt-1 block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition duration-200"
                            onChange={(e) => setData('nama_lengkap', e.target.value)}
                        />
                        <InputError message={errors.nama_lengkap} className="mt-2 text-red-600" />
                    </div>

                    <div>
                        <Label variant="wajib" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="Masukkan Email Yang ingin didaftarkan"
                            className="mt-1 block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition duration-200"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2 text-red-600" />
                    </div>

                    <div>
                        <Label variant="wajib" htmlFor="password">
                            Password
                        </Label>
                        <div className="relative mt-1">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                placeholder="Masukkan Password"
                                className="block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition duration-200 pr-10"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                        <InputError message={errors.password} className="mt-2 text-red-600" />
                    </div>

                    <div>
                        <Label variant="wajib" htmlFor="password_confirmation">
                            Konfirmasi Password
                        </Label>
                        <div className="relative mt-1">
                            <Input
                                id="password_confirmation"
                                type={confirmationShowPassword ? 'text' : 'password'}
                                name="password_confirmation"
                                value={data.password_confirmation}
                                placeholder="Masukkan Konfirmasi Password"
                                className="block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition duration-200 pr-10"
                                autoComplete="current-password_confirmation"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setconfirmationShowPassword(!confirmationShowPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                            >
                                {confirmationShowPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                        <InputError message={errors.password_confirmation} className="mt-2 text-red-600" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton
                            className="bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 transition duration-200"
                            disabled={processing}
                        >
                            Register
                        </PrimaryButton>
                    </div>

                    <div className="flex items-center justify-center mt-4">
                        <Link
                            href={route('login')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Already registered?
                        </Link>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
