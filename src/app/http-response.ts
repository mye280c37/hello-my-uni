interface Indexable {
  [key: string]: any;
}

export interface HttpResponse{
  result?: Indexable;
  message?: string;
  error?: string;
}
