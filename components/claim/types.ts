export type ClaimSourceFile = {
  id: string;
  name: string;
  size: number;
  url: string;
  file?: File;
  mimeType: string;
};

export type SourceInfo = {
  id: string;
  files: ClaimSourceFile[];
  originalUrl: string;
};

export type Claim = {
  title: string;
  description: string;
  resources: SourceInfo[];
};
