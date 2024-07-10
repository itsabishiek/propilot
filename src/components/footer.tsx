import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="p-20 mt-40 border-t-[1px] border-slate-900 flex flex-col justify-center items-center md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Image
          src="/cypresslogo.svg"
          width={22}
          height={22}
          alt="cypress logo"
        />
        <span className="dark:text-white font-semibold">propilot.</span>
      </div>
      <p className="text-sm text-slate-700 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam maiores
        repellat dolorem voluptatibus cumque autem et doloribus dolor ut velit
        natus iste quam aut fugit laboriosam nemo optio quisquam debitis vel
        esse impedit aperiam, repudiandae enim libero. Quaerat aut sequi
        consectetur beatae quia soluta quidem quas atque, magni optio
        exercitationem ex iusto quibusdam nulla, incidunt nesciunt voluptas
        ullam nam quisquam omnis, a voluptatum fugiat asperiores? Voluptate
        neque officiis sunt nulla amet modi, quas architecto! Delectus,
        voluptatem deleniti tempore atque doloremque magnam eligendi est
        placeat, saepe ad facere quaerat. Consequuntur iusto tempora cupiditate.
        Accusantium, possimus. Voluptas soluta adipisci accusamus doloremque?
        Tempora!
      </p>
    </footer>
  );
};

export default Footer;
