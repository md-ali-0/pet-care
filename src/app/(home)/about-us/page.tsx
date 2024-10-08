import { Mail, MapPin, Phone } from "lucide-react";

import bannerImage from '@/assets/image/about.png';
import Image from "next/image";

const AboutUs = () => {

    return (
        <>
        <section className="w-full py-12 md:py-24 lg:py-20">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                    <div className="space-y-4">
                        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                            About Us
                        </div>
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Providing Expert Pet Care Tips and Advice
                        </h1>
                        <p className="max-w-[600px] text-default-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            At Pet Care Hub, we`&apos;re passionate about helping pet owners provide the best care for their furry companions. Our mission is to offer expert advice, tips, and resources to ensure your pets lead healthy, happy lives.
                        </p>
                    </div>
                    <Image
                        src={bannerImage.src}
                        width="550"
                        height="350"
                        alt="About Us"
                        className="mx-auto aspect-video overflow-hidden rounded-xl object-center sm:w-full"
                    />
                </div>
            </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-6 text-center">
                    <div className="space-y-3">
                        <div className="inline-block rounded-lg bg-slate-950 text-white px-3 py-1 text-sm">
                            Our Mission & Vision
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                            Our Mission and Vision
                        </h2>
                        <p className="max-w-[900px] text-default-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our mission is to provide pet owners with expert advice on caring for their pets, from nutrition to grooming. We envision a world where every pet receives the love and care they deserve to live a long, healthy life.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-3">
                        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                            Contact Us
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                            Get in Touch
                        </h2>
                        <p className="max-w-[900px] text-default-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            We’d love to hear from you! Whether you have questions, feedback, or need help with pet care, reach out to us at:
                        </p>
                        <div className="flex flex-col items-center space-y-6">
                            <div className="flex items-center justify-center gap-2 md:gap-4">
                                <Mail className="text-default-400" size={20} />
                                <p className="text-sm md:text-xl text-default-400">
                                    Email: support@petcarehub.com
                                </p>
                            </div>
                            <div className="flex items-center justify-center gap-2 md:gap-4">
                                <Phone className="text-default-400" size={20} />
                                <p className="text-sm md:text-xl text-default-400">
                                    Phone: +1 (800) 123-4567
                                </p>
                            </div>
                            <div className="flex items-center justify-center gap-2 md:gap-4">
                                <MapPin className="text-default-400" size={20} />
                                <p className="text-sm md:text-xl text-default-400">
                                    Address: 123 Pet Care Lane, Pet Town, USA
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-3">
                        <div className="inline-block rounded-lg bg-slate-950 text-white px-3 py-1 text-sm">
                            Our Team
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                            Meet the Pet Care Hub Team
                        </h2>
                        <p className="max-w-[900px] text-default-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our team is made up of passionate pet experts committed to providing the best care advice for your pets.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 pt-5">
                    <div className="grid gap-4">
                        <Image
                            src="https://xsgames.co/randomusers/assets/avatars/female/49.jpg"
                            alt="Sophia Johnson"
                            className="mx-auto aspect-square overflow-hidden rounded-full object-cover w-40"
                            height={150}
                            width={150}
                        />
                        <div className="text-center">
                            <h3 className="text-lg font-bold">
                                Sophia Johnson
                            </h3>
                            <p className="text-default-400">CEO</p>
                            <p className="text-sm text-default-400">
                                Sophia is the founder of Pet Care Hub, with over 10 years of experience in the pet care industry.
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <Image
                            src="https://xsgames.co/randomusers/assets/avatars/female/25.jpg"
                            alt="Emily Davis"
                            className="mx-auto aspect-square overflow-hidden rounded-full object-cover w-40"
                            height={150}
                            width={150}
                        />
                        <div className="text-center">
                            <h3 className="text-lg font-bold">
                                Emily Davis
                            </h3>
                            <p className="text-default-400">COO</p>
                            <p className="text-sm text-default-400">
                                Emily ensures the smooth day-to-day operations of Pet Care Hub, helping pet owners with all their pet care needs.
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <Image
                            src="https://xsgames.co/randomusers/assets/avatars/female/52.jpg"
                            alt="Lily Moore"
                            className="mx-auto aspect-square overflow-hidden rounded-full object-cover w-40"
                            height={150}
                            width={150}
                        />
                        <div className="text-center">
                            <h3 className="text-lg font-bold">
                                Lily Moore
                            </h3>
                            <p className="text-default-400">CTO</p>
                            <p className="text-sm text-default-400">
                                Lily leads our technology team, ensuring that pet owners have access to the best online tools for pet care.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-3">
                        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                            Our Store Location
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                            Visit Our Store
                        </h2>
                        <p className="max-w-[900px] text-default-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Come and visit us at our physical store located at:
                        </p>
                        <p className="max-w-[900px] text-default-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Address: 123 Pet Care Lane, Pet Town, USA
                            <br />
                            Opening Hours: Mon - Fri: 9 AM - 6 PM, Sat: 10 AM - 4 PM
                        </p>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default AboutUs;
