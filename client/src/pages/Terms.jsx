import React from "react";

const Terms = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20 px-6">
            <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
                <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Terms of Service</h1>
                <p className="text-gray-400 mb-8">Last updated: November 2024</p>

                <section className="mb-8">
                    <h2>1. Agreement to Terms</h2>
                    <p>
                        By accessing or using our website, you agree to be bound by these Terms of Service and our Privacy Policy. If you disagree with any part of the terms, then you may not access the service.
                    </p>
                </section>

                <section className="mb-8">
                    <h2>2. Use License</h2>
                    <p>
                        Permission is granted to temporarily download one copy of the materials (information or software) on ResumeMint AI's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </p>
                    <ul>
                        <li>modify or copy the materials;</li>
                        <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                        <li>attempt to decompile or reverse engineer any software contained on ResumeMint AI's website;</li>
                        <li>remove any copyright or other proprietary notations from the materials; or</li>
                        <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2>3. Disclaimer</h2>
                    <p>
                        The materials on ResumeMint AI's website are provided on an 'as is' basis. ResumeMint AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                </section>

                <section className="mb-8">
                    <h2>4. Limitations</h2>
                    <p>
                        In no event shall ResumeMint AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ResumeMint AI's website.
                    </p>
                </section>

                <section className="mb-8">
                    <h2>5. Governing Law</h2>
                    <p>
                        These terms and conditions are governed by and construed in accordance with the laws of California and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Terms;
