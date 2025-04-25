import { Button } from "@/components/ui/button";
import Image from "next/image";
import { homedir } from "os";
import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constant";
const Home = () => (
  <>
    <BookOverview {...sampleBooks[0]} />

    <BookList
      title="Latest Books"
      books={sampleBooks}
      containerClassName="mt-28"
    />
  </>
);

export default Home;
