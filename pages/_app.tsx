import { AppProps } from "next/app";
import Head from "next/head";
import { AppWalletContextProvider } from "./context/AppWalletContextProvider"

require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

const App = ({ Component, pageProps }: AppProps) => {
  return (
      <div className="w-screen max-h-screen flex flex-col overflow-x-hidden">
        <Head>
          <title>Welcome to Looties</title>
        </Head>
        {/* <RecoilRoot> */}
            <AppWalletContextProvider>
                  <div className="flex flex-col lg:flex-row flex-[1_1_auto]">
                      <Component {...pageProps} />
                  </div>
            </AppWalletContextProvider>
        {/* </RecoilRoot> */}
      </div>
  );
};

export default App;