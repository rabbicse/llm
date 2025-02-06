import sendIcon from '@/assets/images/send.svg';
import { Message } from '@/models/message';

const ChatInput = ({ messages }: Message[]) => {
    return (
        <div className='sticky bottom-0 bg-themecolor py-4'>
            <div className='p-1.5 bg-primary-blue/35 rounded-3xl z-50 font-mono origin-bottom animate-chat duration-400'>
                <div className='pr-0.5 bg-white relative shrink-0 rounded-3xl overflow-hidden ring-primary-blue ring-1 focus-within:ring-2 transition-all'>
                    <textarea
                        placeholder='Ask anything'
                        className='block w-full max-h-[140px] py-2 px-4 pr-11 bg-black rounded-3xl resize-none placeholder:text-primary-blue placeholder:leading-4 placeholder:-translate-y-1 sm:placeholder:leading-normal sm:placeholder:translate-y-0 focus:outline-none'
                    // ref={textareaRef}
                    // rows='1'
                    // value={newMessage}
                    // onChange={e => setNewMessage(e.target.value)}
                    // onKeyDown={handleKeyDown}
                    />
                    <button
                        className='absolute top-1/2 -translate-y-1/2 right-3 p-1 rounded-md hover:bg-primary-blue/20'
                    // onClick={submitNewMessage}
                    >
                        <img src={sendIcon} alt='send' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;