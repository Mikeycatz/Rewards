const Footer = () => {
  return (
    <div className="bg-primary absolute bottom-[100%-1] -z-10 text-white grid lg:grid-cols-[2.5fr,1fr] justify-center lg:justify-between px-10 py-4 w-full border-t-8 border-secondary">
      <div>
        <a
          target="_blank"
          href="https://www.linkedin.com/company/anchor-safety"
        >
          <img className="my-4" src="/images/LinkedIn.svg" alt="linkedin" />
        </a>
        <p className="text-sm">
          Anchor Safety © 2023 - All Rights Reserved.
          <br /> Committed to partnering with you to reduce workplace exposure,
          <br />
          embed a strong safety culture and create a safer working environment.
        </p>
        <p className="my-4 text-secondary text-md lg:text-2xl">
          Text WhatsApp on 0739 375 8603
        </p>
        <p className="my-4 text-secondary text-md lg:text-2xl">
          Call us on 0800 328 5028
        </p>
        <p className="my-4 text-secondary text-md lg:text-2xl">
          <a
            className="font-bold"
            href="mailto:customer.care@anchorsafety.co.uk"
          >
            {" "}
            customer.care@anchorsafety.co.uk
          </a>
        </p>
        <p className="text-white">
          Anchor House, Chapel Lane, Great Blakenham, Ipswich, UK, IP6 0JZ
        </p>
      </div>

      <div className="grid justify-between md:text-end text-center">
        <img
          src="/images/anchor_logo_flat_jul21-white.png"
          alt="anchor safety"
          className="w-1/2 md:justify-self-center lg:justify-self-end p-4"
        />
        <p>
          Go to main site <br />{" "}
          <a
            className="text-secondary text-xl font-semibold"
            href="https://www.anchorsafety.co.uk"
            target="_blank"
          >
            www.anchorsafety.co.uk
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
