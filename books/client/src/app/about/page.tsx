import Header from "@/components/Header";

export default function About() {
  return (
    <div className="bg-[#ddba99] bg-cover bg-center">
      <Header />
      <section className=" px-6 bg-gray-100 bg-opacity-75 min-h-screen flex pt-10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-lg text-gray-700">
            Welcome to Book Heaven, your go-to place for exploring and managing
            your favorite books. We are passionate about bringing a world of
            knowledge and imagination to your fingertips.
          </p>
          <div className="mt-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-3">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700">
              Our mission is to provide readers with a platform to explore a
              wide range of books, manage their personal collection, and
              discover new stories that inspire and engage.
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-3">
              Our Values
            </h2>
            <ul className="list-disc list-inside text-lg text-gray-700">
              <li>
                Innovation: Constantly improving the user experience with new
                features.
              </li>
              <li>
                Community: Connecting readers and fostering a love for books.
              </li>
              <li>
                Integrity: We believe in honest reviews and recommendations.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
