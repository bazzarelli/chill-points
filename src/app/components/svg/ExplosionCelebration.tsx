import { useCallback } from "react";
import Particles from "react-particles";
import type { Container, Engine, ISourceOptions } from "tsparticles-engine";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim";

const options: ISourceOptions = {
  name: "Color Animation",
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
      },
    },
    color: {
      value: "#777ace",
      animation: {
        count: 1,
        enable: true,
        speed: 60,
        sync: true,
      },
    },
    stroke: {
      width: 30,
      color: {
        value: "#0000ff",
        animation: {
          count: 1,
          enable: true,
          speed: 60,
          sync: true,
        },
      },
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.6,
    },
    size: {
      value: 5,
    },
    move: {
      enable: true,
      speed: 7,
    },
  },
  background: {
    color: "transparent",
  },
};

export default function ExplosionCelebration() {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);
    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    [],
  );

  return (
    <Particles
      id="particleCelebration"
      width="200px"
      height="200px"
      init={particlesInit}
      loaded={particlesLoaded}
      options={options}
    />
  );
}
