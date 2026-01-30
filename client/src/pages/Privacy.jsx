import React from "react";

const Privacy = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20 px-6">
            <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
                <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Privacy Policy</h1>
                <p className="text-gray-400 mb-8">Last updated: November 2024</p>

                <section className="mb-8">
                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to ResumeMint AI ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                    </p>
                </section>

                <section className="mb-8">
                    <h2>2. Data We Collect</h2>
                    <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                    <ul>
                        <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data:</strong> includes email address and telephone number.</li>
                        <li><strong>Profile Data:</strong> includes your resume content, employment history, education, and skills.</li>
                        <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2>3. How We Use Your Data</h2>
                    <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                    <ul>
                        <li>To provide the AI resume building service.</li>
                        <li>To manage your account and subscription.</li>
                        <li>To improve our website and services.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2>4. Data Security</h2>
                    <p>
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                    </p>
                </section>

                <section className="mb-8">
                    <h2>5. Contact Us</h2>
                    <p>
                        If you have any questions about this privacy policy or our privacy practices, please contact us at: privacy@resumemint.com
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Privacy;
