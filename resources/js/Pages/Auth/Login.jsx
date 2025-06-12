import { useState, useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import AuthLayout from '@/Layouts/AuthLayout';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const rememberMe = localStorage.getItem('rememberMe');
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        const rememberedPassword = localStorage.getItem('rememberedPassword');

        if (rememberMe === 'true' && rememberedEmail && rememberedPassword) {
            setData({
                email: rememberedEmail,
                password: rememberedPassword,
                remember: true,
            });
        }
    }, []);

    const submit = (e) => {
        e.preventDefault();

        if (data.remember) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('rememberedEmail', data.email);
            localStorage.setItem('rememberedPassword', data.password);
        } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberedPassword');
        }

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Log in" />

            <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label variant="wajib" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="Masukkan Email Yang Telah Terdaftar"
                            className="mt-1 block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition duration-200"
                            autoComplete="username"
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
                                placeholder="Masukkan Password Yang Telah Terdaftar"
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

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton
                            className="bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 transition duration-200"
                            disabled={processing}
                        >
                            Log in
                        </PrimaryButton>
                    </div>

                    <div className="flex items-center justify-center mt-4">
                        <span className="text-sm text-gray-600 mr-1">Tidak punya akun?</span>
                        <Link
                            href={route('register')}
                            className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold"
                        >
                            Daftar
                        </Link>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
