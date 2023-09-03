import { msg_congrats } from "@/app/i18n/frog-msg";

export default function rotatingCongrats() {
  const values = Object.values(msg_congrats);
  return values[Math.floor(Math.random() * values.length)];
}
