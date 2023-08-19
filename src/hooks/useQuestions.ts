import useTest from './useTest';

const useQuestions = () => {
  const test = useTest();
  return test.words;
}

export default useQuestions;