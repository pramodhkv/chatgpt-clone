import openAi from "./chatGPT";

const query = async (prompt: string, model: string) => {
  const res = await openAi
    .createCompletion({
      prompt,
      model,
      max_tokens: 1000,
      temperature: 0.9,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => {
      return res.data.choices[0].text;
    })
    .catch((err) => {
      console.error(err);
      return `ChatGPT could not find an answer for this question. Please try again. Error: ${err}`;
    });

  return res;
};

export default query;
