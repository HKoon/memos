import { Link } from "@mui/joy";
import Icon from "@/components/Icon";
import MobileHeader from "@/components/MobileHeader";

const About = () => {
  return (
    <section className="@container w-full max-w-5xl min-h-full flex flex-col justify-start items-center sm:pt-3 md:pt-6 pb-8">
      <MobileHeader />
      <div className="w-full px-4 sm:px-6">
        <div className="w-full shadow flex flex-col justify-start items-start px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 text-black dark:text-gray-300">
          <p className="text-base">Linkin Love Bulletin Board. Development progress updates will be posted here, and we welcome everyone to comment!</p>
          <p className="text-base">powered by memos</p>
        </div>
      </div>
    </section>
  );
};

export default About;
