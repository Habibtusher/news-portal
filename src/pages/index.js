import Head from "next/head";
import RootLayout from "@/components/Layouts/RootLayout";
import Banner from "@/components/UI/Banner";
import AllNews from "@/components/UI/AllNews";
import { useGetNewesQuery } from "@/redux/api/api";
import dynamic from 'next/dynamic'

const BannerLazyLoading = dynamic(
  () => import('@/components/UI/Banner'),
  {
    loading: () => <h1>Loading...</h1>,
  }
)
const HomePage = ({ allNews }) => {
  const {data,isLoading,isError,error} = useGetNewesQuery()
  console.log("🚀 ~ file: index.js:10 ~ HomePage ~ data:", data)
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
      <BannerLazyLoading />
      <AllNews allNews={allNews} />
    </>
  );
};
export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

// export const getServerSideProps = async () => {
//   const res = await fetch('http://localhost:3000/api/news')
//   const data = await res.json()
//   return {
//     props: {
//       allNews: data.data
//     }
//   }
// }
export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/news')
  const data = await res.json()
  return {
    props: {
      allNews: data.data
    },
    revalidate:30
  }
}