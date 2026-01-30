import React from "react";

const Cookies = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20 px-6">
            <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
                <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Cookie Policy</h1>
                <p className="text-gray-400 mb-8">Last updated: November 2024</p>

                <section className="mb-8">
                    <h2>1. What Are Cookies</h2>
                    <p>
                        As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies.
                    </p>
                </section>

                <section className="mb-8">
                    <h2>2. How We Use Cookies</h2>
                    <p>
                        We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
                    </p>
                </section>

                <section className="mb-8">
                    <h2>3. The Cookies We Set</h2>
                    <ul>
                        <li>
                            <strong>Account related cookies:</strong> If you create an account with us then we will use cookies for the management of the signup process and general administration.
                        </li>
                        <li>
                            <strong>Login related cookies:</strong> We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page.
                        </li>
                        <li>
                            <strong>Site preferences cookies:</strong> In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it.
                        </li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2>4. Third Party Cookies</h2>
                    <p>
                        In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
                    </p>
                    <ul>
                        <li>
                            This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience.
                        </li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2>5. More Information</h2>
                    <p>
                        Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Cookies;
