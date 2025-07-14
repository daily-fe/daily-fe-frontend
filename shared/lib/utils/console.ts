export const Console = {
	log: (...args: unknown[]) => {
		if (process.env.NODE_ENV === 'development') {
			console.log(...args);
		}
	},
	info: (...args: unknown[]) => {
		if (process.env.NODE_ENV === 'development') {
			console.info(...args);
		}
	},
	warn: (...args: unknown[]) => {
		if (process.env.NODE_ENV === 'development') {
			console.warn(...args);
		}
	},
	error: (...args: unknown[]) => {
		if (process.env.NODE_ENV === 'development') {
			console.error(...args);
		}
	},
};
