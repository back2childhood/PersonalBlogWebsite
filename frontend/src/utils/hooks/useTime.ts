// import { useMount, useSafeState } from 'ahooks';

export const useTime = () => {
  const hour = new Date().getHours();
  const timeText =
    hour < 11
      ? 'Good morning'
      : hour < 17
        ? 'Good afternoon'
        : hour < 19
          ? 'Good evening'
          : 'Good night';

  return { timeText };
};
