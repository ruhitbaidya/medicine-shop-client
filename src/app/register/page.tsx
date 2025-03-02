import Link from "next/link";

const RegisterPage = () => {
  return (
    <div>
      {" "}
      <div className="bg-gray-200">
        <div className="container mx-auto">
          <div className="h-screen flex justify-center items-center border">
            <div className="bg-gray-100 p-[50px] rounded-lg w-[95%] lg:w-[50%] mx-uato">
              <div>
                <p className="text-left">Please Enter Your Details</p>
                <h2 className="text-left text-4xl">Register</h2>
              </div>
              <form>
                <div className="mb-[20px]">
                  <input
                    type="email"
                    placeholder="Enter Your Email!"
                    className="w-full focus:outline-none border border-gray-400 rounded-lg p-[10px]"
                  />
                </div>
                <div className="mb-[20px]">
                  <input
                    type="phone"
                    placeholder="Enter Your Phone!"
                    className="w-full focus:outline-none border border-gray-400 rounded-lg p-[10px]"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Enter Your Password!"
                    className="w-full focus:outline-none border border-gray-400 rounded-lg p-[10px]"
                  />
                </div>
                <div>
                  <p>
                    If You Hanve An Account{" "}
                    <Link href="/login">Please Login</Link>
                  </p>
                </div>
                <div>
                  <button className="w-full">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
