import LoginPage from "@/components/auth/signin-form";
import Image from "next/image";

export default function SigninPage() {
    return (
        <div className="flex min-h-screen">
            {/* Image Section */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <Image
                    src="https://res.cloudinary.com/dy8ef1ngb/image/upload/v1736522854/animal-pet-care-and-training_zsq0cp.webp"
                    alt="Social Media Background"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-r-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 to-blue-500/70 rounded-r-3xl" />
                <div className="absolute bottom-10 left-10 text-white">
                    <h2 className="text-4xl font-bold mb-2">
                        Connect with friends
                    </h2>
                    <p className="text-xl">Share your moments with the world</p>
                </div>
            </div>

            {/* Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md space-y-5 py-5">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                            Welcome back
                        </h1>
                        <p className="text-gray-600">
                            Log in to your account to continue
                        </p>
                    </div>
                    <LoginPage />
                </div>
            </div>
        </div>
    );
}
