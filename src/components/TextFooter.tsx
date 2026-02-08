import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

export default function TextFooter() {
  return (
    <>
      {/* Left Text */}
      <h1
        className={`absolute left-10 bottom-5 transform -translate-y-1/2 text-rose-900 text-4xl lg:text-5xl font-bold leading-tight ${playfairDisplay.className}`}
      >
        <span className="text-rose-400">Match</span> <br /> the photo pairs
      </h1>

      {/* Right Text */}
      <h1
        className={`absolute right-10 bottom-5 transform -translate-y-1/2 text-rose-900 text-4xl lg:text-5xl font-bold leading-tight text-right ${playfairDisplay.className}`}
      >
        to reveal <br /> <span className="text-rose-400">the surprise</span>
      </h1>

      {/* Copyright */}
      <p className="absolute bottom-5 right-5 text-rose-800 text-sm opacity-40 hover:opacity-80">
        © {new Date().getFullYear()}{" "}
        <Link href="https://visibait.com">visibait.com</Link>
      </p>
    </>
  );
}
