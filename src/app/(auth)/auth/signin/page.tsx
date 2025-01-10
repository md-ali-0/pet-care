import LoginPage from "@/components/auth/signin-form";
import Image from "next/image";

export default function SigninPage() {
    return (
        <div className="flex min-h-screen">
            {/* Image Section */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <Image
                    src="https://res.cloudinary.com/dy8ef1ngb/image/upload/v1736522854/animal-pet-care-and-training_zsq0cp.webp"
                    alt="Pet Care Social Media Background"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-r-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/70 to-green-400/70 rounded-r-3xl" />
                <div className="absolute bottom-10 left-10 text-white">
                    <h2 className="text-4xl font-bold mb-2">
                        Welcome to PetConnect
                    </h2>
                    <p className="text-xl">
                        Join a community of pet lovers, share moments, and get tips for your furry friends.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md space-y-5 py-5">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                            Welcome to PetConnect
                        </h1>
                        <p className="text-gray-600">
                            Log in to connect with pet owners, find care tips, and share your pet stories.
                        </p>
                    </div>
                    <LoginPage />
                    <div className="text-center text-gray-600 mt-4">
                        <p>
                            Don&apos;t have an account?{" "}
                            <a
                                href="/signup"
                                className="text-blue-500 hover:underline font-semibold"
                            >
                                Sign up now
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
