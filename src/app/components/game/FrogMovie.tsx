export default function FrogMovie() {
  return (
    <figure>
      <video autoPlay loop muted playsInline>
        <source src="/videos/frog-demo.mp4" type="video/mp4" />
        <source src="/videos/frog-demo.webm" type="video/webm" />
      </video>
    </figure>
  );
}
