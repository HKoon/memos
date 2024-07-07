import { Link } from "@mui/joy";
import Icon from "@/components/Icon";
import MobileHeader from "@/components/MobileHeader";

const About = () => {
  return (
    <section className="w-full max-w-5xl min-h-full flex flex-col justify-start items-center pt-3 pb-8 sm:pt-3 md:pt-6">
      <MobileHeader />
      <div className="w-full px-4 sm:px-6">
        <div className="w-full shadow flex flex-col justify-start items-start p-4 rounded-xl bg-white dark:bg-zinc-800 text-black dark:text-gray-300">
          <p className="text-base font-semibold">
            Welcome to the Linkin Love Bulletin Board!
          </p>
          <p className="text-base font-regular">Here, you'll find regular updates on our development progress. We encourage everyone to join the conversation and share your thoughts!</p>
          <p className="text-base font-regular">Powered by Memos</p>
        </div>
      </div>
    </section>
  );
};

export default About;
