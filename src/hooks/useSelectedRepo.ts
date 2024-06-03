import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { selectRepo } from "../store/selectedRepoSlice";
import { Repo } from "../types/common";

const useSelectedRepo = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.selectedRepo);

  const setSelectedRepo = useCallback(
    (repo: Repo) => {
      dispatch(selectRepo(repo));
    },
    [dispatch]
  );

  return { selectRepo: data, setSelectedRepo };
};

export default useSelectedRepo;
