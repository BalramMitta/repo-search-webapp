export interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    owner: {
      avatar_url: string;
    }
  }