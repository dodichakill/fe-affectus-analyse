"use client";
import axios from "axios";
import Image from "next/image";
import React from "react";

export default function Home() {
  const [value, setValue] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let formData = new FormData();
    formData.append("text", value);
    axios({
      method: "POST",
      data: formData,
      url: "http://127.0.0.1:8000/api/sentiment-analyses",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    })
      .then((res) => {
        consola.info(res);
        consola.info(
          `Sentimet of text "${res.data.analyzed_sentiment.text}" is "${res.data.analyzed_sentiment.type}"`
        );
        setOutput(res.data.analyzed_sentiment);
        setShowModal(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      {showModal && (
        <div className="w-full h-screen p-10 rounded-lg">
          <div className="space-y-6">
            <div className="p-5 rounded-lg bg-slate-100 text-lg flex items-center gap-5 flex-col">
              <div className="w-full flex gap-5 items-center">
                <div className="">
                  <FaCommentDots className="text-3xl text-gray-800" />
                </div>
                <div className="p-5 bg-white rounded-lg border">
                  <p>{output.text}</p>
                </div>
              </div>
              <div className="w-full flex gap-5 items-center">
                <FaTags className="text-3xl text-gray-800" />
                {output.type === "Positive" ? (
                  <div className="bg-green-500 px-5 py-2 text-white text-2xl rounded-lg flex items-center gap-5">
                    <FaFaceSmile />{" "}
                    <p className="px-3 py-1 bg-green-400 rounded-lg">
                      Positive
                    </p>
                  </div>
                ) : output.type === "Negative" ? (
                  <div className="bg-red-500 px-5 py-2 text-white text-2xl rounded-lg flex items-center gap-5 ">
                    <FaFaceFrown />{" "}
                    <p className="px-3 py-1 bg-red-400 rounded-lg">Negative</p>
                  </div>
                ) : output.type === "Neutral" ? (
                  <div className="bg-blue-500 px-5 py-2 text-white text-2xl rounded-lg flex items-center gap-5">
                    <FaFaceMeh />{" "}
                    <p className="px-3 py-1 bg-blue-400 rounded-lg">Neutral</p>
                  </div>
                ) : (
                  <div className="bg-gray-500 px-5 py-2 text-white text-2xl rounded-lg flex items-center gap-5">
                    <FaFaceGrimace />{" "}
                    <p className="px-3 py-1 bg-gray-400 rounded-lg">
                      Irrelevant
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button
              className="bg-blue-500 px-5 py-2 text-white text-2xl rounded-lg flex items-center gap-5"
              onClick={() => setShowModal(false)}
              type="button"
            ></button>
          </div>
        </div>
      )}
      <main className="flex h-screen w-full flex-col items-center justify-center bg-hero-pattern">
        <nav className="p-5 w-full max-w-6xl rounded-lg shadow bg-white overflow-y-auto">
          <div className="w-full mt-5 md:mt-0 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-10">
            <Image
              src={"/images/hero.png"}
              alt="image hero"
              width={500}
              height={500}
              className="scale-90"
            />

            <div>
              <p>
                Welcome to the{" "}
                <span className="font-semibold"> Affectus Analysis</span>
              </p>
              <h2 className="text-2xl font-semibold md:text-6xl">
                Analyse your sentiments
              </h2>
              <p className="mt-3">
                Affectus Analysis is a powerful tool for understanding public
                opinion. By analyzing text from various sources, such as online
                reviews, social media, and discussion forums, you can identify
                positive, negative, neutral and irrelevant sentiment.
              </p>
            </div>
          </div>
          <div className="p-5 border border-blue-300 bg-slate-50 rounded-lg w-full my-5">
            <textarea
              id="message"
              rows="4"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              class="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Write your paragraph here..."
            ></textarea>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-5"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>
        </nav>
      </main>
    </>
  );
}
