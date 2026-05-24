export type CreatePollBody = {
  title: string;
  description: string;
  options: {
    optionName: string
  }[];
};
