
import Navbar from "@/components/nav";
import FrontPage from "@/components/frontpage";
// import Tasks from "@/app/navigation/tasks";
import QuizGame from "@/components/quiz";
import Blog from "@/components/blogs";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";


// export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

export default function Home() {
  return (
   
  
  <div className="relative">
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* Background Image with play button*/}
      <div className="relative">
      <FrontPage/>
      </div>
  

   <Blog/>
    
   <QuizGame/>
   <FAQ/>
   <Footer/>
      

</div>
    

  );
}
