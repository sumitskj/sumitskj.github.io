import "./Hero.css";

function Hero() {
  return (
    <div
      id="hero"
      className="pointer-events-none fixed flex flex-col w-screen h-screen justify-center items-center gap-2 bg-[length:40px_40px] bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] transition-opacity duration-100 opacity-100"
    >
      <div className="w-full text-center flex justify-center items-center text-6xl font-bold hello-anim">
        Hello
        <span className="wave-hand text-yellow-300 px-2">&#128075;</span>
        from,
      </div>
      <div className="pt-12 flex w-full text-black text-center justify-center items-center font-extrabold text-9xl lg:text-[14rem] whitespace-break-spaces">
        <div>
          <span className="s-anim">{"S"}</span>
        </div>
        <div className="relative h-fit">
          <img src="./rotate.svg" className="u-star h-[120px] absolute" />
          <span className="u-anim">{"u"}</span>
        </div>
        <div>
          <span className="m-anim">{"m"}</span>
        </div>
        <div>
          <span className="i-anim">{"i"}</span>
        </div>
        <div>
          <span className="t-anim">{"t"}</span>
        </div>
        <div className="pl-12 hide-papermill">
          <img
            src="./r.svg"
            className="rotate-papermill h-[80px] lg:h-[120px]"
          />
        </div>
      </div>
      <div className="flex justify-start items-center gap-2">
        <div className="text-5xl font-medium">{`{`}</div>
        <div className="flex flex-col items-baseline justify-center font-medium">
          <div className="text-lg">{`Jack of all trades, master of none,`}</div>
          <div className="text-lg">{`Often better than master of one.`}</div>
        </div>
        <div className="text-6xl font-medium">{`}`}</div>
      </div>
    </div>
  );
}

export default Hero;
