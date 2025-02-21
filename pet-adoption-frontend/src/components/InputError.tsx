type InputErrorProps = {
    message?: string; // optional prop for error messages
    className?: string;  // optional prop for additional class names
}

const InputError: React.FC<InputErrorProps> = ({ message = "", className = '' }) => (
    <p
        className={`${className} text-sm text-red-600`}
    >
        {message}
    </p>
);

export default InputError;
