import SignupForm from "@/components/auth/signup-form";
import Image from "next/image";

export default function SignupPage() {
    return (
        <div className="flex min-h-screen">
            {/* Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                            Create an account
                        </h1>
                        <p className="text-gray-600">
                            Join our community today
                        </p>
                    </div>

                    <SignupForm />

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <a
                                href="/auth/signin"
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                Sign In
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Image Section */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <Image
                    src="https://res.cloudinary.com/dy8ef1ngb/image/upload/v1736522854/animal-pet-care-and-training_zsq0cp.webp"
                    alt="Social Media Background"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-l-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/70 to-purple-600/70 rounded-l-3xl" />
                <div className="absolute top-10 right-10 text-white text-right">
                    <h2 className="text-4xl font-bold mb-2">
                        Join our community
                    </h2>
                    <p className="text-xl">Share your moments with the world</p>
                </div>
            </div>
        </div>
    );
}
