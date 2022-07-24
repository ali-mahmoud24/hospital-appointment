const useSelect = () => {
  const [selectValue, setSelectValue] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);

  const changeHandler = event => {
    setSelectValue(event.target.value);
  };
  const blurHandler = () => {
    if (selectValue.trim() === '') {
      setIsEmpty(true);
      return;
    }
    setIsEmpty(false);
  };
};
