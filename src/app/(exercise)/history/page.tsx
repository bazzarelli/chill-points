import HistoryList from "@/app/components/HistoryList";
import { inter } from "@/app/utils/fonts";

export default function Page() {
  return (
    <section className={`${inter.className} mt-12`}>
      <HistoryList />
    </section>
  );
}
