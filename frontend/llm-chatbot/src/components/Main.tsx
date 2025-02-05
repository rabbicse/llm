const Main = () => {
  return (
    <div className="bg-[#343541] h-screen flex flex-col justify-between">
      <div>
        <h1 className="font-bold text-xl text-white p-4">Deep Seek R1</h1>

        {/* <Starter/> */}
        {/* messages */}
        <div className="overflow-y-scroll h-[70vh] md:h-[75vh] w-full md:w-[70%] mx-auto md:p-0 p-4 flex flex-col">
          {/* message */}
          <div className="flex items-start space-x-4 my-6 p-2">
            {/* <img
              className="h-8 w-8 rounded-full"
              src={m.isUser ? "/images/asset 0.png" : "/images/logo.png"}
              alt="user"
            /> */}
            <div className="flex flex-col items-start">
              <p className="text-[#ececf1] font-bold"></p>
              <p className="text-[#ececf1]">
                loren spum sdhfsdjhfjsd jhsdgf dj
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* suggestions */}
        <div className="my-8 md:p-0 p-4 mx-auto w-full md:w-[65%] grid gap-2 grid-cols-2">
          <div className="flex flex-col items-start p-2 rounded-lg border border-gray-600 cursor-pointer">
            <p className="text-sm text-[#c5c5d2]">Title</p>
            <p className="text-sm font-bold text-[#585757]">Desc</p>
          </div>
        </div>
        <p className="text-white text-sm animate-pulse text-center">
          Loading responses...
        </p>

        {/* input */}
        <div className="w-full flex justify-center items-center flex-col p-4 md:p-0">
          <div className="w-full md:w-[65%] h-[55px] border border-gray-600 flex items-center rounded-lg p-2">
            <input
              className="text-white h-full w-full p-2 outline-none bg-inherit"
              type="text"
              placeholder="Ask Question?"
            />
            <button className="bg-gray-600 h-full p-2 rounded-lg">
              <img src="/images/asset 10.svg" alt="btn-img" />
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
