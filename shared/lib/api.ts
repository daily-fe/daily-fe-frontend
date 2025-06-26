import axios from 'axios';

export const apiClient = axios.create({
	// TODO: 환경변수로 수정
	baseURL: 'http://localhost:3001',
	headers: {
		'Content-Type': 'application/json',
	},
});
