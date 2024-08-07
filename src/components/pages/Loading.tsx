import React from "react";
import { Loader2 } from "lucide-react";

const Loading = () => {
	return (
		<div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
			<Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
			<p className="mt-4 text-lg font-semibold text-gray-700">Loading your todos...</p>
			<p className="mt-2 text-sm text-gray-500">This may take a moment</p>
		</div>
	);
};

export default Loading;
