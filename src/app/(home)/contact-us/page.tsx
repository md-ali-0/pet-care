import { Input, Textarea } from "@nextui-org/input";
import { MapPin, PhoneCall } from "lucide-react";
import { FaEnvelope } from "react-icons/fa";

const info = [
    {
        title: "🗺 ADDRESS",
        desc: "Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter",
    },
    {
        title: "💌 EMAIL",
        desc: "nc.example@example.com",
    },
    {
        title: "☎ PHONE",
        desc: "000-123-456-7890",
    },
];

const PageContact = ({}) => {
    return (
        <section className="container mx-auto px-5 sm:px-8 py-5">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-semibold">Contact Us</h2>
                    <p className="text-gray-600 dark:text-gray-200 mt-4">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="mb-6 md:mb-0">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border">
                            <div className="mb-6">
                                <div className="flex items-center gap-3.5">
                                    <MapPin
                                        className="text-blue-500"
                                        size={25}
                                    />
                                    <h3 className="text-xl font-semibold">
                                        Address
                                    </h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-200 mt-2">
                                    44 Shirley Ave. West Chicago, IL 60185, USA.
                                </p>
                            </div>
                            <div className="mb-6">
                                <div className="flex items-center gap-3.5">
                                    <PhoneCall
                                        className="text-blue-500"
                                        size={25}
                                    />
                                    <h3 className="text-xl font-semibold">
                                        Call us on
                                    </h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-200 mt-2">
                                    +1 800 555 44 00 (Toll free)
                                </p>
                                <p className="text-gray-600 dark:text-gray-200">
                                    +321 55 666 7890
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center gap-3.5">
                                    <FaEnvelope
                                        className="text-blue-500"
                                        size={25}
                                    />
                                    <h3 className="text-xl font-semibold">
                                        Mail at
                                    </h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-200 mt-2">
                                    support@shopgrids.com
                                </p>
                                <p className="text-gray-600 dark:text-gray-200">
                                    career@shopgrids.com
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border">
                            <form>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <Input
                                        type="text"
                                        placeholder="Your Name"
                                        className="py-5"
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Your Subject"
                                        className="py-5"
                                    />
                                    <Input
                                        type="email"
                                        placeholder="Your Email"
                                        className="py-5"
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Your Phone"
                                        className="py-5"
                                    />
                                </div>
                                <div className="mb-6">
                                    <Textarea
                                        placeholder="Your Message"
                                        rows={5}
                                    ></Textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-3 px-6 rounded-lg"
                                >
                                    Submit Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
    );
};

export default PageContact;
