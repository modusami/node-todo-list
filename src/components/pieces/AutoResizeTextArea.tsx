"use client";
import React, { useRef, useEffect, ChangeEvent } from "react";

interface AutoResizeTextareaProps {
	value: string;
	onChange: (value: string) => void;
	className?: string;
}

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
	value,
	onChange,
	className = "",
}) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const resizeTextarea = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	};

	useEffect(() => {
		resizeTextarea();
	}, [value]);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		onChange(e.target.value);
	};

	return (
		<textarea
			ref={textareaRef}
			value={value}
			onChange={handleChange}
			placeholder="Add notes here..."
			className={`w-full resize-none overflow-hidden min-h-[20px] ${className}`}
			rows={1}
		/>
	);
};

export default AutoResizeTextarea;
