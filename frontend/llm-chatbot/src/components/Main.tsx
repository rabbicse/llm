import '@/components/main.css'

const Main = () => {
  return (
    <div className="bg-[#343541] h-screen flex flex-col justify-between">
      <div>
        <h1 className="font-bold text-xl text-white p-4">ChatGPT 3.5 Clone</h1>
        {/* <Starter/> */}
          <div className="overflow-y-scroll h-[70vh] md:h-[75vh] w-full md:w-[70%] mx-auto md:p-0 p-4 flex flex-col">
            {/* message */}
            {/* {messages.map((m, index) => ( */}
              <div className="flex items-start space-x-4 my-6 p-2">                
                <div className="flex flex-col items-start">
                  <p className="text-[#ececf1] font-bold">
                    "ChatGPT"
                  </p>
                  <p className="text-[#ececf1]">text</p>
                </div>
              </div>
            <div />
          </div>
      </div>

      <div className="mx-8">

        {/* <p className="text-white text-sm animate-pulse text-center">
            Loading responses...
          </p> */}

        {/* input */}
        <div className="w-full flex justify-center items-center flex-col p-4 md:p-0 m-8">
          <div className="w-full md:w-[65%] h-[55px] border border-gray-600 flex items-center rounded-lg p-2">
            <input
              className="text-white h-full w-full p-2 outline-none bg-inherit"
              type="text"
              placeholder="Message ChatGPT clone"
            />
            <button className="bg-gray-600 h-full p-2 rounded-lg">
              send
              {/* <img src="/images/asset 10.svg" alt="btn-img" /> */}
            </button>
          </div>
          <p className="text-xs text-white p-2 text-center">
            ChatGPT clone can make mistakes. Consider checking important
            information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
