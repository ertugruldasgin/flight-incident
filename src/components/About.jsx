const About = () => {
  return (
    <div className="z-20 flex flex-col gap-4 items-center px-4 text-neutral-900 dark:text-white xl:max-w-[70%] mx-auto transition-colors duration-300">
      <div className="p-4 bg-white/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-lg opacity-70 w-full transition-colors duration-300">
        <div className="bg-neutral-300/50 dark:bg-neutral-600/50 border-0 rounded-lg p-4 h-full w-full shadow-md flex flex-col transition-colors duration-300">
          <p className="text-xl sm:text-2xl md:text-3xl xl:text-4xl capitalize font-semibold text-neutral-900 dark:text-white pb-4 transition-colors duration-300">
            About
          </p>
          <div className="text-sm md:text-base text-neutral-800/90 dark:text-white/90 flex flex-col gap-4 transition-colors duration-300">
            <p>
              <span className="font-semibold">Flight Incident</span> is a
              web-based project that compiles and presents data on commercial
              aircraft accidents and incidents.
            </p>
            <p>
              The goal of this platform is not to act as an official aviation
              reference, but rather to provide a clean, structured and
              searchable archive for educational and informative purposes.
            </p>
            <p>
              All incident records are programmatically extracted from publicly
              available{" "}
              <a href="https://en.wikipedia.org/" className="font-semibold">
                Wikipedia
              </a>{" "}
              pages using custom-built scripts.
            </p>
            <p>
              The data is then reorganized into a consistent format and
              presented in a user-friendly interface.
            </p>
            <p>
              This project was developed as a collaboration between a{" "}
              <span className="font-semibold">
                Computer Engineering Freshman
              </span>{" "}
              and an <span className="font-semibold">Aircraft Maintenance</span>
              , combining technical curiosity with a shared interest in aviation
              safety and history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
