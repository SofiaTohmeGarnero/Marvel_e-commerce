import type {NextPage} from 'next';
import Head from 'next/head';
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>MARVEL | Home</title>
                <meta name="description" content="List of comics"/>
                <link rel="icon" href="/favicon-marvel.ico"/>
            </Head>

            <BodySingle title={"Comics"}>
            </BodySingle>
        </>
    )
}

export default Index
