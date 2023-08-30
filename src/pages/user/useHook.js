import { useState } from "react";

export const useCounter = () => {
  const [categoryName, setCategoryName] = useState([]);
  
  return {categoryName,setCategoryName};
};
