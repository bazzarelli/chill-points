export default function FrogMovie() {
  return (
    <figure>
      <video autoPlay loop muted playsInline>
        <source src="/images/frog-inhale-512.mp4" type="video/mp4" />
        <source src="/images/frog-inhale-512.webm" type="video/webm" />
      </video>
    </figure>
  );
}
