
export default class Fetcher<T extends object> {

  static defaultHeader = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "authorization": ""
  };

  constructor(private readonly endpoint: string) {}

  static fetch(url: string, method = 'GET', body: object|null = null, headers= this.defaultHeader) {
    const options: RequestInit = {
      method,
      headers
    };
    if (localStorage.getItem('jwt')) {
        headers['authorization'] = `Bearer ${localStorage.getItem('jwt')}`;
    }
    if (null !== body) options.body = JSON.stringify(body);
    return fetch(url, options)
        .catch(err => {
          throw new Error(err);
        });
  }
}