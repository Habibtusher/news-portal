import Head from "next/head";
import RootLayout from "@/components/Layouts/RootLayout";
import Banner from "@/components/UI/Banner";
import AllNews from "@/components/UI/AllNews";


const HomePage = ({ allNews }) => {
  console.log("🚀 ~ file: index.js:7 ~ HomePage ~ allNews:", allNews)
  return (
    <>
      <Head>
        <title>News Portal</title>
        <meta
          name="description"
          content="This is news portal of programming hero made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <AllNews allNews={allNews} />
    </>
  );
};
export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:5000/news')
  const data = await res.json()
  return {
    props: {
      allNews: data
    },
    revalidate: 30,
  }
}