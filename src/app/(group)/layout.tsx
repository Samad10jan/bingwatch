import { Header } from "../components/header";

export default function Layout({children}:{children:React.ReactNode}){
    return(
        <div className="">
              <Header/>
              <div className="mt-24">

              {children}
              </div>
        </div>
    )
}