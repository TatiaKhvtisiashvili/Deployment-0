const BASE_URL = 'http://localhost:3001/api';

export const getLatestAnswer = async (): Promise<string> => {
  try {
    const res = await fetch(`${BASE_URL}/answer-shezam`);
    const result = await res.json();
    console.log(result);
    console.log(result.answer);

    return result.answer;
  } catch (err) {
    console.error('Failed to retrieve latest answer:', err);
    throw err;
  }
};

export const submitAnswer = async (text: string): Promise<string> => {
  try {
    const res = await fetch(`${BASE_URL}/create-answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: text }),
    });
    const result = await res.json();
    return result.data;
  } catch (err) {
    console.error('Failed to submit answer:', err);
    throw err;
  }
};
