export async function fetchData<T>(path: string, callback: (data: T)=>void): Promise<void>{
  const response = await fetch(path);
  console.log(response);
  const data: T = await response.json();
  callback(data);
}