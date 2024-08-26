import {FC, MouseEventHandler, useEffect, useRef, useState} from "react";
import { Option } from "./Option";
import { observer } from "mobx-react-lite";
import {Error} from "../../shared/ui/Error/Error.tsx";

type Option = { id: number; content: string };

type SelectProps = {
    selected: Option | null;
    options: Option[];
    placeholder?: string;
    mode?: 'rows' | 'cells';
    status?: 'default' | 'invalid';
    onChange?: (selected: Option['content']) => void;
    onClose?: () => void;
    classNameContainer: string
    classNameSelect: string
    classNameList: string;
    errorMessage: string
};

export const Select: FC<SelectProps> = observer((
    {
        selected,
        options,
        placeholder,
        mode,
        status,
        onChange,
        onClose,
        classNameContainer,
        classNameSelect,
        classNameList,
        errorMessage
    }) => {
    const [isOpen, setIsOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const { target } = event;
            if (target instanceof Node && !rootRef.current?.contains(target)) {
                isOpen && onClose?.();
                setIsOpen(false);
            }
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [isOpen, onClose]);

    const handleOptionClick = (value: Option['content']) => {
        setIsOpen(false);
        onChange?.(value);
    };
    const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        const placeholderEl = placeholderRef.current;
        if (!placeholderEl) return;

        const handleClick = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                setIsOpen((prev) => !prev);
            }
        };

        placeholderEl.addEventListener('keydown', handleClick);

        return () => {
            placeholderEl.removeEventListener('keydown', handleClick);
        };
    }, []);

    return (
        <div className={classNameContainer} tabIndex={0}>
            <div
                className={classNameSelect}
                ref={rootRef}
                data-is-active={isOpen}
                data-mode={mode}
            >
                <div
                    className={`dropdown__button ${isOpen ? 'active' : ''}`}
                    data-status={status}
                    data-selected={!!selected?.content}
                    onClick={handlePlaceHolderClick}
                    role='button'
                    tabIndex={0}
                >
                    {selected?.content || placeholder}
                </div>
            </div>
            <ul className={`${classNameList} ${isOpen ? "open" : ""}`}>
                {options.length !== 0 ? options.map((option) => (
                    <Option
                        key={option.id}
                        option={option}
                        onClick={handleOptionClick}
                    />
                )) : <Option key="default" option={{content: 'Список пуст'}}/>}
            </ul>
            {isOpen && options.length == 0 &&
                <ul className={classNameList}>
                    <Option key="default" option={{content: 'Список пуст'}}/>
                </ul>
            }
            { errorMessage && <Error message={errorMessage}/> }
        </div>
    );
});