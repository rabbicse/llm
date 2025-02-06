import userIcon from '@/assets/images/user.svg';
import errorIcon from '@/assets/images/error.svg';
import Spinner from '@/components/Spinner';
import Markdown from 'react-markdown';

const ChatMessage = () => {
    // const scrollContentRef = useAutoScroll(isLoading);
    return (
        <div className='grow space-y-4'>
            <div className={`flex items-start gap-4 py-4 px-3 rounded-xl 
                bg-primary-blue/10`}>

                <img
                    className='h-[26px] w-[26px] shrink-0'
                    src={userIcon}
                    alt='user'
                />

                <div>
                    <div className='markdown-container'>
                        <Markdown>Hello</Markdown>
                        <div className='whitespace-pre-line'>Hello Test</div>

                    </div>
                    {/* {error && (
                            <div className={`flex items-center gap-1 text-sm text-error-red ${content && 'mt-2'}`}>
                                <img className='h-5 w-5' src={errorIcon} alt='error' />
                                <span>Error generating the response</span>
                            </div>
                        )} */}
                </div>
            </div>
            {/* ))} */}
        </div>
    );
};

export default ChatMessage;