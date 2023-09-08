const Workout: React.FC = () => {
  return (
    <a
      href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
      className="group rounded-lg border border-transparent px-5 py-4 w-52 h-44 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      target="_blank"
      rel="noopener noreferrer">
      <h2 className={`mb-3 text-2xl font-semibold`}>
        Docs{" "}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className={`m-0 text-sm opacity-50`}>
        Find in-depth information about Next.js features and API.
      </p>
    </a>
  )
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-16 px-4">
      <nav className="z-10 max-w-6xl px-6 fixed lg:static pb-6 pt-8 lg:p-4 border-b border-gray-300 dark:border-neutral-800 left-0 top-0 flex w-full items-center justify-between text-sm lg:flex">
        <h1 className="font-extrabold text-2xl select-none">Gym App</h1>
      </nav>

      <div className="flex lg:max-w-6xl flex-wrap overflow-y-auto overflow-x-hidden place-content-center lg:place-content-start gap-2 mt-12 lg:mt-4 text-center lg:w-full lg:mb-0 lg:text-left">
        <Workout />

        <Workout />
        <Workout />
        <Workout />
        <Workout />
        <Workout />
      </div>

      <footer className="mt-auto text-gray-400">
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://nadjitan.vercel.app"
          target="_blank"
          rel="noopener noreferrer">
          By <b>Nadji Tan</b>
        </a>
      </footer>
    </main>
  )
}
