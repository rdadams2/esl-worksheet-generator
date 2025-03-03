import React from 'react';

function AboutUs() {
  return (
    
    <div className="min-h-screen bg-[#f0f4f8]">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
                <h1 className="text-2xl font-semibold text-[#1a365d]">About Us</h1>
                <a href="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Home</a>
            </div>
        </header>

        <main className="container mx-auto py-12 px-6 bg-gradient-to-r from-yellow-200 to-blue-200">
            {/* Title / Intro */}
            <section className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-4">
                About AI Mentor Lab
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
                {/* Replace this with a brief introduction or mission statement */}
                AI Mentor Lab is revolutionizing ESL education by giving teachers an intelligent, 
                time-saving tool to create personalized learning experiences. Powered by advanced 
                AI, our platform transforms student data into dynamic lessons, assignments, and 
                presentations in minutes—enhancing engagement and making teaching more efficient.
            </p>
            </section>



            {/* Team Section */}
            <section className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-center">
                    Our Team
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                    {/* Hard-coding all 8 members, each with a JPG image and roles */}
                    {/* Member 1 */}
                    <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 mb-3">
                            <img
                                src="/src/assets/Marc.jpg"
                                alt="Marc Santamaria"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h4 className="text-lg font-semibold">Marc Santamaria</h4>
                        <p className="text-sm text-gray-500">CEO</p>
                    </div>

                    {/* Member 2 */}
                    <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 mb-3">
                            <img
                                src="/src/assets/Gustavo.jpg"
                                alt="Gustavo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h4 className="text-lg font-semibold">Gustavo Becker</h4>
                        <p className="text-sm text-gray-500">Case Manager | Legal Assistant</p>
                    </div>

                    {/* Member 3 */}
                    <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 mb-3">
                            <img
                                src=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h4 className="text-lg font-semibold">Grace</h4>
                        <p className="text-sm text-gray-500">Consultant</p>
                    </div>

                    {/* Member 4 */}
                    <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 mb-3">
                            <img
                                src="/src/assets/Jesse.jpg"
                                alt="Tyler (Jesse) Heslop"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h4 className="text-lg font-semibold">Tyler (Jesse) Heslop</h4>
                        <p className="text-sm text-gray-500">Lead Security & Software Engineer</p>
                    </div>

                    {/* Member 5 */}
                    <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 mb-3">
                            <img
                                src="/src/assets/Raquel.jpg"
                                alt="Raquel"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h4 className="text-lg font-semibold">Raquel</h4>
                        <p className="text-sm text-gray-500">Project Manager | Principal Engineer</p>
                    </div>
                    
                    {/* Member 6 */}
                    <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 mb-3">
                            <img
                                src="/src/assets/Raekwon.jpg"
                                alt="Raekwon Adams"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h4 className="text-lg font-semibold">Raekwon Adams</h4>
                        <p className="text-sm text-gray-500">Front-End Software Developer</p>
                    </div>
                    
                    {/* Member 7 */}
                    <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 mb-3">
                            <img
                                src="/src/assets/Calvin.jpg"
                                alt="Calvin Tan"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h4 className="text-lg font-semibold">Calvin Tan</h4>
                        <p className="text-sm text-gray-500">Back-End Software Developer</p>
                    </div>

                    {/* Member 8 */}
                    <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 mb-3">
                            <img
                                src="/src/assets/Binh.jpg"
                                alt="Binh Tran"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h4 className="text-lg font-semibold">Binh Tran</h4>
                        <p className="text-sm text-gray-500">AI Software Developer</p>
                    </div>
                </div>
            </section>



            {/* About / Mission Section */}
            <section className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">
                About Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
                {/* Replace with mission statement or more details */}
                To empower educators with AI-driven tools that streamline 
                lesson planning, foster personalized learning, and improve 
                student outcomes, all while saving teachers valuable time.
            </p>
            </section>



            {/* Another Text Section (Optional) */}
            <section className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">
                Our Vision
            </h3>
            <p className="text-gray-700 leading-relaxed">
                {/* Replace with your vision or additional content */}
                To redefine ESL education by making AI an essential teaching
                assistant, ensuring every student receives a customized learning
                experience and every teacher has the tools to succeed effortlessly.
            </p>
            </section>



            {/* Footer / Icons Row (Placeholder) */}
            <section className="mt-12">
            <h4 className="text-xl font-semibold mb-4">
                Connect With Us
            </h4>
            <div className="flex justify-start sm:justify-center gap-4">
                {/* Five placeholder squares for social icons or links */}
                {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-12 h-12 bg-gray-300" />
                ))}
            </div>
            </section>
        </main>



        {/* Footer */}
        <footer className="border-t bg-white">
            <div className="container mx-auto py-6 text-center text-sm text-[#4a5568]">
                <p>ESL Worksheet Generator - A Professional Tool for Language Educators</p>
            </div>
        </footer>
    </div>
  );
}

export default AboutUs;