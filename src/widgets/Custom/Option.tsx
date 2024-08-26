import {MouseEventHandler, useEffect, useRef} from "react";

type Option = { content: string };

type OptionProps = {
    option: Option;
    onClick?: (value: Option['content']) => void;
};
export const Option = (props: OptionProps) => {
    const {
        option: { content },
        onClick,
    } = props;
    const optionRef = useRef<HTMLLIElement>(null);

    const handleClick =
        (clickedValue: Option['content']): MouseEventHandler<HTMLLIElement> =>
            () => {
                onClick!(clickedValue);
            };

    useEffect(() => {
        const option = optionRef.current;
        if (!option) return;

        const handleEnterPress = (event: KeyboardEvent) => {
            if ((document.activeElement === option) && event.key === 'Enter') {
                onClick!(content);
            }
        }

        option.addEventListener('keydown', handleEnterPress);

        return () => {
            option.removeEventListener('keydown', handleEnterPress);
        };
    }, [content, onClick]);

    return (
        <li
            className='dropdown__item'
            value={content}
            onClick={handleClick(content)}
            tabIndex={0}
        >
            {content}
        </li>
    );
};