
function getUrl() {
  const url = import.meta.env.VITE_URL;
  return url;
}

function getApiKey() {
  const apiKey = import.meta.env.VITE_API_KEY;
  return apiKey;
}

export async function fetchData(endpoint: string, method: string = "GET", body?: any, isFormData: boolean = false) {
    const url = getUrl();
    const apiKey = getApiKey();

    console.log(`Fetching data from: ${url}/${endpoint} with method: ${method} and body: ${body ? JSON.stringify(body) : "None"} key: ${apiKey}`);

    const response = await fetch(`${url}/${endpoint}`, {
        method: method,
        headers: {
        'apiKey': `${apiKey}`,
        ...(isFormData ? {} : { "Content-Type": "application/json" })
        },
        body: body ? (isFormData ? body : JSON.stringify(body)) : undefined
    });


    console.log("Response:", response);


    
    const json = await response.json();
    // console.log("Received response:", json);
    return json;
}

export async function uploadImage(file: File) {
  console.log("Uploading image:", file);
    const formData = new FormData();
    formData.append("image", file);

    const data = await fetchData("biomaterials/upload-image", "POST", formData, true);

    console.log("Image upload response:", data);
    return data.url;
}