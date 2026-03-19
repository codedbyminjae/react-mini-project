import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id, options = {}) => {
  const { disableNotFoundAlert = false } = options;
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();
  const nav = useNavigate();

  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id),
    );

    if (!currentDiaryItem) {
      if (!disableNotFoundAlert) {
        window.alert("존재하지 않는 일기입니다.");
      }
      nav("/", { replace: true });
    }

    setCurDiaryItem(currentDiaryItem);
  }, [id, data, nav, disableNotFoundAlert]);

  return curDiaryItem;
};

export default useDiary;
