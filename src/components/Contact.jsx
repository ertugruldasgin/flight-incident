import { FaGithub } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const Contact = () => {
  return (
    <div className="flex flex-row">
      <div className="z-20 flex flex-col gap-4 items-center px-4 text-neutral-900 dark:text-white xl:max-w-[70%] mx-auto transition-colors duration-300">
        <div className="p-4 bg-white/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-lg opacity-70 w-full transition-colors duration-300">
          <div className="bg-neutral-300/50 dark:bg-neutral-600/50 border-0 rounded-lg p-4 h-full w-full shadow-md flex flex-col transition-colors duration-300">
            <p className="text-xl sm:text-2xl md:text-3xl xl:text-4xl capitalize font-semibold text-neutral-900 dark:text-white pb-4 transition-colors duration-300">
              Contact
            </p>
            <div className="text-sm md:text-base text-neutral-800/90 dark:text-white/90 flex flex-col gap-4 transition-colors duration-300">
              <p>We value accurate information and collaboration.</p>
              <p>
                If you notice an error, would like to contribute data, or have a
                suggestion that could improve the platform, we encourage you to
                get in touch.
              </p>
              <p className="font-medium flex flex-row gap-2">
                <span className="flex justify-center items-center">
                  <IoIosMail className="w-5 h-5" />
                </span>{" "}
                Email:{" "}
                <a
                  href="mailto:flightincident@gmail.com"
                  className="font-normal"
                >
                  flightincident@gmail.com
                </a>
              </p>
              <p className="font-medium flex flex-row gap-2">
                <span className="flex justify-center items-center">
                  <FaGithub className="w-5 h-5" />
                </span>{" "}
                GitHub:{" "}
                <a
                  href="https://github.com/ertugruldasgin"
                  className="font-normal"
                >
                  ertugruldasgin
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
