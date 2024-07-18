import { getServerSession } from "next-auth";
import { authOption } from "../lib/auth";
import prisma from "../lib/prisma";
import { PencilIcon } from "@heroicons/react/24/outline";

export default async function ProfilePage() {
  const session = await getServerSession(authOption);

  if (!session) {
    return (
      <main className="flex flex-col justify-center p-2 md:p-5 lg:ml-10">
        <h1 className="text-lg font-bold lg:text-2xl place-self-center lg:place-self-start my-5">
          You need to log in to see this page.
        </h1>
      </main>
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { accounts: true, transactions: true },
  });

  return (
    <main className="flex flex-col justify-center p-2 md:p-5 lg:ml-10">
      <h1 className="text-lg font-bold lg:text-2xl place-self-center lg:place-self-start my-5">
        Welcome back{" "}
        <span className="italic text-pretty ">{session.user.name}</span>!
      </h1>
      <h2 className="text-base lg:text-2xl place-self-center lg:place-self-start my-5">
        Profile:
      </h2>
      <div className="flex h-screen w-full justify-center pt-2 md:pt-5 px-4">
        <div className="w-full p-6 space-y-6">
          <section>
            <div className="flex items-center">
              <div className="mr-4">
                <img
                  className="w-20 h-20 rounded-full"
                  src={user?.avatar || "/default-avatar.png"}
                  width={80}
                  height={80}
                  alt="User avatar"
                />
              </div>
              <div className="btn-sm text-white">{session.user.name}</div>
            </div>
          </section>
          <section>
            <h2 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">
              Email
            </h2>
            <div className="text-sm">
              Excepteur sint occaecat cupidatat non proident sunt in culpa qui
              officia.
            </div>
            <div className="flex flex-wrap mt-5">
              <div className="mr-2">
                <label className="sr-only" htmlFor="email">
                  Business email
                </label>
                <input
                  id="email"
                  className="form-input dark:bg-gray-800"
                  type="email"
                  value={user?.email}
                  readOnly
                />
              </div>
              <button className="btn border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm text-indigo-500">
                Change
              </button>
            </div>
          </section>
          <section>
            <h2 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">
              Password
            </h2>
            <div className="text-sm">
              You can set a permanent password if you don't want to use
              temporary login codes.
            </div>
            <div className="mt-5">
              <button className="btn border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm text-indigo-500">
                Set New Password
              </button>
            </div>
          </section>
          <section>
            <h2 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">
              Smart Sync update for Mac
            </h2>
            <div className="text-sm">
              With this update, online-only files will no longer appear to take
              up hard drive space.
            </div>
            <div className="flex items-center mt-5">
              <div className="form-switch">
                <input type="checkbox" id="toggle" className="sr-only" />
                <label
                  className="bg-slate-400 dark:bg-slate-700"
                  htmlFor="toggle"
                >
                  <span
                    className="bg-white shadow-sm"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Enable smart sync</span>
                </label>
              </div>
              <div className="text-sm text-slate-400 dark:text-slate-500 italic ml-2">
                Off
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
