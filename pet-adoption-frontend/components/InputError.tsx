type InputErrorProps = {
    messages?: string[]; // optional prop for error messages
    className?: string;  // optional prop for additional class names
}

const InputError: React.FC<InputErrorProps> = ({ messages = [], className = '' }) => (
    <>
        {messages.length > 0 && (
            <>
                {messages.map((message, index) => (
                    <p
                        className={`${className} text-sm text-red-600`}
                        key={index}>
                        {message}
                    </p>
                ))}
            </>
        )}
    </>
);

export default InputError;
