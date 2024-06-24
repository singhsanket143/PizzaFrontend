import { useNavigate } from "react-router-dom";

function Denied() {

    const navigate = useNavigate(); // programitcally navigate to the previous page

    return (
        <>
      <main className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-amber-50 to-orange-300">
        <h1 className="font-extrabold tracking-widest text-white text-9xl">
          403
        </h1>
        <div className="absolute px-2 text-sm text-white bg-black rounded rotate-12">
          Access Denied
        </div>
        <button className="mt-5" onClick={() => navigate(-1)}>
          <a className="relative inline-block text-sm font-medium text-[#fff] group active:text-yellow-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#EAB308] group-hover:translate-y-0 group-hover:translate-x-0" />

            <span
                
                className="relative block px-8 py-3 bg-[#EAB308] border border-current"
            >
              Go Back
            </span>
          </a>
        </button>
      </main>
    </>
    )
}

export default Denied;