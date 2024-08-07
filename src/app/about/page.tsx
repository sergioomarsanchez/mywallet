import React from "react";

const AboutPage = () => {
  return (
    <main className="container m-auto flex min-h-screen flex-col items-center justify-between p-5 lg:p-10 xl:p-24">
      <div className="w-full text-left relative flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:z-[-1] after:h-[180px] after:w-full after:translate-x-1/6 after:bg-gradient-conic after:from-green-200 after:via-teal-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-teal-900 after:dark:via-[#1601ff] after:dark:opacity-40 sm:before:w-[280px] sm:after:w-[240px] before:lg:h-[360px]">
        <div className="flex gap-2 flex-col w-full text-left mt-10 lg:mt-0">
          <h1 className="text-2xl font-bold mb-4">About My Wallet</h1>
          <p className="text-gray-700 dark:text-gray-300/80 leading-loose">
            My Wallet is an innovative app designed to help users manage their
            finances with ease and efficiency. Our goal is to provide a
            user-friendly platform where users can track their income and
            expenses, categorize their transactions, and gain insights into
            their financial habits through comprehensive graphs and reports.
            Whether you want to manage multiple accounts, monitor your monthly
            spending, or analyze your financial data by categories, My Wallet
            has got you covered.
          </p>

          <h2 className="text-xl font-bold mt-5 mb-3">About the Developer</h2>
          <p className="text-gray-700 dark:text-gray-300/80 leading-loose">
            Hello! I am Sergio Sánchez, a Full Stack Developer from Argentina
            currently working remotely in Mexico. I have a diverse professional
            background with experience in sales, administration, and purchasing
            in Denmark and Germany. Recently, I completed a Java course and am
            expanding my skillset with Java and Springboot.
          </p>
          <p className="text-gray-700 dark:text-gray-300/80 leading-loose">
            I am passionate about creating web applications that provide real
            value to users. My Wallet is one such project where I have poured my
            efforts to build a comprehensive financial management tool. In
            September, I will be traveling to New Zealand with a Working Holiday
            Visa to find a job as a web developer. I am excited about the new
            opportunities and challenges that lie ahead.
          </p>
          <p className="text-gray-700 dark:text-gray-300/80 leading-loose">
            Feel free to check out my portfolio to see more of my work:
            <a
              href="https://sergioomarsanchez.netlify.app/"
              className="text-blue-500 hover:underline ml-1"
            >
              sergioomarsanchez.netlify.app
            </a>
          </p>

          <h2 className="text-xl font-bold mt-5 mb-3">Connect with Me</h2>
          <ul className="list-disc pl-5">
            <li>
              <a
                href="https://www.linkedin.com/in/sergio-sanchez"
                className="text-blue-500 hover:underline"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/sergio-sanchez"
                className="text-blue-500 hover:underline"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/sergio_sanchez"
                className="text-blue-500 hover:underline"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
