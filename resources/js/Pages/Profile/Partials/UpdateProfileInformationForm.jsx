import { useEffect, useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Input } from '@/Components/ui/input';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const nameInputRef = useRef(null);

    useEffect(() => {
        if (nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, []);

    const submit = (e) => {
        e.preventDefault();

        patch(route('admin.profile.update'));
    };

    return (
        <section className={`bg-white shadow-lg rounded-lg p-8 ${className}`}>
            <header className="border-b pb-4 mb-6">
                <h2 className="text-2xl font-bold text-indigo-800">Profile Information</h2>
                <p className="mt-2 text-sm text-gray-500">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" className="font-semibold" />
                    <Input
                        id="name"
                        ref={nameInputRef} // Use ref to manage focus
                        className="mt-1 block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition duration-200"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                    />
                    <InputError className="mt-2 text-red-600" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" className="font-semibold" />
                    <Input
                        id="email"
                        type="email"
                        className="mt-1 block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition duration-200"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2 text-red-600" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="p-4 bg-yellow-100 rounded-md">
                        <p className="text-sm text-yellow-800">
                            Your email address is unverified.{' '}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-indigo-600 hover:text-indigo-800 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

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
