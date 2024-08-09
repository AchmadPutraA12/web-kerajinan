import { useRef, useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Input } from '@/Components/ui/input';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirmation: false,
    });
    
    useEffect(() => {
        if (currentPasswordInput.current) {
            currentPasswordInput.current.focus();
        }
    }, []);

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={`bg-white shadow-md rounded-lg p-6 ${className}`}>
            <header className="border-b pb-4 mb-4">
                <h2 className="text-xl font-bold text-indigo-800">Update Password</h2>

                <p className="mt-2 text-sm text-gray-500">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-6">
                <div className="flex flex-col">
                    <InputLabel htmlFor="current_password" value="Current Password" />
                    <div className="relative mt-1">
                        <Input
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type={showPassword.current ? 'text' : 'password'}
                            className="block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition duration-200 pr-10"
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword({ ...showPassword, current: !showPassword.current })
                            }
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                        >
                            {showPassword.current ? (
                                <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                            ) : (
                                <EyeIcon className="h-5 w-5" aria-hidden="true" />
                            )}
                        </button>
                    </div>

                    <InputError message={errors.current_password} className="mt-2 text-red-600" />
                </div>

                <div className="flex flex-col">
                    <InputLabel htmlFor="password" value="New Password" />
                    <div className="relative mt-1">
                        <Input
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type={showPassword.new ? 'text' : 'password'}
                            className="block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition duration-200 pr-10"
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword({ ...showPassword, new: !showPassword.new })
                            }
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                        >
                            {showPassword.new ? (
                                <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                            ) : (
                                <EyeIcon className="h-5 w-5" aria-hidden="true" />
                            )}
                        </button>
                    </div>

                    <InputError message={errors.password} className="mt-2 text-red-600" />
                </div>

                <div className="flex flex-col">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <div className="relative mt-1">
                        <Input
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            type={showPassword.confirmation ? 'text' : 'password'}
                            className="block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition duration-200 pr-10"
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword({
                                    ...showPassword,
                                    confirmation: !showPassword.confirmation,
                                })
                            }
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                        >
                            {showPassword.confirmation ? (
                                <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                            ) : (
                                <EyeIcon className="h-5 w-5" aria-hidden="true" />
                            )}
                        </button>
                    </div>

                    <InputError message={errors.password_confirmation} className="mt-2 text-red-600" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton
                        disabled={processing}
                        className="bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 transition duration-200"
                    >
                        Save
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition-opacity duration-500"
                        enterFrom="opacity-0"
                        leave="transition-opacity duration-500"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
