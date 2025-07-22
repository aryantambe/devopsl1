import { SignedOut, SignInButton } from "@clerk/clerk-react";

const GetStarted = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white text-center px-6">
      {/* Welcome Message */}
      <h1 className="text-4xl font-bold mb-4">
        Welcome to <span className="text-blue-500">CloudKeep</span>
      </h1>
      <p className="text-gray-400 text-lg mb-8">Upload. Share. Download.</p>

      {/* Sign-In & Button */}
      <SignedOut>
        <SignInButton>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
            Get Started
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default GetStarted;







